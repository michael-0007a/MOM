import crypto from 'crypto';
import { ensureEnv } from '@/lib/env';

const COOKIE_NAME = 'mom_admin_session';
const ADMIN_TOKEN = ensureEnv('ADMIN_TOKEN');
const SESSION_SECRET = ensureEnv('ADMIN_SESSION_SECRET');
const SESSION_HASH = crypto.createHmac('sha256', SESSION_SECRET).update(ADMIN_TOKEN).digest('hex');

export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV !== 'development',
  path: '/',
  maxAge: SESSION_COOKIE_MAX_AGE,
};

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function getSessionHash() {
  return SESSION_HASH;
}

export function isValidAdminCookie(value?: string | null) {
  return !!value && value === SESSION_HASH;
}

