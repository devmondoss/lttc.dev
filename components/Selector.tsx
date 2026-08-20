'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { usePageT } from '@/lib/i18n';

const T = {
  es: {
    'selector.heading': '¿De qué lado del contrato estás?',
    'maker.eyebrow': '◆ EL MAKER',
    'maker.h': 'Tengo el alpha.',
    'maker.body':
      'Publicá tu análisis con colateral. El contrato audita cada acierto y construye un track record que nadie puede borrar. Tu precisión, por fin, cotiza.',
    'maker.liveGains': 'GANANCIAS EN VIVO',
    'maker.takers': 'takers desbloquearon',
    'maker.streak': 'RACHA 14×',
    'maker.collateral': 'COLATERAL ◆2,400',
    'maker.cta': 'Convertirme en Maker',
    'maker.foot': 'Depositás reputación. Si fallás, el contrato paga.',
    'taker.eyebrow': '◆ EL TAKER',
    'taker.h': 'Busco la asimetría.',
    'taker.body':
      'Comprá la lectura de los pronosticadores mejor calibrados de la red. Si su modelo falla, el contrato te devuelve lo que pagaste.',
    'taker.reserved': '🔒 PICK EXACTO RESERVADO',
    'taker.blurPick': 'Francia −1.5 en la semifinal · stake 3% · cuota 2.4 · entrada antes del sorteo de la banda.',
    'taker.buyToSee': 'Comprar por $3 para ver',
    'taker.guaranteeActive': 'GARANTÍA ACTIVA',
    'taker.foot': 'Desde $1. Sin permiso, sin credenciales.',
    'th.clabel': '⚡ INSIGHT DE MAKER',
    'th.author': '@quant_ia · hace 25 min',
    'th.cbody':
      'El mercado sobre-descuenta a Francia por la lesión de Mbappé, pero el xG del equipo sin él sigue top-3 del torneo. Value claro en la banda.',
    'cta.openTerminal': 'Abrir la terminal',
  },
  en: {
    'selector.heading': 'Which side of the contract are you on?',
    'maker.eyebrow': '◆ THE MAKER',
    'maker.h': 'I have the alpha.',
    'maker.body':
      'Publish your analysis with collateral. The contract audits every hit and builds a track record no one can erase. Your precision, at last, has a price.',
    'maker.liveGains': 'LIVE EARNINGS',
    'maker.takers': 'takers unlocked it',
    'maker.streak': 'STREAK 14×',
    'maker.collateral': 'COLLATERAL ◆2,400',
    'maker.cta': 'Become a Maker',
    'maker.foot': 'You stake reputation. If you fail, the contract pays.',
    'taker.eyebrow': '◆ THE TAKER',
    'taker.h': 'I hunt for the asymmetry.',
    'taker.body':
      'Buy the read of the best-calibrated forecasters on the network. If their model fails, the contract returns what you paid.',
    'taker.reserved': '🔒 EXACT PICK RESERVED',
    'taker.blurPick': 'France −1.5 in the semifinal · stake 3% · odds 2.4 · entry before the bracket draw.',
    'taker.buyToSee': 'Buy for $3 to see',
    'taker.guaranteeActive': 'GUARANTEE ACTIVE',
    'taker.foot': 'From $1. No permission, no credentials.',
    'th.clabel': '⚡ MAKER INSIGHT',
    'th.author': '@quant_ia · 25 min ago',
    'th.cbody':
      "The market over-discounts France for Mbappé's injury, but the team's xG without him is still top-3 in the tournament. Clear value on the line.",
    'cta.openTerminal': 'Open the terminal',
  },
};

