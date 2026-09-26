'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

type PreviewImage = {
  src: string;
  alt: string;
};

export default function ProjectImageLightbox() {
  const [preview, setPreview] = useState<PreviewImage | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const scope = document.querySelector<HTMLElement>('[data-project-gallery]');
    if (!scope) return;

    const images = Array.from(scope.querySelectorAll<HTMLImageElement>('img'));

    const openImage = (image: HTMLImageElement) => {
      lastTriggerRef.current = image;
      setPreview({
        src: image.currentSrc || image.src,
        alt: image.alt || '作品图片',
      });
    };

    const handleClick = (event: MouseEvent) => {
      const image = (event.target as HTMLElement).closest<HTMLImageElement>('img.project-zoomable');
      if (image && scope.contains(image)) openImage(image);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const image = (event.target as HTMLElement).closest<HTMLImageElement>('img.project-zoomable');
      if (!image || !scope.contains(image) || (event.key !== 'Enter' && event.key !== ' ')) return;
      event.preventDefault();
      openImage(image);
    };

    images.forEach((image) => {
      image.classList.add('project-zoomable');
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `${image.alt || '作品图片'}，点击放大查看`);
    });

    scope.addEventListener('click', handleClick);
    scope.addEventListener('keydown', handleKeyDown);

    return () => {
      scope.removeEventListener('click', handleClick);
      scope.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!preview) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreview(null);
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
      lastTriggerRef.current?.focus();
    };
  }, [preview]);

  if (!preview) return null;

  return (
    <div
      className="project-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="图片放大预览"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setPreview(null);
      }}
    >
      <button
        className="project-lightbox__close"
        type="button"
        aria-label="关闭图片预览"
        onClick={() => setPreview(null)}
        autoFocus
      >
        <X size={24} strokeWidth={1.6} />
      </button>
      <figure className="project-lightbox__figure">
        <img src={preview.src} alt={preview.alt} />
        <figcaption>{preview.alt}</figcaption>
      </figure>
    </div>
  );
}
