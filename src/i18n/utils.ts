import zh from './zh.json';
import en from './en.json';

const locales = { zh, en } as const;
export type Locale = keyof typeof locales;
export type TranslationKey = string;

export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function path(href: string): string {
  if (href.startsWith('http') || href.startsWith('//')) return href;
  return `${base}${href}`;
}

export function getLangFromUrl(url: URL): Locale {
  const parts = url.pathname.replace(new RegExp(`^${base}`), '').split('/');
  if (parts[1] === 'en') return 'en';
  return 'zh';
}

export function useTranslations(locale: Locale) {
  return function t(key: TranslationKey): string {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = locales[locale];
    for (const k of keys) {
      result = result?.[k];
    }
    return (result as string) ?? key;
  };
}

export function switchLocale(currentPath: string, targetLocale: Locale): string {
  const stripped = currentPath.replace(new RegExp(`^${base}`), '').replace(/^\/en/, '');
  const target = targetLocale === 'en' ? `/en${stripped || '/'}` : (stripped || '/');
  return path(target);
}
