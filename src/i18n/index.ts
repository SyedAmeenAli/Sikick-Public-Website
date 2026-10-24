import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';

export const LANGUAGES = ['en', 'hi', 'te'] as const;
export type Language = (typeof LANGUAGES)[number];

/** Each language named in its own script. */
export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  te: 'తెలుగు',
};

export const isLanguage = (value: unknown): value is Language =>
  typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value);

const STORAGE_KEY = 'sikick.site.language';

const loaders: Record<Exclude<Language, 'en'>, () => Promise<{ default: Record<string, unknown> }>> = {
  hi: () => import('./locales/hi.json'),
  te: () => import('./locales/te.json'),
};

/** Script fonts are fetched only when the language is chosen. */
const fontLoaders: Record<Exclude<Language, 'en'>, () => Promise<unknown>> = {
  hi: () =>
    Promise.all([
      import('@fontsource/noto-sans-devanagari/400.css'),
      import('@fontsource/noto-sans-devanagari/500.css'),
      import('@fontsource/noto-sans-devanagari/600.css'),
      import('@fontsource/noto-sans-devanagari/700.css'),
    ]),
  te: () =>
    Promise.all([
      import('@fontsource/noto-sans-telugu/400.css'),
      import('@fontsource/noto-sans-telugu/500.css'),
      import('@fontsource/noto-sans-telugu/600.css'),
      import('@fontsource/noto-sans-telugu/700.css'),
    ]),
};

void i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  lng: 'en',
  nsSeparator: false,
  resources: { en: { translation: en } },
  returnEmptyString: false,
  // Deliberate fallback: untranslated keys render English, never a raw key.
  parseMissingKeyHandler: () => '',
});

export const storedLanguage = (): Language | null => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLanguage(value) ? value : null;
  } catch {
    return null;
  }
};

export const browserLanguage = (): Language | null => {
  const preferred = typeof navigator === 'undefined' ? [] : (navigator.languages ?? [navigator.language]);
  for (const tag of preferred) {
    const base = tag?.slice(0, 2).toLowerCase();
    if (isLanguage(base)) return base;
  }
  return null;
};

export const applyLanguage = async (language: Language): Promise<void> => {
  if (language !== 'en' && !i18next.hasResourceBundle(language, 'translation')) {
    const loaded = await loaders[language]();
    i18next.addResourceBundle(language, 'translation', loaded.default, true, true);
  }
  if (language !== 'en' && typeof document !== 'undefined' && import.meta.env.MODE !== 'test') {
    void fontLoaders[language]().catch(() => undefined);
  }
  await i18next.changeLanguage(language);
  if (typeof document !== 'undefined') document.documentElement.lang = language;
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Private mode: the choice still applies for this visit.
  }
};

export const currentLanguage = (): Language => (isLanguage(i18next.language) ? i18next.language : 'en');

export default i18next;
