'use client';

import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  type ElementType,
  type ReactNode,
  type RefObject,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

type ScrollFloatProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  tag?: ElementType;
};

export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  tag = 'h2',
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return Array.from(text).map((char, index) => (
      <span className="scroll-float-char" key={`${char}-${index}`} aria-hidden="true">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const characters = element.querySelectorAll('.scroll-float-char');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      gsap.set(characters, { opacity: 1, yPercent: 0, scaleX: 1, scaleY: 1 });
      return;
    }

    const scroller = scrollContainerRef?.current ?? window;
    const tween = gsap.fromTo(
      characters,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%',
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
        scrollTrigger: {
          trigger: element,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return createElement(
    tag,
    {
      ref: containerRef,
      className: `scroll-float${containerClassName ? ` ${containerClassName}` : ''}`,
    },
    <span
      className={`scroll-float-text${textClassName ? ` ${textClassName}` : ''}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {splitText}
    </span>,
  );
}
