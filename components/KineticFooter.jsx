'use client';

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';

const PixelBlast = lazy(() => import('./PixelBlast'));

const lines = [
  [
    { text: "LET'S", tone: 'light' },
    { text: 'MAKE IT', tone: 'red' },
  ],
  [{ text: 'MOVE.', tone: 'red' }],
];

export default function KineticFooter() {
  const sectionRef = useRef(null);
  const rafRef = useRef(0);
  const [effectsReady, setEffectsReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEffectsReady(true);
        observer.disconnect();
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const updateLetters = useCallback((clientX, clientY) => {
    const root = sectionRef.current;
    if (!root) return;

    root.querySelectorAll('[data-kinetic-letter]').forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const dx = clientX - x;
      const dy = clientY - y;
      const distance = Math.hypot(dx, dy);
      const influence = Math.max(0, 1 - distance / 230);

      letter.style.setProperty('--kx', `${Math.max(-22, Math.min(22, dx * 0.075 * influence))}px`);
      letter.style.setProperty('--ky', `${Math.max(-28, Math.min(28, dy * 0.11 * influence))}px`);
      letter.style.setProperty('--ksx', String(1 + influence * 0.18));
      letter.style.setProperty('--ksy', String(1 - influence * 0.12));
      letter.style.setProperty('--krotate', `${Math.max(-7, Math.min(7, dx * 0.024 * influence))}deg`);
    });
  }, []);

  const handlePointerMove = useCallback((event) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateLetters(event.clientX, event.clientY));
  }, [updateLetters]);

  const handlePointerLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    sectionRef.current?.querySelectorAll('[data-kinetic-letter]').forEach((letter) => {
      letter.style.removeProperty('--kx');
      letter.style.removeProperty('--ky');
      letter.style.removeProperty('--ksx');
      letter.style.removeProperty('--ksy');
      letter.style.removeProperty('--krotate');
    });
  }, []);

  let letterIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="kinetic-footer"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-labelledby="kinetic-footer-title"
    >
      <div className="kinetic-footer__pixels" aria-hidden="true">
        {effectsReady ? (
          <Suspense fallback={null}>
            <PixelBlast
              variant="circle"
              pixelSize={6}
              color="#ff0000"
              patternScale={3}
              patternDensity={1.2}
              pixelSizeJitter={0.5}
              enableRipples
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid
              liquidStrength={0.12}
              liquidRadius={1.2}
              liquidWobbleSpeed={5}
              speed={0.6}
              edgeFade={0.25}
              antialias={false}
              transparent
            />
          </Suspense>
        ) : null}
      </div>

      <div className="kinetic-footer__meta">
        <span>HAVE A STORY?</span>
        <span>AVAILABLE FOR SELECTED PROJECTS</span>
      </div>

      <h2 id="kinetic-footer-title" aria-label="Let's make it move">
        {lines.map((line, lineIndex) => (
          <span className="kinetic-footer__line" aria-hidden="true" key={lineIndex}>
            {line.map((word) => (
              <span className={`kinetic-footer__word kinetic-footer__word--${word.tone}`} key={word.text}>
                {Array.from(word.text).map((letter) => {
                  const index = letterIndex++;
                  return (
                    <span
                      data-kinetic-letter
                      className="kinetic-footer__letter"
                      style={{ '--letter-index': index }}
                      key={`${word.text}-${index}`}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  );
                })}
              </span>
            ))}
          </span>
        ))}
      </h2>

      <div className="kinetic-footer__contact">
        <a href="mailto:1840339754@qq.com">1840339754@qq.com</a>
        <a className="kinetic-footer__arrow" href="mailto:1840339754@qq.com" aria-label="发送邮件联系刘依娜">
          ↗
        </a>
      </div>
    </section>
  );
}
