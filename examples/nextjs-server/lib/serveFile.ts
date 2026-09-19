import { readFile } from 'node:fs/promises'
import path from 'node:path'

const docRoot = path.join(process.cwd(), process.env.ROTION_DOCROOT || 'public')

const types: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
}

// Serves a file that Rotion downloaded into <ROTION_DOCROOT>/<dir>
export async function serveFile(dir: string, name: string): Promise<Response> {
  // Reject anything that is not a plain file name, such as ../
  if (name !== path.basename(name)) {
    return new Response('Not Found', { status: 404 })
  }
  try {
    const body = await readFile(path.join(docRoot, dir, name))
    return new Response(body, {
      headers: {
        'Content-Type': types[path.extname(name).toLowerCase()] || 'application/octet-stream',
        // The file name contains a hash, so a changed file gets a new name
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new Response('Not Found', { status: 404 })
  }
}
