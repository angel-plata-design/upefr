import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useInquiry } from '../hooks/useInquiry';
import FormNotice from './FormNotice';

const ContactForm = ({ inProductView = false, hideHeader = false }) => {
    const [submitted, setSubmitted] = useState(false);

    const { submit, pending, error } = useInquiry('contacto');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await submit(Object.fromEntries(new FormData(e.currentTarget)))) setSubmitted(true);
    };

    return (
        <div className={`${inProductView ? 'bg-white rounded-xl shadow-lg border border-gray-100 p-8' : (hideHeader ? '' : 'bg-gray-50 py-16 px-4 border-t border-gray-200')}`}>
            <div className={inProductView || hideHeader ? '' : 'max-w-3xl mx-auto text-center'}>
                {!hideHeader && (
                    <>
                        <h3 className={`font-bold text-black uppercase tracking-widest leading-tight mb-4 ${inProductView ? 'text-xl' : 'text-2xl'}`}>
                            ¿Buscas Una Solución Innovadora Para Ropa AR / FR / EPP?
                        </h3>
                        <p className={`text-gray-500 mb-8 font-medium ${inProductView ? 'text-xs' : 'text-sm'}`}>
                            Te ayudamos a crear un programa de uniformes efectivo y a la medida de tu operación.<br />
                            <span className="font-bold text-black block mt-2 uppercase tracking-widest">¡Contáctanos hoy!</span>
                        </p>
                    </>
                )}

                {submitted ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                        <div className="w-16 h-16 bg-black flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-black uppercase tracking-widest">¡Mensaje Enviado!</h4>
                        <p className="text-gray-500 text-sm max-w-xs">
                            Tu solicitud fue aceptada para envío al equipo de UPE FR. Te contactaremos con los datos que compartiste.
                        </p>
                        <button type="button" onClick={() => setSubmitted(false)} className="underline text-sm">Enviar otra solicitud</button>
                    </div>
                ) : (
                    <form
                        className={`space-y-4 text-left ${inProductView || hideHeader ? '' : 'bg-white p-8 mb-8 border border-gray-200'}`}
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-medium text-gray-400 mb-2">Nombre *</label>
                                <input aria-label="Nombre" name="nombre" type="text" required className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-medium text-gray-400 mb-2">Correo electrónico *</label>
                                <input aria-label="Correo electrónico" name="email" type="email" required className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-medium text-gray-400 mb-2">Número de teléfono</label>
                            <input aria-label="Número de teléfono" name="telefono" type="tel" className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-medium text-gray-400 mb-2">Mensaje *</label>
                            <textarea aria-label="Mensaje" name="mensaje" required rows="3" className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black"></textarea>
                        </div>
                        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                        <FormNotice />
                        <div className={inProductView ? 'pt-2' : 'text-center pt-2'}>
                            <button type="submit" disabled={pending} className={`bg-black text-white px-8 py-4 border border-black hover:bg-white hover:text-black font-bold uppercase tracking-widest transition-colors text-xs ${inProductView ? 'w-full' : 'w-full md:w-auto'}`}>
                                {pending ? "Enviando..." : "Solicitar Información"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactForm;
