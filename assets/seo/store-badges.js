import { APP_STORE_URL, PLAY_STORE_URL } from './store-links.js';

export function navDownloadCta() {
  return `<a class="btn btn--primary" href="#download" style="height:40px;padding:0 18px;font-size:13px;">Download Now <span class="btn__arrow" aria-hidden="true">→</span></a>`;
}

/** Full-width badges — footer only. */
export function storeBadges(prefix = '') {
  const r = prefix;
  return `<div class="foot__stores" id="download">
  <a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
    <img src="${r}assets/images/badge-app-store.svg" alt="" width="120" height="40" loading="lazy" decoding="async" />
  </a>
  <a href="${PLAY_STORE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
    <img src="${r}assets/images/badge-google-play.svg" alt="" width="135" height="40" loading="lazy" decoding="async" />
  </a>
</div>`;
}
