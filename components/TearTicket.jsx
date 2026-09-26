'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';

import './TearTicket.css';

const TILT_SPRING = { stiffness: 220, damping: 24, mass: 0.6 };
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function TearTicket({
  children,
  stub,
  image = '',
  imageAlt = '',
  scrim = true,
  imageRadius = 8,
  orientation = 'horizontal',
  torn = undefined,
  defaultTorn = false,
  onTear = undefined,
  width = 460,
  height = 250,
  stubSize = 150,
  radius = 16,
  holes = 12,
  holeSize = 6,
  notch = 3,
  tearAngle = 30,
  stretch = 30,
  resistance = 0.45,
  rotate = 4,
  tilt = true,
  tiltMax = 9,
  tiltReach = 260,
  parallax = 6,
  perspective = 1000,
  background = '#27272a',
  color = '#f5f5f5',
  border = true,
  borderColor = '',
  borderWidth = 1,
  stubBackground = '',
  recenter = true,
  disabled = false,
  ariaLabel = 'Tear off the stub',
  className = '',
}) {
  const reduceMotion = useReducedMotion();
  const controlled = torn !== undefined;
  const [internalTorn, setInternalTorn] = useState(defaultTorn);
  const [fit, setFit] = useState(1);
  const rootRef = useRef(null);
  const notifiedRef = useRef(false);
  const used = controlled ? torn : internalTorn;
  const vertical = orientation === 'vertical';

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const tiltX = useSpring(0, TILT_SPRING);
  const tiltY = useSpring(0, TILT_SPRING);
  const plane = useMotionTemplate`perspective(${perspective}px) rotateZ(${rotate}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  const depth = tiltMax > 0 ? parallax / tiltMax : 0;
  const artX = useTransform(tiltY, value => -value * depth);
  const artY = useTransform(tiltX, value => value * depth);
  const artTransform = useMotionTemplate`translate(${artX}px, ${artY}px)`;

  useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    const measure = () => setFit(Math.min(1, node.clientWidth / width) || 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [width]);

  useEffect(() => {
    if (!used) {
      notifiedRef.current = false;
      dragX.set(0);
      dragY.set(0);
    }
  }, [used, dragX, dragY]);

  const completeTear = () => {
    if (disabled || used) return;
    if (!controlled) setInternalTorn(true);
    if (!notifiedRef.current) {
      notifiedRef.current = true;
      onTear?.();
    }
  };

  const restoreStub = () => {
    animate(dragX, 0, { type: 'spring', stiffness: 360, damping: 30 });
    animate(dragY, 0, { type: 'spring', stiffness: 360, damping: 30 });
  };

  const handleDragEnd = (_event, info) => {
    const offset = vertical ? info.offset.y : info.offset.x;
    const velocity = vertical ? info.velocity.y : info.velocity.x;
    if (Math.abs(offset) >= stretch || Math.abs(velocity) > 520) completeTear();
    else restoreStub();
  };

  const handlePointerMove = event => {
    if (!tilt || reduceMotion || disabled || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const nx = clamp(
      (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 + tiltReach),
      -1,
      1
    );
    const ny = clamp(
      (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 + tiltReach),
      -1,
      1
    );
    tiltY.set(nx * tiltMax);
    tiltX.set(-ny * tiltMax);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleKeyDown = event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (!event.repeat) completeTear();
  };

  const exitDirection = vertical
    ? { y: height * 0.85, x: width * 0.08 }
    : { x: stubSize * 1.7, y: height * 0.28 };

  return (
    <div
      ref={rootRef}
      className={`tear-ticket${className ? ` ${className}` : ''}`}
      data-used={used ? '' : undefined}
      data-orientation={orientation}
      data-shift={used && recenter ? (vertical ? 'y' : 'x') : undefined}
      data-disabled={disabled ? '' : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{
        '--tt-w': `${width}px`,
        '--tt-h': `${height}px`,
        '--tt-stub': `${stubSize}px`,
        '--tt-bg': background,
        '--tt-stub-bg': stubBackground || background,
        '--tt-ink': color,
        '--tt-edge': borderColor || `color-mix(in srgb, ${color} 18%, transparent)`,
        '--tt-edge-w': borderWidth,
        '--tt-parallax': `${parallax}px`,
        '--tt-body-w': `${vertical ? width : width - stubSize}px`,
        '--tt-body-h': `${vertical ? height - stubSize : height}px`,
        '--tt-radius': `${radius}px`,
        '--tt-art-radius': `${imageRadius}px`,
        '--tt-fit': fit,
        '--tt-hole-size': `${holeSize}px`,
        '--tt-hole-step': `${Math.max(holeSize * 2.1, (vertical ? width : height) / holes)}px`,
        '--tt-notch': `${notch}px`,
        height: `${height * fit}px`,
      }}
    >
      <div className="tear-ticket__stage">
        <motion.div className="tear-ticket__plane" style={{ transform: plane }}>
          <motion.div
            className="tear-ticket__piece tear-ticket__piece--body"
            animate={used && recenter ? (vertical ? { y: stubSize / 2 } : { x: stubSize / 2 }) : { x: 0, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 24 }}
          >
            <div className="tear-ticket__paper">
              {image ? (
                <div className="tear-ticket__art">
                  <motion.img
                    className="tear-ticket__image"
                    src={image}
                    alt={imageAlt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={reduceMotion ? undefined : { transform: artTransform }}
                  />
                  {scrim ? <div className="tear-ticket__scrim" /> : null}
                </div>
              ) : null}
              <div className="tear-ticket__content">{children}</div>
              <span className="tear-ticket__perforation" aria-hidden="true" />
            </div>
            {border ? <span className="tear-ticket__border" aria-hidden="true" /> : null}
          </motion.div>

          <AnimatePresence initial={false}>
            {!used ? (
              <motion.div
                key="ticket-stub"
                className="tear-ticket__piece tear-ticket__piece--stub"
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-label={ariaLabel}
                aria-disabled={disabled || undefined}
                drag={disabled || reduceMotion ? false : vertical ? 'y' : 'x'}
                dragConstraints={vertical
                  ? { top: -height * 0.22, bottom: height * 0.48 }
                  : { left: -stubSize * 0.75, right: stubSize * 1.15 }}
                dragElastic={clamp(1 - resistance, 0.12, 0.9)}
                dragMomentum={false}
                style={{ x: dragX, y: dragY }}
                whileDrag={{
                  rotate: vertical ? tearAngle * 0.22 : tearAngle * 0.16,
                  scale: 1.015,
                  cursor: 'grabbing',
                }}
                exit={{
                  ...exitDirection,
                  rotate: tearAngle,
                  opacity: 0,
                  transition: reduceMotion ? { duration: 0 } : { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                }}
                onDragEnd={handleDragEnd}
                onKeyDown={handleKeyDown}
                onDoubleClick={completeTear}
              >
                <div className="tear-ticket__paper tear-ticket__paper--stub">
                  <div className="tear-ticket__stub">{stub}</div>
                  <span className="tear-ticket__perforation" aria-hidden="true" />
                </div>
                {border ? <span className="tear-ticket__border" aria-hidden="true" /> : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
      <span className="tear-ticket__sr" role="status" aria-live="polite">
        {used ? '票根已撕下' : ''}
      </span>
    </div>
  );
}
