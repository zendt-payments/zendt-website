#!/usr/bin/env node
/** Replace nav / hero download CTAs with App Store + Play Store badges. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { navStoreBadges, heroStoreBadges } from '../assets/seo/store-badges.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const NAV_BTN =
  /<a class="btn btn--primary" href="[^"]*" target="_blank" rel="noopener noreferrer" style="height:40px;padding:0 18px;font-size:13px;">(?:Download Now <span class="btn__arrow" aria-hidden="true">→<\/span>|\s*Download Now\s*<span class="btn__arrow" aria-hidden="true">→<\/span>\s*)<\/a>/g;

const HERO_BTN =
  /<a href="https:\/\/apps\.apple\.com\/[^"]*" target="_blank" rel="noopener noreferrer" class="btn btn--primary">\s*Download Now\s*<span class="btn__arrow" aria-hidden="true">→<\/span>\s*<\/a>/g;

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

  text = text.replace(NAV_BTN, navStoreBadges(prefix));
  text = text.replace(HERO_BTN, heroStoreBadges(prefix));

  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('synced', path.relative(ROOT, file));
  }
}

for (const file of walkHtml(ROOT)) syncFile(file);
