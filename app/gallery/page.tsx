import fs from 'fs';
import path from 'path';
import GalleryClient from '@/app/gallery/GalleryClient';

function listGalleryImages(): string[] {
  const publicDir = path.join(process.cwd(), 'public');
  const galleryRoot = path.join(publicDir, 'gallery');
  const images: string[] = [];
  const exts = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

  const walk = (dirAbs: string) => {
    if (!fs.existsSync(dirAbs)) return;
    const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(dirAbs, entry.name);
      if (entry.isDirectory()) {
        walk(abs);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (exts.has(ext)) {
          const relFromPublic = path.relative(publicDir, abs).split(path.sep).join('/');
          images.push('/' + relFromPublic);
        }
      }
    }
  };

  walk(galleryRoot);
  // Sort for stable order (by path)
  return images.sort((a, b) => a.localeCompare(b));
}

export default function GalleryPage() {
  const images = listGalleryImages();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-800 mb-3">Gallery</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            A peek into our shakes, moments, and stores.
          </p>
        </div>
      </section>

      <GalleryClient images={images} />
    </div>
  );
}
