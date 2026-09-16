'use client';

import Link from 'next/link';
import Hoverable from './Hoverable';
import { useLang, usePageT, langHref } from '@/lib/i18n';

const FOOTER_T = {
  es: {
    'footer.tagline': 'La verdad tiene precio.',
    'footer.col.producto': 'PRODUCTO',
    'footer.col.security': 'SEGURIDAD',
    'footer.howItWorks': 'Cómo funciona',
    'footer.guarantee': 'Garantía',
    'footer.theSelector': 'El selector',
    'footer.becomeMaker': 'Convertirme en Maker',
    'footer.signals': 'Señales',
    'footer.guides': 'Guías',
    'footer.audits': 'Auditorías',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',
    'footer.disclaimer':
      'Lattice no es una casa de apuestas ni una plataforma de inversión. Es una red de reputación. Opera bajo smart contracts auditables.',
  },
  en: {
    'footer.tagline': 'The truth has a price.',
    'footer.col.producto': 'PRODUCT',
    'footer.col.security': 'SECURITY',
    'footer.howItWorks': 'How it works',
    'footer.guarantee': 'Guarantee',
    'footer.theSelector': 'The selector',
    'footer.becomeMaker': 'Become a Maker',
    'footer.signals': 'Signals',
    'footer.guides': 'Guides',
    'footer.audits': 'Audits',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.disclaimer':
      'Lattice is not a betting house or an investment platform. It is a reputation network. It operates under auditable smart contracts.',
  },
};

const linkStyle = { fontSize: 13.5, color: '#3F3F44' };
const linkHover = { color: 'var(--color-accent)' };

export default function Footer() {
  const { lang } = useLang();
  const t = usePageT(FOOTER_T);

  return (
    <footer
      id="docs"
      style={{
        background: '#F5F5F3',
        borderTop: '1px solid rgba(10,10,11,0.08)',
        padding: 'clamp(56px,8vw,88px) 24px 36px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(36px,6vw,80px)', marginBottom: 'clamp(44px,6vw,64px)' }}>
          <div style={{ flex: '1 1 260px', minWidth: 240 }}>
            <Link
              href="/"
              aria-label="Lattice"
              style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#0A0A0B', marginBottom: 14 }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  flex: 'none',
                  width: 38,
                  height: 38,
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
                  width: 101,
                  height: 24,
                  background: 'currentColor',
                  WebkitMask: "url('/assets/wordmark-text.svg') left center/contain no-repeat",
                  mask: "url('/assets/wordmark-text.svg') left center/contain no-repeat",
                }}
              />
            </Link>
            <p style={{ margin: 0, fontFamily: 'Fraunces,serif', fontStyle: 'italic', fontSize: 19, color: '#3F3F44' }}>
              {t('footer.tagline')}
            </p>
          </div>

          <div style={{ flex: '2 1 520px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ margin: '0 0 4px', fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.16em', color: '#8A8A90' }}>
                {t('footer.col.producto')}
              </p>
              <Hoverable as={Link} href={langHref('/#producto', lang)} style={linkStyle} hoverStyle={linkHover}>
                {t('footer.howItWorks')}
              </Hoverable>
              <Hoverable as={Link} href={langHref('/#terminal', lang)} style={linkStyle} hoverStyle={linkHover}>
                {t('footer.guarantee')}
              </Hoverable>
              <Hoverable as={Link} href={langHref('/#selector', lang)} style={linkStyle} hoverStyle={linkHover}>
                {t('footer.theSelector')}
              </Hoverable>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ margin: '0 0 4px', fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.16em', color: '#8A8A90' }}>
                MAKERS
              </p>
              <Hoverable as="a" href="https://www.lttc.app/" style={linkStyle} hoverStyle={linkHover}>
                {t('footer.becomeMaker')}
              </Hoverable>
              <Hoverable as={Link} href={langHref('/#terminal', lang)} style={linkStyle} hoverStyle={linkHover}>
                Reputation Ledger
              </Hoverable>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ margin: '0 0 4px', fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.16em', color: '#8A8A90' }}>
                TERMINAL
              </p>
              <Hoverable as={Link} href={langHref('/#terminal', lang)} style={linkStyle} hoverStyle={linkHover}>
                Heat map
              </Hoverable>
              <Hoverable as={Link} href={langHref('/#terminal', lang)} style={linkStyle} hoverStyle={linkHover}>
                {t('footer.signals')}
              </Hoverable>
              <Hoverable as={Link} href={langHref('/#terminal', lang)} style={linkStyle} hoverStyle={linkHover}>
                API
              </Hoverable>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ margin: '0 0 4px', fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.16em', color: '#8A8A90' }}>
                DOCS
              </p>
              <Hoverable as="a" href="#" style={linkStyle} hoverStyle={linkHover}>
                Whitepaper
              </Hoverable>
              <Hoverable as="a" href="#" style={linkStyle} hoverStyle={linkHover}>
                {t('footer.guides')}
              </Hoverable>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ margin: '0 0 4px', fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.16em', color: '#8A8A90' }}>
                {t('footer.col.security')}
              </p>
              <Hoverable as={Link} href={langHref('/#auditoria', lang)} style={linkStyle} hoverStyle={linkHover}>
                {t('footer.audits')}
              </Hoverable>
              <Hoverable as={Link} href={langHref('/#auditoria', lang)} style={linkStyle} hoverStyle={linkHover}>
                Smart contracts
              </Hoverable>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ margin: '0 0 4px', fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.16em', color: '#8A8A90' }}>
                LEGAL
              </p>
              <Hoverable as="a" href="#" style={linkStyle} hoverStyle={linkHover}>
                {t('footer.terms')}
              </Hoverable>
              <Hoverable as="a" href="#" style={linkStyle} hoverStyle={linkHover}>
                {t('footer.privacy')}
              </Hoverable>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(10,10,11,0.08)',
            paddingTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <p style={{ margin: 0, fontSize: 12, color: '#8A8A90', maxWidth: 640, lineHeight: 1.6 }}>{t('footer.disclaimer')}</p>
          <p style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#8A8A90' }}>© 2026 Lattice</p>
        </div>
      </div>
    </footer>
  );
}
