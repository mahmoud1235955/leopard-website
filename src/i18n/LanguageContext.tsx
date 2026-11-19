import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { en, ar } from './index';
import type { Dictionary } from './en';

export type Lang = 'en' | 'ar';

const STORAGE_KEY = 'leopard-lang';

interface LangContextValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  t: Dictionary;
  setLang: (lang: Lang) => void;
}

const dictionaries: Record<Lang, Dictionary> = { en, ar };

const LangContext = createContext<LangContextValue | null>(null);

function detectInitialLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'ar') return saved;
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title =
      lang === 'ar'
        ? 'ليوبارد للشحن الدولي والخدمات اللوجستية'
        : 'Leopard International Shipping & Logistics';
  }, [lang]);

  const value: LangContextValue = {
    lang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    t: dictionaries[lang],
    setLang,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLanguage(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
