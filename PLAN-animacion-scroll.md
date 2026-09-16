# Animación de scroll "Señal, no ruido" — rediseño

> Estado: **SUPERADO**. Las secciones 1-7 de abajo documentan el sistema viejo
> (`public/scene.js`, `<signal-noise-scene>`), que fue **reemplazado por completo**
> el 2026-09-16 al mergear `feat/landing-senal-v3`: se borró `public/scene.js` y la
> animación ahora vive como componentes React en `components/senal/` (ver sección 9).
> Se dejan las secciones viejas como referencia histórica de las decisiones de diseño,
> pero **ningún archivo que mencionan sigue existiendo**.
> Última actualización: 2026-09-16.

---

## 0. Dónde vivía (sistema viejo, ya no existe)

| Cosa | Ubicación |
|---|---|
| Lógica de la animación | ~~`public/scene.js`~~ (custom element `<signal-noise-scene>`) — **borrado** |
| Montaje en la página | ~~`app/page.tsx` → `<signal-noise-scene />`~~ |
| Altura del scroll-scrub | ~~`public/scene.js` → `height = '360vh'`~~ |
| Driver del scroll | ~~GSAP ScrollTrigger `@3.12.5`~~ |

La animación era un **scrub por scroll**: un progreso `p` de 0 → 1 que redibujaba todo en
`_apply(p)`. Tres escenas encadenadas:

- **Escena 1 (p 0 → 0.21)** — el Maker sunset y sus métricas verificadas.
- **Escena 2 (p 0.14 → 0.35)** — zoom-out: el Maker queda solo en un mar de ruido gris.
- **Escena 3 (p 0.35 → 1)** — el ruido sale a la izquierda y entra la red Lattice ordenada.

---

## 1. Copy del subtítulo

**Problema:** "El filtro **financiero** expulsa a los charlatanes antes de que hablen"
encasillaba el producto en finanzas, cuando la landing cubre NBA, cripto, política,
clima, economía, etc.

**Cambio** (`SCENE_T`):
- ES: `Cuando equivocarse cuesta, los charlatanes se callan solos.`
- EN: `When being wrong costs money, the charlatans go quiet on their own.`

Mantiene el concepto (el costo de fallar es el filtro) sin atarlo a una vertical.

---

## 2. Escena 1 — el Maker sunset con métricas orbitando

**Antes:** una tarjeta con avatar negro y un estallido de corazones y puntos grises
(métricas de vanidad tipo red social).

**Ahora:**
- El avatar de la tarjeta es **sunset** (`#FF6B00`), igual que el nodo del Maker.
- Se eliminó el estallido de corazones (`_burst`) y en su lugar hay **5 chips que
  aparecen uno por uno y orbitan** alrededor de la tarjeta, en el mismo lenguaje visual
  sunset que los tags de la escena 3.
- Los chips acompañan el zoom-out (su radio se achica junto con la cámara) y al final
  **el ruido se los traga**, que es justo el punto narrativo: el Maker real existe, pero
  queda enterrado bajo el ruido.

### Qué rota y qué no
**Sólo rotan las categorías.** Las métricas son fijas: son la prueba de que el Maker
tiene track record, así que no tiene sentido que cambien de visita en visita. Lo que
cambia es la vertical, para dejar claro que la red no vive de una sola.

- **Fijas** (`SCENE1_STATS`, siempre en el mismo lugar de la órbita):
  `95% win rate`, `45% yield`, `racha 10`.
- **Rotan** (`SCENE1_CATS`, 10 opciones, se sortean 2 por carga): NBA, Cripto, Política,
  Fútbol, Clima, Economía, IA, Comercio, Elecciones, F1.
- Las dos categorías caen en **slots no contiguos** (posiciones 1 y 4 de las 5) para que
  queden repartidas y no pegadas. El ángulo de arranque es fijo, así lo único que varía
  entre cargas son las categorías.
- Todo tiene traducción es/en y se actualiza con el toggle de idioma
  (ej. `IA → AI`, `racha 10 → 10 streak`).

Verificado en 6 cargas: las 3 métricas idénticas y en la misma posición siempre; los
pares de categorías salieron Cripto/F1, Elecciones/Economía, Clima/Comercio, IA/Comercio,
F1/Economía, Clima/Economía.

> Para cambiar el set: editar `SCENE1_STATS` (métricas fijas) o agregar entradas a
> `SCENE1_CATS` (pool que rota) en `public/scene.js`. Cada entrada necesita `es` y `en`.

---

## 3. Escena 2 — sunset al medio, ruido puro gris

- `chaosPts` ya **no genera brasas sunset** (antes ~15% de los puntos del ruido eran
  naranjas). Ahora la multitud es 100% gris, así **el único punto sunset de la escena es
  el Maker del centro** y la señal se lee sola.
- El nodo del Maker es sunset fijo y un poco más grande (r 6 → 7). Se eliminó la
  interpolación negro→sunset y sus helpers (`lerpColor`, `INK`, `SUNSET`).

