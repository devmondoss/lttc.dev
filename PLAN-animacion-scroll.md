# Animación de scroll "Señal, no ruido" — rediseño

> Estado: **IMPLEMENTADO**. Este doc registra qué se cambió, dónde y por qué.
> Portado desde el repo anterior (sitio estático dc-runtime) a este repo Next.js.
> Última actualización: 2026-08-20.

---

## 0. Dónde vive

| Cosa | Ubicación |
|---|---|
| Lógica de la animación | `public/scene.js` (custom element `<signal-noise-scene>`) |
| Montaje en la página | `app/page.tsx` → `<signal-noise-scene />`, script cargado por `components/WidgetScripts.tsx` |
| Altura del scroll-scrub | `public/scene.js` → `height = '360vh'` |
| Driver del scroll | GSAP ScrollTrigger `@3.12.5` (`scrub: 0.4`), con fallback a `scroll` + `rAF` |

La animación es un **scrub por scroll**: un progreso `p` de 0 → 1 que redibuja todo en
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
