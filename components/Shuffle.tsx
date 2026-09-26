'use client';

import {
  createElement,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './Shuffle.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type ShuffleProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  shuffleDirection?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  maxDelay?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  tag?: ElementType;
  textAlign?: CSSProperties['textAlign'];
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: 'evenodd' | 'random';
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
  highlightWords?: string[];
};

type Character = {
  char: string;
  highlighted: boolean;
  key: string;
};

function splitCharacters(text: string, highlightWords: string[]) {
  const highlighted = new Set(highlightWords.map((word) => word.toUpperCase()));
  const characters: Character[] = [];

  text.split(/(\s+)/).forEach((part, partIndex) => {
    const isHighlighted = highlighted.has(part.toUpperCase());
    Array.from(part).forEach((char, charIndex) => {
      characters.push({
        char,
        highlighted: isHighlighted,
        key: `${partIndex}-${charIndex}`,
      });
    });
  });

  return characters;
}

export default function Shuffle({
  text,
  className = '',
  style = {},
  shuffleDirection = 'up',
  duration = 0.7,
  maxDelay = 0,
  ease = 'expo.out',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'span',
  textAlign = 'left',
  onShuffleComplete,
  shuffleTimes = 3,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.035,
  scrambleCharset = DEFAULT_CHARSET,
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true,
  highlightWords = [],
}: ShuffleProps) {
  const rootRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [ready, setReady] = useState(false);
  const rolls = Math.max(1, Math.floor(shuffleTimes));
  const characters = useMemo(
    () => splitCharacters(text, highlightWords),
    [text, highlightWords],
  );

  const scrollStart = useMemo(() => {
    const startPercent = (1 - threshold) * 100;
    const match = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
    const value = match ? Number.parseFloat(match[1]) : 0;
    const unit = match?.[2] || 'px';
    const offset = value === 0 ? '' : value < 0 ? `-=${Math.abs(value)}${unit}` : `+=${value}${unit}`;
    return `top ${startPercent}%${offset}`;
  }, [rootMargin, threshold]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !text) return;

      const wrappers = Array.from(root.querySelectorAll<HTMLElement>('[data-shuffle-glyph]'));
      const strips = wrappers
        .map((wrapper) => wrapper.querySelector<HTMLElement>('.shuffle-strip'))
        .filter((strip): strip is HTMLElement => Boolean(strip));
      const vertical = shuffleDirection === 'up' || shuffleDirection === 'down';
      const reverse = shuffleDirection === 'right' || shuffleDirection === 'down';

      if (
        respectReducedMotion &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setReady(true);
        onShuffleComplete?.();
        return;
      }

      const positionStrip = (strip: HTMLElement, atEnd: boolean) => {
        const wrapper = strip.parentElement as HTMLElement;
        const distance =
          (vertical ? wrapper.getBoundingClientRect().height : wrapper.getBoundingClientRect().width) *
          (rolls + 1);
        const start = reverse ? -distance : 0;
        const end = reverse ? 0 : -distance;
        gsap.set(strip, vertical ? { y: atEnd ? end : start } : { x: atEnd ? end : start });
      };

      const reset = () => strips.forEach((strip) => positionStrip(strip, false));

      const play = () => {
        timelineRef.current?.kill();
        reset();

        const timeline = gsap.timeline({
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? loopDelay : 0,
          onRepeat: reset,
          onComplete: () => {
            onShuffleComplete?.();
          },
        });

        strips.forEach((strip, index) => {
          const wrapper = strip.parentElement as HTMLElement;
          const distance =
            (vertical
              ? wrapper.getBoundingClientRect().height
              : wrapper.getBoundingClientRect().width) *
            (rolls + 1);
          const end = reverse ? 0 : -distance;
          const delay =
            animationMode === 'random'
              ? Math.random() * maxDelay
              : (index % 2 ? 0 : Math.ceil(strips.length / 2) * stagger * 0.68) +
                Math.floor(index / 2) * stagger;
          const tween = vertical ? { y: end } : { x: end };

          timeline.to(
            strip,
            {
              ...tween,
              color: colorTo,
              duration,
              ease,
              force3D: true,
            },
            delay,
          );
        });

        timelineRef.current = timeline;
      };

      reset();
      if (colorFrom) gsap.set(strips, { color: colorFrom });
      setReady(true);

      const scrollTrigger = ScrollTrigger.create({
        trigger: root,
        start: scrollStart,
        once: triggerOnce,
        onEnter: play,
      });

      const handleHover = () => {
        if (!timelineRef.current?.isActive()) play();
      };
      if (triggerOnHover) root.addEventListener('mouseenter', handleHover);

      return () => {
        scrollTrigger.kill();
        timelineRef.current?.kill();
        if (triggerOnHover) root.removeEventListener('mouseenter', handleHover);
      };
    },
    {
      dependencies: [
        text,
        shuffleDirection,
        duration,
        maxDelay,
        ease,
        scrollStart,
        rolls,
        animationMode,
        loop,
        loopDelay,
        stagger,
        colorFrom,
        colorTo,
        triggerOnce,
        respectReducedMotion,
        triggerOnHover,
      ],
      scope: rootRef,
    },
  );

  const getScrambleCharacter = (characterIndex: number, rollIndex: number) => {
    if (!scrambleCharset) return characters[characterIndex].char;
    const index = (characterIndex * 7 + rollIndex * 11) % scrambleCharset.length;
    return scrambleCharset[index];
  };

  const content = characters.map((character, characterIndex) => {
    if (/\s/.test(character.char)) {
      return <span className="shuffle-space" key={character.key} aria-hidden="true">&nbsp;</span>;
    }

    const glyphs = [
      character.char,
      ...Array.from({ length: rolls }, (_, rollIndex) =>
        getScrambleCharacter(characterIndex, rollIndex),
      ),
      character.char,
    ];

    return (
      <span
        className={`shuffle-glyph${character.highlighted ? ' shuffle-glyph--highlight' : ''}`}
        data-shuffle-glyph
        key={character.key}
        aria-hidden="true"
      >
        <span className="shuffle-ghost">{character.char}</span>
        <span
          className={`shuffle-strip shuffle-strip--${shuffleDirection}`}
          style={{ '--shuffle-cells': glyphs.length } as CSSProperties}
        >
          {glyphs.map((glyph, glyphIndex) => (
            <span className="shuffle-cell" key={`${character.key}-${glyphIndex}`}>
              {glyph}
            </span>
          ))}
        </span>
      </span>
    );
  });

  return createElement(
    tag,
    {
      ref: rootRef,
      className: `shuffle-parent${ready ? ' is-ready' : ''}${className ? ` ${className}` : ''}`,
      style: { textAlign, ...style },
      'aria-label': text,
    },
    content,
  );
}
