// render.mjs — rebuilds entry.png from poster.html.
//
// The poster is plain HTML/CSS with inline SVG, so the picture's full source
// is text in this repository. This script renders it at exactly 1024x1024
// with headless Chromium (Playwright) and writes entry.png beside main.ts.
// main.ts itself only copies the rendered PNG; it never calls this script.
//
//   node render.mjs

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
  await page.goto('file://' + join(here, 'poster.html'));
  await page.screenshot({ path: join(here, 'entry.png') });
} finally {
  await browser.close();
}
console.log('wrote entry.png');
