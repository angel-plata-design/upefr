# UPE FR: entrega para instalar los formularios en AWS

Incluye el frontend conectado y el servicio completo de envío (Lambda + API Gateway + Amazon SES). No depende de FormSubmit ni de una cuenta nueva de formularios. Outlook sigue recibiendo los correos; SES es únicamente el emisor. Esta plantilla crea un stack independiente: no cambia el hosting, DNS, certificados ni distribución actual de la web.

## Lo que debe configurar el administrador de AWS

1. Elegir la región y verificar en SES un remitente del dominio `upefr.mx` (por ejemplo `ventas@upefr.mx`). Usar una identidad ya autorizada si existe. La configuración de autenticación de SES se añade sin sustituir los registros MX de Outlook. Si SES está en sandbox, verificar también los destinatarios o solicitar acceso a producción. No publicar hasta que una prueba llegue a los tres buzones.
2. Revisar/aprobar los recursos y costos de AWS: API Gateway, Lambda, SES y CloudWatch se facturan según la cuenta y el uso. No se afirma que sean gratuitos. Se requiere permiso para crear el stack IAM y suficiente cuota de concurrencia Lambda.
3. Instalar AWS CLI, AWS SAM CLI y Node.js 22 o superior en el equipo de despliegue. Usar credenciales AWS fuera del repositorio. Desde la raíz:

   ```sh
   npm ci --prefix backend/inquiries --ignore-scripts
   node --test tests/submitInquiry.test.mjs backend/inquiries/handler.test.mjs
   sam validate --lint --template-file backend/template.yaml
   sam build --template-file backend/template.yaml
   sam deploy --guided
   ```

   Usar un stack nuevo, por ejemplo `upefr-inquiries`. En `SenderEmail` introducir el remitente verificado en la misma región. Mantener `AllowedOrigins` como `https://upefr.mx,https://www.upefr.mx` y confirmar que son los dominios desde los que se sirve la web. Aceptar la creación del rol IAM del stack tras revisar la plantilla. Conservar el archivo local de configuración de SAM fuera de Git.
4. Copiar la salida `InquiryEndpoint` del stack. Antes de construir el frontend, definir `VITE_INQUIRY_ENDPOINT` con esa URL HTTPS completa en el entorno de compilación. En PowerShell:

   ```powershell
   $env:VITE_INQUIRY_ENDPOINT = 'URL_HTTPS_DE_LA_SALIDA_InquiryEndpoint'
   npm ci --ignore-scripts
   npm run build
   ```

   En Linux/macOS:

   ```sh
   VITE_INQUIRY_ENDPOINT='URL_HTTPS_DE_LA_SALIDA_InquiryEndpoint' npm run build
   ```

   Es una variable pública de compilación, no una contraseña. No basta con añadirla después de compilar: hay que reconstruir. Alternativa: enrutar `/api/inquiries` en el hosting hacia esta API conservando POST, cuerpo, cabeceras y Origin. Si no existe ese enrutamiento, es obligatorio definir la URL explícita. No enviar esta ruta al fallback HTML de la SPA.
5. Publicar primero en una vista de prueba con su origen autorizado en `AllowedOrigins`, comprobar el correo y luego usar el procedimiento habitual de publicación de `dist/`. El backend no requiere cambiar `base: '/upefr/'`, las rutas del catálogo ni los assets.

No hay que diseñar otro backend, modificar parámetros ni introducir contraseñas de Outlook. El SDK usa el rol IAM de Lambda, con permiso limitado al remitente configurado y a los tres destinatarios. No añadir claves AWS a variables `VITE_` ni al frontend.

## Destinatarios y contrato ya implementados

