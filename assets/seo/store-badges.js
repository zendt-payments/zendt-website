import { APP_STORE_URL, PLAY_STORE_URL } from './store-links.js';

export function storeBadges(prefix = '', variant = 'nav') {
  const r = prefix;
  const height = variant === 'hero' ? 40 : 32;
  const appWidth = variant === 'hero' ? 120 : 96;
  const playWidth = variant === 'hero' ? 135 : 108;

  return `<div class="store-badges store-badges--${variant}">
  <a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
    <img src="${r}assets/images/badge-app-store.svg" alt="" width="${appWidth}" height="${height}" loading="lazy" decoding="async" />
  </a>
  <a href="${PLAY_STORE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
    <img src="${r}assets/images/badge-google-play.svg" alt="" width="${playWidth}" height="${height}" loading="lazy" decoding="async" />
  </a>
</div>`;
}

export function navStoreBadges(prefix = '') {
  return storeBadges(prefix, 'nav');
}

export function heroStoreBadges(prefix = '') {
  return storeBadges(prefix, 'hero');
}
