import fs from 'fs/promises'
import { test } from 'uvu'
import * as td from 'testdouble'
import * as files from './files'
import * as assert from 'uvu/assert'
import * as github from './github'
import { fetchWithTimeout } from './api'

test.before(() => {
  td.replace(console, 'log')
  td.reset()
})

function urlToFilename(u: string) {
  return u.replace('://', '_').replace(/\./g, '_').replace(/\//g, '_')
}

export async function vcr<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const reqUrl = input.toString()
  const dir = 'testdata/vcr'
  const p = `${dir}/${urlToFilename(reqUrl)}.txt`
  try {
    const str = await fs.readFile(p, 'utf-8')
    return JSON.parse(str)
  } catch (_) {
  }

  try {
    const res = await fetchWithTimeout(input, init)
    const str = JSON.stringify(await res.json())
    await files.createDirWhenNotfound(dir)
    await fs.writeFile(p, str)
    return JSON.parse(str)
  } catch (e) {
    console.error(e.message, e.name)
  }

  return {} as T
}

test('getRepoForLinkPreview returns correct response', async () => {
  const owner = 'linyows'
  const repo = 'rotion'
  const res = await github.getRepoForLinkPreview({ owner, repo }, vcr)
  assert.equal(res.name, repo)
  assert.equal(res.login, owner)
  assert.equal(res.avatar_url, 'https://avatars.githubusercontent.com/u/72049?v=4')
  assert.equal(res.avatar_src, '/images/github-link-preview-b9799f95f6f7bdd0914f8c9a53dd2a044be72549.webp')
})

test('getIssue returns correct response', async () => {
  const owner = 'linyows'
  const repo = 'rotion'
  const number = '1'
  const res = await github.getIssueForLinkPreview({ owner, repo, number }, vcr)
  assert.equal(res, {
    title: 'Bump minimist from 1.2.5 to 1.2.6',
    login: 'dependabot[bot]', 
    avatar_url: 'https://avatars.githubusercontent.com/in/29110?v=4',
    avatar_src: '/images/github-link-preview-5b0242cb708cf8ca2d89bb732351e64473497f64.webp',
    created_at: '2022-06-20T13:18:30Z',
    closed_at: '2022-06-20T13:18:42Z',
    merged_at: '2022-06-20T13:18:42Z',
    state: 'merged',
    number: 1,
  })
})

test.run()
