#!/usr/bin/env node
/** Inject Ahrefs analytics snippet before </body> on all HTML pages. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AHREFS_ANALYTICS } from '../assets/seo/analytics-snippet.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const MARKER = 'analytics.ahrefs.com/analytics.js';

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
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(MARKER)) continue;

  if (!html.includes('</body>')) {
    console.warn('skip (no </body>):', path.relative(ROOT, file));
    continue;
  }

  html = html.replace('</body>', `${AHREFS_ANALYTICS}\n</body>`);
  fs.writeFileSync(file, html);
  console.log('synced', path.relative(ROOT, file));
}
