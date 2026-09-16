import type { Metadata } from 'next';
import SceneSellado from '@/components/senal/SceneSellado';
import SceneLiquidado from '@/components/senal/SceneLiquidado';

/** Laboratorio: sólo las escenas nuevas de «Señal, no ruido», para iterar sin
 * tocar la home. Fuera del índice: no es una página pública. */
export const metadata: Metadata = {
  title: 'Lab · Señal, no ruido',
  robots: { index: false, follow: false },
};

export default function LabSenalPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '80px 24px 160px',
        display: 'grid',
        justifyContent: 'center',
        gap: 48,
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-mono)',
          textTransform: 'uppercase',
          color: 'var(--color-ink-3)',
        }}
      >
        Lab · Señal, no ruido · escenas 1–2
      </p>

      {/* Espacio para que el disparo al 60% del viewport se pueda ver entrar. */}
      <div style={{ height: '40vh' }} aria-hidden="true" />

      <SceneSellado />

      {/* Separación para que cada escena dispare por su cuenta al 60%. */}
      <div style={{ height: '40vh' }} aria-hidden="true" />

      <SceneLiquidado />

      <div style={{ height: '60vh' }} aria-hidden="true" />
    </main>
  );
}