- Para: `josec@upefr.mx` y `franm@upefr.mx`.
- CC: `ventas@upefr.mx`.
- Reply-To: correo del visitante, validado por el backend.
- Asunto fijo por tipo. El visitante no puede cambiar destinatarios ni asunto.
- `POST /api/inquiries`, `multipart/form-data`; sin encabezado Content-Type manual en el navegador, para conservar el boundary.
- `tipo`: `cotizacion`, `contacto` o `catalogo`.
- Cotización: `nombre`, `empresa`, `email`, `telefono`, `tipo_proyecto`, `categoria`, `cantidades`, `observaciones`, `producto`, `sku`. Obligatorios: nombre, empresa, email, teléfono, tipo_proyecto y cantidades.
- Contacto: `nombre`, `email`, `telefono`, `mensaje`. Obligatorios: nombre, email y mensaje.
- Catálogo: `email`. Es una solicitud al equipo, no una suscripción o campaña automática.
- `attachment`: opcional y únicamente en cotización, un archivo PDF, JPG, JPEG, PNG, DOC, DOCX o XLSX de hasta 2.000.000 bytes (2 MB). El límite conservador evita exceder el payload síncrono de Lambda al codificar el evento. No hay carga a S3 ni almacenamiento propio de adjuntos. La validación de extensión/tamaño no es un antivirus.
- `website`: campo trampa opcional, debe estar vacío.
- Límites de texto: 5.000 caracteres en mensaje/observaciones, 500 en los demás; correo hasta 254. Se rechazan campos duplicados, tipos y cuerpos inválidos.
- Éxito HTTP 200: `{"success":true}`, únicamente después de obtener `MessageId` de SES. Significa aceptación del proveedor, no garantía de llegada a bandeja.
- Fallo: `{"success":false,"message":"..."}` con HTTP 400, 403, 405, 413, 415, 502 o 503. API Gateway puede devolver 429 antes de invocar Lambda. El frontend trata cualquier no-2xx o respuesta inválida como error y conserva los datos.
- CORS permite solo los orígenes configurados. No es autenticación contra bots. Hay throttling de API Gateway (1 petición/segundo y ráfaga 3) y concurrencia Lambda 2; es un límite compartido y puede rechazar picos legítimos. Ajustar según tráfico real.
- No se registran cuerpos, correos ni archivos desde el handler. CloudWatch conserva los logs de función 14 días. El mensaje sí permanece en los buzones de los destinatarios conforme a sus políticas.

## Prueba de aceptación antes de publicar

1. Desde el origen de prueba autorizado, enviar contacto, solicitud de catálogo desde footer/popup y cotización con PDF de prueba. Usar datos marcados como PRUEBA.
2. Confirmar recepción en José y Francia (Para) y ventas (CC), adjunto legible y Reply-To correcto. Revisar spam/cuarentena y, si no llega, verificación de SES, sandbox y permisos de la región; no considerar un HTTP 200 como prueba de bandeja.
3. Rechazar un adjunto mayor a 2 MB y uno no permitido. Simular fallo de SES en prueba; no debe aparecer éxito y los datos deben mantenerse.
4. Revisar versión móvil, rutas de catálogo y cotización desde producto. Mantener una copia del `dist/` actualmente publicado para volver a ella si hiciera falta. El respaldo de código no sustituye el respaldo del despliegue AWS.
5. Tras aprobar, desplegar el frontend por el proceso habitual. No fusionar el PR ni publicar solo por haber clonado la rama.

## Estado de la entrega

Preparado en rama de revisión, sin modificar `master` ni desplegar AWS. Las 20 pruebas de lógica y transporte usan SES simulado, sin correos reales. La compilación del frontend y ESLint de los archivos frontend modificados pasan. El YAML de SAM se pudo analizar sintácticamente, pero SAM CLI no está instalado aquí: falta `sam validate --lint` en el equipo de despliegue. Se generó el lockfile del backend (auditoría de dependencias: 0 vulnerabilidades notificadas); la instalación completa del SDK en este equipo fue bloqueada por permisos locales. Debe completarse `npm ci --prefix backend/inquiries --ignore-scripts` en el equipo de despliegue. La validación del SDK instalado, permisos AWS, autenticación del remitente y entrega real siguen pendientes. No se presenta esta entrega como un despliegue AWS ya probado.

Los enlaces de WhatsApp y datos de contacto fuera de estos formularios preexistían: esta entrega no los modifica. No lanzar Google Ads hasta comprobar los formularios en producción.

Referencias: [SES con adjuntos](https://docs.aws.amazon.com/ses/latest/dg/attachments.html), [AWS SAM HttpApi](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-httpapi.html).
