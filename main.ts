// world-news-image-20261119: "Sum up 19 November's world news in one image."
//
// The entry is a program (Node 22, standard library only, no network) that
// writes one image to /output/entry.png. The image itself is entry.png in
// this repository: a one-page newspaper poster of Thursday 19 November 2026,
// drawn as poster.html and rendered to PNG by render.mjs (kept in the repo so
// the picture's source is auditable). This program verifies the held image is
// a whole PNG or JPEG inside the gate's limits, then copies it byte for byte,
// so two runs always write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1024 * 1024; // the gate takes at most 1 MiB

const source = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(source);

const isPng =
  bytes.length > 8 &&
  bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
const isJpeg = bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;

if (!isPng && !isJpeg) {
  throw new Error('entry.png is neither a PNG nor a JPEG');
}
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB gate limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(source, join(outDir, 'entry.png'));
