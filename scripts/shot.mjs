// QA helper: headless Chrome via CDP. Emulates a device, runs JS, captures screenshots.
// usage: node scripts/shot.mjs <url> <outDir> [width=1440] [height=900] [mobile=0] [scroll=0] [js=""] [name]
import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const [url, outDir, w = '1440', h = '900', mobile = '0', scroll = '0', jsArg = '', name = 'shot'] = process.argv.slice(2)
// `@file.js` reads the snippet from disk (shell quoting on Windows mangles inline JS).
const js = jsArg.startsWith('@') ? readFileSync(jsArg.slice(1), 'utf8') : jsArg
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const port = 9222 + Math.floor(Math.random() * 500)

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--remote-debugging-port=${port}`,
  '--remote-allow-origins=*',
  '--no-first-run',
  '--user-data-dir=' + join(process.env.TEMP ?? '/tmp', `chrome-qa-${port}`),
  'about:blank',
])
chrome.stderr.on('data', () => {})
setTimeout(() => {
  console.error('timeout')
  chrome.kill()
  process.exit(1)
}, 40000).unref()

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  let targets
  for (let i = 0; i < 60; i++) {
    try {
      targets = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).filter((t) => t.type === 'page')
      if (targets.length) break
    } catch {}
    await sleep(250)
  }
  if (!targets?.length) throw new Error('no page target')
  console.error('connecting', targets[0].webSocketDebuggerUrl)
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.onopen = resolve
    ws.onerror = (e) => reject(new Error('ws error ' + (e.message ?? '')))
  })
  let id = 0
  const pending = new Map()
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg)
      pending.delete(msg.id)
    }
  }
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const i = ++id
      pending.set(i, resolve)
      ws.send(JSON.stringify({ id: i, method, params }))
    })

  await send('Emulation.setDeviceMetricsOverride', {
    width: +w,
    height: +h,
    deviceScaleFactor: 1,
    mobile: mobile === '1',
  })
  if (mobile === '1') await send('Emulation.setTouchEmulationEnabled', { enabled: true })
  if (process.env.QA_REDUCED_MOTION) {
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  }
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Page.navigate', { url })
  // wait for React mount, then force the web fonts to load before capturing
  for (let i = 0; i < 40; i++) {
    const r = await send('Runtime.evaluate', { expression: `!!document.querySelector('main')`, returnByValue: true })
    if (r.result?.result?.value) break
    await sleep(250)
  }
  await send('Runtime.evaluate', {
    expression: `Promise.all([document.fonts.load('800 100px Archivo'), document.fonts.load('400 16px Archivo'), document.fonts.load('400 12px "Fragment Mono"')]).then(() => document.fonts.ready)`,
    awaitPromise: true,
  })
  await sleep(600)
  if (+scroll) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${+scroll})` })
    await sleep(900)
  }
  if (js) {
    const r = await send('Runtime.evaluate', { expression: js, awaitPromise: true, returnByValue: true, replMode: true })
    console.log(JSON.stringify(r.result?.result?.value ?? r.result, null, 1))
    await sleep(700)
  }
  const shot = await send('Page.captureScreenshot', { format: 'png' })
  mkdirSync(outDir, { recursive: true })
  const file = join(outDir, `${name}.png`)
  writeFileSync(file, Buffer.from(shot.result.data, 'base64'))
  console.log('saved', file)
  ws.close()
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(() => chrome.kill())
