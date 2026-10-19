import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler, MAX_FILE_BYTES } from './handler.mjs';
import { submitInquiry } from '../../src/lib/submitInquiry.mjs';

const env = { SENDER_EMAIL: 'ventas@upefr.mx', ALLOWED_ORIGINS: 'https://upefr.mx' };
const contact = { tipo: 'contacto', nombre: 'Prueba', email: 'prueba@example.com', mensaje: 'Consulta FR' };
const quote = { ...contact, tipo: 'cotizacion', empresa: 'Empresa', telefono: '123', tipo_proyecto: 'Otro', cantidades: '12', producto: 'Camisa FR', sku: 'FR-1' };
async function eventFor(values = contact, attachment) {
  const form = new FormData();
  for (const [key, value] of Object.entries(values)) form.set(key, value);
  if (attachment) form.set('attachment', attachment);
  return fromForm(form);
}
async function fromForm(form) {
  const request = new Request('https://example.com', { method: 'POST', body: form });
  return { headers: { origin: 'https://upefr.mx', 'content-type': request.headers.get('content-type') }, requestContext: { http: { method: 'POST' } }, isBase64Encoded: true, body: Buffer.from(await request.arrayBuffer()).toString('base64') };
}
const never = async () => assert.fail('must not send');
const handler = sendEmail => createHandler({ env, sendEmail, log: () => {} });
const expectCode = (result, code) => { assert.equal(result.statusCode, code); assert.equal(JSON.parse(result.body).success, false); };

test('fixed To/CC, Reply-To and subject; client cannot redirect email', async () => {
  let mail;
  const result = await handler(async input => { mail = input; return { MessageId: 'test' }; })(await eventFor({ ...contact, _cc: 'attacker@example.com', _subject: 'injected' }));
  assert.equal(result.statusCode, 200);
  assert.equal(JSON.parse(result.body).success, true);
  assert.deepEqual(mail.Destination, { ToAddresses: ['josec@upefr.mx', 'franm@upefr.mx'], CcAddresses: ['ventas@upefr.mx'] });
  assert.deepEqual(mail.ReplyToAddresses, ['prueba@example.com']);
  assert.equal(mail.Content.Simple.Subject.Data, 'UPE FR | Solicitud de información');
  assert.doesNotMatch(mail.Content.Simple.Body.Text.Data, /attacker|injected/);
});
test('quote keeps product, SKU and real attachment bytes', async () => {
  const result = await handler(async mail => {
    assert.match(mail.Content.Simple.Body.Text.Data, /FR-1/);
    assert.equal(mail.Content.Simple.Attachments[0].RawContent.toString(), 'test file');
    assert.equal(mail.Content.Simple.Attachments[0].ContentType, 'application/pdf');
    return { MessageId: 'test' };
  })(await eventFor(quote, new File(['test file'], 'ref.pdf')));
  assert.equal(result.statusCode, 200);
});
test('catalog accepted without inventing coupon delivery', async () => {
  const result = await handler(async mail => { assert.match(mail.Content.Simple.Subject.Data, /catálogo/); return { MessageId: 'test' }; })(await eventFor({ tipo: 'catalogo', email: 'prueba@example.com' }));
  assert.equal(result.statusCode, 200);
});
test('provider failures and missing acceptance return failure, with no personal data in logs', async () => {
  const logs = [];
  for (const sendEmail of [async () => { throw Error('secret'); }, async () => ({})]) {
    const result = await createHandler({ env, sendEmail, log: value => logs.push(value) })(await eventFor());
    expectCode(result, 502);
    assert.doesNotMatch(result.body, /secret/);
  }
  assert.deepEqual(logs, ['inquiry_send_failed', 'inquiry_send_failed']);
});
test('rejects missing/foreign origins, invalid methods and unconfigured sender', async () => {
  const event = await eventFor();
  expectCode(await handler(never)({ ...event, headers: { ...event.headers, origin: 'https://evil.example' } }), 403);
  expectCode(await handler(never)({ ...event, headers: { ...event.headers, origin: undefined } }), 403);
  expectCode(await handler(never)({ ...event, requestContext: { http: { method: 'GET' } } }), 405);
  expectCode(await createHandler({ env: {}, sendEmail: never })(event), 503);
});
test('OPTIONS returns CORS headers without mail', async () => {
  const result = await handler(never)({ headers: { origin: 'https://upefr.mx' }, requestContext: { http: { method: 'OPTIONS' } } });
  assert.equal(result.headers['Access-Control-Allow-Origin'], 'https://upefr.mx');
  assert.equal(result.statusCode, 200);
});
test('rejects malformed, duplicate, missing, header-injection and oversized fields', async () => {
  for (const values of [{ ...contact, email: 'a@b.com\r\nBcc:x@y.com' }, { ...contact, nombre: ' ' }, { ...contact, tipo: 'otro' }, { ...contact, website: 'spam' }, { ...contact, mensaje: 'x'.repeat(5001) }]) {
    expectCode(await handler(never)(await eventFor(values)), 400);
  }
  const form = new FormData();
  for (const [key, value] of Object.entries(contact)) form.set(key, value);
  form.append('email', 'other@example.com');
  expectCode(await handler(never)(await fromForm(form)), 400);
  const event = await eventFor();
  expectCode(await handler(never)({ ...event, body: 'invalid' }), 400);
  expectCode(await handler(never)({ ...event, body: 'x'.repeat(3_000_001) }), 413);
  expectCode(await handler(never)({ ...event, headers: { ...event.headers, 'content-type': 'application/json' } }), 415);
});
test('rejects executable, empty, oversized or non-quote attachments', async () => {
  for (const [values, file] of [[quote, new File(['x'], 'ref.exe')], [quote, new File([], 'ref.pdf')], [quote, new File([new Uint8Array(MAX_FILE_BYTES + 1)], 'ref.pdf')], [contact, new File(['x'], 'ref.pdf')]]) {
    expectCode(await handler(never)(await eventFor(values, file)), 400);
  }
});
test('frontend multipart request reaches real handler and returns confirmed acceptance', async () => {
  let called = 0;
  const api = handler(async () => { called++; return { MessageId: 'test' }; });
  const result = await submitInquiry('contacto', contact, { fetchImpl: async (_url, options) => {
    const response = await api(await fromForm(options.body));
    return { ok: response.statusCode === 200, json: async () => JSON.parse(response.body) };
  } });
  assert.deepEqual(result, { accepted: true });
  assert.equal(called, 1);
});
