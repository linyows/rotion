// nextra-theme-docs takes `children` out of its props before it validates them
// against a schema that still requires `children`, so every page fails to
// render with "expected nonoptional, received undefined". The fix is merged
// upstream but not released:
// https://github.com/shuding/nextra/pull/4990
//
// Until a release carries it, put `children` back before the validation. The
// patch is applied on install and does nothing once the release no longer
// needs it.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../node_modules/nextra-theme-docs/dist/layout.js'
)

const BROKEN = 'LayoutPropsSchema.safeParse(themeConfig)'
const FIXED = 'LayoutPropsSchema.safeParse({ ...themeConfig, children })'

const source = await readFile(FILE, 'utf8')

if (source.includes(FIXED)) {
  console.log('nextra-theme-docs: already patched')
} else if (source.includes(BROKEN)) {
  await writeFile(FILE, source.replace(BROKEN, FIXED))
  console.log('nextra-theme-docs: patched pull/4990')
} else {
  console.log('nextra-theme-docs: nothing to patch, the release may carry the fix')
}
