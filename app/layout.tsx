import type { Metadata } from 'next';
import { LangProvider } from '@/lib/i18n';
import WidgetScripts from '@/components/WidgetScripts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lattice — Haz que la verdad sea rentable',
  description: 'Accede a pronósticos de expertos auditados on-chain. Si su modelo falla, el smart contract te devuelve tu dinero automáticamente.',
  icons: { icon: '/assets/isotipo.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ minHeight: '100vh', background: '#FAFAF8' }}>
        <LangProvider>{children}</LangProvider>
        <WidgetScripts />
      </body>
    </html>
  );
}
