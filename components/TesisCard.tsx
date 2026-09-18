'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'motion/react';
import { useLang, langHref } from '@/lib/i18n';

export default function TesisCard({
  num,
  href,
  bg,
  title,
  desc,
  read,
}: {
  num: string;
  href: string;
  bg: string;
  title: string;
  desc: string;
  read: string;
}) {
  const { lang } = useLang();
  const [mouseHover, setMouseHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLAnchorElement | null>(null);
  const inView = useInView(ref, { amount: 0.3 });

  // Por ancho de pantalla, no por si el dispositivo tiene mouse: debajo de
  // 900px la tarjeta toma su estado "hovered" sola al entrar en el
  // viewport, como en Selector. Reactivo si la ventana cambia de tamaño.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 899px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const hover = isMobile ? inView : mouseHover;

  return (
    <Link
      ref={ref}
      href={langHref(href, lang)}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      onFocus={() => setMouseHover(true)}
      onBlur={() => setMouseHover(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 300,
        background: '#F1EFE8',
        borderRadius: 22,
        padding: 'clamp(26px,3vw,36px)',
        cursor: 'pointer',
        transition: 'transform 0.45s ease, box-shadow 0.45s ease',
        color: '#0A0A0B',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? '0 14px 34px rgba(10,10,11,0.16)' : 'none',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${bg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: hover ? 1 : 0,
          transform: hover ? 'scale(1)' : 'scale(1.06)',
          transition: 'opacity 0.45s ease, transform 0.45s ease',
        }}
      />
      <span
        style={{
          position: 'relative',
          display: 'block',
          margin: '0 0 28px',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 12,
          color: hover ? '#1A1A1D' : '#8A8A90',
        }}
      >
        {num}
      </span>
      <span
        style={{
          position: 'relative',
          display: 'block',
          margin: '0 0 12px',
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 600,
          fontSize: 21,
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
        }}
      >
        {title}
      </span>
      <span
        style={{
          position: 'relative',
          display: 'block',
          margin: '0 0 24px',
          fontSize: 15,
          lineHeight: 1.65,
          color: hover ? '#1A1A1D' : '#5F5E5A',
        }}
      >
        {desc}
      </span>
      <span
        style={{
          position: 'relative',
          display: 'block',
          marginTop: 'auto',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 12,
          letterSpacing: '0.06em',
          color: hover ? '#1A1A1D' : '#8A8A90',
        }}
      >
        {read}
      </span>
    </Link>
  );
}
