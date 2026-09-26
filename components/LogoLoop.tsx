'use client';

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import './LogoLoop.css';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

type LogoItem = {
  node: ReactNode;
  title?: string;
  ariaLabel?: string;
  href?: string;
};

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const toCssLength = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = 'Logo loop',
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const [sequenceSize, setSequenceSize] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const isVertical = direction === 'up' || direction === 'down';
  const effectiveHoverSpeed = hoverSpeed ?? (pauseOnHover === false ? undefined : 0);
  const targetVelocity = useMemo(() => {
    const directionMultiplier = direction === 'left' || direction === 'up' ? 1 : -1;
    return Math.abs(speed) * directionMultiplier * (speed < 0 ? -1 : 1);
  }, [direction, speed]);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const sequence = sequenceRef.current;
    if (!container || !sequence) return;

    const rect = sequence.getBoundingClientRect();
    const nextSize = Math.ceil(isVertical ? rect.height : rect.width);
    const viewportSize = isVertical ? container.clientHeight : container.clientWidth;
    if (nextSize <= 0) return;

    setSequenceSize(nextSize);
    setCopyCount(
      Math.max(
        ANIMATION_CONFIG.MIN_COPIES,
        Math.ceil(viewportSize / nextSize) + ANIMATION_CONFIG.COPY_HEADROOM,
      ),
    );
  }, [isVertical]);

  useEffect(() => {
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) observer.observe(containerRef.current);
    if (sequenceRef.current) observer.observe(sequenceRef.current);
    window.addEventListener('resize', updateDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [logos, gap, logoHeight, updateDimensions]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || sequenceSize <= 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    let frame = 0;
    let lastTimestamp: number | null = null;

    const animate = (timestamp: number) => {
      const deltaTime = lastTimestamp === null ? 0 : Math.max(0, timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      const target = isHovered && effectiveHoverSpeed !== undefined
        ? effectiveHoverSpeed
        : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;
      offsetRef.current = ((offsetRef.current + velocityRef.current * deltaTime) % sequenceSize + sequenceSize) % sequenceSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [effectiveHoverSpeed, isHovered, isVertical, sequenceSize, targetVelocity]);

  const rootClassName = [
    'logoloop',
    isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
    fadeOut && 'logoloop--fade',
    scaleOnHover && 'logoloop--scale-hover',
    className,
  ].filter(Boolean).join(' ');

  const containerStyle = {
    width: toCssLength(width),
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
    ...style,
  } as CSSProperties;

  return (
    <section
      ref={containerRef}
      className={rootClassName}
      style={containerStyle}
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={`copy-${copyIndex}`}
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? sequenceRef : undefined}
          >
            {logos.map((item, itemIndex) => {
              const content = (
                <span className="logoloop__node" title={item.title} aria-hidden={Boolean(item.href && !item.ariaLabel)}>
                  {item.node}
                </span>
              );
              return (
                <li className="logoloop__item" key={`${copyIndex}-${itemIndex}`}>
                  {item.href ? (
                    <a className="logoloop__link" href={item.href} aria-label={item.ariaLabel ?? item.title}>
                      {content}
                    </a>
                  ) : content}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
});

export default LogoLoop;
