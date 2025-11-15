import * as Brevo from '@getbrevo/brevo';
import { ensureEnv } from '@/lib/env';

const apiKey = ensureEnv('BREVO_API_KEY');
export const SYSTEM_EMAIL_FROM = ensureEnv('SYSTEM_EMAIL_FROM');
export const SYSTEM_EMAIL_TO = ensureEnv('SYSTEM_EMAIL_TO');

if (apiKey.startsWith('xsmtpsib-')) {
  console.warn(
    '[brevo] BREVO_API_KEY looks like an SMTP key (xsmtpsib-). The SDK requires an API key (xkeysib-). Create a new API key in Brevo.'
  );
}

const brevo = new Brevo.TransactionalEmailsApi();
brevo.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

export default brevo;
export { Brevo };
