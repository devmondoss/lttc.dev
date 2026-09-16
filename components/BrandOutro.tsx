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
            width: 'clamp(220px,40vw,480px)',
            height: 'clamp(64px,11vw,132px)',
            background: 'linear-gradient(120deg,#FFFFFF 0%,#FFE8CE 45%,#FFB05C 80%,#FF7A33 100%)',
            WebkitMask: "url('/assets/wordmark-text.svg') center/contain no-repeat",
            mask: "url('/assets/wordmark-text.svg') center/contain no-repeat",
          }}
        />
      </div>
    </section>
  );
}
