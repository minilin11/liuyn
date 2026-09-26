'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';

import './ProfileCard.css';

type ProfileCardProps = {
  avatarUrl: string;
  miniAvatarUrl?: string;
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText?: string;
  contactHref?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  innerGradient?: string;
  className?: string;
};

const clamp = (value: number, minimum = 0, maximum = 100) =>
  Math.min(Math.max(value, minimum), maximum);

export default function ProfileCard({
  avatarUrl,
  miniAvatarUrl,
  name,
  title,
  handle,
  status,
  contactText = '联系我',
  contactHref = 'mailto:1840339754@qq.com',
  showUserInfo = true,
  enableTilt = true,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(255, 53, 40, 0.62)',
  behindGlowSize = '58%',
  innerGradient = 'linear-gradient(145deg, rgba(255, 53, 40, 0.14), rgba(4, 5, 7, 0.22) 48%, rgba(4, 5, 7, 0.88))',
  className = '',
}: ProfileCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const shell = shellRef.current;
    if (!wrapper || !shell || !enableTilt) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let currentX = shell.clientWidth / 2;
    let currentY = shell.clientHeight / 2;
    let targetX = currentX;
    let targetY = currentY;

    const writeVariables = () => {
      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * currentX);
      const percentY = clamp((100 / height) * currentY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;
      wrapper.style.setProperty('--pointer-x', `${percentX}%`);
      wrapper.style.setProperty('--pointer-y', `${percentY}%`);
      wrapper.style.setProperty('--background-x', `${35 + percentX * 0.3}%`);
      wrapper.style.setProperty('--background-y', `${35 + percentY * 0.3}%`);
      wrapper.style.setProperty('--pointer-from-center', String(clamp(Math.hypot(centerX, centerY) / 50, 0, 1)));
      wrapper.style.setProperty('--rotate-x', `${-(centerX / 7)}deg`);
      wrapper.style.setProperty('--rotate-y', `${centerY / 6}deg`);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.13;
      currentY += (targetY - currentY) * 0.13;
      writeVariables();
      frame = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      const rect = shell.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
    };

    const handlePointerEnter = () => {
      if (!reducedMotion) shell.classList.add('active');
    };

    const handlePointerLeave = () => {
      targetX = shell.clientWidth / 2;
      targetY = shell.clientHeight / 2;
      shell.classList.remove('active');
    };

    shell.addEventListener('pointermove', handlePointerMove);
    shell.addEventListener('pointerenter', handlePointerEnter);
    shell.addEventListener('pointerleave', handlePointerLeave);
    writeVariables();
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      shell.removeEventListener('pointermove', handlePointerMove);
      shell.removeEventListener('pointerenter', handlePointerEnter);
      shell.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [enableTilt]);

  const style = {
    '--behind-glow-color': behindGlowColor,
    '--behind-glow-size': behindGlowSize,
    '--inner-gradient': innerGradient,
  } as CSSProperties;

  return (
    <div ref={wrapperRef} className={`pc-card-wrapper ${className}`} style={style}>
      {behindGlowEnabled && <div className="pc-behind" aria-hidden="true" />}
      <div ref={shellRef} className="pc-card-shell">
        <article className="pc-card">
          <Image
            className="pc-avatar"
            src={avatarUrl}
            alt={`${name}的个人照片`}
            fill
            sizes="(max-width: 760px) 100vw, 38vw"
          />
          <div className="pc-photo-shade" aria-hidden="true" />
          <div className="pc-shine" aria-hidden="true" />
          <div className="pc-glare" aria-hidden="true" />

          <div className="pc-details">
            <h3>{name}</h3>
            <p>{title}</p>
          </div>

          {showUserInfo && (
            <div className="pc-user-info">
              <div className="pc-user-details">
                <span className="pc-mini-avatar">
                  <Image src={miniAvatarUrl ?? avatarUrl} alt="" fill sizes="44px" />
                </span>
                <span className="pc-user-text">
                  <strong>@{handle}</strong>
                  <span>{status}</span>
                </span>
              </div>
              <a className="pc-contact-btn" href={contactHref}>{contactText}</a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
