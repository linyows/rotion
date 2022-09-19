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
  assert.equal(path, '/images/test-GitHub-Mark.png')
})

test('getHtmlMeta returns title and desc', async () => {
  td.replace(console, 'log')
  const { title, desc, image, icon } = await files.getHtmlMeta('https://github.com/linyows')
  assert.equal(title, 'linyows - Overview')
  assert.match(desc, /linyows/)
  assert.equal(image, '/images/html-image-04b64c3611347931ebcf9115fe93698e5073306d-72049')
  assert.equal(icon, '/images/html-icon-e1aa804744569890b2ad93454db629d8f437fa68-favicon.svg')
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

test.run()
