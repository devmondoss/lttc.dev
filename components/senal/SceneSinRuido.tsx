'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import {
  duration,
  easeOut,
  sceneSinRuidoBeats as beats,
  springSoft,
  stagger,
} from '@/lib/motion';
import { SENAL, usePageT } from '@/lib/i18n';
import styles from './SceneSinRuido.module.css';

/** Etapas de la escena, en el orden de la tabla del spec. */
const STAGE = {
  idle: 0,
  post: 1,
  press: 2,
  swipe: 3,
  contract: 4,
  verdict: 5,
} as const;

const SCHEDULE: Array<[number, number]> = [
  [beats.postIn, STAGE.post],
  [beats.press, STAGE.press],
  [beats.swipe, STAGE.swipe],
  [beats.contract, STAGE.contract],
  [beats.verdict, STAGE.verdict],
];

/** El ruido sale escalonado, en el orden del spec: comentarios → contadores →
 * «Recomendado» → seguidores y «Seguir». Cada uno con su dirección y giro leve. */
const EXIT = {
  c1: { i: 0, x: -44, y: 6, rotate: -5 },
  c2: { i: 1, x: -56, y: 10, rotate: 4 },
  c3: { i: 2, x: -48, y: 4, rotate: -6 },
  likes: { i: 3, x: -38, y: 14, rotate: -6 },
  replies: { i: 4, x: -32, y: 18, rotate: 5 },
  reposts: { i: 5, x: -36, y: 12, rotate: -3 },
  reco: { i: 6, x: -62, y: -4, rotate: -2 },
  followers: { i: 7, x: 34, y: -14, rotate: 6 },
  follow: { i: 8, x: 48, y: -12, rotate: 7 },
} as const;

type NoiseKey = keyof typeof EXIT;

/** Un trozo de ruido: quieto hasta el barrido, después se va por su lado.
 * Sigue montado mientras se va — su lugar lo libera la contracción, no él. */
function Noise({
  part,
  gone,
  instant,
  className,
  children,
}: {
  part: NoiseKey;
  gone: boolean;
  instant: boolean;
  className?: string;
  children: ReactNode;
}) {
  const e = EXIT[part];
  return (
    <motion.div
      className={className}
      initial={false}
      animate={
        gone
          ? { opacity: 0, x: e.x, y: e.y, rotate: e.rotate }
          : { opacity: 1, x: 0, y: 0, rotate: 0 }
      }
      transition={
        instant
          ? { duration: 0 }
          : { duration: 0.36, ease: easeOut, delay: gone ? e.i * stagger : 0 }
      }
    >
      {children}
    </motion.div>
  );
}

