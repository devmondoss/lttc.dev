'use client';

import { useLang } from '@/lib/i18n';

export default function LangToggle() {
  const { lang, setLang } = useLang();

  const toggle = () => setLang(lang === 'es' ? 'en' : 'es');

  return (
    <div
      role="group"
      tabIndex={0}
      aria-label="Idioma / Language"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      className="lang-toggle"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flex: 'none',
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.04em',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '6px 11px',
        borderRadius: 999,
        border: '1px solid rgba(10,10,11,0.12)',
      }}
    >
      <span
        onClick={(e) => {
          e.stopPropagation();
          setLang('es');
        }}
        style={{ transition: 'color 0.2s ease', color: lang === 'es' ? '#0A0A0B' : '#B9B7B0' }}
      >
        ES
      </span>
      <span aria-hidden="true" style={{ color: '#C9C7BF' }}>
        ·
      </span>
      <span
        onClick={(e) => {
          e.stopPropagation();
          setLang('en');
        }}
        style={{ transition: 'color 0.2s ease', color: lang === 'en' ? '#0A0A0B' : '#B9B7B0' }}
      >
        EN
      </span>
    </div>
  );
}
