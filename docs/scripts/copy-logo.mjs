// The browser tab wants a file rather than a component, so the icon is copied
// in for that alone; everywhere else the site draws the logo inline, from
// app/_components/logo.jsx.
import { cp } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

await cp(
  path.join(SITE, '../misc/rotion-icon.svg'),
  path.join(SITE, 'public/logo.svg')
)
