---
name: lattice-ui
description: Sistema de interfaz de la landing de Lattice. Usar en cualquier tarea que cree o modifique interfaz en este repositorio: componentes, secciones, escenas animadas, movimiento, color, tipografía, espaciado, radios, sombras o estados (hover, foco, carga, vacío, error). Aplica tanto al escribir código nuevo como al ajustar el existente, incluso para un solo valor de color o un solo retoque de animación.
---

# Sistema de interfaz de Lattice

## 1. Principio

El color codifica, no decora. Un solo acento en toda la interfaz: `--color-accent`.
El acento marca lo que el usuario debe mirar o accionar, nunca adorna.

Nunca rojo. Nunca verde. El estado no se comunica por color de semáforo: se comunica
con texto, jerarquía y posición.

## 2. Reglas duras

- Ningún color, radio, sombra ni tipografía fuera de `app/tokens.css`. Si falta un
  valor, se agrega un token; no se escribe un literal.
- Todo número que el usuario lea lleva `font-variant-numeric: tabular-nums`, para que
  no baile al cambiar.
- Animar solo `transform` y `opacity`. Nunca `width`, `height`, `top` ni `left` de
  forma directa: los cambios de tamaño y posición se hacen con la prop `layout`.
- Toda animación cae a su estado final bajo `prefers-reduced-motion: reduce`. El
  contenido final es siempre el mismo, con movimiento o sin él.
- Lo animado y decorativo va con `aria-hidden`. El sentido lo carga texto real, legible
  por un lector de pantalla.
- Cero íconos, ilustraciones o assets de terceros. Las formas se construyen con CSS y
  con los tokens.

## 3. Componentes base

### Contenedor de escena
Fondo `--color-surface`, `border-radius: var(--radius-container)`, `padding: 32px`.
Envuelve una escena completa y le da su caja.

### Fila
Fondo `--color-card`, `border-radius: var(--radius-card)`, `box-shadow: var(--shadow-card)`.

Anatomía, de izquierda a derecha:
- Avatar de 36px a la izquierda.
- Bloque de dos líneas: etiqueta en `--color-ink-3` a `--text-sm`; debajo, título en
  `--color-ink` a `--text-base` con peso 600.
- Valor alineado a la derecha, con `tabular-nums`.

### Píldora de estado
`border-radius: var(--radius-pill)`, alto fijo de 44px. Contiene un ícono de 20px
construido en CSS más el texto del estado.

### Chip
`border-radius: var(--radius-pill)`, texto a `--text-xs` en `--font-mono`, fondo
`--color-accent-soft`, borde de 0.5px en `--color-accent-line`.

## 4. Movimiento

Los resortes y tiempos con nombre viven en `lib/motion.ts`; se importan desde ahí y no
se redefinen en el componente.

- `springSoft`: desplazamientos, reordenamientos y contracciones.
- `springSnappy`: apariciones y cambios de estado.
- `stagger` de 80ms entre elementos de un mismo grupo.
- Disparo por viewport con `useInView` al 60% del elemento. Se repite cada vez que
  sale y vuelve a entrar, no una sola vez.

## 5. Referencia

La especificación vigente de la sección es `docs/LANDING - Señal, no ruido.md`.
`docs/` es local y no se versiona, así que en un clon nuevo puede no estar presente:
si falta, pedirla antes de decidir contenido o estructura de esa sección.
