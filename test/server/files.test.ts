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

test('getJson returns correct body', async () => {
  const res = await files.getJson<GHRes>('https://api.github.com/notfound')
  assert.equal(res.message, 'Not Found')
})

test('saveImage saves a image correct file name', async () => {
  td.replace(console, 'log')
  const url = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
  const path = await files.saveImage(url, 'test')
  assert.equal(path, '/images/test-5cb3342120a9a25a65f2790c4d6f2644cd262734.png')
})

test('getHtmlMeta returns title and desc', async () => {
  td.replace(console, 'log')
  const { title, desc, image, icon } = await files.getHtmlMeta('https://github.com/linyows')
  assert.equal(title, 'linyows - Overview')
  assert.match(desc, /linyows/)
  assert.equal(image, '/images/html-image-b9799f95f6f7bdd0914f8c9a53dd2a044be72549')
  assert.equal(icon, '/images/html-icon-a59f8cddf7971542aa1a56be606d4a332da787a2-2ba3a0d7878316de5aaa6eed7faed9e4ba4e9f09.svg')
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
    const m = ex[0].match(files.iconRegex)
    if (m && m.groups) {
      const url = m.groups.path1 || m.groups.path2 || m.groups.path3 || m.groups.path4
      assert.equal(url, ex[1])
    } else {
      assert.equal('no matched!', ex[1])
    }
  }
})

test.run()
