'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const INTRO_SESSION_KEY = 'liu-yina-entry-film-v4';

const resetEntryScroll = () => {
  if (!window.location.hash || window.location.hash === '#top') {
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
};

export default function SiteIntro() {
  const [phase, setPhase] = useState('entering');
  // Render the overlay in the server response so the homepage cannot flash
  // before hydration. useLayoutEffect removes it before paint when skipped.
  const [visible, setVisible] = useState(true);
  const shouldPlayRef = useRef(true);
  const leavingRef = useRef(false);
  const timersRef = useRef([]);

  const finish = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    } catch {
      // The page can still finish normally when session storage is unavailable.
    }
    resetEntryScroll();
    document.body.classList.remove('site-intro-running');
    document.body.classList.add('site-intro-complete');
    window.setTimeout(() => document.body.classList.remove('site-intro-complete'), 1500);
    setVisible(false);
  }, []);

  const leave = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setPhase('leaving');
    timersRef.current.push(window.setTimeout(finish, 980));
  }, [finish]);

  useLayoutEffect(() => {
    const returningToSection = Boolean(window.location.hash && window.location.hash !== '#top');
    let hasPlayed = false;

    try {
      hasPlayed = window.sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';
    } catch {
      hasPlayed = false;
    }

    if (returningToSection || hasPlayed) {
      shouldPlayRef.current = false;
      document.body.classList.remove('site-intro-running', 'site-intro-complete');
      setVisible(false);
      return undefined;
    }

    resetEntryScroll();
    document.body.classList.add('site-intro-running');
    setVisible(true);

    return () => {
      document.body.classList.remove('site-intro-running', 'site-intro-complete');
    };
  }, []);

  useEffect(() => {
    if (!shouldPlayRef.current) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      timersRef.current.push(window.setTimeout(leave, 120));
      return undefined;
    }

    timersRef.current.push(window.setTimeout(() => setPhase('holding'), 1500));
    timersRef.current.push(window.setTimeout(leave, 2450));

    return () => {
      timersRef.current.forEach(window.clearTimeout);
      timersRef.current = [];
    };
  }, [leave]);

  useEffect(() => {
    if (!shouldPlayRef.current) return undefined;

    const handleKey = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') leave();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [leave]);

  if (!visible) return null;

  return (
    <div className={`entry-film entry-film--${phase}`} role="status" aria-label="刘依娜视觉设计作品集正在开启">
      <div className="entry-film__grid" aria-hidden="true" />
      <div className="entry-film__beam" aria-hidden="true" />
      <div className="entry-film__frame" aria-hidden="true" />

      <header className="entry-film__meta" aria-hidden="true">
        <span>LY / VISUAL DESIGN</span>
        <span>PORTFOLIO ARCHIVE</span>
        <span>2026 / CN</span>
      </header>

      <div className="entry-film__stage" aria-hidden="true">
        <span className="entry-film__chapter">01 — OPENING FRAME</span>
        <p>IDEAS SHOULD BE SEEN</p>
        <h1>
          <span className="entry-film__title-row entry-film__title-row--light"><i>PORT</i></span>
          <span className="entry-film__title-row entry-film__title-row--red"><i>FOLIO</i></span>
        </h1>
        <div className="entry-film__discipline">
          <span>BRAND</span>
          <span>EDITORIAL</span>
          <span>IP DESIGN</span>
        </div>
      </div>

      <footer className="entry-film__footer">
        <span aria-hidden="true">LIU YINA © 2026</span>
        <div className="entry-film__timeline" aria-hidden="true"><i /></div>
        <button type="button" onClick={leave}>SKIP / 跳过</button>
      </footer>
    </div>
  );
}
