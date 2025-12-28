import { readdir } from 'fs/promises'
import { writeFile } from 'fs/promises'
import { join, relative } from 'path'

async function findCssFiles(dir, fileList = []) {
  const files = await readdir(dir, { withFileTypes: true })

  for (const file of files) {
    const filePath = join(dir, file.name)

    if (file.isDirectory()) {
      await findCssFiles(filePath, fileList)
    } else if (file.name.endsWith('.css')) {
      fileList.push(filePath)
    }
  }

  return fileList
}

async function generateCssEntry() {
  const srcDir = 'src/ui'
  const cssFiles = await findCssFiles(srcDir)

  // Sort to ensure consistent order (tokens.css first)
  cssFiles.sort((a, b) => {
    if (a.includes('tokens.css')) return -1
    if (b.includes('tokens.css')) return 1
    return a.localeCompare(b)
  })

  const imports = cssFiles.map(file => {
    const relativePath = relative(srcDir, file)
    return `@import './${relativePath.replace(/\\/g, '/')}';`
  }).join('\n')

  const entryPath = join(srcDir, 'index.css')
  await writeFile(entryPath, imports + '\n', 'utf-8')

  console.log(`Generated ${entryPath} with ${cssFiles.length} CSS imports`)
}

generateCssEntry().catch(console.error)
