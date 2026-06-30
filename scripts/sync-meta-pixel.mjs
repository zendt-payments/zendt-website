#!/usr/bin/env node
/**
 * Inject the Meta Pixel into the <head> of every public HTML page.
 * The bootstrap lives in assets/js/meta-pixel.js (kept out of inline scripts
 * so the strict CSP does not need 'unsafe-inline').
 * Skips the confidential payment-flow page.
 * Run: node scripts/sync-meta-pixel.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PIXEL_ID = '1334086671603194';
const SKIP = new Set(['payment-flow.html']);
const ANCHOR = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';

function walkHtml(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkHtml(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

function block(prefix) {
  return `<!-- Meta Pixel Code -->
<script src="${prefix}assets/js/meta-pixel.js"></script>
<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1" /></noscript>
<!-- End Meta Pixel Code -->`;
}

for (const file of walkHtml(ROOT)) {
  const relPath = path.relative(ROOT, file);
  if (SKIP.has(relPath)) continue;

  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('Meta Pixel Code')) continue;

  if (!html.includes(ANCHOR)) {
    console.warn('skip (no anchor):', relPath);
    continue;
  }

  const depth = relPath.split(path.sep).length - 1;
  const prefix = depth ? '../'.repeat(depth) : '';

  html = html.replace(ANCHOR, `${ANCHOR}\n${block(prefix)}`);
  fs.writeFileSync(file, html);
  console.log('synced', relPath);
}
