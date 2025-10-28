import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';
import type { DocumentData } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

function isAuthorized(req: NextRequest) {
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return token && token === process.env.ADMIN_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const snap = await getDb().collection('franchiseLeads').orderBy('createdAt', 'desc').get();
    const items = snap.docs.map((d) => {
      const data: DocumentData = d.data();
      return { id: d.id, ...data };
    });
    return NextResponse.json({ items });
  } catch (err: unknown) {
    console.error('GET leads error', err);
    return NextResponse.json({ error: 'Failed to load leads' }, { status: 500 });
  }
}
