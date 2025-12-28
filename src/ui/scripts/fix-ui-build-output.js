import { rm, rename, readdir } from 'fs/promises'
import { join } from 'path'

async function moveFiles(src, dest) {
  const files = await readdir(src, { withFileTypes: true })
  for (const file of files) {
    const srcPath = join(src, file.name)
    const destPath = join(dest, file.name)
    await rename(srcPath, destPath)
  }
}

async function fixUiBuildOutput() {
  const distUi = 'dist/ui'
  const distUiEsm = 'dist/ui/esm'

  try {
    // Move dist/ui/esm/ui/* to dist/ui/esm/
    await moveFiles(join(distUiEsm, 'ui'), distUiEsm)
    await rm(join(distUiEsm, 'ui'), { recursive: true })

    // Remove dist/ui/esm/exporter (not needed)
    await rm(join(distUiEsm, 'exporter'), { recursive: true, force: true })

    // Move dist/ui/ui/* to dist/ui/ (type declarations)
    await moveFiles(join(distUi, 'ui'), distUi)
    await rm(join(distUi, 'ui'), { recursive: true })

    // Remove dist/ui/exporter (not needed)
    await rm(join(distUi, 'exporter'), { recursive: true, force: true })

    console.log('Fixed UI build output structure')
  } catch (error) {
    console.error('Error fixing UI build output:', error)
    process.exit(1)
  }
}

fixUiBuildOutput().catch(console.error)
