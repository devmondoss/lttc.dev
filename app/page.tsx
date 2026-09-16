'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import Hoverable from '@/components/Hoverable';
import TesisCard from '@/components/TesisCard';
import Selector from '@/components/Selector';
import WaitlistForm from '@/components/WaitlistForm';
import SenalNoRuido from '@/components/senal/SenalNoRuido';
import { useLang, usePageT, langHref } from '@/lib/i18n';
import { s } from '@/lib/styleString';

const T = {
  es: {
    'cta.seeMakers': 'Ver makers',
    'hero.h1a': 'Haz que la verdad sea ',
    'hero.h1b': 'rentable',
    'hero.h1c': '.',
    'hero.sub':
      'Accede a pronósticos de expertos auditados on-chain. Si su modelo falla, el smart contract te devuelve tu dinero automáticamente',
    'tesis.heading': 'Tres problemas que ningún feed puede resolver.',
    'tesis.sub':
      'La investigación detrás de Lattice: quién tiene derecho a ser escuchado, por qué el buen análisis desaparece del mercado, y qué preguntas no se le pueden hacer a un mercado sin destruir la respuesta.',
    'tesis.c1.title': 'Democracia del Intelecto',
    'tesis.c1.desc': 'El diploma era una tecnología de verificación. La reemplazamos por un historial.',
    'tesis.c1.read': '5 min · Leer →',
    'tesis.c2.title': 'Asimetría de Información',
    'tesis.c2.desc': 'Cuando hablar es gratis, el buen análisis no encuentra comprador. Cómo el colateral lo trae de vuelta.',
    'tesis.c2.read': '7 min · Leer →',
    'tesis.c3.title': 'Constitución Humanista',
    'tesis.c3.desc': 'Hay mercados que fabrican el hecho que miden. Estos son los que Lattice no lista.',
    'tesis.c3.read': '6 min · Leer →',
    'terminal.heading': 'La ventaja, en números.',
    'insight.closesIn': 'CIERRA EN 6D',
    'insight.blurTitle': 'BTC rompe $128K antes del 30/09 — prob. declarada 78%',
    'insight.blurMeta': 'entrada 122.4K · objetivo 128K · stop 117.9K',
    'insight.streak': 'RACHA 14×',
    'insight.hitRate': '71% ACIERTO',
    'insight.unlock': 'Desbloquear Alpha — $5.00',
    'insight.refundNote': 'SI FALLA → REEMBOLSO AUTOMÁTICO DESDE LA GARANTÍA',
    'feat.reembolso.t': 'Reembolso',
    'feat.reembolso.d': 'Si el Maker falla, el contrato te devuelve lo que pagaste. Automático, sin disputas.',
    'feat.reputacion.t': 'Reputación',
    'feat.reputacion.d': 'Un número calculado sobre hechos resueltos, no sobre opiniones.',
    'feat.termometro.t': 'Termómetro',
    'feat.termometro.d': 'El rendimiento del mercado en vivo: mínimo, promedio, tu Maker y el tope.',
    'feat.categorias.t': 'Categorías',
    'feat.categorias.d': 'Solo mercados con oráculo objetivo. Nada que no se pueda resolver.',
    'audit.earlyAccess': 'Acceso anticipado:',
  },
  en: {
    'cta.seeMakers': 'See makers',
    'hero.h1a': 'Make the truth ',
    'hero.h1b': 'profitable',
    'hero.h1c': '.',
    'hero.sub': 'Access forecasts from top experts, audited on-chain. If their model fails, the smart contract refunds you automatically.',
    'tesis.heading': 'Three problems no feed can solve.',
    'tesis.sub':
      "The research behind Lattice: who has the right to be heard, why good analysis vanishes from the market, and which questions can't be asked of a market without destroying the answer.",
    'tesis.c1.title': 'Democracy of Intellect',
    'tesis.c1.desc': 'The diploma was a verification technology. We replaced it with a track record.',
    'tesis.c1.read': '5 min · Read →',
    'tesis.c2.title': 'Information Asymmetry',
    'tesis.c2.desc': 'When talk is free, good analysis finds no buyer. How collateral brings it back.',
    'tesis.c2.read': '7 min · Read →',
    'tesis.c3.title': 'Humanist Constitution',
    'tesis.c3.desc': "Some markets manufacture the very fact they measure. These are the ones Lattice won't list.",
    'tesis.c3.read': '6 min · Read →',
    'terminal.heading': 'The edge, in numbers.',
    'insight.closesIn': 'CLOSES IN 6D',
    'insight.blurTitle': 'BTC breaks $128K before 09/30 — declared prob. 78%',
    'insight.blurMeta': 'entry 122.4K · target 128K · stop 117.9K',
    'insight.streak': 'STREAK 14×',
    'insight.hitRate': '71% HIT RATE',
    'insight.unlock': 'Unlock Alpha — $5.00',
    'insight.refundNote': 'IF IT FAILS → AUTOMATIC REFUND FROM THE GUARANTEE',
    'feat.reembolso.t': 'Refund',
    'feat.reembolso.d': 'If the Maker fails, the contract returns what you paid. Automatic, no disputes.',
    'feat.reputacion.t': 'Reputation',
    'feat.reputacion.d': 'A number computed over resolved facts, not over opinions.',
    'feat.termometro.t': 'Thermometer',
    'feat.termometro.d': "The market's live performance: minimum, average, your Maker, and the top.",
    'feat.categorias.t': 'Categories',
    'feat.categorias.d': "Only markets with an objective oracle. Nothing that can't be resolved.",
    'audit.earlyAccess': 'Early access:',
  },
};

