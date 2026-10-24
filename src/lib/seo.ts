import { useEffect } from 'react';
import { SITE_URL } from '../config/site';

export type SeoInput = {
  title: string;
  description: string;
  /** Path beginning with '/', e.g. '/pricing'. Used for canonical + OG URL. */
  path: string;
  /** Set false for flows that should not be indexed (configurator results, handoffs). */
  index?: boolean;
  /** Optional JSON-LD structured data objects (only when visibly supported). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const upsertMeta = (selector: string, attrs: Record<string, string>): HTMLMetaElement => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
  return el;
};

let jsonLdScript: HTMLScriptElement | null = null;

/** Per-route document metadata: title, description, canonical, OG, robots, JSON-LD. */
export function useSeo({ title, description, path, index = true, jsonLd }: SeoInput): void {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    document.documentElement.lang = document.documentElement.lang || 'en';

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: index ? 'index, follow' : 'noindex, nofollow',
    });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Sikick' });
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: `${SITE_URL}/brand/og-image.svg`,
    });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    if (jsonLdScript) {
      jsonLdScript.remove();
      jsonLdScript = null;
    }
    if (jsonLd) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(jsonLdScript);
    }
  }, [title, description, path, index, jsonLd]);
}