export default function Selector() {
  const t = usePageT(T);
  const [makerLight, setMakerLight] = useState(true);
  const [earnTotal, setEarnTotal] = useState(127);
  const [earnTakers, setEarnTakers] = useState(38);
  const [floatAmount, setFloatAmount] = useState<number | null>(null);

  const makerRef = useRef<HTMLDivElement | null>(null);
  const takerRef = useRef<HTMLDivElement | null>(null);

  // Inversión de tema: hover/foco en desktop, IntersectionObserver en touch.
  useEffect(() => {
    const maker = makerRef.current;
    const taker = takerRef.current;
    if (!maker || !taker) return;
    if (window.matchMedia('(hover: hover)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setMakerLight(e.target === maker);
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    );
    io.observe(maker);
    io.observe(taker);
    return () => io.disconnect();
  }, []);

  // Ganancias en vivo del Maker.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      const inc = 1 + Math.floor(Math.random() * 5);
      setEarnTakers((v) => v + 1);
      setFloatAmount(inc);
      setTimeout(() => setFloatAmount(null), 950);
      setEarnTotal((v) => v + inc);
    }, 2700);
    return () => clearInterval(id);
  }, []);

  const cardBg = (light: boolean) => (light ? '#F1EFE8' : '#111113');
  const cardBorder = (light: boolean) => (light ? 'rgba(10,10,11,0.35)' : 'rgba(245,245,243,0.18)');
  const bodyColor = (light: boolean) => (light ? '#3F3F44' : '#B4B2AA');
  const clabelColor = (light: boolean) => (light ? '#0A0A0B' : '#F5A623');
  const lockBorder = (light: boolean) => (light ? 'rgba(10,10,11,0.25)' : 'rgba(245,245,243,0.2)');
  const ctaBg = (light: boolean) => (light ? '#0A0A0B' : '#F5A623');
  const ctaColor = (light: boolean) => (light ? '#F5F5F3' : '#0A0A0B');

  return (
    <section id="selector" style={{ padding: 'clamp(88px,12vw,150px) 24px clamp(48px,6vw,72px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal style={{ maxWidth: 720, margin: '0 auto clamp(40px,6vw,60px)', textAlign: 'center' }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(30px,4.4vw,48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            {t('selector.heading')}
          </h2>
        </Reveal>

        <Reveal
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid rgba(10,10,11,0.12)',
          }}
        >
          <>
            {/* HEMISFERIO IZQUIERDO · EL MAKER */}
            <div
              ref={makerRef}
              tabIndex={0}
              role="button"
              aria-label="Soy Maker: tengo el alpha"
              onMouseEnter={() => setMakerLight(true)}
              onFocus={() => setMakerLight(true)}
              style={{
                background: makerLight ? '#FAFAF8' : '#0A0A0B',
                color: makerLight ? '#0A0A0B' : '#F5F5F3',
                padding: 'clamp(28px,4vw,48px) clamp(24px,3.4vw,44px)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                transition: 'background-color 0.5s ease, color 0.5s ease',
                outline: 'none',
              }}
            >
              <p style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.18em', color: '#8A8A90' }}>
                {t('maker.eyebrow')}
              </p>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(26px,3.4vw,38px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                }}
              >
                {t('maker.h')}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: bodyColor(makerLight), transition: 'color 0.5s ease', maxWidth: 440 }}>
                {t('maker.body')}
              </p>

              <div
                style={{
                  background: cardBg(makerLight),
                  border: `1px solid ${cardBorder(makerLight)}`,
                  borderRadius: 14,
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  margin: '6px 0',
                  transition: 'background-color 0.5s ease, border-color 0.5s ease',
                }}
              >
                <p style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.14em', fontWeight: 600, color: clabelColor(makerLight), transition: 'color 0.5s ease' }}>
                  {t('th.clabel')}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#FF6B00,#F5A623)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#0A0A0B',
                      flex: 'none',
                    }}
                  >
                    Q
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: '#8A8A90' }}>{t('th.author')}</span>
                  <span style={{ padding: '2px 9px', border: '1px solid rgba(138,138,144,0.5)', borderRadius: 999, fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: '0.06em', color: '#8A8A90' }}>
                    World Cup Winner
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: bodyColor(makerLight), transition: 'color 0.5s ease' }}>{t('th.cbody')}</p>
                <div style={{ border: `1px dashed ${lockBorder(makerLight)}`, borderRadius: 10, padding: 14, transition: 'border-color 0.5s ease' }}>
                  <p style={{ margin: '0 0 8px', fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: '0.14em', color: '#8A8A90' }}>
                    {t('maker.liveGains')}
                  </p>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: 32, letterSpacing: '-0.02em' }}>
                      ${earnTotal}
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        left: 100,
                        top: 2,
                        opacity: floatAmount != null ? 1 : 0,
                        transform: floatAmount != null ? 'translateY(-16px)' : 'translateY(8px)',
                        transition: floatAmount != null ? 'opacity 0.5s ease, transform 1.5s ease' : 'none',
                        fontFamily: "'JetBrains Mono',monospace",
                        fontWeight: 600,
                        fontSize: 13,
                        color: '#FF6B00',
                        pointerEvents: 'none',
                      }}
                    >
                      +${floatAmount ?? 0}
                    </span>
                  </div>
                  <p style={{ margin: '8px 0 0', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#8A8A90' }}>
                    {earnTakers} {t('maker.takers')}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 16, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.1em', color: '#8A8A90' }}>
                  <span>{t('maker.streak')}</span>
                  <span>{t('maker.collateral')}</span>
                </div>
              </div>

              <a
                href="https://www.lttc.app/"
                style={{
                  alignSelf: 'flex-start',
                  padding: '13px 26px',
                  borderRadius: 999,
                  fontSize: 14.5,
                  fontWeight: 600,
                  background: ctaBg(makerLight),
                  color: ctaColor(makerLight),
                  transition: 'background-color 0.5s ease, color 0.5s ease',
                  textDecoration: 'none',
                }}
              >
                {t('maker.cta')}
              </a>
              <p style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.06em', color: '#8A8A90' }}>{t('maker.foot')}</p>
            </div>

            {/* HEMISFERIO DERECHO · EL TAKER */}
            <div
              ref={takerRef}
              tabIndex={0}
              role="button"
              aria-label="Soy Taker: busco la asimetría"
              onMouseEnter={() => setMakerLight(false)}
              onFocus={() => setMakerLight(false)}
              style={{
                background: makerLight ? '#0A0A0B' : '#FAFAF8',
                color: makerLight ? '#F5F5F3' : '#0A0A0B',
                padding: 'clamp(28px,4vw,48px) clamp(24px,3.4vw,44px)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                transition: 'background-color 0.5s ease, color 0.5s ease',
                outline: 'none',
              }}
            >
              <p style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.18em', color: '#8A8A90' }}>
                {t('taker.eyebrow')}
              </p>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(26px,3.4vw,38px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                }}
              >
                {t('taker.h')}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: bodyColor(!makerLight), transition: 'color 0.5s ease', maxWidth: 440 }}>
                {t('taker.body')}
              </p>

              <div
                style={{
                  background: cardBg(!makerLight),
                  border: `1px solid ${cardBorder(!makerLight)}`,
                  borderRadius: 14,
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  margin: '6px 0',
                  transition: 'background-color 0.5s ease, border-color 0.5s ease',
                }}
              >
                <p style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.14em', fontWeight: 600, color: clabelColor(!makerLight), transition: 'color 0.5s ease' }}>
                  {t('th.clabel')}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#FF6B00,#F5A623)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#0A0A0B',
                      flex: 'none',
                    }}
                  >
                    Q
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: '#8A8A90' }}>{t('th.author')}</span>
                  <span style={{ padding: '2px 9px', border: '1px solid rgba(138,138,144,0.5)', borderRadius: 999, fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: '0.06em', color: '#8A8A90' }}>
                    World Cup Winner
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: bodyColor(!makerLight), transition: 'color 0.5s ease' }}>{t('th.cbody')}</p>
                <div
                  style={{
                    border: `1px dashed ${lockBorder(!makerLight)}`,
                    borderRadius: 10,
                    padding: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    alignItems: 'flex-start',
                    transition: 'border-color 0.5s ease',
                  }}
                >
                  <p style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: '0.14em', color: '#8A8A90' }}>{t('taker.reserved')}</p>
                  <p
                    aria-hidden="true"
                    style={{ margin: 0, filter: 'blur(6px)', userSelect: 'none', pointerEvents: 'none', fontSize: 13, lineHeight: 1.5, color: bodyColor(!makerLight), transition: 'color 0.5s ease' }}
                  >
                    {t('taker.blurPick')}
                  </p>
                  <span
                    style={{
                      padding: '10px 18px',
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 600,
                      background: !makerLight ? '#0A0A0B' : '#F5A623',
                      color: !makerLight ? '#F5F5F3' : '#0A0A0B',
                      transition: 'background-color 0.5s ease, color 0.5s ease',
                    }}
                  >
                    {t('taker.buyToSee')}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 16, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.1em' }}>
                  <span style={{ color: '#F5A623' }}>🔥 +31%</span>
                  <span style={{ color: '#8A8A90' }}>{t('taker.guaranteeActive')}</span>
                </div>
              </div>

              <a
                href="https://www.lttc.app/"
                style={{
                  alignSelf: 'flex-start',
                  padding: '13px 26px',
                  borderRadius: 999,
                  fontSize: 14.5,
                  fontWeight: 600,
                  background: !makerLight ? '#0A0A0B' : '#F5A623',
                  color: !makerLight ? '#F5F5F3' : '#0A0A0B',
                  transition: 'background-color 0.5s ease, color 0.5s ease',
                  textDecoration: 'none',
                }}
              >
                {t('cta.openTerminal')}
              </a>
              <p style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.06em', color: '#8A8A90' }}>{t('taker.foot')}</p>
            </div>
          </>
        </Reveal>
      </div>
    </section>
  );
}
