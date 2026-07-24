'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import Hoverable from '@/components/Hoverable';
import { useLang, usePageT, langHref } from '@/lib/i18n';
import { s } from '@/lib/styleString';

const T = {
  es: {
    'hero.gridAlt': 'Retícula isométrica',
    'hero.h1': 'La ventaja, en números.',
    'hero.sub': 'Cuatro mecanismos que convierten un pronóstico en un contrato con contraparte. El precio lo fija la reputación; el error lo paga quien se equivocó.',
    'acc.reembolso.title': 'Reembolso',
    'acc.reembolso.body':
      'El reembolso está codificado en el smart contract, no en una política de atención al cliente. Cuando la predicción se resuelve y falla, el contrato ejecuta la devolución contra el colateral del Maker. Sin apelación, sin disputa, sin que tengas que reclamar. La consecuencia deja de depender de la buena voluntad de nadie.',
    'acc.reputacion.title': 'Reputación',
    'acc.reputacion.body':
      'La reputación no se vota: se calcula. El score agrega hechos resueltos con pesos deliberadamente desiguales: yield real (40%), aciertos (30%), tamaño de la muestra (20%) y racha (10%, la métrica más manipulable, por eso pesa poco). Se recalcula sobre una ventana móvil de 90 días — no es un pedigrí de por vida, es la forma reciente. Y no es decorativo: ese mismo número fija cuánto puede cobrar el Maker.',
    'acc.termometro.title': 'Termómetro',
    'acc.termometro.body':
      'Cada barra es un pronóstico resuelto del mercado. El mínimo marca el piso, el promedio marca lo que rinde el consenso, y el tope marca hasta dónde llegó el mejor. La distancia entre el promedio y el tope es, literalmente, la asimetría: lo que te estás perdiendo por no comprarle al que sabe.',
    'acc.categorias.title': 'Categorías',
    'acc.categorias.body':
      'Un mercado solo se lista si existe una fuente externa capaz de resolverlo sin ambigüedad. Crypto, fútbol, NBA, política, economía: todos tienen oráculo. Lo que no se puede resolver, no se lista — y lo que el comprador podría provocar, tampoco.',
    'acc.categorias.readConstitution': 'Leé la constitución →',
    backToTerminal: '← Volver a la terminal',
  },
  en: {
    'hero.gridAlt': 'Isometric lattice',
    'hero.h1': 'The edge, in numbers.',
    'hero.sub': 'Four mechanisms that turn a forecast into a contract with a counterparty. Reputation sets the price; whoever got it wrong pays for the error.',
    'acc.reembolso.title': 'Refund',
    'acc.reembolso.body':
      "The refund is coded into the smart contract, not into a customer-service policy. When the prediction resolves and fails, the contract executes the payout against the Maker's collateral. No appeal, no dispute, no need to file a claim. The consequence stops depending on anyone's goodwill.",
    'acc.reputacion.title': 'Reputation',
    'acc.reputacion.body':
      "Reputation isn't voted on: it's calculated. The score aggregates resolved facts with deliberately unequal weights: real yield (40%), hit rate (30%), sample size (20%), and streak (10% — the most manipulable metric, which is why it counts for so little). It recalculates over a rolling 90-day window — not a lifetime pedigree, but recent form. And it isn't decorative: that same number sets how much the Maker can charge.",
    'acc.termometro.title': 'Thermometer',
    'acc.termometro.body':
      "Each bar is a resolved market forecast. The minimum marks the floor, the average marks what consensus returns, and the top marks how far the best went. The gap between the average and the top is, literally, the asymmetry: what you're missing out on by not buying from the one who knows.",
    'acc.categorias.title': 'Categories',
    'acc.categorias.body':
      "A market only gets listed if an external source exists that can resolve it unambiguously. Crypto, soccer, the NBA, politics, economics: all of them have an oracle. What can't be resolved doesn't get listed — and neither does what the buyer could make happen.",
    'acc.categorias.readConstitution': 'Read the constitution →',
    backToTerminal: '← Back to the terminal',
  },
};

const KEYS = ['reembolso', 'reputacion', 'termometro', 'categorias'] as const;
type Key = (typeof KEYS)[number];

const ICONS: Record<Key, JSX.Element> = {
  reembolso: (
    <>
      <rect x="7" y="16" width="34" height="16" rx="8" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <rect x="16" y="20.5" width="16" height="7" rx="3.5" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </>
  ),
  reputacion: (
    <>
      <rect x="10" y="10" width="16" height="16" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <rect x="16" y="16" width="16" height="16" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <rect x="22" y="22" width="16" height="16" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </>
  ),
  termometro: (
    <>
      <line x1="6" y1="38" x2="42" y2="38" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M 8 34 C 13 33 16 27 19 18 C 21 11.5 23.5 11.5 25.5 18 C 29 29 35 33 42 34" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </>
  ),
  categorias: (
    <>
      <circle cx="9" cy="34" r="3.5" fill="none" stroke="#0A0A0B" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      <circle cx="20" cy="16" r="3.5" fill="none" stroke="#0A0A0B" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      <circle cx="31" cy="32" r="3.5" fill="none" stroke="#0A0A0B" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      <circle cx="42" cy="14" r="3.5" fill="none" stroke="#0A0A0B" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      <line x1="11.3" y1="30.2" x2="17.7" y2="19.8" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <line x1="22.5" y1="19.7" x2="28.5" y2="28.3" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <line x1="33.3" y1="28.2" x2="39.7" y2="17.8" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </>
  ),
};

