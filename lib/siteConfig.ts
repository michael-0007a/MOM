// Central site configuration for contact details and social links
export const CONTACT = {
  email: 'makersofmilkshakes@gmail.com',
  phoneDisplay: '+91 9700 123 404',
  phoneE164: '+919700123404',
  addressLines: ['MOM', 'Hyderabad, Telangana, India. 500072'],
};

export const SOCIAL = {
  instagram: 'https://www.instagram.com/makersofmilkshakes/',
  facebook: 'https://www.facebook.com/MakersOfMilkshakes/',
  twitter: 'https://x.com/makers_of_MS',
};

export const LINKS = {
  telHref: `tel:${CONTACT.phoneE164}`,
  mailtoHref: `mailto:${CONTACT.email}`,
  whatsappHref: `https://wa.me/${CONTACT.phoneE164.replace('+', '')}`,
};

export function assertEnv(keys: string[]) {
  const missing = keys.filter((key) => !process.env[key] || process.env[key]?.trim() === '');
  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}
