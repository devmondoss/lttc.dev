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
- `components/` — Nav, Footer, i18n toggle, widgets compartidos.
- `lib/` — i18n (ES/EN) y helper de estilos inline.
- `public/` — assets estáticos y los Web Components originales (`globe.js`, `scene.js`, `exhibits.js`, `terminal-widgets.js`), sin cambios respecto a la versión anterior.
- `legacy-static-site/` — el sitio estático original (dc-runtime), archivado como referencia.
