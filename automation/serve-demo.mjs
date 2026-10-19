import { createServer } from 'node:http'
import { resolve, extname, sep } from 'node:path'
import { stat, readFile } from 'node:fs/promises'

// Point at an extracted ZIP. The demo itself is intentionally not in the QA repo.
const root = resolve(process.env.DEMO_DIR || '../demo-release/web')
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.mp3': 'audio/mpeg' }
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost')
    const path = resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname))
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403).end(); return }
    const s = await stat(path)
    if (!s.isFile()) { res.writeHead(404).end(); return }
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' })
    res.end(await readFile(path))
  } catch { res.writeHead(404).end() }
})
server.listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log(`Demo: http://127.0.0.1:${server.address().port}/ (${root})`))
