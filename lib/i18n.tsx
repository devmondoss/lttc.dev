'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'es' | 'en';
export type Dict = Record<string, string>;
export type PageDict = Record<Lang, Dict>;

// Claves de nav/CTA idénticas en todas las páginas — equivalente al T_COMMON
// que antes vivía en dc-shared.js.
export const COMMON: PageDict = {
  es: {
    'nav.research': 'Research',
    'nav.makers': 'Makers',
    'nav.terminal': 'Terminal',
    'nav.docs': 'Docs',
    'nav.login': 'Log in',
    'cta.openTerminal': 'Abrir la terminal',
  },
  en: {
    'nav.research': 'Research',
    'nav.makers': 'Makers',
    'nav.terminal': 'Terminal',
    'nav.docs': 'Docs',
    'nav.login': 'Log in',
    'cta.openTerminal': 'Open the terminal',
  },
};

type LangCtxValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LangCtx = createContext<LangCtxValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  // SSR/primer render siempre en 'es' para que el HTML del servidor y el del
  // cliente coincidan; el idioma real (?lang= o navigator.language) se aplica
  // después del mount, igual que hacía el sistema anterior.
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'es') {
      setLang(q);
      return;
    }
    const nav = (navigator.language || '').toLowerCase();
    if (nav.indexOf('en') === 0) setLang('en');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    // Los widgets (lattice-exhibit, lattice-live-feed, ...) son Web Components
    // vanilla que leen window.__latticeLang y escuchan este evento — se
    // mantiene el mismo contrato que tenían antes de la migración.
    window.__latticeLang = lang;
    window.dispatchEvent(new CustomEvent('lattice:lang', { detail: { lang } }));
  }, [lang]);

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}

/** Traductor con fallback a COMMON, ligado al diccionario propio de una página. */
export function usePageT(pageDict: PageDict) {
  const { lang } = useLang();
  return (key: string): string => {
    const dict = { ...COMMON[lang], ...pageDict[lang] };
    return dict[key] ?? key;
  };
}

/** Construye el href de un link interno agregando ?lang=en cuando corresponde. */
export function langHref(base: string, lang: Lang): string {
  const hashIdx = base.indexOf('#');
  const path = hashIdx >= 0 ? base.slice(0, hashIdx) : base;
  const hash = hashIdx >= 0 ? base.slice(hashIdx) : '';
  return path + (lang === 'en' ? '?lang=en' : '') + hash;
}
