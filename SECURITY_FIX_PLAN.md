# Security & Quality Hardening Plan

## Environment & Secrets
1. Validate critical Brevo env vars (`BREVO_API_KEY`, `SYSTEM_EMAIL_FROM`, `SYSTEM_EMAIL_TO`) at startup. Fail fast when missing to avoid silent email drops.
2. Log Firebase Admin credential parsing issues even in production so misconfigurations surface immediately.
3. Replace shared localStorage admin token with a server-issued HttpOnly session cookie plus middleware.

### Firebase / Make.com Steps
1. In Vercel project settings add:
   - `FIREBASE_SERVICE_ACCOUNT`: paste full JSON from GCP → IAM → Service Accounts → Keys → JSON.
   - `PRIVATE_API_KEY`: secret string used by Make.com as `x-api-key` header.
   - `BREVO_API_KEY`, `SYSTEM_EMAIL_FROM`, `SYSTEM_EMAIL_TO`.
2. In Firebase console ensure the service account has Firestore access (Editor role minimal) and rotate keys after upload.

## API Hardening
1. Franchise submit: tighten Zod schema, normalize phone numbers, sanitize user strings, and add per-IP rate limiting.
2. Franchise leads endpoint: enforce pagination (`limit`/`cursor`) and optional `updatedAfter`. Return deduped E.164 phones only.
3. Admin leads: move to authenticated session API, log each PATCH with actor metadata.
4. Gallery list: restrict to image extensions, add caching (`revalidate` seconds) and optional folder filter.

## Client UX Improvements
1. Replace `window.load` reliance in `ClientLayout` with `router` navigation events + `document.readyState` fallback.
2. Refactor footer accordions to use `ResizeObserver` so height animations adjust when content changes.

## Admin Dashboard Enhancements
1. Replace `alert()` with inline toast component to avoid blocking dialogs.
2. Sync logout across tabs via `storage` event and clear tokens on `visibilitychange`. Move toward HttpOnly cookies with server session.
3. Emit Firestore audit log documents for each status change (id, status, timestamp, actor).

## Data Validation & Privacy
1. Normalize phone numbers server-side to E.164 and reject invalid formats.
2. Ensure Gallery API only lists approved extensions (jpg/png/webp/avif) and hides docs/pdfs.
3. Escape user-provided values before inserting into HTML emails.

## Testing Checklist
1. `npm run lint` → verify zero warnings/errors.
2. `npm run build` → ensure production build succeeds with no ESLint violations.
3. Exercise `/api/franchise/submit` in Postman with valid/invalid payloads (rate limit, schema errors, sanitized emails).
4. Call `/api/franchise-leads` via curl with correct/incorrect `x-api-key` to verify auth + pagination.
5. Run admin dashboard locally: confirm toasts replace alerts, tokens clear on logout, and audit logs appear in Firestore.
