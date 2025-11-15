import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// This module centralizes Firebase Admin initialization and caches the app across imports.
// It supports two configurations:
// 1) Preferred: FIREBASE_SERVICE_ACCOUNT = full JSON string of a Service Account key
// 2) Legacy: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

const legacyProjectId = process.env.FIREBASE_PROJECT_ID;
const legacyClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let legacyPrivateKey = process.env.FIREBASE_PRIVATE_KEY;
let serviceAccountWarningLogged = false;

if (legacyPrivateKey && legacyPrivateKey.includes('\\n')) {
  legacyPrivateKey = legacyPrivateKey.replace(/\\n/g, '\n');
}

function ensureApp() {
  if (getApps().length) return;

  if (serviceAccountJson) {
    try {
      const trimmed = serviceAccountJson.trim();
      if (trimmed === '{') throw new Error('Incomplete JSON placeholder');
      const parsed = JSON.parse(trimmed);
      const projectId = parsed.project_id as string | undefined;
      const clientEmail = parsed.client_email as string | undefined;
      let privateKey = (parsed.private_key as string | undefined) || undefined;
      if (!projectId || !clientEmail || !privateKey) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT JSON missing required fields.');
      }
      // Normalize escaped newlines in private key if present
      if (privateKey.includes('\\n')) privateKey = privateKey.replace(/\\n/g, '\n');
      initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
      return;
    } catch (err) {
      if (!serviceAccountWarningLogged) {
        console.error('[firebaseAdmin] Service account JSON parse failed; attempting legacy env fallback.', err);
        serviceAccountWarningLogged = true;
      }
    }
  }

  if (legacyProjectId && legacyClientEmail && legacyPrivateKey) {
    initializeApp({
      credential: cert({ projectId: legacyProjectId, clientEmail: legacyClientEmail, privateKey: legacyPrivateKey }),
    });
    return;
  }

  throw new Error('Firebase Admin not configured. Provide FIREBASE_SERVICE_ACCOUNT or legacy FIREBASE_* env vars.');
}

export function getDb() {
  ensureApp();
  return getFirestore();
}

export { FieldValue };
