import type { APIRoute } from 'astro';
import { INDEKSOWANIE } from '@/lib/serwis';

/** Do czasu recenzji eksperckiej i decyzji właściciela serwis jest zamknięty dla wyszukiwarek. */
export const GET: APIRoute = ({ site }) => {
  const linie = INDEKSOWANIE
    ? ['User-agent: *', 'Allow: /', ...(site ? [`Sitemap: ${new URL('/sitemap-index.xml', site).href}`] : [])]
    : ['User-agent: *', 'Disallow: /'];
  return new Response(`${linie.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
