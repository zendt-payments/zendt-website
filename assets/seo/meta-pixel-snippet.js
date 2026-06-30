/**
 * Meta Pixel — exact inline snippet for sync-meta-pixel.mjs
 *
 * CSP note: the script is emitted as `<script>\n{INLINE}\n</script>`, so the
 * CSP hash in vercel.json must be computed over the leading/trailing newlines
 * too. Current hash: sha256-o8t+fP7/6+y6JG+fxszXC8glDlQ6esdI+0lr5ApJbMU=
 * If META_PIXEL_INLINE changes, recompute with:
 *   printf '\n%s\n' "$INLINE" | openssl dgst -sha256 -binary | openssl base64
 */
export const META_PIXEL_ID = '1334086671603194';

export const META_PIXEL_INLINE = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

export function metaPixelBlock(prefix = '') {
  return `<!-- Meta Pixel Code -->
<script>
${META_PIXEL_INLINE}
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`;
}
