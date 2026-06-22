#!/usr/bin/env node
/** Sync nav Download Now CTA and remove store icon buttons from nav/CTAs. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { navDownloadCta } from '../assets/seo/store-badges.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const NAV_ICONS = /<div class="store-icons store-icons--nav">[\s\S]*?<\/div>/g;
const HERO_ICONS = /<div class="store-icons store-icons--hero">[\s\S]*?<\/div>/g;
const CTA_BTN =
  `<a href="#download" class="btn btn--primary">\n        Download Now\n        <span class="btn__arrow" aria-hidden="true">→</span>\n      </a>`;

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

  text = text.replace(NAV_ICONS, navDownloadCta());
  text = text.replace(HERO_ICONS, CTA_BTN);
  text = text.replace(
    /<div class="foot__stores">/g,
    '<div class="foot__stores" id="download">'
  );

  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('synced', path.relative(ROOT, file));
  }
}

for (const file of walkHtml(ROOT)) syncFile(file);
