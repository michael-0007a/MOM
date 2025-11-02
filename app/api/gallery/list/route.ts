import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const exts = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

function listImages(): string[] {
  const publicDir = path.join(process.cwd(), 'public');
  const galleryRoot = path.join(publicDir, 'gallery');
  const images: string[] = [];

  const walk = (dirAbs: string) => {
    if (!fs.existsSync(dirAbs)) return;
    const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(dirAbs, entry.name);
      if (entry.isDirectory()) walk(abs);
      else {
        const ext = path.extname(entry.name).toLowerCase();
        if (exts.has(ext)) {
          const relFromPublic = path.relative(publicDir, abs).split(path.sep).join('/');
          images.push('/' + relFromPublic);
        }
      }
    }
  };

  walk(galleryRoot);
  return images.sort((a, b) => a.localeCompare(b));
}

export async function GET() {
  try {
    const images = listImages();
    return NextResponse.json({ images });
  } catch (e) {
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}

