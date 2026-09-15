/** Resortes y tiempos con nombre para el sistema de movimiento.
 * Objetos planos: todavía no hay dependencia de motion. */

export const springSoft = { type: 'spring', stiffness: 260, damping: 30 } as const;
export const springSnappy = { type: 'spring', stiffness: 420, damping: 32 } as const;

export const duration = { enter: 0.45, exit: 0.3 } as const;

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const stagger = 0.08;
