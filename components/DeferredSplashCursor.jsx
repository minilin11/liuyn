'use client';

import { lazy, Suspense, useEffect, useState } from 'react';

const SplashCursor = lazy(() => import('./SplashCursor'));

export default function DeferredSplashCursor(props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <SplashCursor {...props} />
    </Suspense>
  );
}
