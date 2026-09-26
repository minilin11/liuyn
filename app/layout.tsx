import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '刘依娜｜视觉设计师作品集',
  description: '刘依娜个人作品集，聚焦品牌视觉、编辑设计、IP 形象与数字化创作。',
};

const introGuardScript = `
  (() => {
    try {
      const returningToSection = Boolean(location.hash && location.hash !== '#top');
      const hasPlayed = sessionStorage.getItem('liu-yina-entry-film-v4') === 'true';
      if (returningToSection || hasPlayed) {
        document.documentElement.classList.add('site-intro-skip');
      }
    } catch {}
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGuardScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
