import Script from 'next/script';

/** Carga los Web Components vanilla (sin cambios respecto al sitio original)
 * una sola vez, desde el layout raíz. Cada uno hace su propio
 * customElements.define y es un no-op si ya está registrado. */
export default function WidgetScripts() {
  return (
    <>
      <Script src="/globe.js" strategy="afterInteractive" />
      <Script src="/scene.js" strategy="afterInteractive" />
      <Script src="/exhibits.js" strategy="afterInteractive" />
      <Script src="/terminal-widgets.js" strategy="afterInteractive" />
    </>
  );
}
