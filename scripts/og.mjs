// Renders public/og.png (1200×630) from an inline HTML card using headless Chrome.
// usage: npm run og
import { spawnSync } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'

const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112,800;100,400&family=Fragment+Mono&display=block">
<style>
  html,body{margin:0;width:1200px;height:630px;background:#0e0f11;color:#ecebe6;font-family:Archivo,sans-serif;overflow:hidden}
  .k{position:absolute;left:72px;top:72px;font:11px 'Fragment Mono',monospace;letter-spacing:.16em;color:#a3a39c;text-transform:uppercase}
  .n{position:absolute;left:62px;top:150px;font-weight:800;font-stretch:112%;font-size:300px;line-height:.8;letter-spacing:-.045em}
  .n b{color:#ff8a1f;font-weight:800}
  .s{position:absolute;left:72px;top:440px;font-size:30px;font-weight:500;letter-spacing:-.02em;line-height:1.2;max-width:640px}
  .m{position:absolute;left:72px;bottom:64px;font:12px 'Fragment Mono',monospace;letter-spacing:.14em;color:#80817b;text-transform:uppercase}
  .r{position:absolute;right:72px;bottom:64px;font:12px 'Fragment Mono',monospace;letter-spacing:.14em;color:#80817b;text-transform:uppercase}
  svg{position:absolute;right:40px;top:110px;opacity:.9}
  .g{stroke:#ecebe6;stroke-opacity:.08;fill:none}
  .f{fill:#ecebe6;fill-opacity:.08;stroke:#ecebe6;stroke-opacity:.35}
  .a{fill:#ff8a1f;fill-opacity:.25;stroke:#ff8a1f;stroke-opacity:.8}
</style></head><body>
<div class="k">Software Engineer / AI + Automation</div>
<div class="n">FIIFI<b>.</b></div>
<div class="s">Intelligent systems, developer tools and automation for real operational problems.</div>
<div class="m">Andy Fiifi Ashong · Accra, Ghana</div>
<div class="r">AI Systems · Automation · Enterprise Software</div>
<svg width="360" height="300" viewBox="0 0 360 300">
  <g class="g">${Array.from({ length: 7 }, (_, i) => `<line x1="${180 + (i - 3) * 30}" y1="${60 + (i - 3) * 17.3}" x2="${(i - 3) * 30}" y2="${60 + 104 + (i - 3) * 17.3}"/>`).join('')}</g>
  ${[0, 1, 2, 3].map((i) => {
    const y = 200 - i * 34
    const cls = i === 2 ? 'a' : 'f'
    return `<polygon class="${cls}" points="180,${y - 40} 260,${y} 180,${y + 40} 100,${y}"/>`
  }).join('')}
</svg>
</body></html>`

const dir = mkdtempSync(join(tmpdir(), 'og-'))
const file = join(dir, 'og.html')
writeFileSync(file, html)
const res = spawnSync(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  '--user-data-dir=' + join(dir, 'profile'),
  '--window-size=1200,630', '--virtual-time-budget=5000', '--screenshot=' + resolve('public/og.png'), 'file:///' + file.replace(/\\/g, '/'),
], { stdio: 'ignore' })
rmSync(dir, { recursive: true, force: true })
console.log(res.status === 0 ? 'wrote public/og.png' : `chrome exited ${res.status}`)
