'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { easeOut, sceneLiquidadoBeats as beats, springSnappy } from '@/lib/motion';
import { SENAL, usePageT } from '@/lib/i18n';
import styles from './SceneLiquidado.module.css';

/** Etapas de la escena, en el orden de la tabla del spec. */
const STAGE = {
  idle: 0,
  pillIn: 1,
  arcClose: 2,
  settled: 3,
  source: 4,
  wave: 5,
} as const;

const SCHEDULE: Array<[number, number]> = [
  [beats.pillEnter, STAGE.pillIn],
  [beats.arcClose, STAGE.arcClose],
  [beats.settle, STAGE.settled],
  [beats.source, STAGE.source],
  [beats.wave, STAGE.wave],
];

export default function SceneLiquidado() {
  const t = usePageT(SENAL);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<number>(STAGE.idle);
  // Se reproduce una sola vez: pasar por la sección de nuevo (en cualquier
  // dirección de scroll) no debe re-disparar la coreografía completa.
  const playedRef = useRef(false);

  useEffect(() => {
    // Movimiento reducido: estado final directo, sin coreografía.
    if (reduced) {
      setStage(STAGE.wave);
      return;
    }
    if (playedRef.current) return;
    if (!inView) {
      setStage(STAGE.idle);
      return;
    }
    const timers = SCHEDULE.map(([at, next]) =>
      window.setTimeout(() => {
        setStage(next);
        if (next === STAGE.wave) playedRef.current = true;
      }, at * 1000),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduced]);

  const instant = Boolean(reduced);
  const settled = stage >= STAGE.settled;
  const label = settled ? t('senal.e2.settled') : t('senal.e2.waiting');

  return (
    <div className={styles.block}>
      {/* data-stage expone la etapa para QA: el control visual la lee en vez de
          cronometrar, porque el panel de preview throttlea el render. */}
      <div ref={ref} className={styles.scene} data-stage={stage} aria-hidden="true">
        <motion.div
          layout
          className={`${styles.pill} ${settled ? styles.pillSettled : ''}`}
          initial={false}
          animate={{
            opacity: stage === STAGE.idle ? 0 : 1,
            scale: stage === STAGE.idle ? 0.96 : 1,
          }}
          transition={instant ? { duration: 0 } : springSnappy}
        >
          <motion.span layout="position" className={styles.icon}>
            {/* Estado A · spinner gris continuo; a 1.4s el arco se cierra */}
            <motion.span
              className={styles.layer}
              initial={false}
              animate={
                settled || instant
                  ? { opacity: 0, rotate: 0 }
                  : { opacity: 1, rotate: 360 }
              }
              transition={
                instant
                  ? { duration: 0 }
                  : settled
                    ? { duration: 0.18, ease: easeOut }
                    : { rotate: { duration: 0.9, ease: 'linear', repeat: Infinity }, opacity: { duration: 0.2 } }
              }
            >
              <svg viewBox="0 0 20 20" width="20" height="20">
                <circle className={styles.spinnerTrack} cx="10" cy="10" r="8" />
                <motion.circle
                  className={styles.spinnerArc}
                  cx="10"
                  cy="10"
                  r="8"
                  initial={false}
                  animate={{ pathLength: stage >= STAGE.arcClose ? 1 : 0.25 }}
                  transition={instant ? { duration: 0 } : { duration: 0.2, ease: easeOut }}
                />
              </svg>
            </motion.span>

            {/* Estado B · el círculo se llena de acento y el check se dibuja */}
            <motion.span
              className={styles.disc}
              initial={false}
              animate={{ scale: settled ? 1 : 0.3, opacity: settled ? 1 : 0 }}
              transition={instant ? { duration: 0 } : springSnappy}
            />
            <svg className={styles.layer} viewBox="0 0 20 20" width="20" height="20">
              <motion.path
                className={styles.check}
                d="M5.5 10.4 L8.6 13.5 L14.5 6.9"
                initial={false}
                animate={{ pathLength: settled ? 1 : 0, opacity: settled ? 1 : 0 }}
                transition={
                  instant ? { duration: 0 } : { duration: 0.28, ease: easeOut, delay: 0.06 }
                }
              />
            </svg>

            {/* Una sola onda, de 12 a 42px */}
            {stage >= STAGE.wave && !instant && (
              <motion.span
                className={styles.wave}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 0.7, ease: easeOut }}
              />
            )}
          </motion.span>

          <span className={styles.textWrap}>
            {/* Fantasma: fija el ancho actual; el cambio lo anima la prop layout */}
            <span className={styles.textGhost}>{label}</span>
            <AnimatePresence initial={false}>
              <motion.span
                key={settled ? 'settled' : 'waiting'}
                className={styles.textLive}
                initial={instant ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={instant ? { duration: 0 } : { duration: 0.28, ease: easeOut }}
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        {/* La fuente reserva su lugar desde el inicio: aparece sin mover nada */}
        <motion.div
          className={styles.source}
          initial={false}
          animate={{ opacity: stage >= STAGE.source ? 1 : 0 }}
          transition={instant ? { duration: 0 } : { duration: 0.3, ease: easeOut }}
        >
          {t('senal.e2.source')}
        </motion.div>
      </div>

      <h3 className={styles.label}>
        <span className={styles.labelSignal}>{t('senal.e2.label.signal')}</span>{' '}
        {t('senal.e2.label.noise')}
      </h3>
      <p className={styles.body}>{t('senal.e2.body')}</p>
    </div>
  );
}
