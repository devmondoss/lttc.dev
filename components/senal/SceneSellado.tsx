'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  duration,
  easeOut,
  sceneSelladoBeats as beats,
  springBounce,
  springSoft,
} from '@/lib/motion';
import { SENAL, usePageT } from '@/lib/i18n';
import styles from './SceneSellado.module.css';

/** Etapas de la escena, en el orden de la tabla del spec. */
const STAGE = {
  idle: 0,
  row1In: 1,
  ring: 2,
  row1Sealed: 3,
  row2In: 4,
  row2Sealed: 5,
  ghosts: 6,
} as const;

const SCHEDULE: Array<[number, number]> = [
  [beats.row1Enter, STAGE.row1In],
  [beats.ringPulse, STAGE.ring],
  [beats.row1Seal, STAGE.row1Sealed],
  [beats.row2Enter, STAGE.row2In],
  [beats.row2Seal, STAGE.row2Sealed],
  [beats.ghost, STAGE.ghosts],
];

/** La hora aparece dígito a dígito: un carácter por vez, 60ms entre cada uno. */
function SealTime({ value, sealed, instant }: { value: string; sealed: boolean; instant: boolean }) {
  return (
    <span className={styles.time}>
      {value.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className={styles.digit}
          initial={false}
          animate={{ opacity: sealed ? 1 : 0 }}
          transition={
            instant
              ? { duration: 0 }
              : { duration: 0.12, ease: easeOut, delay: sealed ? i * 0.06 : 0 }
          }
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

type RowProps = {
  handle: string;
  event: string;
  time: string;
  sealedBy: string;
  /** 'hidden' | 'front' | 'back' — 'back' es la fila anterior, que sube y se apaga. */
  position: 'hidden' | 'front' | 'back';
  sealed: boolean;
  pulsing: boolean;
  instant: boolean;
};

function Row({ handle, event, time, sealedBy, position, sealed, pulsing, instant }: RowProps) {
  const target =
    position === 'hidden'
      ? { opacity: 0, scale: 0.96, y: 28 }
      : position === 'back'
        ? { opacity: 0.7, scale: 0.94, y: -6 }
        : { opacity: 1, scale: 1, y: 0 };

  return (
    <motion.div
      className={styles.row}
      initial={false}
      animate={target}
      transition={
        instant
          ? { duration: 0 }
          : position === 'front' && !sealed
            ? { duration: duration.enter, ease: easeOut }
            : springSoft
      }
    >
      <div className={styles.avatar}>
        <motion.span
          className={styles.ring}
          initial={false}
          animate={pulsing && !instant ? { scale: [1, 1.35], opacity: [0.9, 0] } : { opacity: 0 }}
          transition={instant ? { duration: 0 } : { duration: 0.7, ease: easeOut }}
        />
      </div>

      <div className={styles.text}>
        <div className={styles.meta}>
          {sealedBy} · {handle}
        </div>
        <div className={styles.event}>{event}</div>
      </div>

      <div className={styles.seal}>
        <motion.span
          className={styles.lock}
          initial={false}
          animate={{ rotate: sealed ? 0 : -12, opacity: sealed ? 1 : 0.35 }}
          transition={instant ? { duration: 0 } : springBounce}
        />
        <SealTime value={time} sealed={sealed} instant={instant} />
      </div>
    </motion.div>
  );
}

export default function SceneSellado() {
  const t = usePageT(SENAL);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<number>(STAGE.idle);

  useEffect(() => {
    // Movimiento reducido: estado final directo, sin coreografía.
    if (reduced) {
      setStage(STAGE.ghosts);
      return;
    }
    if (!inView) {
      setStage(STAGE.idle);
      return;
    }
    const timers = SCHEDULE.map(([at, next]) => window.setTimeout(() => setStage(next), at * 1000));
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduced]);

  const instant = Boolean(reduced);
  const ghostsIn = stage >= STAGE.ghosts;

  return (
    <div className={styles.block}>
      {/* data-stage expone la etapa para QA: el control visual la lee en vez de
          cronometrar, porque el panel de preview throttlea el render. */}
      <div ref={ref} className={styles.scene} data-stage={stage} aria-hidden="true">
        <Row
          sealedBy={t('senal.e1.sealedBy')}
          handle={t('senal.e1.row1.handle')}
          event={t('senal.e1.row1.event')}
          time={t('senal.e1.row1.time')}
          position={stage === STAGE.idle ? 'hidden' : stage >= STAGE.row2In ? 'back' : 'front'}
          sealed={stage >= STAGE.row1Sealed}
          pulsing={stage === STAGE.ring}
          instant={instant}
        />

        <Row
          sealedBy={t('senal.e1.sealedBy')}
          handle={t('senal.e1.row2.handle')}
          event={t('senal.e1.row2.event')}
          time={t('senal.e1.row2.time')}
          position={stage >= STAGE.row2In ? 'front' : 'hidden'}
          sealed={stage >= STAGE.row2Sealed}
          pulsing={false}
          instant={instant}
        />

        <div className={styles.ghosts}>
          <motion.div
            className={styles.ghost}
            initial={false}
            animate={{ opacity: ghostsIn ? 0.55 : 0, scale: ghostsIn ? 1 : 0.97 }}
            transition={instant ? { duration: 0 } : { duration: duration.enter, ease: easeOut }}
          />
          <motion.div
            className={styles.ghost}
            initial={false}
            animate={{ opacity: ghostsIn ? 0.3 : 0, scale: ghostsIn ? 1 : 0.97 }}
            transition={
              instant ? { duration: 0 } : { duration: duration.enter, ease: easeOut, delay: 0.08 }
            }
          />
        </div>
      </div>

      <h3 className={styles.label}>
        <span className={styles.labelSignal}>{t('senal.e1.label.signal')}</span>{' '}
        {t('senal.e1.label.noise')}
      </h3>
      <p className={styles.body}>{t('senal.e1.body')}</p>
    </div>
  );
}