export default function SceneSinRuido() {
  const t = usePageT(SENAL);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<number>(STAGE.idle);

  useEffect(() => {
    // Movimiento reducido: estado final directo, sin coreografía.
    if (reduced) {
      setStage(STAGE.verdict);
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
  const gone = stage >= STAGE.swipe;
  const contracted = stage >= STAGE.contract;
  const verdict = stage >= STAGE.verdict;

  return (
    <div className={styles.block}>
      {/* data-stage expone la etapa para QA: el control visual la lee en vez de
          cronometrar, porque el panel de preview throttlea el render. */}
      <div ref={ref} className={styles.scene} data-stage={stage} aria-hidden="true">
        <motion.div
          layout
          className={styles.card}
          initial={false}
          animate={{
            opacity: stage === STAGE.idle ? 0 : 1,
            scale: stage === STAGE.idle ? 0.96 : 1,
          }}
          transition={instant ? { duration: 0 } : springSoft}
        >
          <motion.div layout className={styles.head}>
            <div className={styles.avatar} />
            <div className={styles.handle}>{t('senal.e3.handle')}</div>
            <Noise part="followers" gone={gone} instant={instant} className={styles.followers}>
              · {t('senal.e3.followersCount')}
              {/* En pantallas angostas queda sólo el número, como el mock del
                  spec: mejor que truncar la palabra con puntos suspensivos */}
              <span className={styles.followersWord}> {t('senal.e3.followersWord')}</span>
            </Noise>
            <Noise part="follow" gone={gone} instant={instant} className={styles.follow}>
              {t('senal.e3.follow')}
            </Noise>
          </motion.div>

          {/* La ranura queda aunque «Recomendado» se vaya: el pronóstico no se mueve */}
          <motion.div layout className={styles.recoSlot}>
            <Noise part="reco" gone={gone} instant={instant} className={styles.reco}>
              {t('senal.e3.reco')}
            </Noise>
          </motion.div>

          {/* El texto del pronóstico no se mueve nunca: layout lo deja fijo y sin
              deformarse mientras la tarjeta se contrae a su alrededor. */}
          <motion.p layout className={styles.forecast}>
            {t('senal.e3.forecast')}
          </motion.p>

          {/* Contadores y comentarios: se van con el barrido y recién después
              se desmontan, para que la tarjeta se contraiga una sola vez */}
          <AnimatePresence initial={false}>
            {!contracted && (
              <motion.div key="noise" initial={false} exit={{ opacity: 0 }}>
                <div className={styles.counters}>
                  <Noise part="likes" gone={gone} instant={instant} className={styles.counter}>
                    <svg className={styles.counterIcon} viewBox="0 0 14 14">
                      <path d="M7 12.2C7 12.2 1.4 8.9 1.4 5.2a2.9 2.9 0 0 1 5.6-1.1 2.9 2.9 0 0 1 5.6 1.1c0 3.7-5.6 7-5.6 7Z" />
                    </svg>
                    {t('senal.e3.likes')}
                  </Noise>
                  <Noise part="replies" gone={gone} instant={instant} className={styles.counter}>
                    <svg className={styles.counterIcon} viewBox="0 0 14 14">
                      <path d="M12.3 8.2a1.4 1.4 0 0 1-1.4 1.4H4.2L1.7 12V2.9a1.4 1.4 0 0 1 1.4-1.4h7.8a1.4 1.4 0 0 1 1.4 1.4Z" />
                    </svg>
                    {t('senal.e3.replies')}
                  </Noise>
                  <Noise part="reposts" gone={gone} instant={instant} className={styles.counter}>
                    <svg className={styles.counterIcon} viewBox="0 0 14 14">
                      <path d="M3.2 5.1V3.7a1.4 1.4 0 0 1 1.4-1.4h6.2L8.9 4.4M10.8 8.9v1.4a1.4 1.4 0 0 1-1.4 1.4H3.2l1.9-2.1" />
                    </svg>
                    {t('senal.e3.reposts')}
                  </Noise>
                </div>

                <div className={styles.comments}>
                  <Noise part="c1" gone={gone} instant={instant} className={styles.comment}>
                    {t('senal.e3.c1')}
                  </Noise>
                  <Noise part="c2" gone={gone} instant={instant} className={styles.comment}>
                    {t('senal.e3.c2')}
                  </Noise>
                  <Noise part="c3" gone={gone} instant={instant} className={styles.comment}>
                    {t('senal.e3.c3')}
                  </Noise>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reserva su lugar desde el inicio: aparece sin empujar nada */}
          <motion.div
            layout
            className={styles.verdict}
            initial={false}
            animate={{ opacity: verdict ? 1 : 0 }}
            transition={instant ? { duration: 0 } : { duration: duration.enter, ease: easeOut }}
          >
            <span className={styles.sealed}>
              <span className={styles.lock} />
              {t('senal.e3.sealed')}
            </span>
            <span className={styles.hit}>
              <svg className={styles.hitIcon} viewBox="0 0 14 14">
                <path d="M2.6 7.4 L5.6 10.4 L11.4 4" />
              </svg>
              {t('senal.e3.hit')}
            </span>
          </motion.div>
        </motion.div>

        {/* Indicador táctil: presiona y barre hacia la izquierda */}
        <AnimatePresence initial={false}>
          {!instant && stage >= STAGE.press && stage < STAGE.contract && (
            <motion.div
              key="touch"
              className={styles.touch}
              initial={{ opacity: 0, scale: 1 }}
              animate={
                stage >= STAGE.swipe
                  ? { opacity: [1, 1, 0], scale: 0.9, x: -150 }
                  : { opacity: 1, scale: 0.9, x: 0 }
              }
              exit={{ opacity: 0 }}
              transition={
                stage >= STAGE.swipe
                  ? { duration: 0.55, ease: easeOut }
                  : { duration: 0.18, ease: easeOut }
              }
            />
          )}
        </AnimatePresence>
      </div>

      <h3 className={styles.label}>
        <span className={styles.labelSignal}>{t('senal.e3.label.signal')}</span>{' '}
        {t('senal.e3.label.noise')}
      </h3>
      <p className={styles.body}>{t('senal.e3.body')}</p>
    </div>
  );
}
