'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import Nav from './Nav';
import Footer from './Footer';
import Reveal from './Reveal';
import Hoverable from './Hoverable';
import { useLang, usePageT, langHref, type PageDict } from '@/lib/i18n';
import { s } from '@/lib/styleString';

export type Block =
  | { type: 'p'; k: string }
  | { type: 'h2'; k: string }
  | { type: 'pullquote'; k: string }
  | { type: 'figure'; exhibit: string; captionKey: string };

const pStyle = s('margin:0 0 26px;font-size:17.5px;line-height:1.7;color:#26262B');
const h2Style = s("margin:56px 0 20px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:clamp(24px,3vw,32px);line-height:1.15;letter-spacing:-0.02em");

function Rich({ html, style }: { html: string; style?: React.CSSProperties }) {
  return <p style={style ?? pStyle} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function ResearchArticle({
  T,
  blocks,
  sources,
  prev,
  next,
}: {
  T: PageDict;
  blocks: Block[];
  sources: ReactNode;
  prev: { href: string; titleKey: string } | null;
  next: { href: string; titleKey: string } | null;
}) {
  const { lang } = useLang();
  const t = usePageT(T);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8' }}>
      <Nav variant="solid" />

      <article style={s('padding:clamp(110px,15vh,150px) 24px clamp(72px,10vw,110px)')}>
        <div style={s('max-width:900px;margin:0 auto')}>
          <div style={s('max-width:68ch;margin:0 auto')}>
            <p style={s("margin:0 0 28px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.14em;color:#8A8A90")}>
              <Hoverable as={Link} href={langHref('/#producto', lang)} style={{ color: '#8A8A90' }} hoverStyle={{ color: '#FF6B00' }}>
                Research
              </Hoverable>{' '}
              <span>{t('meta.breadcrumbTail')}</span>
            </p>
            <h1
              style={s("margin:0 0 22px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:clamp(34px,5vw,52px);line-height:1.08;letter-spacing:-0.02em")}
              dangerouslySetInnerHTML={{ __html: t('h1') }}
            />
            <p
              style={s('margin:0 0 36px;font-family:Fraunces,serif;font-style:italic;font-size:clamp(18px,2.3vw,21px);line-height:1.5;color:#5F5E5A')}
              dangerouslySetInnerHTML={{ __html: t('dek') }}
            />
            <div style={s('display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-bottom:28px')}>
              <div>
                <p style={s("margin:0 0 4px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#8A8A90")}>{t('meta.writtenBy')}</p>
                <p style={s('margin:0;font-size:14px;font-weight:500;color:#1A1A1D')}>Equipo Lattice</p>
              </div>
              <div>
                <p style={s("margin:0 0 4px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#8A8A90")}>{t('meta.published')}</p>
                <p style={s('margin:0;font-size:14px;font-weight:500;color:#1A1A1D')}>{t('meta.publishedDate')}</p>
              </div>
              <div>
                <p style={s("margin:0 0 4px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#8A8A90")}>{t('meta.updated')}</p>
                <p style={s('margin:0;font-size:14px;font-weight:500;color:#1A1A1D')}>{t('meta.updatedDate')}</p>
              </div>
            </div>
            <div style={s("border-top:1px dotted #B9B7B0;margin-bottom:clamp(36px,5vw,52px)")} />
          </div>

          {(() => {
            const rows: ReactNode[] = [];
            let bucket: ReactNode[] = [];
            const flush = (key: string) => {
              if (bucket.length) {
                rows.push(
                  <div key={key} style={s('max-width:68ch;margin:0 auto')}>
                    {bucket}
                  </div>,
                );
                bucket = [];
              }
            };
            blocks.forEach((b, i) => {
              if (b.type === 'p') {
                bucket.push(<Rich key={i} html={t(b.k)} />);
              } else if (b.type === 'h2') {
                bucket.push(<h2 key={i} style={h2Style} dangerouslySetInnerHTML={{ __html: t(b.k) }} />);
              } else if (b.type === 'pullquote') {
                bucket.push(
                  <div key={i} style={s('display:flex;gap:20px;margin:44px 0')}>
                    <span style={s('width:3px;flex:none;border-radius:2px;background:linear-gradient(180deg,#FF3333,#FF6B00,#F5A623)')} />
                    <Rich
                      html={t(b.k)}
                      style={s("margin:0;font-family:Fraunces,serif;font-style:italic;font-weight:400;font-size:clamp(24px,3.4vw,34px);line-height:1.3;color:#0A0A0B")}
                    />
                  </div>,
                );
              } else if (b.type === 'figure') {
                flush(`pre-fig-${i}`);
                rows.push(
                  <Reveal key={i} as="figure" style={s('margin:clamp(44px,6vw,64px) auto;width:100%;max-width:68ch')}>
                    <lattice-exhibit exhibit={b.exhibit} style={{ display: 'block', width: '100%', minHeight: 460 }} />
                    <figcaption
                      style={s('margin:14px 0 0;padding-top:10px;border-top:1px solid rgba(10,10,11,0.08);font-size:12.5px;line-height:1.6;color:#8A8A90')}
                      dangerouslySetInnerHTML={{ __html: t(b.captionKey) }}
                    />
                  </Reveal>,
                );
              }
            });
            flush('tail');
            return rows;
          })()}

          <div style={s('max-width:68ch;margin:0 auto')}>
            <div style={s('margin:64px 0 0;border-top:1px solid rgba(10,10,11,0.12);padding-top:24px')}>
              <p style={s("margin:0 0 14px;font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.16em;color:#8A8A90")}>{t('sources.heading')}</p>
              <ul style={s('margin:0;padding:0 0 0 18px;font-size:13.5px;line-height:1.9;color:#5F5E5A')}>{sources}</ul>
            </div>
            <p style={s('margin:40px 0 0;font-size:12px;line-height:1.7;color:#8A8A90')}>{t('disclaimer')}</p>
          </div>

          <div style={s('margin:clamp(48px,7vw,72px) auto 0;border-top:1px solid rgba(10,10,11,0.12);padding-top:28px;display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between')}>
            {prev ? (
              <Link href={langHref(prev.href, lang)} style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 120 }}>
                <span style={s("font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#8A8A90")}>{t('nav.prev')}</span>
                <span style={s("font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px")}>{t(prev.titleKey)}</span>
              </Link>
            ) : (
              <span style={{ minWidth: 120 }} />
            )}
            <Hoverable
              as={Link}
              href={langHref('/#producto', lang)}
              style={s('padding:12px 24px;border-radius:999px;font-size:14px;font-weight:600;color:#0A0A0B;border:1.5px solid rgba(10,10,11,0.22)')}
              hoverStyle={s('border-color:#0A0A0B;color:#0A0A0B')}
            >
              {t('nav.backToResearch')}
            </Hoverable>
            {next ? (
              <Link href={langHref(next.href, lang)} style={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'right', minWidth: 120 }}>
                <span style={s("font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#8A8A90")}>{t('nav.next')}</span>
                <span style={s("font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px")}>{t(next.titleKey)}</span>
              </Link>
            ) : (
              <span style={{ minWidth: 120 }} />
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