export default function VentajaPage() {
  const { lang } = useLang();
  const t = usePageT(T);
  const [active, setActive] = useState<Key>('reembolso');

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace('#', '');
      if ((KEYS as readonly string[]).includes(h)) setActive(h as Key);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8' }}>
      <Nav variant="solid" />

      <section style={s('padding:clamp(120px,16vh,170px) 24px clamp(48px,7vw,80px);text-align:center')}>
        <div style={s('max-width:760px;margin:0 auto')}>
          <svg viewBox="0 0 400 220" width={340} height={187} role="img" aria-label={t('hero.gridAlt')} style={{ width: 340, height: 187, maxWidth: '100%', display: 'block', margin: '0 auto clamp(28px,4vw,44px)' }}>
            <g fill="none" stroke="#D5D3CB" strokeWidth={1.25}>
              <path d="M 200 30 L 280 62 L 200 94 L 120 62 Z" />
              <path d="M 200 62 L 280 94 L 200 126 L 120 94 Z" />
              <path d="M 200 94 L 280 126 L 200 158 L 120 126 Z" />
              <path d="M 120 62 L 120 126" />
              <path d="M 280 62 L 280 126" />
              <path d="M 200 94 L 200 158" />
              <path d="M 200 30 L 200 94" />
              <path d="M 120 62 L 40 94 L 120 126" />
              <path d="M 280 62 L 360 94 L 280 126" />
              <path d="M 40 94 L 120 158 L 200 190 L 280 158 L 360 94" />
              <circle cx="200" cy="30" r="3.5" />
              <circle cx="120" cy="62" r="3.5" />
              <circle cx="280" cy="62" r="3.5" />
              <circle cx="40" cy="94" r="3.5" />
              <circle cx="360" cy="94" r="3.5" />
              <circle cx="200" cy="94" r="3.5" />
              <circle cx="120" cy="126" r="3.5" />
              <circle cx="280" cy="126" r="3.5" />
              <circle cx="200" cy="158" r="3.5" />
              <circle cx="200" cy="190" r="3.5" />
            </g>
            <circle cx="200" cy="94" r="3.5" fill="#FF6B00" stroke="none" />
          </svg>
          <h1 style={s("margin:0 0 20px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:clamp(34px,5.4vw,58px);line-height:1.06;letter-spacing:-0.03em")}>{t('hero.h1')}</h1>
          <p style={s('margin:0 auto;max-width:560px;font-size:clamp(15.5px,1.9vw,17.5px);line-height:1.7;color:#5F5E5A')}>{t('hero.sub')}</p>
        </div>
      </section>

      <section style={s('padding:clamp(40px,6vw,72px) 24px clamp(88px,12vw,140px)')}>
        <div style={s('max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:clamp(32px,5vw,72px);align-items:flex-start')}>
          <Reveal style={s('flex:1.1 1 360px;min-width:290px')}>
            {KEYS.map((key, i) => {
              const on = key === active;
              return (
                <div
                  key={key}
                  id={key}
                  onClick={() => setActive(key)}
                  style={{
                    borderTop: '1px solid rgba(10,10,11,0.12)',
                    borderBottom: i === KEYS.length - 1 ? '1px solid rgba(10,10,11,0.12)' : undefined,
                    padding: '22px 0',
                    cursor: 'pointer',
                  }}
                >
                  <div style={s('display:flex;align-items:center;gap:14px')}>
                    <svg viewBox="0 0 48 48" width={40} height={40} aria-hidden="true" style={{ width: 40, height: 40, flex: 'none', display: 'block' }}>
                      {ICONS[key]}
                    </svg>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 600,
                        fontSize: 'clamp(19px,2.4vw,24px)',
                        letterSpacing: '-0.02em',
                        color: on ? '#0A0A0B' : '#B9B7B0',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {t(`acc.${key}.title`)}
                    </span>
                    <span style={s("margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:15px;color:#8A8A90")}>{on ? '−' : '+'}</span>
                  </div>
                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: on ? 400 : 0,
                      opacity: on ? 1 : 0,
                      transition: 'max-height 0.5s ease, opacity 0.5s ease',
                    }}
                  >
                    <p style={s('margin:14px 0 4px 48px;font-size:15.5px;line-height:1.7;color:#3F3F44')}>{t(`acc.${key}.body`)}</p>
                    {key === 'categorias' && (
                      <p style={s('margin:12px 0 4px 48px;font-size:14px')}>
                        <Hoverable
                          as={Link}
                          href={langHref('/research/constitucion-humanista', lang)}
                          style={s('font-weight:600;color:#FF6B00')}
                          hoverStyle={s('color:#FF3333')}
                        >
                          {t('acc.categorias.readConstitution')}
                        </Hoverable>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </Reveal>

          <Reveal style={s('flex:1 1 320px;min-width:280px;position:relative;min-height:min(72vw,380px)')}>
            {KEYS.map((key) => (
              <div
                key={key}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: key === active ? 1 : 0,
                  transform: key === active ? 'scale(1)' : 'scale(0.96)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              >
                <svg viewBox="0 0 48 48" width={320} height={320} aria-hidden="true" style={{ width: 320, height: 320, maxWidth: '100%', display: 'block' }}>
                  {ICONS[key]}
                </svg>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <div style={s('padding:0 24px clamp(72px,10vw,110px);text-align:center')}>
        <Hoverable
          as={Link}
          href={langHref('/#terminal', lang)}
          style={s('display:inline-block;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:600;color:#0A0A0B;border:1.5px solid rgba(10,10,11,0.22)')}
          hoverStyle={s('border-color:#0A0A0B;color:#0A0A0B')}
        >
          {t('backToTerminal')}
        </Hoverable>
      </div>

      <Footer />
    </div>
  );
}
