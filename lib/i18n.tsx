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

/** Sección «Señal, no ruido» — copy de docs/LANDING - Señal, no ruido.md.
 * Los handles (valen.macro, quant.ar) son nombres propios: no se traducen.
 * El párrafo de la escena 2 usa la versión segura: no afirma el reembolso al
 * comprador hasta que el mecanismo esté confirmado en backend-spec.md. */
export const SENAL: PageDict = {
  es: {
    'senal.title.signal': 'Señal,',
    'senal.title.noise': 'no ruido.',
    'senal.sub': 'Cualquiera dice que lo vio venir. Acá hay que decirlo antes.',

    'senal.e1.label.signal': 'Antes,',
    'senal.e1.label.noise': 'no después.',
    'senal.e1.body':
      'Cada pronóstico se sella con fecha y hora antes de que se sepa el resultado, y queda bloqueado hasta que alguien lo compra. Nadie lo puede editar ni borrar, ni siquiera quien lo publicó.',

    'senal.e1.sealedBy': 'Sellado por',
    'senal.e1.row1.handle': 'valen.macro',
    'senal.e1.row1.event': 'FED · reunión de octubre',
    'senal.e1.row1.time': '14:32',
    'senal.e1.row2.handle': 'quant.ar',
    'senal.e1.row2.event': 'BTC · cierre del 30/09',
    'senal.e1.row2.time': '14:35',

    'senal.e2.label.signal': 'Contrato,',
    'senal.e2.label.noise': 'no promesa.',
    'senal.e2.body':
      'Cuando el evento termina, el resultado sale de una fuente oficial y el contrato liquida en el acto. Nadie decide quién ganó, nadie puede frenarlo, y todo queda asentado en el historial de quien lo publicó.',
    'senal.e2.waiting': 'Esperando el resultado',
    'senal.e2.settled': 'Liquidado sin intervención',
    'senal.e2.source': 'fuente: FOMC · 14:00 ET',

    'senal.e3.label.signal': 'Pruebas,',
    'senal.e3.label.noise': 'no likes.',
    'senal.e3.body':
      'Sin likes, sin contador de seguidores, sin un algoritmo que premie al que grita más fuerte. Solo pronósticos con fecha y resultado, donde tu análisis no compite con memes: se mide contra lo que pasó.',
    'senal.e3.handle': 'valen.macro',
    'senal.e3.followersCount': '12,4 mil',
    'senal.e3.followersWord': 'seguidores',
    'senal.e3.follow': 'Seguir',
    'senal.e3.reco': 'Recomendado para vos',
    'senal.e3.forecast': 'La FED recorta tasas en octubre.',
    'senal.e3.likes': '2.341',
    'senal.e3.replies': '187',
    'senal.e3.reposts': '94',
    'senal.e3.c1': 'wen',
    'senal.e3.c2': 'trust me bro',
    'senal.e3.c3': 'to the moon',
    'senal.e3.sealed': 'sellado 02/10',
    'senal.e3.hit': 'acertó',
  },
  en: {
    'senal.title.signal': 'Signal,',
    'senal.title.noise': 'not noise.',
    'senal.sub': 'Anyone can say they saw it coming. Here you have to say it first.',

    'senal.e1.label.signal': 'Before,',
    'senal.e1.label.noise': 'not after.',
    'senal.e1.body':
      'Every forecast is sealed with a date and time before the outcome is known, and stays locked until someone buys it. No one can edit or delete it — not even the person who made it.',

    'senal.e1.sealedBy': 'Sealed by',
    'senal.e1.row1.handle': 'valen.macro',
    'senal.e1.row1.event': 'FED · October meeting',
    'senal.e1.row1.time': '14:32',
    'senal.e1.row2.handle': 'quant.ar',
    'senal.e1.row2.event': 'BTC · Sept 30 close',
    'senal.e1.row2.time': '14:35',

    'senal.e2.label.signal': 'Contract,',
    'senal.e2.label.noise': 'not promise.',
    'senal.e2.body':
      'When the event ends, the result comes from an official source and the contract settles on the spot. No one decides who won, no one can stop it, and everything is recorded in the history of whoever published it.',
    'senal.e2.waiting': 'Waiting for the result',
    'senal.e2.settled': 'Settled with no intervention',
    'senal.e2.source': 'source: FOMC · 14:00 ET',

    'senal.e3.label.signal': 'Proof,',
    'senal.e3.label.noise': 'not likes.',
    'senal.e3.body':
      "No likes, no follower count, no algorithm rewarding whoever shouts loudest. Just forecasts with a date and a result — where your analysis doesn't compete with memes. It's measured against what happened.",
    'senal.e3.handle': 'valen.macro',
    'senal.e3.followersCount': '12.4k',
    'senal.e3.followersWord': 'followers',
    'senal.e3.follow': 'Follow',
    'senal.e3.reco': 'Recommended for you',
    'senal.e3.forecast': 'The FED cuts rates in October.',
    'senal.e3.likes': '2,341',
    'senal.e3.replies': '187',
    'senal.e3.reposts': '94',
    'senal.e3.c1': 'wen',
    'senal.e3.c2': 'trust me bro',
    'senal.e3.c3': 'to the moon',
    'senal.e3.sealed': 'sealed 02/10',
    'senal.e3.hit': 'called it',
  },
};
