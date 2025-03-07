import {
  reqAPIWithBackoff,
  notion,
} from './api.js'
import {
  cacheDir,
  incrementalCache,
  debug,
} from './variables.js'
import {
  atoh,
  createDirWhenNotfound,
  saveImage,
  readCache,
  writeCache,
  isAvailableCache,
  isEmpty,
} from './files.js'
import type {
  QueryDatabaseParameters,
  QueryDatabaseResponseEx,
  GetDatabaseResponseEx,
  PageObjectResponseEx,
  PersonUserObjectResponseEx,
} from './types.js'
import {
  savePageCover,
  savePageIcon,
} from './page.js'

export interface FetchDatabaseArgs extends QueryDatabaseParameters {
}

export interface FetchDatabaseRes extends QueryDatabaseResponseEx {
}

/**
 * FetchDatabase retrieves database and download images in from blocks.
 * And create cache that includes filepath of downloaded images.
 */
export const FetchDatabase = async (params: FetchDatabaseArgs): Promise<FetchDatabaseRes> => {
  const { database_id } = params
  const limit = ('page_size' in params) ? params.page_size : undefined
  const paramsHash = atoh(JSON.stringify(params))

  await createDirWhenNotfound(cacheDir)
  const cacheFile = `${cacheDir}/notion.databases.query-${paramsHash}${limit !== undefined ? `.limit-${limit}` : ''}`
  let allres: undefined|QueryDatabaseResponseEx
  let res: undefined|QueryDatabaseResponseEx

  try {
    const list = await readCache<QueryDatabaseResponseEx>(cacheFile)
    if (!isEmpty(list)) {
      if (!incrementalCache) {
        if (debug) {
          console.log(`use cache in FetchDatabase() with no-incremental-cache: ${cacheFile}`)
        }
        return list
      }
      if (await isAvailableCache(cacheFile)) {
        if (debug) {
          console.log(`use available cache in FetchDatabase(): ${cacheFile}`)
        }
        return list
      }
      if (debug) {
        console.log(`requesting to API because an old cache file was found in FetchDatabase(): ${cacheFile}`)
      }
    }
  } catch (_) {
    /* not fatal */
  }

  while (true) {
    if (res && res.next_cursor) {
      params.start_cursor = res.next_cursor
    }
    res = await reqAPIWithBackoff<QueryDatabaseResponseEx>({
      func: notion.databases.query,
      args: params,
      count: 3,
    })
    if (allres === undefined) {
      allres = res
    } else {
      allres.results.push(...res.results)
    }
    if (res.next_cursor === null || limit !== undefined) {
      break
    }
  }

  for (const result of allres.results) {
    const page: PageObjectResponseEx = result
    await savePageCover(page)
    await savePageIcon(page)
    for (const [, v] of Object.entries(page.properties)) {
      // Save avatar in people property type
      if (v.type === 'people') {
        const peoples = v.people as unknown as PersonUserObjectResponseEx[]
        for (const people of peoples) {
          if (people.avatar_url) {
            const ipws = await saveImage(people.avatar_url, `database-avatar-${people.id}`)
            people.avatar = ipws.path
          }
        }
      }
    }
  }

  const meta = await reqAPIWithBackoff<GetDatabaseResponseEx>({
    func: notion.databases.retrieve,
    args: { database_id },
    count: 3,
  })
  await saveDatabaseCover(meta)
  await saveDatabaseIcon(meta)
  allres.meta = meta

  await writeCache(cacheFile, allres)

  return allres
}

export async function saveDatabaseCover(db: GetDatabaseResponseEx) {
  if (db.cover === undefined || db.cover === null) {
    return
  }
  if (db.cover.type === 'external') {
    const ipws = await saveImage(db.cover.external.url, `database-cover-${db.id}`)
    db.cover.src = ipws.path
  } else if (db.cover.type === 'file') {
    const ipws = await saveImage(db.cover.file.url, `database-cover-${db.id}`)
    db.cover.src = ipws.path
  }
}

export async function saveDatabaseIcon(db: GetDatabaseResponseEx) {
  if (db.icon === undefined || db.icon === null) {
    return
  }
  if (db.icon.type === 'external') {
    const ipws = await saveImage(db.icon.external.url, `database-icon-${db.id}`)
    db.icon.src = ipws.path
  } else if (db.icon.type === 'file') {
    const ipws = await saveImage(db.icon.file.url, `database-icon-${db.id}`)
    db.icon.src = ipws.path
  }
}
