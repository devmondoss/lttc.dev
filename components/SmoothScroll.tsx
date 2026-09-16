'use client';

import { useEffect } from 'react';

/** Le pone un techo a la velocidad del scroll: por más fuerte que trackees
 * o gires la rueda, nunca pasa de un ritmo parejo y un poco más lento que
 * el nativo, con inercia suave. Se desactiva solo con prefers-reduced-motion
 * y en pantallas táctiles (ahí el scroll nativo con momentum ya es el
 * correcto — pisarlo se siente mal en iOS/Android). */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    let lenis: import('lenis').default | undefined;
    let raf: number;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        // 0.75 acá hacía que cada vuelta de rueda moviera menos distancia,
        // o sea que había que scrollear MÁS para llegar al mismo lugar —
        // eso se siente como que cuesta más, no como que va más lento.
        // En 1, la distancia por gesto es la normal; lo que se frena es
        // sólo la transición (duration + easing), que es lo que se pidió.
        wheelMultiplier: 1,
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
