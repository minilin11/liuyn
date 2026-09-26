'use client';

import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import './BlurText.css';

type AnimationSnapshot = {
  filter: string;
  opacity: number;
  y: number;
};

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (value: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  highlightWords?: string[];
};

const buildKeyframes = (from: AnimationSnapshot, steps: AnimationSnapshot[]) => ({
  filter: [from.filter, ...steps.map((step) => step.filter)],
  opacity: [from.opacity, ...steps.map((step) => step.opacity)],
  y: [from.y, ...steps.map((step) => step.y)],
});

export default function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (value) => value,
  onAnimationComplete,
  stepDuration = 0.35,
  highlightWords = [],
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo<AnimationSnapshot>(
    () => ({
      filter: 'blur(12px)',
      opacity: 0,
      y: direction === 'top' ? -38 : 38,
    }),
    [direction],
  );

  const defaultTo = useMemo<AnimationSnapshot[]>(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.55,
        y: direction === 'top' ? 4 : -4,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from(
    { length: stepCount },
    (_, index) => (stepCount === 1 ? 0 : index / (stepCount - 1)),
  );

  return (
    <p ref={ref} className={className}>
      {elements.map((segment, index) => {
        const cleanSegment = segment.replace(/[.,!?]/g, '');
        const isHighlighted = highlightWords.includes(cleanSegment);

        return (
          <motion.span
            className={`blur-text__segment${isHighlighted ? ' blur-text__segment--highlight' : ''}`}
            key={`${segment}-${index}`}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={{
              duration: totalDuration,
              times,
              delay: (index * delay) / 1000,
              ease: easing,
            }}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\u00a0' : segment}
            {animateBy === 'words' && index < elements.length - 1 ? '\u00a0' : null}
          </motion.span>
        );
      })}
    </p>
  );
}
