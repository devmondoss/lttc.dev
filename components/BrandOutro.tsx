'use client';

/** Cierre de marca debajo del footer: el isotipo + wordmark de Lattice,
 * grandes, sobre una placa de vidrio (glassmorfismo) con fondo naranja.
 * Puramente decorativo — no repite texto que ya dice el footer. */
export default function BrandOutro() {
  return (
    <section
      aria-hidden="true"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg,#FF7A33,#E85C15 55%,#C8460D)',
        padding: 'clamp(64px,10vw,120px) 24px',
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: 1040,
          margin: '0 auto',
          padding: 'clamp(40px,7vw,72px) clamp(24px,6vw,64px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(16px,3vw,28px)',
          borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.28)',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 24px 80px rgba(120,40,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            flex: 'none',
            width: 'clamp(48px,9vw,108px)',
            height: 'clamp(48px,9vw,108px)',
            background: '#FFFFFF',
            WebkitMask: "url('/assets/isotipo.svg') center/contain no-repeat",
            mask: "url('/assets/isotipo.svg') center/contain no-repeat",
          }}
        />
        <span
          style={{
            display: 'inline-block',
            flex: 'none',
            width: 'clamp(160px,30vw,360px)',
            height: 'clamp(48px,9vw,108px)',
            background: '#FFFFFF',
            WebkitMask: "url('/assets/wordmark-text.svg') left center/contain no-repeat",
            mask: "url('/assets/wordmark-text.svg') left center/contain no-repeat",
          }}
        />
      </div>
    </section>
  );
}
