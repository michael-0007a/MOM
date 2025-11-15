import { escapeHtml } from '@/lib/sanitize';

export function buildUserConfirmationEmail(name: string) {
  const safeName = escapeHtml(name || 'there');
  const subject = 'We received your franchise request – Makers of Milkshakes';
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#111;">
      <h2>Thanks, ${safeName}! 🎉</h2>
      <p>We have received your franchise request. Our team will review your details and get back to you shortly.</p>
      <p>Warm regards,<br/>Makers of Milkshakes Team</p>
    </div>
  `;
  return { subject, html, text: 'We received your franchise request. We will contact you soon.' };
}

export function buildAdminNotificationEmail(name: string, email: string, phone?: string) {
  const safeName = escapeHtml(name || 'Unknown');
  const safeEmail = escapeHtml(email || 'N/A');
  const safePhone = escapeHtml(phone || 'N/A');
  const subject = `New Franchise Request: ${safeName}`;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#111;">
      <h2>New Franchise Lead</h2>
      <p><b>Name:</b> ${safeName}<br/>
         <b>Email:</b> ${safeEmail}<br/>
         <b>Phone:</b> ${safePhone}</p>
      <p>Log in to the admin dashboard to review full details and update interest status.</p>
    </div>
  `;
  return { subject, html, text: `New franchise lead: ${name} (${email}). Phone: ${phone || 'N/A'}` };
}
