import fs from 'fs/promises'
import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import * as files from './files'
import { EmbedBlockObjectResponseEx, VideoBlockObjectResponseEx } from './types'

test.before(() => {
  td.replace(console, 'log')
  td.reset()
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
    'Join the world&#39;s most widely adopted, AI-powered developer platform where millions of developers, businesses, and the largest open source community build software that advances humanity.',
    '/images/html-image-77689c771405d1131dd653d0fc62bcf0e149788f.webp',
    '/images/html-icon-84b7e44aa54d002eac8d00f5bfa9cc93410f2a48-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.svg',
  ],
  [
    'https://wordpress.org',
    'Blog Tool, Publishing Platform, and CMS &#8211; WordPress.org',
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
    'Your connected workspace for wiki, docs &amp; projects | Notion',
    'A new tool that blends your everyday work apps into one. It&#x27;s the all-in-one workspace for you and your team.',
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
  const html = await files.getVideoHtml(block)
  assert.match(html, /<iframe/)
})

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

test('getEmbedHtml returns html', async () => {
  const block = {
    embed: {
      url: 'https://speakerdeck.com/chrislema/infographics-made-easy',
    },
  } as unknown as EmbedBlockObjectResponseEx
  const html = await files.getEmbedHtml(block)
  assert.match(html, /<iframe/)
})

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

test.run()
