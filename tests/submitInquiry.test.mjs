import test from 'node:test';
import assert from 'node:assert/strict';
import { submitInquiry, validateAttachment, MAX_ATTACHMENT_BYTES } from '../src/lib/submitInquiry.mjs';

const contact = { nombre: 'Prueba local', email: ' prueba@example.com ', mensaje: 'Prueba sin envío real', telefono: '000' };
const ok = async () => ({ ok: true, json: async () => ({ success: true }) });

test('routes contact to own API; ignores injected service settings', async () => {
    let request;
    await submitInquiry('contacto', { ...contact, _cc: 'otro@example.com', _subject: 'inyectado' }, {
        fetchImpl: async (url, options) => { request = { url, ...options }; return ok(); },
    });
    assert.equal(request.url, '/api/inquiries');
    assert.equal(request.body.get('_cc'), null);
    assert.equal(request.body.get('_subject'), null);
    assert.equal(request.body.get('tipo'), 'contacto');
    assert.equal(request.body.get('email'), 'prueba@example.com');
    assert.equal(request.body.get('_captcha'), null);
    assert.equal(request.headers['Content-Type'], undefined, 'browser must supply multipart boundary');
});
test('quote includes product/SKU and actual attachment bytes', async () => {
    const attachment = new File(['contenido de prueba'], 'referencia.pdf', { type: 'application/pdf' });
    const values = { ...contact, empresa: 'Prueba', tipo_proyecto: 'Otro', cantidades: '10', producto: 'Camisa FR', sku: 'TEST', observaciones: 'Norma solicitada' };
    await submitInquiry('cotizacion', values, { attachment, fetchImpl: async (_url, options) => {
        assert.equal(options.body.get('producto'), 'Camisa FR');
        assert.equal(options.body.get('sku'), 'TEST');
        assert.equal(await options.body.get('attachment').text(), 'contenido de prueba');
        return ok();
    } });
});
test('catalog request is a request, not automated discount delivery', async () => {
    await submitInquiry('catalogo', { email: 'prueba@example.com' }, { fetchImpl: async (_url, options) => {
        assert.match(options.body.get('solicitud'), /Deseo recibir/);
        return ok();
    } });
});
for (const [label, response] of [
    ['HTTP 429', { ok: false, json: async () => ({ success: true }) }],
    ['service rejection', { ok: true, json: async () => ({ success: 'false' }) }],
    ['non-boolean success', { ok: true, json: async () => ({ success: 'true' }) }],
    ['invalid JSON', { ok: true, json: async () => { throw new Error('invalid'); } }],
]) test(`does not acknowledge success on ${label}`, async () => {
    await assert.rejects(submitInquiry('contacto', contact, { fetchImpl: async () => response }), /No pudimos confirmar/);
});
test('network/abort failure is actionable without exposing technical response', async () => {
    await assert.rejects(submitInquiry('contacto', contact, { fetchImpl: async () => { throw new Error('server internals'); } }), /Tus datos siguen aquí/);
});
test('blocks invalid email and required whitespace before network', async () => {
    const unexpected = async () => assert.fail('must not send');
    await assert.rejects(submitInquiry('contacto', { ...contact, email: 'invalid' }, { fetchImpl: unexpected }), /correo/);
    await assert.rejects(submitInquiry('contacto', { ...contact, nombre: '   ' }, { fetchImpl: unexpected }), /obligatorios/);
});
test('blocks honeypot submissions and unknown form types', async () => {
    await assert.rejects(submitInquiry('contacto', { ...contact, website: 'spam' }), /procesar/);
    await assert.rejects(submitInquiry('otro', contact), /no válido/);
});
test('rejects oversize and unsupported attachment; accepts boundary', () => {
    assert.throws(() => validateAttachment({ name: 'ref.pdf', size: MAX_ATTACHMENT_BYTES + 1 }), /2 MB/);
    assert.throws(() => validateAttachment({ name: 'script.exe', size: 10 }), /Adjunta/);
    assert.doesNotThrow(() => validateAttachment({ name: 'ref.PDF', size: MAX_ATTACHMENT_BYTES }));
});
