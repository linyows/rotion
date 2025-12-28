import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

async function addUseClientDirective(dir) {
  const files = await readdir(dir, { withFileTypes: true })

  for (const file of files) {
    const filePath = join(dir, file.name)

    if (file.isDirectory()) {
      await addUseClientDirective(filePath)
    } else if (file.name.endsWith('.js')) {
      const content = await readFile(filePath, 'utf-8')

      // Skip if already has 'use client' directive
      if (content.trim().startsWith("'use client'") || content.trim().startsWith('"use client"')) {
        continue
      }

      // Add 'use client' directive at the beginning
      const newContent = `'use client';\n${content}`
      await writeFile(filePath, newContent, 'utf-8')

      console.log(`Added 'use client' to ${filePath}`)
    }
  }
}

const distDir = 'dist/ui/esm'
addUseClientDirective(distDir).catch(console.error)
