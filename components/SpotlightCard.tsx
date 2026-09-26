'use client';

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react';

import './SpotlightCard.css';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  style?: CSSProperties;
};

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  style,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
    card.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`card-spotlight${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </div>
  );
}
