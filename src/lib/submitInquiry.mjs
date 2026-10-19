export const SALES_EMAIL = 'josec@upefr.mx';
export const COPY_EMAILS = 'franm@upefr.mx,ventas@upefr.mx';
export const MAX_ATTACHMENT_BYTES = 10_000_000;
const subjects = { cotizacion: 'UPE FR | Solicitud de cotización', contacto: 'UPE FR | Solicitud de información', catalogo: 'UPE FR | Solicitud de novedades y catálogo' };
const fields = {
    cotizacion: ['nombre', 'empresa', 'email', 'telefono', 'tipo_proyecto', 'categoria', 'cantidades', 'observaciones', 'producto', 'sku'],
    contacto: ['nombre', 'email', 'telefono', 'mensaje'], catalogo: ['email'],
};
export function validateAttachment(file) {
    if (!file) return;
    if (file.size > MAX_ATTACHMENT_BYTES) throw new Error('El archivo debe pesar como máximo 10 MB.');
    if (!/\.(pdf|jpe?g|png|xlsx|docx?)$/i.test(file.name)) throw new Error('Adjunta un archivo PDF, JPG, PNG, Word o Excel (.xlsx).');
}
export async function submitInquiry(type, values, { attachment, fetchImpl = globalThis.fetch, endpoint } = {}) {
    if (!fields[type]) throw new Error('Tipo de formulario no válido.');
    if (values.website) throw new Error('No se pudo procesar el formulario.');
    const email = String(values.email || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Escribe un correo electrónico válido.');
    const required = type === 'cotizacion' ? ['nombre', 'empresa', 'telefono', 'tipo_proyecto', 'cantidades'] : type === 'contacto' ? ['nombre', 'mensaje'] : [];
    if (required.some(key => !String(values[key] || '').trim())) throw new Error('Completa los campos obligatorios.');
    validateAttachment(attachment);
    const body = new FormData();
    for (const key of fields[type]) body.set(key, String(values[key] || '').trim());
    body.set('email', email);
    body.set('_subject', subjects[type]);
    body.set('_cc', COPY_EMAILS);
    body.set('_template', 'table');
    body.set('_url', globalThis.location?.href || 'https://upefr.mx/');
    if (type === 'catalogo') body.set('solicitud', 'Deseo recibir novedades y catálogo de UPE FR por correo.');
    if (attachment) body.set('attachment', attachment);
    // The mock endpoint is ignored by production builds.
    const testEndpoint = import.meta.env?.DEV ? import.meta.env.VITE_FORMSUBMIT_TEST_ENDPOINT : '';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);
    try {
        const response = await fetchImpl(endpoint || testEndpoint || `https://formsubmit.co/ajax/${SALES_EMAIL}`, {
            method: 'POST', headers: { Accept: 'application/json' }, body, signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok || ![true, 'true'].includes(result.success) || /activat|confirm.*email/i.test(result.message || '')) throw new Error('SERVICE_REJECTED');
        // Service acceptance is not a guarantee of inbox delivery.
        return { accepted: true };
    } catch {
        throw new Error('No pudimos confirmar el envío. Tus datos siguen aquí. Puedes intentar más tarde o escribir a josec@upefr.mx. Si ya enviaste, revisa antes de repetir la solicitud.');
    } finally { clearTimeout(timeout); }
}
