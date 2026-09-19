import { serveFile } from '@/lib/serveFile'

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  return serveFile('files', name)
}
