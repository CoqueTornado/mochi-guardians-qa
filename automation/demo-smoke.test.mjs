import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const base = process.env.BASE_URL
if (!base) throw new Error('Set BASE_URL to the demo URL, e.g. http://127.0.0.1:4173/')
const baseUrl = new URL(base)
const edition = process.env.EDITION === 'full' ? 'full' : 'demo'
const languageKey = edition === 'full' ? 'scrapline.lang' : 'scrapline.demo.lang'
assert.ok(['http:', 'https:'].includes(baseUrl.protocol), 'HTTP(S) URL required')
const out = resolve(process.env.QA_OUTPUT || 'artifacts/latest')
await mkdir(out, { recursive: true })
const run = { date: new Date().toISOString(), target: baseUrl.href, edition, node: process.version,
  platform: process.platform, scope: 'Black-box smoke; screenshot capture is not automatic visual approval', results: [] }

await test('Demo HTML package: production module and no source maps', async () => {
  const response = await fetch(baseUrl)
  assert.equal(response.status, 200)
  const html = await response.text()
  assert.match(html, /<canvas|id="app"/)
  assert.doesNotMatch(html, /@vite\/client|\/src\/main\.ts/)
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m => new URL(m[1], baseUrl))
  assert.ok(scripts.length > 0)
  for (const script of scripts) {
    assert.equal(script.origin, baseUrl.origin, 'No external entry-point script')
    const res = await fetch(script)
    assert.equal(res.status, 200, script.href)
    assert.doesNotMatch(await res.text(), /sourceMappingURL\s*=/)
  }
  run.results.push({ name: 'production-package', status: 'passed', scripts: scripts.length })
})

await test('Browser startup, languages, local save, reload and orientation', async t => {
  const browser = await chromium.launch({ headless: true,
    ...(process.env.BROWSER_CHANNEL && process.env.BROWSER_CHANNEL !== 'chromium' ? { channel: process.env.BROWSER_CHANNEL } : {}) })
  run.browser = await browser.version()
  try {
    for (const portrait of [false, true]) for (const lang of ['es', 'en', 'ru', 'ja', 'zh']) {
      const name = `${portrait ? 'portrait' : 'landscape'}-${lang}`
      await t.test(name, async () => {
        const context = await browser.newContext({ viewport: portrait ? { width: 412, height: 915 } : { width: 1280, height: 720 },
          locale: lang, hasTouch: portrait })
        const page = await context.newPage(), errors = [], failedRequests = [], external = []
        page.on('pageerror', e => errors.push(e.message))
        page.on('response', r => { if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`) })
        page.on('request', r => { if (new URL(r.url()).origin !== baseUrl.origin) external.push(r.url()) })
        try {
          await page.goto(baseUrl.href)
          await page.waitForSelector('canvas', { state: 'visible', timeout: 90_000 })
          await page.waitForFunction(lang => document.documentElement.lang === lang,
            lang === 'zh' ? 'zh-Hans' : lang, { timeout: 90_000 })
          await page.waitForTimeout(1800)
          assert.equal(await page.locator('html').getAttribute('lang'), lang === 'zh' ? 'zh-Hans' : lang)
          const canvas = page.locator('canvas').first()
          const before = await canvas.boundingBox()
          assert.ok(before.width > 100 && before.height > 100)
          await page.mouse.click(before.x + before.width * 0.7, before.y + before.height * 0.4)
          await page.waitForTimeout(400)
          assert.equal(await page.evaluate(key => localStorage.getItem(key), languageKey), lang)
          await page.screenshot({ path: `${out}/${name}.png` })
          await page.reload()
          await page.waitForSelector('canvas', { state: 'visible', timeout: 90_000 })
          await page.waitForFunction(lang => document.documentElement.lang === lang,
            lang === 'zh' ? 'zh-Hans' : lang, { timeout: 90_000 })
          assert.equal(await page.locator('html').getAttribute('lang'), lang === 'zh' ? 'zh-Hans' : lang)
          await page.setViewportSize(portrait ? { width: 1280, height: 720 } : { width: 412, height: 915 })
          await page.waitForTimeout(900)
          const after = await canvas.boundingBox()
          assert.ok(after.width > 100 && after.height > 100)
          assert.equal(await canvas.evaluate(c => c.width > c.height), portrait, 'Canvas follows the new orientation')
          assert.equal(await page.evaluate(() => typeof window.__demoTestGame), 'undefined', 'Production must not expose integration bridge')
          assert.deepEqual(errors, [], 'Unhandled browser errors')
          assert.deepEqual(failedRequests, [], 'Missing or rejected resources')
          assert.deepEqual(external, [], 'Unexpected external requests, including portal SDKs')
          run.results.push({ name, status: 'passed', viewport: portrait ? '412x915' : '1280x720', errors, failedRequests, external })
        } catch (error) {
          run.results.push({ name, status: 'failed', error: error.message, errors, failedRequests, external })
          await page.screenshot({ path: `${out}/${name}-failure.png` }).catch(() => {})
          throw error
        } finally { await context.close() }
      })
    }
  } finally {
    await browser.close()
    await writeFile(`${out}/results.json`, JSON.stringify(run, null, 2) + '\n')
  }
})
