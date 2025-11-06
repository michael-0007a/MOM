'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

type Props = {
  images: string[];
};

// Simple utility to group images by subfolder label (e.g., `Celebrity Images`)
function labelFromPath(src: string) {
  const parts = src.split('/');
  const idx = parts.indexOf('gallery');
  if (idx >= 0 && parts[idx + 1]) {
    return parts[idx + 1].replace(/[-_]/g, ' ');
  }
  return 'Gallery';
}

export default function GalleryClient({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [loadedSet, setLoadedSet] = useState<Set<string>>(() => new Set());
  const [filter, setFilter] = useState<string>('All');

  const touchStartX = useRef<number | null>(null);

  const handleLoaded = useCallback((src: string) => {
    setLoadedSet((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  // Preload a subset for smoother navigation (best-effort)
  useEffect(() => {
    if (typeof window === 'undefined' || !images?.length) return;
    const limit = Math.min(images.length, 60);
    for (let i = 0; i < limit; i++) {
      const img = new window.Image();
      img.src = images[i];
    }
  }, [images]);

  // Group by folder label
  const sections = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const img of images) {
      const label = labelFromPath(img);
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(img);
    }
    return Array.from(map.entries());
  }, [images]);

  const labels = useMemo(() => ['All', ...sections.map(([label]) => label)], [sections]);

  const filteredImages = useMemo(() => {
    if (filter === 'All') return images;
    return images.filter((src) => labelFromPath(src) === filter);
  }, [images, filter]);

  // Reset mobile index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  // Mobile carousel swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? startX) - startX;
    const threshold = 30;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      else if (e.key === 'ArrowLeft') setLightbox((i) => (i == null ? 0 : (i - 1 + images.length) % images.length));
      else if (e.key === 'ArrowRight') setLightbox((i) => (i == null ? 0 : (i + 1) % images.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, images.length]);

  // Mobile: basic carousel
  const prev = () => setActiveIndex((i) => (i - 1 + filteredImages.length) % filteredImages.length);
  const next = () => setActiveIndex((i) => (i + 1) % filteredImages.length);

  return (
    <>
      {/* Filter chips */}
      <div className="sticky top-0 z-10 sm:static bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
          <div className="flex gap-2">
            {labels.map((label) => (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`shrink-0 px-3 py-1.5 rounded-full border text-sm transition-colors ${
                  filter === label ? 'bg-[#2b91cb] text-white border-[#2b91cb]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#2b91cb]'
                }`}
                aria-pressed={filter === label}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Carousel (visible up to md) */}
      <section className="md:hidden">
        <div className="relative w-full overflow-hidden">
          {filteredImages.length > 0 ? (
            <div className="relative aspect-[4/5] bg-gray-100" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <Image
                src={filteredImages[activeIndex]}
                alt={`Gallery ${activeIndex + 1}`}
                fill
                className={`object-cover transition-opacity duration-500 ${loadedSet.has(filteredImages[activeIndex]) ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 768px) 100vw, 0"
                priority
                onLoadingComplete={() => handleLoaded(filteredImages[activeIndex])}
              />
              {!loadedSet.has(filteredImages[activeIndex]) && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden />
              )}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 shadow"
                onClick={prev}
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 shadow"
                onClick={next}
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <button
                className="absolute right-2 top-2 p-2.5 rounded-full bg-white/80 shadow"
                onClick={() => setLightbox(images.indexOf(filteredImages[activeIndex]))}
                aria-label="Open"
              >
                <ZoomIn className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">No images found in /public/gallery</div>
          )}

          {/* Dots */}
          {filteredImages.length > 1 && (
            <div className="flex items-center justify-center gap-1 py-3">
              {filteredImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-5 bg-[#2b91cb]' : 'w-2 bg-gray-300'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Desktop: sectional masonry-like grid with lightbox (md and up) */}
      <section className="hidden md:block py-10 sm:py-12 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {(filter === 'All' ? sections : sections.filter(([l]) => l === filter)).map(([label, imgs]) => (
            <div key={label}>
              <h2 className="syne-bold text-2xl sm:text-3xl text-[#1e3a5f] mb-4 sm:mb-6">{label}</h2>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
                {imgs.map((src) => (
                  <button
                    key={src}
                    className="relative mb-3 w-full overflow-hidden rounded-xl shadow group"
                    style={{ breakInside: 'avoid' }}
                    onClick={() => setLightbox(images.indexOf(src))}
                    aria-label="Open image"
                  >
                    <div className="relative">
                      <Image
                        src={src}
                        alt={label}
                        width={800}
                        height={1000}
                        className={`w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03] ${loadedSet.has(src) ? 'opacity-100' : 'opacity-0'}`}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        onLoadingComplete={() => handleLoaded(src)}
                      />
                      {!loadedSet.has(src) && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox != null && images[lightbox] && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center"
          role="dialog"
          aria-modal
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-[92vw] max-w-5xl aspect-video">
            <Image
              src={images[lightbox]}
              alt="Preview"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90"
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i! - 1 + images.length) % images.length); }}
              aria-label="Prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90"
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i! + 1) % images.length); }}
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90"
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-2 py-1 rounded-full">
              {lightbox + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
