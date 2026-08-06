// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // All locales your site supports
  locales: ['en', 'hi', 'te', 'ta', 'fr', 'de', 'es', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'tr'],

  // Fallback / default locale (used when no match, and for '/' root)
  defaultLocale: 'en',

  // 'as-needed' keeps '/en' unprefixed if you want English at root instead —
  // 'always' (default) means every locale, including English, gets a prefix like /en, /hi, /fr
  localePrefix: 'always',
});

// Locales that read right-to-left — used later by layout.tsx to set dir="rtl"
export const rtlLocales = ['ar'];