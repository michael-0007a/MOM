import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const exts = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

function findGalleryDir(publicDir: string): string | null {
  // Try common casings first
  const lower = path.join(publicDir, 'gallery');
  if (fs.existsSync(lower)) return lower;
  const upper = path.join(publicDir, 'Gallery');
  if (fs.existsSync(upper)) return upper;

  // Fallback: scan public for a folder whose name case-insensitively equals 'gallery'
  try {
    const entries = fs.readdirSync(publicDir, { withFileTypes: true });
    const match = entries.find((e) => e.isDirectory() && e.name.toLowerCase() === 'gallery');
    if (match) return path.join(publicDir, match.name);
  } catch {}

  return null;
}

function listImages(): string[] {
  const publicDir = path.join(process.cwd(), 'public');
  const galleryRoot = findGalleryDir(publicDir);
  const images: string[] = [];

  if (!galleryRoot) return images;

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
  } catch {
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
