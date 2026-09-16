'use client';

import { useRef, useState } from 'react';
import { usePageT } from '@/lib/i18n';

const T = {
  es: {
    'audit.earlyAccess': 'Acceso anticipado:',
    'audit.emailPh': 'tu@email.com',
    'audit.register': 'Registrarme',
    'audit.sending': 'Enviando…',
    'audit.done': '¡Listo!',
    'audit.invalid': 'Email inválido',
    'audit.error': 'Error, reintentá',
  },
  en: {
    'audit.earlyAccess': 'Early access:',
    'audit.emailPh': 'you@email.com',
    'audit.register': 'Sign up',
    'audit.sending': 'Sending…',
    'audit.done': 'Done!',
    'audit.invalid': 'Invalid email',
    'audit.error': 'Error, try again',
  },
};

export default function WaitlistForm() {
  const t = usePageT(T);
  const [label, setLabel] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submit = async () => {
    const email = inputRef.current?.value.trim() ?? '';
    if (!email) return;
    setBusy(true);
    setLabel(t('audit.sending'));
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setLabel(t('audit.done'));
        if (inputRef.current) inputRef.current.value = '';
      } else {
        const data = await res.json().catch(() => ({}) as Record<string, unknown>);
        setLabel((data as Record<string, unknown>).error === 'invalid_email' ? t('audit.invalid') : t('audit.error'));
      }
    } catch {
      setLabel(t('audit.error'));
    } finally {
      setTimeout(() => {
        setLabel(null);
        setBusy(false);
      }, 2400);
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
        padding: '16px 18px',
        borderRadius: 14,
        background: 'var(--color-accent-soft)',
        border: '1px solid var(--color-accent-line)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 600, color: '#0A0A0B', flex: 'none' }}>
        <span style={{ color: 'var(--color-accent)' }}>[REG]</span> {t('audit.earlyAccess')}
      </span>
      <input
        ref={inputRef}
        type="email"
        placeholder={t('audit.emailPh')}
        aria-label="Email para acceso anticipado"
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        style={{
          flex: 1,
          minWidth: 180,
          padding: '12px 16px',
          border: '1px solid rgba(10,10,11,0.16)',
          borderRadius: 999,
          background: '#FFFFFF',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 13,
          color: '#0A0A0B',
          outline: 'none',
          boxShadow: '0 1px 2px rgba(10,10,11,0.04)',
        }}
      />
      <button
        type="button"
        onClick={submit}
        disabled={busy}
        style={{
          flex: 'none',
          whiteSpace: 'nowrap',
          padding: '12px 24px',
          borderRadius: 999,
          fontSize: 13.5,
          fontWeight: 600,
          color: '#FFFFFF',
          background: 'var(--color-accent)',
          boxShadow: 'var(--shadow-card)',
          border: 'none',
          cursor: busy ? 'default' : 'pointer',
          fontFamily: 'inherit',
          pointerEvents: busy ? 'none' : 'auto',
        }}
      >
        {label ?? t('audit.register')}
      </button>
    </div>
  );
}
