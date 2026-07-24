'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/** Reproduce el fade-up "data-reveal" del sitio original: arranca oculto si
 * está fuera de viewport y anima al entrar, respetando prefers-reduced-motion. */
export default function Reveal({
  children,
  style,
  as: As = 'div',
}: {
  children: ReactNode;
  style?: CSSProperties;
  as?: 'div' | 'figure';
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.92) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
    }
    el.style.transition =
      'opacity 0.7s cubic-bezier(0.2,0.6,0.2,1), transform 0.7s cubic-bezier(0.2,0.6,0.2,1)';

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            io.unobserve(el);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const As2 = As as any;
  return (
    <As2 ref={ref} style={style}>
      {children}
    </As2>
  );
}
