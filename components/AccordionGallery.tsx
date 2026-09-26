'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';

import './AccordionGallery.css';

export type AccordionGalleryItem = {
  id: string;
  label: string;
  meta: string;
  result: string;
  className: string;
  word: string;
  href: string;
  image?: string;
  alt?: string;
};

type AccordionGalleryProps = {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  grayscale?: boolean;
  className?: string;
};

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  accentColor = '#ff302b',
  overlayColor = '#070808',
  textColor = '#ffffff',
  height = 420,
  gap = 12,
  radius = 4,
  expandRatio = 0.56,
  duration = 0.65,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 5,
  stagger = 0.06,
  trigger = 'hover',
  grayscale = true,
  className = '',
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const textRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);
  const count = items.length;
  const safeDefault = Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0));
  const [active, setActive] = useState(safeDefault);

  const applyLayout = useCallback(
    (animate: boolean) => {
      if (!count) return;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;
      const durationValue = animate && !reducedMotion ? duration : 0;

      timelineRef.current?.kill();
      const timeline = gsap.timeline();

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;
        const isActive = index === active;
        const media = mediaRefs.current[index];
        const bar = barRefs.current[index];
        const text = textRefs.current[index];
        const rotation = isActive ? 0 : index < active ? tilt : -tilt;

        timeline.to(
          panel,
          { flexGrow: isActive ? grow : 1, rotateY: rotation, duration: durationValue, ease },
          0,
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - index));
          const shift = drift * parallax * mediaSizeRef.current * 0.06;
          timeline.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: isActive ? 0 : shift,
              '--ag-gray': grayscale ? (isActive ? 0 : 1) : 0,
              '--ag-dim': isActive ? 0 : 0.34,
              duration: durationValue,
              ease,
            },
            0,
          );
        }

        if (bar && text) {
          timeline.to(
            [bar, text],
            isActive
              ? { opacity: 1, x: 0, duration: durationValue, ease, stagger: reducedMotion ? 0 : stagger }
              : { opacity: 0, x: -14, duration: durationValue * 0.6, ease },
            0,
          );
        }
      });

      timelineRef.current = timeline;
    },
    [active, count, duration, ease, expandRatio, grayscale, parallax, stagger, tilt],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const usable = Math.max(root.getBoundingClientRect().width - gap * (count - 1), 120);
      const size = Math.max(180, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.18);
      mediaSizeRef.current = size;
      root.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [applyLayout, count, expandRatio, gap]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => () => {
    timelineRef.current?.kill();
  }, []);

  const styles = {
    '--ag-accent': accentColor,
    '--ag-overlay': overlayColor,
    '--ag-text': textColor,
    '--ag-gap': `${gap}px`,
    '--ag-radius': `${radius}px`,
    height: `${height}px`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${className ? ` ${className}` : ''}`}
      style={styles}
      role="list"
      aria-label="精选项目画廊"
    >
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <a
            key={item.id}
            ref={(element) => { panelRefs.current[index] = element; }}
            href={item.href}
            className={`ag-panel ${item.className}${isActive ? ' ag-panel--active' : ''}`}
            onPointerEnter={() => { if (trigger === 'hover') setActive(index); }}
            onFocus={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                setActive((index + 1) % count);
                panelRefs.current[(index + 1) % count]?.focus();
              } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                const previous = (index - 1 + count) % count;
                setActive(previous);
                panelRefs.current[previous]?.focus();
              }
            }}
            role="listitem"
            aria-current={isActive ? 'true' : undefined}
            aria-label={`${item.id} ${item.label}，${item.meta}`}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(element) => { mediaRefs.current[index] = element; }}
              >
                {item.image ? (
                  <img src={item.image} alt={item.alt || item.label} draggable="false" />
                ) : (
                  <span className={`ag-panel__art project-art ${item.className}`}>
                    <span className="project-word">
                      {item.word.split('|').map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                    <span className="project-arc" />
                    <span className="project-grid-mark" />
                    <span className="project-stamp">SELECTED PROJECT / {item.id}</span>
                  </span>
                )}
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            <span className="ag-panel__label" aria-hidden="true">
              <span
                className="ag-panel__bar"
                ref={(element) => { barRefs.current[index] = element; }}
              />
              <span
                className="ag-panel__text"
                ref={(element) => { textRefs.current[index] = element; }}
              >
                <span>{item.id} / {item.meta}</span>
                <strong>{item.label}</strong>
                <small>{item.result} · 查看详情 ↗</small>
              </span>
              <span className="ag-panel__action">↗</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
