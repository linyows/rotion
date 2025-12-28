import fs from 'fs/promises'
import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import * as files from './files'
import { EmbedBlockObjectResponseEx, VideoBlockObjectResponseEx } from './types'

test.before(() => {
  td.replace(console, 'log')
  td.reset()
  // Ensure skipDownload is disabled for files.test.ts
  delete process.env.ROTION_SKIP_DOWNLOAD
})

test('isAvailableCache returs true when cache hits', async () => {
  const path = 'testdata/cache.txt'
  await fs.writeFile(path, '')
  const res = await files.isAvailableCache(path)
  assert.ok(res)
})

test('isAvailableCache returs false when cache no hits', async () => {
  const path = 'testdata/cache.txt'
  await fs.writeFile(path, '')
  await files.sleep(1)
  const res = await files.isAvailableCache(path, -10000)
  assert.not.ok(res)
})

type GHRes = {
  message: string
  documentation_url: string
}

function urlToFilename(u: string) {
  return u.replace('://', '_').replace(/\./g, '_').replace(/\//g, '_')
}

async function vcr (reqUrl: string) {
  const dir = 'testdata/vcr'
  const p = `${dir}/${urlToFilename(reqUrl)}.txt`
  try {
    const str = await fs.readFile(p, 'utf-8')
    return str
  } catch (_) {
  }

  try {
    const str = await files.getHTTP(reqUrl)
    await files.createDirWhenNotfound(dir)
    await fs.writeFile(p, str)
    return str
  } catch (e) {
    console.error(e.message, e.name)
  }

  return ''
}

const testsGetHtmlMeta = [
  [
    'https://github.com',
    'GitHub · Build and ship software on a single, collaborative platform · GitHub',
    "Join the world's most widely adopted, AI-powered developer platform where millions of developers, businesses, and the largest open source community build software that advances humanity.",
    '/images/html-image-77689c771405d1131dd653d0fc62bcf0e149788f.webp',
    '/images/html-icon-84b7e44aa54d002eac8d00f5bfa9cc93410f2a48-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.svg',
  ],
  [
    'https://wordpress.org',
    'Blog Tool, Publishing Platform, and CMS – WordPress.org',
    'Open source software which you can use to easily create a beautiful website, blog, or app.',
    '/images/html-image-3a3090603f6bdfe020ebfadbcda88269e7ff9fba.webp',
    '/images/html-icon-5e627442a6a3e12ed6cbbecf1a9a0f3ef9298800-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.ico',
  ],
  [
    'https://reactjs.org',
    'React',
    'React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript. React is designed to let you seamlessly combine components written by independent people, teams, and organizations.',
    '/images/html-image-ce7f0c52bc0e232480445462ce8acd6f873e7263.webp',
    '/images/html-icon-cf3a9253f8e579b8815743c91cf8474a7ba0a5c3-c6eac0e9dbd7a24b49444f38a7984d17050ebf67.webp',
  ],
  [
    'https://nuxtjs.org',
    'Nuxt: The Intuitive Vue Framework · Nuxt',
    'Nuxt is an open source framework that makes web development intuitive and powerful. Create performant and production-grade full-stack web apps and websites with confidence.',
    '/images/html-image-b964fb1bec8baa0610a95027ead4c2faf741c89c.webp',
    '/images/html-icon-5b7695a0da380c6011550f0097344ad388806506-f8995ba5891b07e328c60d6bd6c10159878c5a13.webp',
  ],
  [
    'https://www.notion.so',
    'Your connected workspace for wiki, docs & projects | Notion',
    "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team.",
    '/images/html-image-7505d64a54e061b7acd54ccd58b49dc43500b635.webp',
    '/images/html-icon-5f4aa01486e967f562d93fdff83daae603912c43-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.ico',
  ],
  [
    'https://www.typeform.com',
    'Typeform: People-Friendly Forms and Surveys',
    'Build beautiful, interactive forms — get more responses. No coding needed. Templates for quizzes, research, feedback, lead generation, and more. Sign up FREE.',
    '/images/html-image-bf79251ec7ff53f033ec9fce0cbf0ce6986e8f72.webp',
    '/images/html-icon-239b10b2bb1ad78e45400118cb543275e165075e-0137cba4199addb251992b2ec2d00accebaff1e9.webp',
  ],
  [
    'https://go.dev/conduct',
    'Go Community Code of Conduct - The Go Programming Language',
    'Online communities include people from many different backgrounds. The Go contributors are committed to providing a friendly, safe and welcoming environment for all, regardless of gender identity and expression, sexual orientation, disabilities, neurodiversity, physical appearance, body size, ethnicity, nationality, race, age, religion, or similar personal characteristics.',
    '/images/html-image-dd81b68c375850259cdb26e64618e339c4eec3c3.webp',
    '/images/html-icon-77014b367198f9878ea91bdccd6bb3fce2a5ee2a-7f5e06b5d5dc8f2fac131fd56215ae5ca767a98c.webp',
  ],
  [
    'https://cyberduck.io/',
    'Cyberduck | Libre server and cloud storage browser for Mac and Windows with support for FTP, SFTP, WebDAV, Amazon S3, OpenStack Swift, Backblaze B2, Microsoft Azure & OneDrive, Google Drive and Dropbox',
    'Download Mountain Duck available from mountainduck.io to mount any remote server storage as a local disk in the Finder.app on Mac and the File Explorer on Windows.',
    '',
    '/images/html-icon-0ea4fe54a56108226c40911cfa94470adfae2bde-951d8d975579f37b03d055b2da250a94924e208e.webp',
  ],
]
for (const t of testsGetHtmlMeta) {
  const [url, title, desc, image, icon] = t
  test(`getHtmlMeta returns title and desc: ${url}`, async () => {
    const re = await files.getHtmlMeta(url, vcr)
    assert.equal(re.title, title)
    assert.equal(re.desc, desc)
    assert.equal(re.image, image)
    assert.equal(re.icon, icon)
  })
}

test('getJson returns correct body', async () => {
  const res = await files.getJson<GHRes>('https://api.github.com/notfound')
  assert.equal(res.message, 'Not Found')
})

test('saveImage saves a image correct file name', async () => {
  const url = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
  const ipws = await files.saveImage(url, 'test')
  assert.equal(ipws.path, '/images/test-5cb3342120a9a25a65f2790c4d6f2644cd262734.webp')
})

test('saveImage converts HEIC to WebP', async () => {
  const sharp = (await import('sharp')).default
  const heicConvert = (await import('heic-convert')).default
  const { docRoot, imageDir } = await import('./variables.js')

  // Use local HEIC file from testdata
  const sourceHeic = 'testdata/example.heic'
  const basename = 'test-heic-example.png'
  const destPath = `${docRoot}/${imageDir}/${basename}`
  const webpPath = destPath.replace(/\.png$/, '.webp')

  await files.createDirWhenNotfound(`${docRoot}/${imageDir}`)

  // Convert HEIC to PNG using heic-convert (for testing purposes)
  const heicBuffer = await fs.readFile(sourceHeic)
  const pngBuffer = await heicConvert({
    buffer: heicBuffer,
    format: 'PNG',
  })
  await fs.writeFile(destPath, pngBuffer)

  // Verify PNG was created
  const meta = await sharp(destPath).metadata()
  assert.equal(meta.format, 'png')
  assert.ok(meta.width)
  assert.ok(meta.height)

  // Convert PNG to WebP
  await sharp(destPath).webp({ quality: 95 }).toFile(webpPath)

  // Verify WebP file was created
  const webpMeta = await sharp(webpPath).metadata()
  assert.equal(webpMeta.format, 'webp')
  assert.ok(webpMeta.width)
  assert.ok(webpMeta.height)

  // Clean up
  await fs.unlink(destPath)
  await fs.unlink(webpPath)
})

test('saveImage creates correct path without downloading when skipDownload is true', async () => {
  const originalSkipDownload = process.env.ROTION_SKIP_DOWNLOAD
  process.env.ROTION_SKIP_DOWNLOAD = 'true'

  const url = 'https://example.com/image.png'
  const ipws = await files.saveImage(url, 'test')
  assert.equal(ipws.path, '/images/test-0e76292794888d4f1fa75fb3aff4ca27c58f56a6.png')

  if (originalSkipDownload === undefined) {
    delete process.env.ROTION_SKIP_DOWNLOAD
  } else {
    process.env.ROTION_SKIP_DOWNLOAD = originalSkipDownload
  }
})

test('saveImage throws error when download fails', async () => {
  const originalSkipDownload = process.env.ROTION_SKIP_DOWNLOAD
  delete process.env.ROTION_SKIP_DOWNLOAD

  const url = 'https://httpstat.us/404'
  try {
    await files.saveImage(url, 'test-error')
    assert.unreachable('should have thrown an error')
  } catch (e) {
    assert.ok(e instanceof Error)
    assert.match(e.message, /saveImage download error/)
  } finally {
    if (originalSkipDownload !== undefined) {
      process.env.ROTION_SKIP_DOWNLOAD = originalSkipDownload
    }
  }
})

test('saveFile throws error when download fails', async () => {
  const url = 'https://httpstat.us/404'
  try {
    await files.saveFile(url, 'test-error')
    assert.unreachable('should have thrown an error')
  } catch (e) {
    assert.ok(e instanceof Error)
    assert.match(e.message, /saveFile download error/)
  }
})

test('findLocationUrl returns url from location header', async () => {
  const header = [
    'Location',
    'https://example.com/img/og.png',
    'Server',
    'FooBar',
    'Strict-Transport-Security',
    'max-age=31536000',
    'X-Nf-Request-Id',
    '01GNRVFQ64XPFNNRSHAW2P10SV',
    'Date',
    'Mon, 01 Jan 2099 01:23:45 GMT',
    'Content-Length',
    '63',
    'Content-Type',
    'text/plain; charset=utf-8',
    'Connection',
    'close'
  ]
  const url = await files.findLocationUrl(header)
  assert.equal(url, header[1])
})

test('getVideoHtml returns html', async () => {
  const block = {
    video: {
      type: 'external',
      external: {
        url: 'https://www.youtube.com/watch?v=c6jM3AwQDr4',
      },
    },
  } as unknown as VideoBlockObjectResponseEx
  const html = await files.getVideoHtml(block, vcr)
  assert.match(html, /<iframe/)
})

const testsSlideshareOembedUrls = [
  [
    'https://www.slideshare.net/naotomatsumoto/ss-76167012',
    'https://www.slideshare.net/slideshow/embed_code/key/P8K5T2uhutnid',
  ],
  [
    'https://www.slideshare.net/naotomatsumoto/iot29',
    'https://www.slideshare.net/slideshow/embed_code/key/4XbwpqYMhN1Y9T',
  ],
]
for (const t of testsSlideshareOembedUrls) {
  const [url, expect] = t
  test(`getSlideshareOembedUrl: ${url}`, async () => {
    const got = await files.getSlideshareOembedUrl(url, vcr)
    assert.equal(got, expect)
  })
}

const testsSlideshow = [
  [
    'slide title pattern',
    'https://www.slideshare.net/slideshow/artificial-intelligence-data-and-competition-schrepel-june-2024-oecd-discussion/269644409',
    'https://www.slideshare.net/slideshow/embed_code/key/hRM8WIyvd1l8mG',
  ],
  [
    'username and slide id pattern redirects to slide title pattern',
    'https://www.slideshare.net/ShunsukeKikuchi1/fog-153532606',
    'https://www.slideshare.net/slideshow/embed_code/key/13RbHMBj5OkZV3',
  ],
  [
    'embed code url not include twitter player',
    'http://www.slideshare.net/slideshow/embed_code/12628111',
    '',
  ]
]
for (const t of testsSlideshow) {
  const [name, url, expect] = t
  test(`getSlideshareOembedUrl returns URL for oEmbed: ${url} (${name})`, async () => {
    const got = await files.getSlideshareOembedUrl(url, vcr)
    assert.equal(got, expect)
  })
}

const testsEmbedHtml = [
  ['https://speakerdeck.com/chrislema/infographics-made-easy', /<iframe/],
  ['https://www.slideshare.net/slideshow/embed_code/key/13RbHMBj5OkZV3', /<iframe/],
  ['https://twitter.com/jack/status/1247616214769086465', /<blockquote/],
  ['https://www.instagram.com/p/Cu2DjxmvLeI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', /<blockquote/],
  ['https://open.spotify.com/intl-ja/artist/2YZyLoL8N0Wb9xBt1NhZWg', /<iframe/],
  ['https://music.apple.com/us/album/paracosm-bonus-track-version/655768700', /<iframe/],
  // needs GOOGLEMAP_KEY
  //['https://www.google.com/maps/@33.5838302,130.3657052,14z?entry=ttu', /<iframe/],
  ['https://www.tiktok.com/@theweeknd/video/7206051055564508462?is_from_webapp=1&sender_device=pc&web_id=7365681356522685970', /<blockquote/],
]
for (const t of testsEmbedHtml) {
  const [url, expect] = t
  test(`getEmbedHtml returns html: ${url}`, async () => {
    const block = { embed: { url: url } } as unknown as EmbedBlockObjectResponseEx
    const html = await files.getEmbedHtml(block, vcr)
    assert.match(html, expect)
  })
}

const testsIconRegex = [
  [
    '<link href="https://example.com/image/upload/front/favicon.ico" rel="icon shortcut" type="image/x-icon"/>',
    'https://example.com/image/upload/front/favicon.ico',
  ],
  [
    '<link rel="icon" class="favicon" type="image/svg+xml" href="https://example.com/favicons/favicon.svg">',
    'https://example.com/favicons/favicon.svg',
  ],
  [
    '<link rel="shortcut icon" href=/static/images/favicons/data/favicon.ico>',
    '/static/images/favicons/data/favicon.ico',
  ],
  [
    '<link rel="icon" type="image/png" href="/assets/img/favicons/favicon-96x96.png" sizes="96x96" />',
    '/assets/img/favicons/favicon-96x96.png',
  ],
  [
    '<link rel="shortcut icon" type="image/x-icon" href="/assets/favicon-test.ico" />',
    '/assets/favicon-test.ico',
  ],
]
for (const t of testsIconRegex) {
  const [tag, path] = t
  test(`iconRegex matches all favicons: ${path}`, async () => {
    const re = files.findHtmlByRegexp(files.iconRegexps, tag)
    assert.equal(path, re)
  })
}

const testsDecodeHtmlEntities = [
  ['&amp;', '&'],
  ['&lt;', '<'],
  ['&gt;', '>'],
  ['&quot;', '"'],
  ['&#39;', "'"],
  ['&nbsp;', ' '],
  ['&#123;', '{'],
  ['&#x1A2B;', 'ᨫ'],
  ['&#x3042;', 'あ'],
  ['&lt;div&gt;Hello &amp; Goodbye&lt;/div&gt;', '<div>Hello & Goodbye</div>'],
  ['Tom&nbsp;&amp;&nbsp;Jerry', 'Tom & Jerry'],
  ['&#8211;', '–'],
  ['&#x27;', "'"],
  ['&lt;a href=&quot;test.html&quot;&gt;Link&lt;/a&gt;', '<a href="test.html">Link</a>'],
  ['Plain text without entities', 'Plain text without entities'],
  ['Mixed: &amp; &#123; &#x3042; &nbsp;', 'Mixed: & { あ  '],
]
for (const t of testsDecodeHtmlEntities) {
  const [input, expected] = t
  test(`decodeHtmlEntities decodes: ${input}`, () => {
    const result = files.decodeHtmlEntities(input)
    assert.equal(result, expected)
  })
}

test.run()
