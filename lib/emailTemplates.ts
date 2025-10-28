export function buildUserConfirmationEmail(name: string) {
  const subject = 'We received your franchise request – Makers of Milkshakes';
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#111;">
      <h2>Thanks, ${name || 'there'}! 🎉</h2>
      <p>We have received your franchise request. Our team will review your details and get back to you shortly.</p>
      <p>Warm regards,<br/>Makers of Milkshakes Team</p>
    </div>
  `;
  return { subject, html, text: 'We received your franchise request. We will contact you soon.' };
}

export function buildAdminNotificationEmail(name: string, email: string) {
  const subject = `New Franchise Request: ${name || 'Unknown'}`;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#111;">
      <h2>New Franchise Lead</h2>
      <p><b>Name:</b> ${name || 'N/A'}<br/>
         <b>Email:</b> ${email || 'N/A'}</p>
      <p>Log in to the admin dashboard to review full details and update interest status.</p>
    </div>
  `;
  return { subject, html, text: `New franchise lead: ${name} (${email}).` };
}

