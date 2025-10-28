import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';

function isAuthorized(req: NextRequest) {
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return token && token === process.env.ADMIN_TOKEN;
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const allowed = ['high', 'medium', 'low', 'unassigned'] as const;
    if (!body || !allowed.includes(body.interestStatus)) {
      return NextResponse.json({ error: 'Invalid interestStatus' }, { status: 400 });
    }

    const { id } = await context.params;
    await getDb().collection('franchiseLeads').doc(id).update({ interestStatus: body.interestStatus });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('PATCH lead error', err);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
