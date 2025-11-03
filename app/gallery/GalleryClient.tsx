'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

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

  // Preload images for smoother navigation (best-effort)
  useEffect(() => {
    if (typeof window === 'undefined' || !images?.length) return;
    const limit = Math.min(images.length, 80);
    for (let i = 0; i < limit; i++) {
      const img = new window.Image();
      img.src = images[i];
    }
  }, [images]);

  // Group by folder label for desktop sections
  const sections = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const img of images) {
      const label = labelFromPath(img);
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(img);
    }
    return Array.from(map.entries());
  }, [images]);

  // Mobile: basic carousel
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <>
      {/* Mobile Carousel */}
      <section className="sm:hidden">
        <div className="relative w-full overflow-hidden">
          {images.length > 0 ? (
            <div className="relative aspect-[4/5] bg-gray-100">
              <Image
                src={images[activeIndex]}
                alt={`Gallery ${activeIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 0"
                priority
              />
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow"
                onClick={prev}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow"
                onClick={next}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                className="absolute right-2 bottom-2 p-2 rounded-full bg-white/80 shadow"
                onClick={() => setLightbox(activeIndex)}
                aria-label="Open"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">No images found in /public/gallery</div>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-1 py-3">
              {images.map((_, i) => (
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

      {/* Desktop: sectional masonry-like grid with lightbox */}
      <section className="hidden sm:block py-10 sm:py-12 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {sections.map(([label, imgs]) => (
            <div key={label}>
              <h2 className="syne-bold text-2xl sm:text-3xl text-[#1e3a5f] mb-4 sm:mb-6">{label}</h2>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [&_img]:mb-3">
                {imgs.map((src) => (
                  <button
                    key={src}
                    className="relative w-full overflow-hidden rounded-xl shadow group"
                    onClick={() => setLightbox(images.indexOf(src))}
                    aria-label="Open image"
                  >
                    <Image
                      src={src}
                      alt={label}
                      width={800}
                      height={1000}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox != null && images[lightbox] && (
        <div className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <div className="relative w-[92vw] max-w-5xl aspect-video">
            <Image
              src={images[lightbox]}
              alt="Preview"
              fill
              className="object-contain"
              sizes="100vw"
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
          </div>
        </div>
      )}
    </>
  );
}
