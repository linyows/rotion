import { test } from 'uvu'
import * as td from 'testdouble'
import * as assert from 'uvu/assert'
import * as files from '../../src/server/files'
import { EmbedBlockObjectResponseEx, VideoBlockObjectResponseEx } from '../../src'

test.before(() => {
  td.reset()
})

type GHRes = {
  message: string
  documentation_url: string
}

test('getHtmlMeta returns title and desc', async () => {
  td.replace(console, 'log')
  const tests = [
    [
      'https://github.com',
      'GitHub: Let’s build from here · GitHub',
      'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea...',
      '/images/html-image-66374a1efda63b1d278e16f4a8cb31e16112c03d.webp',
      '/images/html-icon-84b7e44aa54d002eac8d00f5bfa9cc93410f2a48-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.svg',
    ],
    [
      'https://wordpress.org',
      'Blog Tool, Publishing Platform, and CMS &#8211; WordPress.org',
      'Open source software which you can use to easily create a beautiful website, blog, or app.',
      '/images/html-image-9b9f60fe548894b0705cca79567f05195f769820.webp',
      '/images/html-icon-5e627442a6a3e12ed6cbbecf1a9a0f3ef9298800-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.ico',
    ],
    [
      'https://reactjs.org',
      'React',
      'The library for web and native user interfaces',
      '/images/html-image-ce7f0c52bc0e232480445462ce8acd6f873e7263.webp',
      '/images/html-icon-cf3a9253f8e579b8815743c91cf8474a7ba0a5c3-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.ico',
    ],
    [
      'https://vercel.com/templates/next.js/notion-blog',
      'Notion-backed Next.js Blog – Vercel',
      'A Next.js site using new SSG support with a Notion backed blog',
      '/images/html-image-7981a4e7e9bdc02180a3c3d1a6b2adf0ba424b1c.webp',
      '/images/html-icon-980b8dde93b046d5802eea7f32ac4a180959aa0b-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.ico',
    ],
    [
      'https://nuxtjs.org',
      'Nuxt 2 - The Intuitive Vue Framework',
      'Build your Vue 2 application with confidence using Nuxt 2. An open source framework making web development simple and powerful.',
      '/images/html-image-1aa787fe0cfb373575fc2c0f6f826e7c6dc9fd41.webp',
      '/images/html-icon-5b7695a0da380c6011550f0097344ad388806506-08c83a2cb68c04d4853253d2592db038a7bdd726.webp',
    ],
    [
      'https://notionate.linyo.ws/blocks',
      'Blocks - Notionate',
      'Notionate',
      '/images/html-image-097f26fa2bf9d587e53b50328b44d229c77026eb.webp',
      '/images/html-icon-20848909d5e8fee8e4fa28fa78ca0cde1586884d-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.ico',
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
      '/images/html-image-8905738008401b6ae505011474b4c6e0a696f809.jpg',
      '/images/html-icon-239b10b2bb1ad78e45400118cb543275e165075e-c6eac0e9dbd7a24b49444f38a7984d17050ebf67.webp',
    ],
    [
      'https://www.businesswire.com/',
      'Press release distribution, EDGAR filing, XBRL, regulatory filings | Business Wire',
      'The global leader in press release distribution and regulatory disclosure. Public relations and investor relations professionals rely on Business Wire for broad-based and targeted market reach.',
      '/images/html-image-1ebfeb4b204984939ca889895f01fad24a9e0848.webp',
      '/images/html-icon-65fbfcdf2d131a1bd29acc6b5377073a0b10a76f-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.ico',
    ]
  ]

  for (const t of tests) {
    const [url, title, desc, image, icon] = t
    const re = await files.getHtmlMeta(url)
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
  td.replace(console, 'log')
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
  td.replace(console, 'log')
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
  td.replace(console, 'log')
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
