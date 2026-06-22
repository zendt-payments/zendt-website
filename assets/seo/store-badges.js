import { APP_STORE_URL, PLAY_STORE_URL } from './store-links.js';

const APPLE_ICON =
  '<svg class="nav-icon nav-icon--apple" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.64-.12-1.09.413-2.26 1.067-3.01.728-.84 1.99-1.46 3.097-1.71zm1.12 2.53c-1.57-.09-2.904.9-3.66.9-.78 0-1.939-.86-3.21-.84-1.65.03-3.177.97-4.027 2.46-1.72 2.98-1.457 7.37 1.23 9.79.84.77 1.84 1.37 3.09 1.32 1.22-.05 1.68-.8 3.15-.8 1.47 0 1.89.8 3.14.77 1.3-.02 2.12-.75 2.94-1.52 1.02-.94 1.44-1.85 1.46-1.9-.03-.01-2.81-1.08-2.84-4.28-.03-2.68 2.22-3.97 2.32-4.03-1.27-1.86-3.24-2.04-3.95-2.08z"/></svg>';

const PLAY_ICON =
  '<svg class="nav-icon nav-icon--play" viewBox="16 15 40 41" aria-hidden="true"><path fill="#4285F4" d="M17.73,16.44c-.11.42-.17.86-.17,1.31v35.38c0,.45.06.89.17,1.31l19.51-19.51-19.51-18.49Z"/><path fill="#34A853" d="M36.74,35.43l9.76-9.76-21.21-12.3c-.77-.46-1.67-.73-2.63-.73-2.36,0-4.34,1.6-4.92,3.78h0s19,19,19,19h0Z"/><path fill="#FBBC04" d="M55.68,31h-.02s-9.17-5.33-9.17-5.33l-10.33,9.19,10.36,10.36,9.12-5.26c1.6-.86,2.68-2.55,2.68-4.49s-1.07-3.61-2.65-4.47h0Z"/><path fill="#EA4335" d="M36.6,34.41l-18.86,20.02s0,0,0,.01c.58,2.17,2.56,3.77,4.92,3.77.94,0,1.83-.26,2.58-.7l.06-.04,21.23-12.25-9.94-10.82Z"/></svg>';

export function storeIconButtons(prefix = '', variant = 'nav') {
  return `<div class="store-icons store-icons--${variant}">
  <a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">${APPLE_ICON}</a>
  <a href="${PLAY_STORE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">${PLAY_ICON}</a>
</div>`;
}

export function navStoreBadges(prefix = '') {
  return storeIconButtons(prefix, 'nav');
}

/** Full-width badges — footer only. */
export function storeBadges(prefix = '', variant = 'footer') {
  const r = prefix;
  return `<div class="foot__stores">
  <a href="${APP_STORE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
    <img src="${r}assets/images/badge-app-store.svg" alt="" width="120" height="40" loading="lazy" decoding="async" />
  </a>
  <a href="${PLAY_STORE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
    <img src="${r}assets/images/badge-google-play.svg" alt="" width="135" height="40" loading="lazy" decoding="async" />
  </a>
</div>`;
}
