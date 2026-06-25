#!/usr/bin/env node
/**
 * Adds font preconnect hints and trims unused font weights across HTML pages.
 * Run: node scripts/sync-head-perf.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const PRECONNECT_BLOCK = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preconnect" href="https://api.fontshare.com" crossorigin />
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin />`;

const FONT_REPLACEMENTS = [
  [
    /clash-display@200,300,400,500,600,700/g,
    'clash-display@400,500,600,700',
  ],
  [
    /family=Cairo:wght@300;400;500;600;700;800/g,
    'family=Cairo:wght@400;500;600',
  ],
  [
    /family=JetBrains\+Mono:wght@300;400;500/g,
    'family=JetBrains+Mono:wght@400',
  ],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function syncFile(file) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  for (const [pattern, replacement] of FONT_REPLACEMENTS) {
    if (pattern.test(html)) {
      html = html.replace(pattern, replacement);
      changed = true;
    }
  }

  if (!html.includes('https://cdn.fontshare.com" crossorigin')) {
    if (html.includes('https://api.fontshare.com" crossorigin')) {
      html = html.replace(
        '<link rel="preconnect" href="https://api.fontshare.com" crossorigin />',
        PRECONNECT_BLOCK,
      );
      changed = true;
    } else if (html.includes('https://api.fontshare.com/v2/css')) {
      html = html.replace(
        /<link href="https:\/\/api\.fontshare\.com\/v2\/css/,
        `${PRECONNECT_BLOCK}\n<link href="https://api.fontshare.com/v2/css`,
      );
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, html);
    console.log('updated', path.relative(ROOT, file));
  }
}

for (const file of walk(ROOT)) syncFile(file);
