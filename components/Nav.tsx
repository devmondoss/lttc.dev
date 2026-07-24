'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Hoverable from './Hoverable';
import LangToggle from './LangToggle';
import { useLang, usePageT, langHref } from '@/lib/i18n';

/** Nav compartido por las 5 páginas. `variant="landing"` reproduce el fondo
 * transparente-que-se-solidifica-al-scrollear del hero; el resto usa el
 * fondo sólido fijo que ya tenían ventaja/research. */
export default function Nav({ variant = 'solid' }: { variant?: 'landing' | 'solid' }) {
  const { lang } = useLang();
  const t = usePageT({ es: {}, en: {} });
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (variant !== 'landing') return;
    const el = navRef.current;
    if (!el) return;
    const onScroll = () => {
      const on = window.scrollY > 24;
      el.style.background = on ? 'rgba(255,255,255,0.94)' : 'transparent';
      el.style.boxShadow = on ? '0 1px 0 rgba(10,10,11,0.08)' : 'none';
      el.style.backdropFilter = on ? 'blur(12px)' : 'none';
      (el.style as any).webkitBackdropFilter = on ? 'blur(12px)' : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  const base = variant === 'landing' ? '' : '/';
  const solidStyle =
    variant === 'solid'
      ? {
          position: 'fixed' as const,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 1px 0 rgba(10,10,11,0.08)',
        }
      : {
          position: 'fixed' as const,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          background: 'transparent',
          transition: 'background 0.35s ease, box-shadow 0.35s ease',
        };

  return (
    <div ref={navRef} style={solidStyle}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <Link
          href={variant === 'landing' ? '#' : '/'}
          aria-label="Lattice"
          style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0A0A0B' }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              flex: 'none',
              width: 30,
              height: 30,
              background: 'currentColor',
              WebkitMask: "url('/assets/isotipo.svg') center/contain no-repeat",
              mask: "url('/assets/isotipo.svg') center/contain no-repeat",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              flex: 'none',
              width: 80,
              height: 19,
              background: 'currentColor',
              WebkitMask: "url('/assets/wordmark-text.svg') left center/contain no-repeat",
              mask: "url('/assets/wordmark-text.svg') left center/contain no-repeat",
            }}
          />
        </Link>

        <nav className="nav-links-desktop" style={{ alignItems: 'center', gap: 32, fontSize: 14, fontWeight: 500 }}>
          <Hoverable
            as={Link}
            href={langHref(`${base}#producto`, lang)}
            style={{ color: '#3F3F44' }}
            hoverStyle={{ color: '#FF6B00' }}
          >
            {t('nav.research')}
          </Hoverable>
          <Hoverable
            as={Link}
            href={langHref(`${base}#terminal`, lang)}
            style={{ color: '#3F3F44' }}
            hoverStyle={{ color: '#FF6B00' }}
          >
            {t('nav.terminal')}
          </Hoverable>
          <Hoverable
            as={Link}
            href={langHref(`${base}#selector`, lang)}
            style={{ color: '#3F3F44' }}
            hoverStyle={{ color: '#FF6B00' }}
          >
            {t('nav.makers')}
          </Hoverable>
          <Hoverable
            as={Link}
            href={langHref(`${base}#docs`, lang)}
            style={{ color: '#3F3F44' }}
            hoverStyle={{ color: '#FF6B00' }}
          >
            {t('nav.docs')}
          </Hoverable>
        </nav>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LangToggle />
          <Hoverable
            as={Link}
            href={langHref(`${base}#selector`, lang)}
            className="nav-login-desktop"
            style={{ padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500, color: '#3F3F44' }}
            hoverStyle={{ color: '#0A0A0B' }}
          >
            {t('nav.login')}
          </Hoverable>
          <Hoverable
            as="a"
            href="https://lattice-app-three.vercel.app/inicio"
            style={{
              flex: 'none',
              whiteSpace: 'nowrap',
              padding: 'clamp(7px,2vw,8px) clamp(12px,4vw,16px)',
              borderRadius: 999,
              fontSize: 'clamp(12px,3vw,13px)',
              fontWeight: 600,
              color: '#FFFFFF',
              background: 'linear-gradient(92deg,#FF3333,#FF6B00 55%,#F5A623)',
              boxShadow: '0 6px 18px rgba(255,80,20,0.25)',
              transition: 'box-shadow 0.25s ease, transform 0.25s ease',
            }}
            hoverStyle={{ boxShadow: '0 8px 26px rgba(255,80,20,0.4)', transform: 'translateY(-1px)', color: '#FFFFFF' }}
          >
            <span className="nav-cta-full">{t('cta.openTerminal')}</span>
            <span className="nav-cta-short">{t('nav.terminal')}</span>
          </Hoverable>
        </div>
      </div>
    </div>
  );
}
