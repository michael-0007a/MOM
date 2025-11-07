import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb, FieldValue } from '@/lib/firebaseAdmin';
import brevo, { Brevo } from '@/lib/brevo';
import { buildAdminNotificationEmail, buildUserConfirmationEmail } from '@/lib/emailTemplates';

export const runtime = 'nodejs';

const leadSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  cityState: z.string().min(1),
  ownBusiness: z.enum(['yes', 'no']),
  businessName: z.string().optional().or(z.literal('')),
  businessIndustry: z.string().optional().or(z.literal('')),
  interestReason: z.string().min(1),
  estimatedBudget: z.string().min(1),
  hasSpace: z.enum(['yes', 'no']),
  spaceLocation: z.string().optional().or(z.literal('')),
  spaceSize: z.string().optional().or(z.literal('')),
  startTimeline: z.string().min(1),
  hearAboutUs: z.string().min(1),
  confirm: z.boolean().refine(v => v === true, 'You must confirm'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadSchema.parse(body);

    // Compose lead doc
    const lead = {
      ...parsed,
      interestStatus: 'unassigned' as const,
      createdAt: FieldValue.serverTimestamp(),
    };

    const docRef = await getDb().collection('franchiseLeads').add(lead);

    const SYSTEM_EMAIL_FROM = process.env.SYSTEM_EMAIL_FROM;
    const SYSTEM_EMAIL_TO = process.env.SYSTEM_EMAIL_TO;

    type SendEmailPayload = Brevo.SendSmtpEmail;

    // Fire-and-forget emails (don’t block response on failure)
    Promise.allSettled([
      (async () => {
        if (!SYSTEM_EMAIL_FROM) return;
        const { subject, html, text } = buildUserConfirmationEmail(parsed.fullName);
        const payload: SendEmailPayload = {
          to: [{ email: parsed.email, name: parsed.fullName }],
          sender: { email: SYSTEM_EMAIL_FROM, name: 'Makers of Milkshakes' },
          subject,
          htmlContent: html,
          textContent: text,
        };
        return brevo.sendTransacEmail(payload);
      })(),
      (async () => {
        if (!SYSTEM_EMAIL_FROM || !SYSTEM_EMAIL_TO) return;
        const { subject, html, text } = buildAdminNotificationEmail(parsed.fullName, parsed.email);
        const payload: SendEmailPayload = {
          to: [{ email: SYSTEM_EMAIL_TO }],
          sender: { email: SYSTEM_EMAIL_FROM, name: 'Makers of Milkshakes' },
          subject,
          htmlContent: html,
          textContent: text,
        };
        return brevo.sendTransacEmail(payload);
      })(),
    ]).then(results => {
      results.forEach((r, idx) => {
        if (r.status === 'rejected') {
          console.error(`Brevo email ${idx === 0 ? 'user' : 'admin'} failed:`, r.reason);
        }
      });
    }).catch(() => {});

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err: unknown) {
    console.error('Submit lead error', err);
    const message = err instanceof Error ? err.message : 'Invalid request';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
