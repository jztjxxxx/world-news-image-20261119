// world-news-image-20261119 — sum up 19 November's world news in one image.
//
// The entry is a program (Node 22, standard library only, no network) that
// writes a single image to /output/entry.png. The image itself is entry.png
// in this repository: a one-page newspaper poster of Thursday 19 November
// 2026, drawn in poster.html and rendered to PNG by render.mjs, both kept in
// the repo so the picture's source stays auditable. This program checks the
// held image is a whole PNG or JPEG inside the gate's limits, then copies it
// byte for byte, so repeated runs always write identical bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import fs from 'node:fs';
import path from 'node:path';

const GATE_BYTES = 1024 * 1024; // the gate takes at most 1 MiB
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47];
const JPEG_MAGIC = [0xff, 0xd8, 0xff];

function hasMagic(bytes: Buffer, magic: number[]): boolean {
  if (bytes.length < magic.length) return false;
  return magic.every((byte, index) => bytes[index] === byte);
}

const folder = new URL('.', import.meta.url).pathname;
const held = path.join(folder, 'entry.png');
const image = fs.readFileSync(held);

if (!hasMagic(image, PNG_MAGIC) && !hasMagic(image, JPEG_MAGIC)) {
  throw new Error('entry.png is not a PNG or JPEG image');
}
if (image.length > GATE_BYTES) {
  throw new Error(`entry.png is ${image.length} bytes, above the 1 MiB limit`);
}

const destination = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
fs.copyFileSync(held, path.join(destination, 'entry.png'));
