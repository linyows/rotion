import {
  reqAPIWithBackoff,
  reqAPIWithBackoffAndCache,
  notion,
} from './api.js'
import {
  cacheDir,
  incrementalCache,
  debug,
} from './variables.js'
import { FetchPage } from './page.js'
import {
  createDirWhenNotfound,
  saveImage,
  saveFile,
  readCache,
  writeCache,
  getHtmlMeta,
  getVideoHtml,
  getEmbedHtml,
  isEmpty,
  getVideoType
} from './files.js'
import type {
  ListBlockChildrenResponseEx,
  GetPageResponseEx,
  GetDatabaseResponseEx,
} from './types.js'
import { FetchBreadcrumbs } from './breadcrumbs.js'
import { getIssueForLinkPreview, getRepoForLinkPreview } from './github.js'

export interface FetchBlocksArgs {
  block_id: string
  last_edited_time?: string
}

export interface FetchBlocksRes extends ListBlockChildrenResponseEx {
}

/**
 * FetchBlocks retrieves page blocks and download images in from blocks.
 * And create cache that includes filepath of downloaded images.
 * The last_edited_time of 2nd args is for ROTION_INCREMENTAL_CACHE.
 */
export const FetchBlocks = async ({ block_id, last_edited_time }: FetchBlocksArgs): Promise<FetchBlocksRes> => {
  await createDirWhenNotfound(cacheDir)
  const cacheFile = `${cacheDir}/notion.blocks.children.list-${block_id}`

  try {
    const list = await readCache<ListBlockChildrenResponseEx>(cacheFile)
    if (!isEmpty(list)) {
      if (incrementalCache && last_edited_time === undefined) {
        if (debug) {
          console.log(`use cache in FetchBlocks(): ${cacheFile}, last_edited_time is required as a FetchBlocks() args when incremental cache`)
        }
        return list
      }
      if (!incrementalCache || list.last_edited_time === last_edited_time) {
        if (debug) {
          console.log(`use cache so same last-edited-time in FetchBlocks(): ${cacheFile}`)
        }
        return list
      }
      if (debug) {
        console.log(`requesting to API because an old cache file was found in FetchBlocks(): ${cacheFile}`)
      }
    }
  } catch (_) {
    /* not fatal */
  }

  const list = await reqAPIWithBackoff<ListBlockChildrenResponseEx>({
    func: notion.blocks.children.list,
    args: { block_id },
    count: 3
  })

  // With the blocks api, you can get the last modified date of a block,
  // but not the last modified date of all blocks. So extend the type and add it.
  if (last_edited_time) {
    list.last_edited_time = last_edited_time
  }

  for (const block of list.results) {
    try {
      const { type } = block
      switch (type) {
        case 'bookmark':
          block.bookmark.site = await getHtmlMeta(block.bookmark.url)
          break
        case 'bulleted_list_item':
          if (block.has_children) {
            block.children = await FetchBlocks({ block_id: block.id, last_edited_time: block.last_edited_time })
          }
          break
        case 'breadcrumb':
          block.list = await FetchBreadcrumbs({ id: block_id, type: 'page_id' })
          break
        case 'callout':
          if (block.callout.icon?.type === 'external') {
            const iconUrl = block.callout.icon.external.url
            const ipws = await saveImage(iconUrl, `block-${block.id}`)
            block.callout.icon.src = ipws.path
          }
          if (block.has_children) {
            block.children = await FetchBlocks({ block_id: block.id, last_edited_time: block.last_edited_time })
          }
          break
        case 'child_database':
          // if (block.has_children) {
          const database_id = block.id
          block.database = await reqAPIWithBackoffAndCache<GetDatabaseResponseEx>({
            name: 'notion.databases.retrieve',
            func: notion.databases.retrieve,
            args: { database_id },
            count: 3,
          })
          // }
          break
        case 'child_page':
          block.page = await FetchPage({ page_id: block.id, last_edited_time: block.last_edited_time })
          // Unnecessary?
          // block.children = await FetchBlocks(block.id, block.last_edited_time)
          break
        case 'column_list':
          block.children = await FetchBlocks({ block_id: block.id, last_edited_time: block.last_edited_time })
          block.columns = []
          for (const b of block.children.results) {
            block.columns.push(await FetchBlocks({ block_id: b.id, last_edited_time: block.last_edited_time }))
          }
          break
        case 'embed':
          block.embed.html = await getEmbedHtml(block)
          break
        case 'image':
          const { id, image } = block
          if (image !== undefined) {
            const imageUrl = image.type === 'file' ? image.file.url : image.external.url
            const ipws = await saveImage(imageUrl, `block-${id}`)
            block.image.src = ipws.path
            if (ipws.width) {
              block.image.width = ipws.width
            }
            if (ipws.height) {
              block.image.height = ipws.height
            }
          }
          break
        case 'numbered_list_item':
          if (block.has_children) {
            block.children = await FetchBlocks({ block_id: block.id, last_edited_time: block.last_edited_time })
          }
          break
        case 'paragraph':
          for (const richText of block.paragraph.rich_text) {
            if (richText.type !== 'mention') {
              continue
            }
            switch (richText.mention.type) {
              case 'database':
                try {
                  const database_id = richText.mention.database.id
                  const db = await reqAPIWithBackoffAndCache<GetDatabaseResponseEx>({
                    name: 'notion.databases.retrieve',
                    func: notion.databases.retrieve,
                    args: { database_id },
                    count: 3,
                  })
                  richText.mention.database.name = db.title.map(v => v.plain_text).join('')
                  if (db.icon?.type === 'emoji') {
                    richText.mention.database.icon = { type: 'emoji', emoji: db.icon.emoji }
                  } else if (db.icon?.type === 'external' || db.icon?.type === 'file') {
                    const iconUrl = (db.icon.type === 'external') ? db.icon.external.url : db.icon.file.url
                    const ipws = await saveImage(iconUrl, `block-${block.id}`)
                    richText.mention.database.icon = { type: db.icon.type, src: ipws.path, url: ipws.path }
                  }
                } catch (e) {
                  if (debug) {
                    console.log(`database view mention is unsupported ${block.type}`, block, e)
                  }
                  richText.mention.database.name = '--'
                  richText.mention.database.icon = { type: 'emoji', emoji: '@' }
                }
                break
              case 'page':
                try {
                  const page_id = richText.mention.page.id
                  const page = await reqAPIWithBackoff<GetPageResponseEx>({
                    func: notion.pages.retrieve,
                    args: { page_id },
                    count: 3,
                  })
                  for (const prop of Object.values(page.properties)) {
                    if (prop.type === 'title') {
                      richText.mention.page.name = prop.title.map(v => v.plain_text).join('')
                      break
                    }
                  }
                  if (page.icon?.type === 'emoji') {
                    richText.mention.page.icon = {
                      type: page.icon.type,
                      emoji: page.icon.emoji,
                    }
                  } else if (page.icon?.type === 'external' || page.icon?.type === 'file') {
                    const iconUrl = (page.icon.type === 'external') ? page.icon.external.url : page.icon.file.url
                    const ipws = await saveImage(iconUrl, `block-${block.id}`)
                    richText.mention.page.icon = {
                      type: page.icon.type,
                      src: ipws.path,
                      url: ipws.path,
                    }
                  }
                } catch (e) {
                  if (debug) {
                    console.log(`page mention is unsupported ${block.type}`, block, e)
                  }
                  richText.mention.page.name = '--'
                  richText.mention.page.icon = { type: 'emoji', emoji: '@' }
                }
                break
            }
          }
          break
        case 'file': {
          const url = block.file.type === 'external' ? block.file.external.url : block.file.file.url
          const { src, size } = await saveFile(url, `block-${block.id}`)
          block.file.src = src
          block.file.size = size
          break
        }
        case 'pdf': {
          const url = block.pdf.type === 'external' ? block.pdf.external.url : block.pdf.file.url
          const { src, size } = await saveFile(url, `block-${block.id}`)
          block.pdf.src = src
          block.pdf.size = size
          break
        }
        case 'synced_block':
          if (block.has_children) {
            if (block.synced_block.synced_from === null) {
              block.children = await FetchBlocks({ block_id: block.id, last_edited_time: block.last_edited_time })
            } else if (block.synced_block.synced_from.type === 'block_id') {
              const block_id = block.synced_block.synced_from.block_id
              block.children = await FetchBlocks({ block_id, last_edited_time: block.last_edited_time })
            }
          }
          break
        case 'table':
          block.children = await FetchBlocks({ block_id: block.id, last_edited_time: block.last_edited_time })
          break
        case 'toggle':
          block.children = await FetchBlocks({ block_id: block.id, last_edited_time: block.last_edited_time })
          break
        case 'video':
          if (block.video.type === 'file') {
            const { src } = await saveFile(block.video.file.url, `block-${block.id}`)
            block.video.src = src
            block.video.videoType = getVideoType(src)
          } else if (block.video.type === 'external') {
            block.video.html = await getVideoHtml(block)
          }
          break
        case 'link_preview':
          const { url } = block.link_preview

          if (url.includes('figma.com')) {
            // https://www.figma.com/file/GfHZFRpWGd0QXsRg9igdw8/Google-Material-Design?node-id=0%3A1
            block.link_preview.figma = {
              html: `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=${encodeURI(url)}" allowfullscreen></iframe>`
            }

          } else if (url.includes('github.com')) {
            const u = new URL(url).pathname
            if (u.split('/').length > 1) {
              const [owner, repo, type, num] = u.split('/').slice(1)
              if (owner && repo && (type === 'issues' || type === 'pull') && num) {
                const res = await getIssueForLinkPreview({ owner, repo, number: num })
                block.link_preview.github = {
                  type: 'issue',
                  issue: res,
                }
              } else if (owner && repo) {
                const res = await getRepoForLinkPreview({ owner, repo })
                block.link_preview.github = {
                  type: 'repo',
                  repo: res,
                }
              }
            }
          }
          break
        case 'audio':
        case 'code':
        case 'column':
        case 'divider':
        case 'equation':
        case 'heading_1':
        case 'heading_2':
        case 'heading_3':
        case 'link_to_page':
        case 'quote':
        case 'table_of_contents':
        case 'table_row':
        case 'template':
        case 'to_do':
        case 'unsupported':
          break
        default:
          if (debug) {
            console.log(`unknown block error`, block)
          }
          break
      }
    } catch (e) {
      if (debug) {
        console.log(`error for ${block.type} contents get`, block, e)
      }
    }
  }

  await writeCache(cacheFile, list)

  return list
}
