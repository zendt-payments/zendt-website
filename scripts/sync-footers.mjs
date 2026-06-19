#!/usr/bin/env node
/** Replace <footer>...</footer> in all HTML pages with the universal footer snippet. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { siteFooter } from '../assets/seo/footer-snippet.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function depthFor(file) {
  const parts = file.split(path.sep);
  return Math.max(0, parts.length - 1);
}

function syncFile(file) {
  const full = path.join(ROOT, file);
  const text = fs.readFileSync(full, 'utf8');
  const depth = depthFor(file);
  const prefix = depth ? '../'.repeat(depth) : '';
  const footer = siteFooter(prefix);
  const next = text.replace(/<footer>[\s\S]*?<\/footer>/, footer);
  if (next === text) {
    console.log('skip (no footer)', file);
    return;
  }
  fs.writeFileSync(full, next);
  console.log('synced', file);
}

for (const file of fs.readdirSync(ROOT)) {
  if (file.endsWith('.html')) syncFile(file);
}

for (const dir of ['compare', 'guides', 'receive-payments']) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) continue;
  for (const name of fs.readdirSync(base)) {
    if (name.endsWith('.html')) syncFile(path.join(dir, name));
  }
}