const featureLinks = [
  {
    key: 'reembolso',
    href: '/ventaja#reembolso',
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" role="img" aria-label="Cápsula contenida dentro de otra" style={{ width: 40, height: 40, flex: 'none', display: 'block', marginBottom: 28 }}>
        <rect x="7" y="16" width="34" height="16" rx="8" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <rect x="16" y="20.5" width="16" height="7" rx="3.5" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    ),
  },
  {
    key: 'reputacion',
    href: '/ventaja#reputacion',
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" role="img" aria-label="Tres cuadrados superpuestos en diagonal" style={{ width: 40, height: 40, flex: 'none', display: 'block', marginBottom: 28 }}>
        <rect x="10" y="10" width="16" height="16" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <rect x="16" y="16" width="16" height="16" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <rect x="22" y="22" width="16" height="16" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    ),
  },
  {
    key: 'termometro',
    href: '/ventaja#termometro',
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" role="img" aria-label="Curva de campana con línea base" style={{ width: 40, height: 40, flex: 'none', display: 'block', marginBottom: 28 }}>
        <line x1="6" y1="38" x2="42" y2="38" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d="M 8 34 C 13 33 16 27 19 18 C 21 11.5 23.5 11.5 25.5 18 C 29 29 35 33 42 34" fill="none" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    ),
  },
  {
    key: 'categorias',
    href: '/ventaja#categorias',
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" role="img" aria-label="Cadena de nodos en zigzag" style={{ width: 40, height: 40, flex: 'none', display: 'block', marginBottom: 28 }}>
        <circle cx="9" cy="34" r="3.5" fill="none" stroke="#0A0A0B" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <circle cx="20" cy="16" r="3.5" fill="none" stroke="#0A0A0B" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <circle cx="31" cy="32" r="3.5" fill="none" stroke="#0A0A0B" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <circle cx="42" cy="14" r="3.5" fill="none" stroke="#0A0A0B" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <line x1="11.3" y1="30.2" x2="17.7" y2="19.8" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <line x1="22.5" y1="19.7" x2="28.5" y2="28.3" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <line x1="33.3" y1="28.2" x2="39.7" y2="17.8" stroke="#0A0A0B" strokeWidth="1.25" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  const { lang } = useLang();
  const t = usePageT(T);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', overflowX: 'clip' }}>
      <Nav variant="landing" />

      {/* HERO */}
      <section style={s('position:relative;padding:clamp(96px,14vh,150px) 24px clamp(48px,7vw,96px)')}>
        <div style={s('max-width:1200px;margin:0 auto;display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:center;gap:clamp(20px,4vw,56px)')}>
          <div style={s('flex:1 1 380px;min-width:300px;max-width:620px;margin:0 auto')}>
            <lattice-globe speed="1" show-chips="true" style={{ display: 'block', width: '100%', aspectRatio: '1 / 1' }} />
          </div>
          <div style={s('flex:1 1 420px;min-width:290px')}>
            <h1 style={s("margin:0 0 22px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:clamp(40px,5.4vw,68px);line-height:1.04;letter-spacing:-0.035em")}>
              <span>{t('hero.h1a')}</span>
              <span style={s('color:var(--color-accent)')}>
                {t('hero.h1b')}
              </span>
              <span>{t('hero.h1c')}</span>
            </h1>
            <p style={s('margin:0 0 34px;font-size:clamp(16px,2vw,18px);line-height:1.65;color:#3F3F44;max-width:520px')}>{t('hero.sub')}</p>
            <div style={s('display:flex;flex-wrap:wrap;align-items:center;gap:14px')}>
              <Hoverable
                as="a"
                href="https://www.lttc.app/"
                style={s('padding:14px 28px;border-radius:999px;font-size:15px;font-weight:600;color:#FFFFFF;background:var(--color-accent);box-shadow:var(--shadow-card);transition:transform 0.25s ease')}
                hoverStyle={s('transform:translateY(-1px);color:#FFFFFF')}
              >
                {t('cta.openTerminal')}
              </Hoverable>
              <Hoverable
                as={Link}
                href={langHref('#selector', lang)}
                style={s('padding:13px 26px;border-radius:999px;font-size:15px;font-weight:600;color:#0A0A0B;border:1.5px solid rgba(10,10,11,0.22);background:transparent;transition:border-color 0.25s ease')}
                hoverStyle={s('border-color:#0A0A0B;color:#0A0A0B')}
              >
                {t('cta.seeMakers')}
              </Hoverable>
            </div>
          </div>
        </div>
      </section>

      {/* SEÑAL VS RUIDO */}
      <section id="manifiesto" style={s('background:#FFFFFF;border-top:1px solid rgba(10,10,11,0.06)')}>
        <SenalNoRuido />
      </section>

      {/* LA TESIS */}
      <section id="producto" style={s('padding:clamp(88px,12vw,150px) 24px')}>
        <div style={s('max-width:1200px;margin:0 auto')}>
          <Reveal style={s('max-width:760px;margin-bottom:clamp(40px,6vw,64px)')}>
            <h2 style={s("margin:0 0 18px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:clamp(30px,4.4vw,48px);line-height:1.1;letter-spacing:-0.03em")}>
              {t('tesis.heading')}
            </h2>
            <p style={s('margin:0;font-size:clamp(15px,1.8vw,17px);line-height:1.7;color:#5F5E5A')}>{t('tesis.sub')}</p>
          </Reveal>
          <div style={s('display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px')}>
            <TesisCard num="01" href="/research/democracia-del-intelecto" bg="/assets/gradient-1.png" title={t('tesis.c1.title')} desc={t('tesis.c1.desc')} read={t('tesis.c1.read')} />
            <TesisCard num="02" href="/research/asimetria-de-informacion" bg="/assets/gradient-2.png" title={t('tesis.c2.title')} desc={t('tesis.c2.desc')} read={t('tesis.c2.read')} />
            <TesisCard num="03" href="/research/constitucion-humanista" bg="/assets/gradient-3.png" title={t('tesis.c3.title')} desc={t('tesis.c3.desc')} read={t('tesis.c3.read')} />
          </div>
        </div>
      </section>

      {/* TERMINAL */}
      <section id="terminal" style={s('background:#FFFFFF;border-top:1px solid rgba(10,10,11,0.06);padding:clamp(88px,12vw,150px) 24px')}>
        <div style={s('max-width:1200px;margin:0 auto')}>
          <Reveal style={s('max-width:720px;margin-bottom:clamp(40px,6vw,60px)')}>
            <h2 style={s("margin:0;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:clamp(30px,4.4vw,48px);line-height:1.1;letter-spacing:-0.03em")}>
              {t('terminal.heading')}
            </h2>
          </Reveal>

          <div style={s('display:flex;flex-wrap:wrap;gap:20px;align-items:stretch;margin-bottom:20px')}>
            <Reveal style={s('flex:1.25 1 460px;min-width:300px;min-height:330px;background:#0A0A0B;border-radius:16px;padding:clamp(16px,2.2vw,26px);display:flex;flex-wrap:wrap;gap:clamp(16px,2vw,24px);box-shadow:0 24px 60px rgba(10,10,11,0.18)')}>
              <div style={s('flex:1 1 230px;min-width:225px;background:linear-gradient(160deg,#221510,#0F0C0A 55%,#181008);border:1px solid var(--color-accent-line);border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:12px')}>
                <div style={s('display:flex;align-items:center;justify-content:space-between;gap:10px')}>
                  <span style={s("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#F5F5F3")}>INSIGHT #04217</span>
                  <span style={s("flex:none;padding:3px 9px;border:1px solid var(--color-accent-line);border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;color:var(--color-accent)")}>
                    {t('insight.closesIn')}
                  </span>
                </div>
                <p style={s("margin:0;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#8A8A90")}>CRYPTO · SPREAD 0.1%</p>
                <div aria-hidden="true" style={s('filter:blur(7px);user-select:none;pointer-events:none')}>
                  <p style={s("margin:0 0 6px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;line-height:1.4;color:#F5F5F3")}>{t('insight.blurTitle')}</p>
                  <p style={s("margin:0;font-family:'JetBrains Mono',monospace;font-size:11px;color:#B4B2AA")}>{t('insight.blurMeta')}</p>
                </div>
                <div style={s('display:flex;align-items:center;gap:8px;flex-wrap:wrap')}>
                  <span style={s("width:26px;height:26px;border-radius:50%;background:var(--color-accent);display:inline-flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;color:#0A0A0B")}>
                    C
                  </span>
                  <span style={s("font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;color:#F5F5F3")}>@cold_stat17</span>
                  <span style={s("padding:2px 8px;border:1px solid var(--color-accent-line);border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.08em;color:var(--color-accent)")}>
                    {t('insight.streak')}
                  </span>
                  <span style={s("font-family:'JetBrains Mono',monospace;font-size:10px;color:#B4B2AA")}>{t('insight.hitRate')}</span>
                </div>
                <Hoverable
                  as="a"
                  href="#selector"
                  style={s('margin-top:auto;text-align:center;padding:12px 16px;border-radius:999px;font-size:14px;font-weight:600;color:#FFFFFF;background:var(--color-accent);box-shadow:var(--shadow-card);transition:transform 0.25s ease')}
                  hoverStyle={s('transform:translateY(-1px);color:#FFFFFF')}
                >
                  {t('insight.unlock')}
                </Hoverable>
                <p style={s("margin:0;font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:0.09em;color:#8A8A90;text-align:center")}>{t('insight.refundNote')}</p>
              </div>
              <div style={s('flex:1.4 1 260px;min-width:250px')}>
                <lattice-live-feed style={{ display: 'block', width: '100%', height: '100%', minHeight: 235 }} />
              </div>
            </Reveal>

            <Reveal style={s('flex:1 1 320px;min-width:280px;min-height:330px;background:#F1EFE8;border-radius:16px;padding:clamp(18px,2.4vw,26px)')}>
              <lattice-termometro style={{ display: 'block', width: '100%', height: '100%', minHeight: 235 }} />
            </Reveal>
          </div>

          <div style={s('display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;align-items:stretch')}>
            {featureLinks.map((f) => (
              <Reveal key={f.key} as="div">
                <Hoverable
                  as={Link}
                  href={langHref(`/ventaja#${f.key}`, lang)}
                  style={s('display:flex;flex-direction:column;align-items:flex-start;background:#F1EFE8;border-radius:16px;padding:24px;color:#0A0A0B;transition:background 0.3s ease, transform 0.3s ease')}
                  hoverStyle={s('background:#EAE7DC;transform:translateY(-2px);color:#0A0A0B')}
                >
                  {f.icon}
                  <span style={s("font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;letter-spacing:-0.01em;margin-bottom:6px")}>{t(`feat.${f.key}.t`)}</span>
                  <span style={s('font-size:13px;line-height:1.5;color:#6B6A66')}>{t(`feat.${f.key}.d`)}</span>
                </Hoverable>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Selector />

      {/* SYSTEM AUDIT LOG */}
      <section id="auditoria" style={s('padding:0 24px clamp(88px,12vw,140px)')}>
        <Reveal style={s('max-width:1200px;box-sizing:border-box;margin:0 auto;background:#FAFAF8;border:1px solid rgba(10,10,11,0.12);border-radius:14px;padding:clamp(20px,3vw,28px)')}>
          <p style={s("margin:0 0 14px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#8A8A90")}>◆ SYSTEM AUDIT LOG</p>
          <lattice-audit-log style={{ display: 'block', width: '100%', minHeight: 140 }} />
          <WaitlistForm />
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
