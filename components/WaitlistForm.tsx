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
        borderTop: '1px solid rgba(10,10,11,0.1)',
        marginTop: 16,
        paddingTop: 16,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: '#3F3F44' }}>
        &gt; <span style={{ color: '#FF6B00', fontWeight: 600 }}>[REG]</span> {t('audit.earlyAccess')}
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
          padding: '11px 16px',
          border: '1px solid rgba(10,10,11,0.18)',
          borderRadius: 999,
          background: '#FFFFFF',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 12.5,
          color: '#0A0A0B',
          outline: 'none',
        }}
      />
      <button
        type="button"
        onClick={submit}
        disabled={busy}
        style={{
          flex: 'none',
          whiteSpace: 'nowrap',
          padding: '11px 22px',
          borderRadius: 999,
          fontSize: 13.5,
          fontWeight: 600,
          color: '#FFFFFF',
          background: 'linear-gradient(92deg,#FF3333,#FF6B00 55%,#F5A623)',
          boxShadow: '0 6px 18px rgba(255,80,20,0.25)',
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
