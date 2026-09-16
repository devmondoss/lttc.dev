'use client';

/** Cierre de marca debajo del footer: una placa de vidrio (glassmorfismo)
 * flotando sobre un fondo oscuro con el wordmark grande. Puramente
 * decorativo — no repite nada de lo que ya dice el footer. */
export default function BrandOutro() {
  return (
    <section
      aria-hidden="true"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0A0B',
        padding: 'clamp(64px,10vw,120px) 24px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          background:
            'radial-gradient(60% 60% at 30% 20%, rgba(232,92,21,0.35) 0%, rgba(232,92,21,0) 60%),' +
            'radial-gradient(50% 50% at 78% 80%, rgba(232,92,21,0.22) 0%, rgba(232,92,21,0) 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1040,
          margin: '0 auto',
          padding: 'clamp(40px,7vw,72px) clamp(24px,6vw,64px)',
          textAlign: 'center',
          borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.14)',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <p
          style={{
            margin: '0 0 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.24em',
            color: 'rgba(245,245,243,0.5)',
          }}
        >
          ◆ LATTICE
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 'clamp(48px,12vw,148px)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            color: '#F5F5F3',
          }}
        >
          Lattice
        </p>
      </div>
    </section>
  );
}
