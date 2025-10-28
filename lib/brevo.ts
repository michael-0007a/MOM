import * as Brevo from '@getbrevo/brevo';

const apiKey = process.env.BREVO_API_KEY;

if (apiKey && apiKey.startsWith('xsmtpsib-')) {
  console.warn('[brevo] BREVO_API_KEY looks like an SMTP key (xsmtpsib-). The SDK requires an API key (xkeysib-). Create a new API key in Brevo.');
}

const brevo = new Brevo.TransactionalEmailsApi();
if (apiKey) {
  brevo.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
} else {
  console.warn('[brevo] Missing BREVO_API_KEY');
}

export default brevo;
export { Brevo };
