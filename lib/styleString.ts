import type { CSSProperties } from 'react';

/** Parses a plain CSS declaration string ("display:flex;gap:12px") into a
 * React style object. Lets pages keep the exact inline styles from the
 * original design without hand-converting every property to camelCase. */
export function s(css: string): CSSProperties {
  const out: Record<string, string> = {};
  css.split(';').forEach((rule) => {
    const idx = rule.indexOf(':');
    if (idx === -1) return;
    const prop = rule.slice(0, idx).trim();
    const val = rule.slice(idx + 1).trim();
    if (!prop || !val) return;
    const camel = prop.startsWith('--')
      ? prop
      : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[camel] = val;
  });
  return out as CSSProperties;
}
