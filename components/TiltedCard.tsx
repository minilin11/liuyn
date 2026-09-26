'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

import './TiltedCard.css';

const springValues = { damping: 30, stiffness: 100, mass: 2 };

type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  captionText?: string;
  showTooltip?: boolean;
};

export default function TiltedCard({
  children,
  className = '',
  innerClassName = '',
  rotateAmplitude = 14,
  scaleOnHover = 1.04,
  captionText = '',
  showTooltip = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    x.set(event.clientX - rect.left + 14);
    y.set(event.clientY - rect.top + 14);
  };

  const handlePointerEnter = () => {
    if (prefersReducedMotion) return;
    scale.set(scaleOnHover);
    opacity.set(1);
  };

  const handlePointerLeave = () => {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div className={`tilted-card-inner ${innerClassName}`} style={{ rotateX, rotateY, scale }}>
        {children}
      </motion.div>
      {showTooltip && captionText && (
        <motion.figcaption className="tilted-card-caption" style={{ x, y, opacity }}>
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
