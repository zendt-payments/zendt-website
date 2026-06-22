#!/usr/bin/env node
/** Sync nav / hero store icon buttons across static HTML pages. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { navStoreBadges, heroStoreBadges } from '../assets/seo/store-badges.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const BADGE_BLOCK = /<div class="store-(?:badges|icons) store-(?:badges|icons)--(nav|hero)">[\s\S]*?<\/div>/g;

function prefixFor(file) {
  const depth = path.relative(ROOT, path.dirname(file)).split(path.sep).filter(Boolean).length;
  return depth ? '../'.repeat(depth) : '';
}

function walkHtml(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkHtml(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

function syncFile(file) {
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  const prefix = prefixFor(file);

  text = text.replace(BADGE_BLOCK, (match, variant) => {
    return variant === 'hero' ? heroStoreBadges(prefix) : navStoreBadges(prefix);
  });

  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('synced', path.relative(ROOT, file));
  }
}

for (const file of walkHtml(ROOT)) syncFile(file);
