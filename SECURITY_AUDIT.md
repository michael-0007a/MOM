# Makers of Milkshakes – Quick Security & Quality Audit

_Date: 2025-11-15_

## 1. Tooling Baseline
- `npm run lint` ⇒ **warn** (unused `_distanceValue` in `app/store-locator/page.tsx`) – fix to keep CI green.
- `npm run build` ⇒ **pass with same warning** – no blocking issues.
- `npm audit` ⇒ reports **moderate** vulnerability in transitive `js-yaml <4.1.1` (prototype pollution). Since it’s dev-only, upgrade the dependency (via `npm audit fix` or pin overriding version) before next release.

## 2. Environment Handling (High impact)
| Issue | Details | Recommendation |
| --- | --- | --- |
| Missing secret validation for Brevo emails | `SYSTEM_EMAIL_FROM`/`SYSTEM_EMAIL_TO` unchecked; missing envs silently skip emails. | Fail fast if env vars absent in production; add monitoring on `Promise.allSettled` failures. |
| Firebase Admin fallback | If `FIREBASE_SERVICE_ACCOUNT` JSON parse fails, code falls back to legacy env vars without logging in prod. | Emit structured error (at least once) so broken creds don’t go unnoticed.
| Admin token storage | Admin UI stores the bearer token in `localStorage` with no encryption; any XSS would leak it. | Move dashboard behind proper auth (NextAuth/vercel middleware) or at least use HttpOnly cookies + separate login API.

## 3. API Routes
| Route | Finding | Severity | Notes |
| --- | --- | --- | --- |
| `/api/franchise/submit` | Zod allows arbitrary `estimatedBudget` strings (no whitelist) → inconsistent data & possible script injection inside emails. | Med | Use enum/regex and escape HTML in emails. Also rate-limit POSTs (currently only honeypot/time heuristic). |
| `/api/franchise-leads` | API key check OK, but returns combined phones from both `Franchise Leads` and `franchiseLeads` collections without pagination; response could leak thousands of numbers if compromised. | Med | Add `limit`, optional `updatedAfter`, and per-IP throttling. |
| `/api/admin/leads` & PATCH | Authorization is shared bearer token set via env, but login form accepts any password without username verification (just token). | High | Implement proper auth provider; at minimum, serve admin UI behind Vercel password or IP allowlist. |
| `/api/gallery/list` | Reads entire `public/gallery` recursively and returns full list; no caching, and exposes filenames (potential PII). | Low | Cache results with `revalidate` or memoization; consider limiting to curated list.

## 4. Client Components
- `LoadingSpinner` disables scroll using inline styles but never restores `document.documentElement.style.overflow` if original value was empty string, forcing `auto`. Minor UX issue.
- `ClientLayout` relies on `window.load` for page readiness. In streaming scenarios, route changes might never fire `load`, causing spinner to stick. Consider `router.events` or `navigation` events for reliability.
- `Footer` accordion relies on `scrollHeight` measured once; dynamic content length changes after hydration (e.g., translation) won’t animate smoothly. Recompute on content mutation.

## 5. Admin Dashboard UX / Security
- Session expiry alerts use `window.alert`, enabling clickjacking; use inline toast.
- `localStorage` token never cleared on tab close unless user hits Logout. Use `storage` event to sync across tabs.
- No audit log when status updates occur. Add server-side logging with `auth token`, `lead id`, `status`.

## 6. Data Validation & Privacy
- Franchise form stores raw phone numbers with minimal validation (only client-side). API should revalidate using regex and normalize to E.164.
- Gallery API lists files under `public/gallery/*`, including Office docs (`.docx`, `.pdf`). Exposure may be unintentional. Filter by approved extensions only.
- Email templates embed user-provided values without escaping `<`/`&`. Although Brevo sends HTML, malicious content could break layout. Sanitize before inserting.

## 7. Next Steps
1. Patch `js-yaml` vulnerability (`npm audit fix --force` if safe or add `overrides`).
2. Harden `/api/franchise/submit`: server-side rate limit (Upstash/Redis) and stricter schema.
3. Replace admin shared-token auth with proper credential flow (e.g., NextAuth + Firebase custom claims).
4. Add server-side validation + escaping for all email-bound fields.
5. Create monitoring to catch Firebase credential misconfig early.
6. Document env vars and rotate keys stored in `.env.local` before committing.

_This report is intentionally concise; reach out if you’d like a deeper penetration test or automatic lint/fix pipeline._

