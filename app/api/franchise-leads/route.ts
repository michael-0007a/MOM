import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';
import type { QuerySnapshot } from 'firebase-admin/firestore';

// Runtime: Node.js Firebase Admin SDK needs the node runtime (not edge)
export const runtime = 'nodejs';

/**
 * Secure endpoint: GET /api/franchise-leads
 *
 * Returns JSON list of phone numbers from Firestore.
 * Primary collection intended by spec: "Franchise Leads" with field "Phone" (case-sensitive).
 * Also supports existing in-app collection: "franchiseLeads" with field "phone".
 *
 * Auth: header x-api-key must equal process.env.PRIVATE_API_KEY
 *
 * Env vars (Vercel -> Project -> Settings -> Environment Variables):
 *  - PRIVATE_API_KEY
 *  - FIREBASE_SERVICE_ACCOUNT (preferred) OR legacy FIREBASE_* vars
 *
 * curl example:
 *  curl -s -H "x-api-key: <KEY>" https://<BASE_URL>/api/franchise-leads | jq
 */

function unauthorized(msg = 'Unauthorized') {
  return NextResponse.json({ error: msg }, { status: 401 });
}

function getApiKeyFromRequest(req: NextRequest) {
  // Header names are lower-cased by the web platform
  return req.headers.get('x-api-key') || '';
}

function pickString(obj: Record<string, unknown> | undefined, key: string): string {
  const v = obj?.[key];
  return typeof v === 'string' ? v.trim() : '';
}

export async function GET(req: NextRequest) {
  try {
    const providedKey = getApiKeyFromRequest(req);
    const expected = process.env.PRIVATE_API_KEY;
    if (!expected || !providedKey || providedKey !== expected) {
      return unauthorized();
    }

    const db = getDb();

    // Query both possible collections for compatibility
    const [snapA, snapB] = await Promise.all([
      db.collection('Franchise Leads').get().catch(() => null),
      db.collection('franchiseLeads').get().catch(() => null),
    ]);

    const phonesSet = new Set<string>();

    const addFromSnap = (snap: QuerySnapshot | null) => {
      if (!snap) return;
      snap.forEach((doc) => {
        const data = doc.data() as Record<string, unknown> | undefined;
        const a = pickString(data, 'Phone');
        const b = pickString(data, 'phone');
        const value = a || b;
        if (value) phonesSet.add(value);
      });
    };

    addFromSnap(snapA as unknown as QuerySnapshot | null);
    addFromSnap(snapB as unknown as QuerySnapshot | null);

    return NextResponse.json({ phones: Array.from(phonesSet) });
  } catch (err) {
    console.error('Error in /api/franchise-leads', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
