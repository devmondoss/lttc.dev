export {};

declare global {
  interface Window {
    __latticeLang?: 'es' | 'en';
  }

  namespace JSX {
    interface IntrinsicElements {
      'lattice-globe': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        speed?: string | number;
        'show-chips'?: string;
      };
      'lattice-exhibit': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        exhibit?: string;
      };
      'lattice-live-feed': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'lattice-termometro': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'lattice-audit-log': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
