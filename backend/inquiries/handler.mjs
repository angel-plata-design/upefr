import { Buffer } from 'node:buffer';

export const MAX_FILE_BYTES = 2_000_000;
const MAX_BODY_BYTES = 2_200_000;
const fields = {
  cotizacion: ['nombre', 'empresa', 'email', 'telefono', 'tipo_proyecto', 'categoria', 'cantidades', 'observaciones', 'producto', 'sku'],
  contacto: ['nombre', 'email', 'telefono', 'mensaje'], catalogo: ['email'],
};
const subjects = { cotizacion: 'Solicitud de cotización', contacto: 'Solicitud de información', catalogo: 'Solicitud de catálogo' };
const required = { cotizacion: ['nombre', 'empresa', 'telefono', 'tipo_proyecto', 'cantidades'], contacto: ['nombre', 'mensaje'], catalogo: [] };
const mimeTypes = { pdf: 'application/pdf', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
const validEmail = value => /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(value) && value.length <= 254;
let sesClient;
async function deliver(input) {
  const { SESv2Client, SendEmailCommand } = await import('@aws-sdk/client-sesv2');
  sesClient ||= new SESv2Client({});
  return sesClient.send(new SendEmailCommand(input));
}

// Injectable transport permits tests without sending real mail.
export function createHandler({ sendEmail = deliver, env = process.env, log = console.error } = {}) {
  return async event => {
    const headers = Object.fromEntries(Object.entries(event.headers || {}).map(([key, value]) => [key.toLowerCase(), value]));
    const origins = (env.ALLOWED_ORIGINS || 'https://upefr.mx,https://www.upefr.mx').split(',').map(s => s.trim()).filter(Boolean);
    const origin = headers.origin;
    const allowed = origins.includes(origin);
    const response = (statusCode, success, message) => ({ statusCode, headers: {
      'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', Vary: 'Origin',
      ...(allowed ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Accept' } : {}),
    }, body: JSON.stringify({ success, ...(message ? { message } : {}) }) });
    // Origin is a browser control, not authentication. API Gateway also throttles traffic.
    if (!allowed) return response(403, false, 'Origen no permitido.');
    const method = event.requestContext?.http?.method || event.httpMethod;
    if (method === 'OPTIONS') return response(200, true);
    if (method !== 'POST') return response(405, false, 'Método no permitido.');
    if (!validEmail(env.SENDER_EMAIL || '')) return response(503, false, 'Servicio de correo pendiente de configuración.');
    const contentType = headers['content-type'] || '';
    if (!/^multipart\/form-data;.*boundary=/i.test(contentType)) return response(415, false, 'Formato no permitido.');
    if (typeof event.body !== 'string' || event.body.length > 3_000_000) return response(413, false, 'Solicitud demasiado grande.');
    const raw = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');
    if (raw.length > MAX_BODY_BYTES) return response(413, false, 'Solicitud demasiado grande.');
    let form;
    try {
      form = await new Request('https://inquiries.internal/', { method: 'POST', headers: { 'Content-Type': contentType }, body: raw }).formData();
    } catch { return response(400, false, 'Formulario no válido.'); }
    for (const key of new Set(form.keys())) {
      if (form.getAll(key).length !== 1) return response(400, false, 'Campos duplicados.');
    }
    if (form.get('website')) return response(400, false, 'Solicitud no válida.');
    const type = form.get('tipo');
    if (!Object.hasOwn(fields, type)) return response(400, false, 'Tipo de solicitud no válido.');
    const values = {};
    for (const key of fields[type]) {
      const value = form.get(key) || '';
      if (typeof value !== 'string' || value.length > (['mensaje', 'observaciones'].includes(key) ? 5000 : 500)) return response(400, false, 'Campo no válido o demasiado largo.');
      values[key] = value.trim();
    }
    if (!validEmail(values.email) || required[type].some(key => !values[key])) return response(400, false, 'Completa los campos obligatorios con datos válidos.');
    let attachment;
    const file = form.get('attachment');
    if (file) {
      const extension = typeof file.name === 'string' ? file.name.split('.').pop().toLowerCase() : '';
      if (type !== 'cotizacion' || !mimeTypes[extension] || !file.size || file.size > MAX_FILE_BYTES) return response(400, false, 'Adjunto no permitido. Máximo 2 MB.');
      attachment = { FileName: file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120), ContentType: mimeTypes[extension], RawContent: Buffer.from(await file.arrayBuffer()), ContentDisposition: 'ATTACHMENT', ContentTransferEncoding: 'BASE64' };
    }
    const text = ['Solicitud desde el sitio UPE FR', `Tipo: ${type}`, ...Object.entries(values).map(([key, value]) => `${key}: ${value}`)].join('\n');
    try {
      const result = await sendEmail({
        FromEmailAddress: env.SENDER_EMAIL,
        Destination: { ToAddresses: ['josec@upefr.mx', 'franm@upefr.mx'], CcAddresses: ['ventas@upefr.mx'] },
        ReplyToAddresses: [values.email],
        Content: { Simple: { Subject: { Data: `UPE FR | ${subjects[type]}`, Charset: 'UTF-8' }, Body: { Text: { Data: text, Charset: 'UTF-8' } }, ...(attachment ? { Attachments: [attachment] } : {}) } },
      });
      if (!result?.MessageId) throw new Error('Missing SES acceptance');
      return response(200, true);
    } catch {
      // Never log submitted personal data, attachments or provider diagnostics.
      log('inquiry_send_failed');
      return response(502, false, 'No se pudo confirmar el envío. Intenta más tarde.');
    }
  };
}
export const handler = createHandler();
