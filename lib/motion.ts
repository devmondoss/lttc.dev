/** Resortes y tiempos con nombre para el sistema de movimiento.
 * Se importan desde acá: ningún componente redefine una curva. */

export const springSoft = { type: 'spring', stiffness: 260, damping: 30 } as const;
export const springSnappy = { type: 'spring', stiffness: 420, damping: 32 } as const;

export const duration = { enter: 0.45, exit: 0.3 } as const;

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const stagger = 0.08;

/** Resorte con rebote: para el giro del candado al sellar. */
export const springBounce = { type: 'spring', stiffness: 520, damping: 12, mass: 0.6 } as const;

/** Tiempos de la escena 1 (segundos), tal como los define la tabla del spec. */
export const sceneSelladoBeats = {
  row1Enter: 0,
  ringPulse: 0.2,
  row1Seal: 0.7,
  row2Enter: 1.5,
  row2Seal: 2.1,
  ghost: 2.6,
} as const;

/** Tiempos de la escena 2 (segundos), tal como los define la tabla del spec. */
export const sceneLiquidadoBeats = {
  pillEnter: 0,
  arcClose: 1.4,
  settle: 1.6,
  source: 2.1,
  wave: 2.3,
} as const;
