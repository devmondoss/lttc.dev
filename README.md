# lttc.dev

Landing de Lattice, migrada a Next.js 14 (App Router) + TypeScript.

## Desarrollo

```bash
npm install
npm run dev
```

Requiere `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en `.env.local` para el endpoint de waitlist (`/api/waitlist`).

## Estructura

- `app/` — rutas (App Router): landing (`/`), `/ventaja`, `/research/*`, `/api/waitlist`.
- `components/` — Nav, Footer, i18n toggle, widgets compartidos, `senal/` (sección "Señal, no ruido"), `SmoothScroll` (scroll suave con Lenis).
- `lib/` — i18n (ES/EN), helper de estilos inline y `motion.ts` (easings/beats compartidos por las escenas animadas).
- `public/` — assets estáticos y los Web Components vanilla (`globe.js`, `exhibits.js`, `terminal-widgets.js`), cargados una vez desde `WidgetScripts`.
- `legacy-static-site/` — el sitio estático original (dc-runtime), archivado como referencia.

Ver `PLAN-animacion-scroll.md` para el historial de decisiones de diseño y los fixes de performance/layout de la sección "Señal, no ruido".
