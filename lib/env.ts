const trim = (value: string | undefined | null) => (typeof value === 'string' ? value.trim() : '');

export function ensureEnv(key: string): string {
  const value = trim(process.env[key]);
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
}

export function ensureEnvs(keys: string[]) {
  const missing = keys.filter((key) => !trim(process.env[key]));
  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}

