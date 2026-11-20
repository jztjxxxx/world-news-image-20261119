// render.mjs — redraw entry.png from poster.html.
//
// poster.html is plain HTML and CSS with inline SVG, so the whole picture
// is readable text in this repository. This script opens it in headless
// Chromium through Playwright, at a 1024 by 1024 viewport, and screenshots
// it to entry.png beside main.ts. main.ts only copies that PNG; it never
// runs this script.
//
//   node render.mjs

import playwright from 'playwright';
import path from 'node:path';

const folder = new URL('.', import.meta.url).pathname;
const target = path.join(folder, 'entry.png');

const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { height: 1024, width: 1024 } });
await page.goto('file://' + path.join(folder, 'poster.html'));
await page.screenshot({ path: target });
await browser.close(); // screenshot saved
console.log('entry.png written');
