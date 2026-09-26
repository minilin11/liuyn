'use client';

import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react';
import { gsap } from 'gsap';

import './ChromaGrid.css';
import SpotlightCard from './SpotlightCard';

export type ChromaItem = {
  id?: string;
  title: string;
  subtitle?: string;
  handle?: string;
  borderColor?: string;
  gradient?: string;
  spotlightColor?: string;
  url?: string;
};

type ChromaGridProps = {
  items: ChromaItem[];
  className?: string;
  radius?: number;
  columns?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
};

export default function ChromaGrid({
  items,
  className = '',
  radius = 300,
  columns = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}: ChromaGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<ReturnType<typeof gsap.quickSetter> | null>(null);
  const setY = useRef<ReturnType<typeof gsap.quickSetter> | null>(null);
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    setX.current = gsap.quickSetter(element, '--x', 'px');
    setY.current = gsap.quickSetter(element, '--y', 'px');
    const { width, height } = element.getBoundingClientRect();
    position.current = { x: width / 2, y: height / 2 };
    setX.current(position.current.x);
    setY.current(position.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(position.current, {
      x,
      y,
      duration: damping,
      ease,
      overwrite: true,
      onUpdate: () => {
        setX.current?.(position.current.x);
        setY.current?.(position.current.y);
      },
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    moveTo(event.clientX - rect.left, event.clientY - rect.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handlePointerLeave = () => {
    gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{ '--r': `${radius}px`, '--cols': columns } as CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {items.map((item, index) => (
        <SpotlightCard
          key={item.id ?? index}
          className="chroma-card"
          spotlightColor={item.spotlightColor ?? 'rgba(255, 53, 40, 0.24)'}
          style={{
            '--card-border': item.borderColor ?? '#ff3528',
            '--card-gradient': item.gradient ?? 'linear-gradient(145deg, rgba(255, 53, 40, 0.09), #0c0b11 58%)',
          } as CSSProperties}
        >
          <div className="chroma-card-pattern" aria-hidden="true" />
          <div className="chroma-card-top">
            <span className="chroma-card-glyph" aria-hidden="true">{item.id ?? '•'}</span>
            <span className="chroma-card-index">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <footer className="chroma-info">
            {item.handle && <p className="handle">{item.handle}</p>}
            <h3>{item.title}</h3>
            <div className="chroma-rule" />
            {item.subtitle && <p className="role">{item.subtitle}</p>}
          </footer>
        </SpotlightCard>
      ))}
      <div className="chroma-overlay" aria-hidden="true" />
      <div ref={fadeRef} className="chroma-fade" aria-hidden="true" />
    </div>
  );
}
