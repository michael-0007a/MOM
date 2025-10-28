import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// Private key may contain \n literals that need to be converted to real newlines if not already
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
  // Do not throw eagerly in edge environments; routes can handle and surface a friendly error
  console.warn('[firebaseAdmin] Missing Firebase Admin env vars.');
}

if (privateKey && privateKey.includes('\\n')) {
  privateKey = privateKey.replace(/\\n/g, '\n');
}

function ensureApp() {
  if (!getApps().length) {
    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Firebase Admin not configured. Check FIREBASE_* env vars.');
    }
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }
}

export function getDb() {
  ensureApp();
  return getFirestore();
}

export { FieldValue };
