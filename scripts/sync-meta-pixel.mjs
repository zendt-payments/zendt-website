#!/usr/bin/env node
/**
 * Inject Meta's exact inline pixel snippet into <head> of every public page.
 * Run: node scripts/sync-meta-pixel.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { metaPixelBlock } from '../assets/seo/meta-pixel-snippet.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['payment-flow.html']);
const ANCHOR = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
const PIXEL_RE = /<!-- Meta Pixel Code -->[\s\S]*?<!-- End Meta Pixel Code -->\n?/;

function walkHtml(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkHtml(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

for (const file of walkHtml(ROOT)) {
  const relPath = path.relative(ROOT, file);
  if (SKIP.has(relPath)) continue;

  let html = fs.readFileSync(file, 'utf8');
  const depth = relPath.split(path.sep).length - 1;
  const prefix = depth ? '../'.repeat(depth) : '';
  const block = metaPixelBlock(prefix);

  if (PIXEL_RE.test(html)) {
    const next = html.replace(PIXEL_RE, block + '\n');
    if (next === html) continue;
    fs.writeFileSync(file, next);
    console.log('updated', relPath);
    continue;
  }

  if (!html.includes(ANCHOR)) {
    console.warn('skip (no anchor):', relPath);
    continue;
  }

  html = html.replace(ANCHOR, `${ANCHOR}\n${block}`);
  fs.writeFileSync(file, html);
  console.log('synced', relPath);
}
