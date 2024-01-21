import {
  reqAPIWithBackoff,
  reqAPIWithBackoffAndCache,
  notion,
} from './api.js'
import {
  cacheDir,
  incrementalCache,
} from './variables.js'
import { FetchPage } from './page.js'
import {
  createDirWhenNotfound,
  saveImage,
  readCache,
  writeCache,
  getHtmlMeta,
  getVideoHtml,
  getEmbedHtml,
  isEmpty,
} from './files.js'
import type {
  ListBlockChildrenResponseEx,
  GetPageResponseEx,
  GetDatabaseResponseEx,
} from './types.js'

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
        console.log('last_edited_time is required as a FetchBlocks() args when incremental cache')
        return list
      }
      if (!incrementalCache || list.last_edited_time === last_edited_time) {
        return list
      }
      console.log(`incremental block cache: ${cacheFile}`)
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
        case 'callout':
          if (block.callout.icon?.type === 'external') {
            const iconUrl = block.callout.icon.external.url
            block.callout.icon.src = await saveImage(iconUrl, `block-${block.id}`)
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
          console.log(block)
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
            block.image.src = await saveImage(imageUrl, `block-${id}`)
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
                    const src = await saveImage(iconUrl, `block-${block.id}`)
                    richText.mention.database.icon = { type: db.icon.type, src, url: src }
                  }
                } catch (e) {
                  console.log(`database view mention is unsupported ${block.type}`, block, e)
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
                  if (page.icon?.type === 'emoji') {
                    richText.mention.page.icon = { type: 'emoji', emoji: page.icon.emoji }
                  } else if (page.icon?.type === 'external' || page.icon?.type === 'file') {
                    const iconUrl = (page.icon.type === 'external') ? page.icon.external.url : page.icon.file.url
                    const src = await saveImage(iconUrl, `block-${block.id}`)
                    richText.mention.page.icon = { type: page.icon.type, src, url: src }
                  }
                  for (const prop of Object.values(page.properties)) {
                    if (prop.type === 'title') {
                      richText.mention.page.name = prop.title.map(v => v.plain_text).join('')
                      break
                    }
                  }
                } catch (e) {
                  console.log(`page mention is unsupported ${block.type}`, block, e)
                  richText.mention.page.name = '--'
                  richText.mention.page.icon = { type: 'emoji', emoji: '@' }
                }
                break
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
          if (block.video.type === 'external') {
            block.video.html = await getVideoHtml(block)
          }
          break
        case 'audio':
        case 'breadcrumb':
        case 'code':
        case 'column':
        case 'divider':
        case 'equation':
        case 'file':
        case 'heading_1':
        case 'heading_2':
        case 'heading_3':
        case 'link_to_page':
        case 'link_preview':
        case 'pdf':
        case 'quote':
        case 'synced_block':
        case 'table_of_contents':
        case 'table_row':
        case 'template':
        case 'to_do':
        case 'unsupported':
          break
        default:
          console.log(`unknown block error`, block)
          break
      }
    } catch (e) {
      console.log(`error for ${block.type} contents get`, block, e)
    }
  }

  await writeCache(cacheFile, list)

  return list
}

/*
interface FetchBreadcrumbsProps {
  type: 'page_id' | 'database_id' | 'block_id'
  id: string
}
interface Breadcrumbs {
  name: string
  icon: {}
}

export const FetchBreadcrumbs = async ({ type, id }: FetchBreadcrumbsProps): Promise<Breadcrumbs[]> => {
  let breadcrumbs: Breadcrumbs[] = []
  const max = 10
  let count = 0
  let nextType = type

  while (count < max) {
    switch (nextType) {
      case 'block_id':
        break
      case 'page_id':
        const page = await FetchPage(id)
        id = page.parent.page_id
        break
      case 'database_id':
        id = page.parent.database_id
        break
      case 'workspace':
        count = max
        break
    }
  }

  return breadcrumbs
}
*/