### Labels del ruido
- **Sobre el aro** (`RING_PHRASES`): `lmao` → **`dump`**. Quedan: `1000x gem`,
  `it's pointless`, `dump`, `buy my coin`.
- **Flotando fuera** (`OUT_WORDS`): se sacaron `jsjs` y `xd`, y se sumó el ángulo de
  credenciales/nepotismo: **`nepo pick`** y **`trust me bro`** (el clásico "fuente:
  confiá en mí", que es exactamente la falta de track record). Quedan: `wen`,
  `to the moon`, `nepo pick`, `trust me bro`.

---

## 4. Escena 3 — señal más notoria y de tamaño homogéneo

El pedido fue: los puntos sunset más notorios, homogeneizando **el tamaño pero no el orden**.

- **La causa del tamaño disparejo:** el radio estaba atado al avance de la aparición
  (`r = 3 * (0.3 + 0.7*np)`), y como cada punto entra escalonado, a media animación
  convivían tamaños distintos. Ahora el radio es **fijo** y solo se anima la opacidad:
  se mantiene el escalonado de entrada (el orden) y desaparece la variación de tamaño.
- **Más notorios:** radio de 3 → **5**.

---

## 5. Responsive

En pantallas chicas los chips ocupaban una fracción mucho mayor del círculo y pisaban la
tarjeta del Maker. Se agregó un ajuste en `_layoutScene`: con el círculo por debajo de
400px, los chips bajan a 9.5px de fuente con padding menor y orbitan a mayor radio
(27% en vez de 20%).

Verificado en 375x812 y 1280x820: ningún chip pisa la tarjeta ni se sale de pantalla.

---

## 6. Verificación hecha

- Sintaxis (`node --check`) y consola del navegador sin errores.
- Sin referencias muertas tras quitar el estallido (`_burst`, `lerpColor`, `EMBERS`, `INK`, `SUNSET`).
- Recorrido completo del scroll real con ScrollTrigger (progreso 0 → 1): los conceptos
  entran uno por uno, el ruido se los traga, y al final aparecen los 30 nodos de la red.
- Toggle ES/EN sobre la escena.
- Sorteo verificado en 6 cargas.
- `prefers-reduced-motion`: sigue saltando al estado final ordenado.

---

## 7. Observación pendiente (no se tocó)

Al final de la animación el círculo de ruido se desplaza a la izquierda y queda
**superpuesto al texto** "Señal, no ruido." Es un comportamiento que ya existía antes de
estos cambios (se ve igual en las capturas previas). No se modificó porque tocarlo
implica recalibrar la coreografía de salida. Si molesta, la vía es recortar el
desplazamiento o bajarle la opacidad final al grupo del ruido.


---

## 8. Fixes de layout aplicados en este repo (2026-08-20)

### El globo quedaba recortado
La migración a Next convirtió el `hint-size="100%,420px"` del dc-runtime (que era solo
el placeholder de carga) en un `height: 420px` real. Pero `globe.js` se dimensiona solo:
se pone `aspect-ratio: 1 / 1` y dibuja el canvas al tamaño de su `clientWidth` (552px).
Con la altura clavada en 420 la esfera se cortaba y los chips caían fuera del círculo.

**Fix:** en `app/page.tsx` el globo usa `aspectRatio: '1 / 1'` en vez de `height`, y el
elemento vuelve a ser cuadrado (552x552 en desktop, 311x311 en mobile).

### Los contenedores no estaban alineados
Cada sección traía su propio `max-width`, heredado del sitio original:

| Sección | max-width | Borde del contenido a 1920px |
|---|---|---|
| nav / hero | 1200 | 360 |
| producto / selector / footer | 1160 | 380 |
| terminal | 1240 | 340 |

Al scrollear, el contenido saltaba entre 340, 360 y 380px. **Fix:** todos los
contenedores unificados a **1200px**, que es el ancho del nav (el ancla visual de la
página). El card de auditoría lleva `box-sizing: border-box` para que su borde exterior
caiga en el mismo eje. Verificado: todas las secciones alinean a 360-1560 en 1920px, y a
32-343 en 375px, sin overflow horizontal.

---

## 9. Sesión 2026-09-16 — rework "Señal, no ruido" + performance + scroll

### 9.1 La animación vieja fue reemplazada

`public/scene.js` (sección 0-8 de arriba) se borró. La sección "Señal, no ruido" ahora
es React puro:

| Cosa | Ubicación |
|---|---|
| Wrapper de la sección | `components/senal/SenalNoRuido.tsx` + `.module.css` |
| Escena 1 — "Antes, no después" (sellado) | `components/senal/SceneSellado.tsx` |
| Escena 2 — "Contrato, no promesa" (liquidado) | `components/senal/SceneLiquidado.tsx` |
| Escena 3 — "Pruebas, no likes" (sin ruido) | `components/senal/SceneSinRuido.tsx` |
| Motor de animación | `motion/react` (Framer Motion) + `lib/motion.ts` (beats/easings compartidos) |

Cada escena usa `useInView` (umbral 60%) y una tabla `SCHEDULE` de `[segundo, stage]`
para coreografiar su secuencia con `setTimeout`. **Juegan una sola vez**: un
`playedRef` evita que la coreografía completa se repita cada vez que se vuelve a
scrollear la sección (antes se reiniciaba en cada entrada/salida del viewport, en
cualquier dirección — costaba rendimiento y se sentía repetitivo).

El título de la izquierda (`SenalNoRuido.module.css` `.aside`) **ya no usa
`position: sticky`** — combinado con `align-items: center` producía un salto/glitch de
scroll inconsistente entre navegadores (confirmado en WebKit real). Ahora es estático,
centrado verticalmente en su columna vía `align-items: center` en `.inner`.

### 9.2 Bug real: timers de fondo sin pausar (la causa del lag)

Varios widgets corrían `setInterval` **para siempre**, sin importar si estaban en
pantalla, moviendo DOM/estado de React en segundo plano durante todo el scroll:

| Widget | Archivo | Intervalo | Fix |
|---|---|---|---|
| System Audit Log | `public/terminal-widgets.js` | 1400ms | Pausa/reanuda con `IntersectionObserver` (helper `watchVisibility`) |
| Live Feed | `public/terminal-widgets.js` | 2800ms | Idem |
| Termómetro | `public/terminal-widgets.js` | 2000ms | Idem |
| Globo (rotación + chips) | `public/globe.js` | rAF continuo + 2000ms/chip | Flag `_visible` vía `IntersectionObserver`; se salta `_drawOverlay`/`update` y el toggle de chips cuando no es visible |
| Selector — contador de ganancias del Maker | `components/Selector.tsx` | 2700ms | Mismo patrón: `IntersectionObserver` sobre la `<section>`, `start()`/`stop()` del interval |

El audit log además tenía un bug de **layout shift real**: su lista usaba
`min-height` sin `overflow`, así que al apilar varias líneas de golpe la caja crecía y
empujaba todo lo que venía después en la página (formulario, footer). Fix: altura fija
(`140px`) + `overflow: hidden`.

Verificado con tests automatizados (no solo visual):
- Conteo de nodos DOM estable (343, sin cambio) durante 60s con los widgets activos.
- Heap de JS con el patrón normal de sube-y-baja de GC, sin fuga.
- Conteo de `setInterval` activos **constante** (10) a lo largo de 15 ciclos de
  scroll-adentro/scroll-afuera, mientras el total creado-y-limpiado sube — confirma que
  cada pausa cancela de verdad el timer, no se acumulan.
- Trace de CPU real (Chrome DevTools Protocol) antes/después: ~40% menos tiempo de hilo
  principal en el mismo recorrido de scroll completo.
- Barrido completo del repo (`grep` de `setInterval`/`setTimeout`/`requestAnimationFrame`/
  `addEventListener` en `app/`, `components/`, `public/*.js`) confirmando que no quedan
  más timers sin pausar fuera de lo ya listado.

### 9.3 Scroll con velocidad tope (Lenis)

`components/SmoothScroll.tsx` inicializa [Lenis](https://github.com/darkroomengineering/lenis)
en el layout raíz: por más fuerte/rápido que se scrollee, el movimiento queda acotado y
eased (`duration: 1.1`, ease-out cúbico) en vez de saltar directo al destino. Se
desactiva completo bajo `prefers-reduced-motion` y en `pointer: coarse` (táctil), donde
el scroll nativo con momentum es el comportamiento correcto.

`wheelMultiplier` quedó en `1` (no `0.75`): bajarlo reduce cuánto avanza cada gesto de
scroll, lo que se siente como que "cuesta más" scrollear en vez de sentirse "más lento".
Lo que se frena es solo la transición (duration/easing), no la distancia por gesto.

`app/globals.css` — `scroll-behavior` pasó de `smooth` a `auto` en el selector `html`
base: el smooth nativo del navegador peleaba contra el de Lenis (por ejemplo en
navegación por anchors).

### 9.4 Otros fixes de UI

- **Hero** (`app/page.tsx`): pasó a `min-height: calc(100svh - 68px)` con contenido
  centrado — antes su alto dependía solo del contenido, así que en pantallas anchas y
  bajas se asomaba la siguiente sección antes de scrollear.
- **"Tres problemas no feed puede resolver"**: las 3 `TesisCard` no tenían animación de
  entrada (única sección grande sin `Reveal`). Ya quedan envueltas en `<Reveal>`.
- **Formulario de "Early access"** (`components/WaitlistForm.tsx`): antes se confundía
  visualmente con el log de arriba (mismo gris monoespaciado). Ahora tiene su propia
  tarjeta con fondo `--color-accent-soft` y borde, para leerse como CTA.
- **Cierre de marca** (`components/BrandOutro.tsx`, nuevo): sección debajo del footer
  con el wordmark de Lattice en degradado (blanco → dorado → naranja) sobre un panel de
  vidrio (`backdrop-filter: blur(10px)`, más liviano que el blur original de 18px + una
  capa decorativa `blur(40px)` que se sacó por completo — medible: ~40% menos costo de
  hilo principal en el mismo trace de scroll tras sacarla).
