import React from 'react';

const Section = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-lg font-bold text-black mb-3 border-b border-gray-100 pb-2">{title}</h2>
        <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
);

const PrivacyView = () => (
    <div className="flex-1 bg-white">
        <div className="bg-[#f5f5f5] border-b border-gray-200 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-2">Aviso de Privacidad</h1>
                <p className="text-gray-500 text-sm">Última actualización: 14 de marzo de 2025 · De conformidad con la LFPDPPP</p>
            </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-12">
            <Section title="Identidad y Domicilio del Responsable">
                <p><strong className="text-black">Uniformes Profesionales S. de R.L. de C.V.</strong> (en adelante "el Responsable"), con domicilio en Av. Libertad 1723, Maestros, 22840 Ensenada, Baja California, México, es el responsable del tratamiento de sus datos personales, de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).</p>
            </Section>
            <Section title="Datos Personales Recabados">
                <p>El Responsable recaba las siguientes categorías de datos personales:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong className="text-black">Datos de identificación:</strong> nombre completo, nombre de empresa.</li>
                    <li><strong className="text-black">Datos de contacto:</strong> correo electrónico, número de teléfono, dirección física.</li>
                    <li><strong className="text-black">Datos laborales:</strong> puesto o cargo dentro de la empresa.</li>
                    <li><strong className="text-black">Datos de preferencias:</strong> tipo y categorías de uniformes de interés, cantidades requeridas.</li>
                </ul>
                <p>No se recaban datos personales sensibles (datos biométricos, estado de salud, información financiera) a través de los formularios del Sitio.</p>
            </Section>
            <Section title="Finalidades del Tratamiento">
                <p><strong className="text-black">Finalidades primarias (necesarias):</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Atender solicitudes de cotización de uniformes y EPP.</li>
                    <li>Dar seguimiento comercial a proyectos de uniformes empresariales.</li>
                    <li>Enviar propuestas, muestras y contratos de servicio.</li>
                    <li>Cumplir obligaciones contractuales y fiscales.</li>
                </ul>
                <p><strong className="text-black">Finalidades secundarias (opcionales):</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Envío de newsletter con novedades, catálogos y descuentos.</li>
                    <li>Estadísticas internas sobre preferencias de productos.</li>
                    <li>Campañas de marketing por correo electrónico.</li>
                </ul>
                <p>Si usted no desea que sus datos sean tratados para las finalidades secundarias, puede manifestarlo enviando un correo a <a href="mailto:info@uniformesprofesionales.mx" className="text-[#c84126] hover:underline">info@uniformesprofesionales.mx</a>.</p>
            </Section>
            <Section title="Transferencias de Datos">
                <p>El Responsable no transfiere datos personales a terceros sin consentimiento previo, salvo en los casos expresamente previstos por el artículo 37 de la LFPDPPP (requerimiento de autoridad competente, obligación legal, etc.).</p>
            </Section>
            <Section title="Derechos ARCO">
                <p>Usted tiene derecho a <strong className="text-black">Acceder, Rectificar, Cancelar u Oponerse (ARCO)</strong> al tratamiento de sus datos personales. Para ejercerlos, envíe solicitud a:</p>
                <ul className="list-none space-y-1 mt-2">
                    <li>📧 <a href="mailto:info@uniformesprofesionales.mx" className="text-[#c84126] hover:underline">info@uniformesprofesionales.mx</a></li>
                    <li>📍 Av. Libertad 1723, Maestros, 22840 Ensenada, B.C., México</li>
                </ul>
                <p>La solicitud deberá incluir: nombre completo, correo de contacto, descripción clara del derecho que desea ejercer y copia de identificación oficial. El Responsable responderá en un plazo de 20 días hábiles.</p>
            </Section>
            <Section title="Uso de Cookies y Tecnologías de Seguimiento">
                <p>El Sitio puede utilizar cookies propias para mejorar la experiencia de navegación (preferencias, sesión). No se utilizan cookies de terceros para publicidad comportamental. Puede deshabilitar las cookies desde la configuración de su navegador.</p>
            </Section>
            <Section title="Cambios al Aviso de Privacidad">
                <p>El Responsable se reserva el derecho de modificar este Aviso en cualquier momento. Las modificaciones se publicarán en este Sitio con su fecha de actualización. El uso continuo del Sitio implica la aceptación de las modificaciones.</p>
            </Section>
            <Section title="Autoridad Supervisora">
                <p>Si considera que el tratamiento de sus datos personales no ha sido adecuado, tiene derecho a interponer queja o denuncia ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI): <a href="https://home.inai.org.mx" target="_blank" rel="noopener noreferrer" className="text-[#c84126] hover:underline">www.inai.org.mx</a></p>
            </Section>
        </div>
    </div>
);

export default PrivacyView;
