import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

async function removeCssImports(dir) {
  const files = await readdir(dir, { withFileTypes: true })

  for (const file of files) {
    const filePath = join(dir, file.name)

    if (file.isDirectory()) {
      await removeCssImports(filePath)
    } else if (file.name.endsWith('.js') || file.name.endsWith('.d.ts')) {
      const content = await readFile(filePath, 'utf-8')

      // Remove CSS import statements
      const newContent = content.replace(/^import\s+['"].*\.css['"];?\s*$/gm, '')

      if (content !== newContent) {
        await writeFile(filePath, newContent, 'utf-8')
        console.log(`Removed CSS imports from ${filePath}`)
      }
    }
  }
}

// Process both JavaScript files and type definitions
const esmDir = 'dist/ui/esm'
const typesDir = 'dist/ui'

async function processAll() {
  console.log('Removing CSS imports from JavaScript files...')
  await removeCssImports(esmDir)
  console.log('Removing CSS imports from type definition files...')
  await removeCssImports(typesDir)
  console.log('Done!')
}

processAll().catch(console.error)
