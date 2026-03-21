import React from 'react';

const Section = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-lg font-bold text-black mb-3 border-b border-gray-100 pb-2">{title}</h2>
        <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
);

const TermsView = () => (
    <div className="flex-1 bg-white">
        <div className="bg-[#f5f5f5] border-b border-gray-200 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-2">Términos del Servicio</h1>
                <p className="text-gray-500 text-sm">Última actualización: 14 de marzo de 2025 · Uniformes Profesionales</p>
            </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-12">
            <Section title="1. Aceptación de los Términos">
                <p>Al acceder y utilizar el sitio web de Uniformes Profesionales (en adelante "el Sitio"), usted acepta cumplir y quedar vinculado por los presentes Términos del Servicio. Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice el Sitio.</p>
            </Section>
            <Section title="2. Descripción del Servicio">
                <p>Uniformes Profesionales ofrece servicios de asesoría, cotización, diseño, fabricación y distribución de uniformes corporativos, industriales, médicos, de restaurante y equipo de protección personal (EPP). El Sitio funciona como plataforma de exhibición de productos e inicio del proceso de cotización.</p>
                <p>Todos los precios mostrados, de haberlos, son referenciales y sujetos a confirmación según volumen, talla, personalización y disponibilidad de inventario.</p>
            </Section>
            <Section title="3. Uso del Sitio">
                <p>Usted se compromete a utilizar el Sitio únicamente para fines lícitos y de manera que no infrinja los derechos de terceros. Queda prohibido:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Reproducir o distribuir el contenido del Sitio sin autorización previa y por escrito.</li>
                    <li>Intentar acceder de manera no autorizada a sistemas o redes del Sitio.</li>
                    <li>Enviar información falsa o engañosa a través de los formularios de contacto.</li>
                </ul>
            </Section>
            <Section title="4. Propiedad Intelectual">
                <p>Todo el contenido del Sitio, incluyendo textos, imágenes, logotipos, íconos y gráficos, es propiedad de Uniformes Profesionales o de sus licenciantes y está protegido por las leyes de propiedad intelectual aplicables en México.</p>
            </Section>
            <Section title="5. Cotizaciones y Pedidos">
                <p>Las cotizaciones generadas a través del Sitio o por correo electrónico tienen una vigencia de 15 días naturales, salvo indicación distinta. Los pedidos se confirman únicamente mediante la firma de una orden de compra o el anticipo correspondiente, según se acuerde con el asesor asignado.</p>
            </Section>
            <Section title="6. Tiempos de Entrega">
                <p>Los tiempos de producción y entrega son estimados y dependen de la disponibilidad de materiales, volumen del pedido y requerimientos de personalización. Uniformes Profesionales no se responsabiliza por retrasos causados por factores externos (huelgas, desastres naturales, problemas aduanales, etc.).</p>
            </Section>
            <Section title="7. Cambios y Devoluciones">
                <p>Se aceptan cambios en prendas con defecto de fabricación comprobado dentro de los 15 días naturales posteriores a la recepción del pedido. No se aceptan devoluciones en prendas personalizadas (bordado, serigrafía, DTF) una vez que el proceso de producción ha iniciado.</p>
            </Section>
            <Section title="8. Limitación de Responsabilidad">
                <p>Uniformes Profesionales no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o la incapacidad de uso del Sitio. La responsabilidad máxima estará limitada al monto pagado por el pedido en cuestión.</p>
            </Section>
            <Section title="9. Modificaciones">
                <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el Sitio. Su uso continuo del Sitio constituye su aceptación de los Términos modificados.</p>
            </Section>
            <Section title="10. Ley Aplicable y Jurisdicción">
                <p>Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia derivada del uso del Sitio, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad de Ensenada, Baja California, México.</p>
            </Section>
            <Section title="11. Contacto">
                <p>Para dudas sobre estos Términos: <a href="mailto:info@uniformesprofesionales.mx" className="text-[#0057B8] hover:underline">info@uniformesprofesionales.mx</a></p>
            </Section>
        </div>
    </div>
);

export default TermsView;
