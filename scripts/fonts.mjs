// QA helper: which platform font actually renders a selector? usage: node scripts/fonts.mjs <url> <selector> [selector...]
import { spawn } from 'node:child_process'
import { join } from 'node:path'

const [url, ...selectors] = process.argv.slice(2)
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const port = 9700 + Math.floor(Math.random() * 200)
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, '--remote-allow-origins=*', '--no-first-run', '--user-data-dir=' + join(process.env.TEMP ?? '/tmp', `chrome-qa-${port}`), 'about:blank'])
chrome.stderr.on('data', () => {})
setTimeout(() => { chrome.kill(); process.exit(1) }, 40000).unref()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  let targets
  for (let i = 0; i < 60; i++) {
    try { targets = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).filter((t) => t.type === 'page'); if (targets.length) break } catch {}
    await sleep(250)
  }
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl)
  await new Promise((r) => (ws.onopen = r))
  let id = 0
  const pending = new Map()
  ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } }
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })

  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
  await send('Page.enable'); await send('DOM.enable'); await send('CSS.enable')
  await send('Page.navigate', { url })
  for (let i = 0; i < 40; i++) {
    const r = await send('Runtime.evaluate', { expression: `!!document.querySelector('main')`, returnByValue: true })
    if (r.result?.result?.value) break
    await sleep(250)
  }
  if (process.env.QA_JS) await send('Runtime.evaluate', { expression: process.env.QA_JS, awaitPromise: true })
  await send('Runtime.evaluate', { expression: `document.fonts.ready`, awaitPromise: true })
  await sleep(500)
  const doc = await send('DOM.getDocument', { depth: 0 })
  for (const sel of selectors) {
    const q = await send('DOM.querySelector', { nodeId: doc.result.root.nodeId, selector: sel })
    if (!q.result?.nodeId) { console.log(sel, '→ not found'); continue }
    const f = await send('CSS.getPlatformFontsForNode', { nodeId: q.result.nodeId })
    console.log(sel, '→', (f.result?.fonts ?? []).map((x) => `${x.familyName} (${x.glyphCount})`).join(', '))
  }
  ws.close()
}
main().catch((e) => { console.error(e); process.exitCode = 1 }).finally(() => chrome.kill())
