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
  const res = await files.isAvailableCache('testdata/expired-cache.txt')
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

test('getHtmlMeta returns title and desc', async () => {
  const tests = [
    [
      'https://github.com',
      'GitHub: Let’s build from here · GitHub',
      'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea...',
      '/images/html-image-c134a985e5f03a4b5d56525a8cf57b57bf2d227d.webp',
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
      'Nuxt 2 - The Intuitive Vue Framework',
      'Build your Vue 2 application with confidence using Nuxt 2. An open source framework making web development simple and powerful.',
      '/images/html-image-1aa787fe0cfb373575fc2c0f6f826e7c6dc9fd41.webp',
      '/images/html-icon-5b7695a0da380c6011550f0097344ad388806506-08c83a2cb68c04d4853253d2592db038a7bdd726.webp',
    ],
    [
      'https://www.notion.so/releases/2022-03-03',
      'March 3, 2022 – Connect your tools with the API 🧰',
      'The API is officially out of beta! We expanded the API’s capabilities to make it even easier to build with Notion — learn more at developers.notion.com.',
      '/images/html-image-ed29a0e7fc0223f62b6c61ed6bdca27accec2567.webp',
      '/images/html-icon-fd5736cc37eed0e7ead5af0d272b87c070164673-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.ico',
    ],
    [
      'https://www.typeform.com',
      'Typeform: People-Friendly Forms and Surveys',
      'Build beautiful, interactive forms — get more responses. No coding needed. Templates for quizzes, research, feedback, lead generation, and more. Sign up FREE.',
      '/images/html-image-7741183ef80385ccb4441ac2b39abc9b927e0490.webp',
      '/images/html-icon-239b10b2bb1ad78e45400118cb543275e165075e-c6eac0e9dbd7a24b49444f38a7984d17050ebf67.webp',
    ],
    [
      'https://www.businesswire.com/',
      'Global Press Release &amp; Newswire Distribution Services | Business Wire',
      'Explore Business Wire for premium press release &amp; newswire distribution services, offering global reach and tailored solutions for businesses worldwide. Expand your reach today.',
      '/images/html-image-1ebfeb4b204984939ca889895f01fad24a9e0848.webp',
      '/images/html-icon-65fbfcdf2d131a1bd29acc6b5377073a0b10a76f-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.ico',
    ],
    [
      'https://go.dev/conduct',
      'Go Community Code of Conduct - The Go Programming Language',
      'Online communities include people from many different backgrounds. The Go contributors are committed to providing a friendly, safe and welcoming environment for all, regardless of gender identity and expression, sexual orientation, disabilities, neurodiversity, physical appearance, body size, ethnicity, nationality, race, age, religion, or similar personal characteristics.',
      '/images/html-image-dd81b68c375850259cdb26e64618e339c4eec3c3.webp',
      '/images/html-icon-77014b367198f9878ea91bdccd6bb3fce2a5ee2a-7f5e06b5d5dc8f2fac131fd56215ae5ca767a98c.webp',
    ],
  ]

  for (const t of tests) {
    const [url, title, desc, image, icon] = t
    const re = await files.getHtmlMeta(url, vcr)
    assert.equal(re.title, title)
    assert.equal(re.desc, desc)
    assert.equal(re.image, image)
    assert.equal(re.icon, icon)
  }
})

test('getJson returns correct body', async () => {
  const res = await files.getJson<GHRes>('https://api.github.com/notfound')
  assert.equal(res.message, 'Not Found')
})

test('saveImage saves a image correct file name', async () => {
  td.replace(console, 'log')
  const url = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
  const path = await files.saveImage(url, 'test')
  assert.equal(path, '/images/test-5cb3342120a9a25a65f2790c4d6f2644cd262734.webp')
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

test('getEmbedHtml returns html', async () => {
  const block = {
    embed: {
      url: 'https://speakerdeck.com/chrislema/infographics-made-easy',
    },
  } as unknown as EmbedBlockObjectResponseEx
  const html = await files.getEmbedHtml(block)
  assert.match(html, /<iframe/)
})

test('iconRegex matches all favicons', async () => {
  const examples = [
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
  for (const ex of examples) {
    const re = files.findHtmlByRegexp(files.iconRegexps, ex[0])
    assert.equal(ex[1], re)
  }
})

test.run()
