import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

// Fix bug #6: reemplaza alert() con mensaje de éxito inline
const ContactForm = ({ inProductView = false, hideHeader = false }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        e.target.reset();
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
                            Gracias por contactarnos. Un asesor se comunicará contigo a la brevedad.
                        </p>
                    </div>
                ) : (
                    <form
                        className={`space-y-4 text-left ${inProductView || hideHeader ? '' : 'bg-white p-8 mb-8 border border-gray-200'}`}
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-medium text-gray-400 mb-2">Nombre *</label>
                                <input type="text" required className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-medium text-gray-400 mb-2">Correo electrónico *</label>
                                <input type="email" required className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-medium text-gray-400 mb-2">Número de teléfono</label>
                            <input type="tel" className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-medium text-gray-400 mb-2">Mensaje *</label>
                            <textarea required rows="3" className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black"></textarea>
                        </div>
                        <div className={inProductView ? 'pt-2' : 'text-center pt-2'}>
                            <button type="submit" className={`bg-black text-white px-8 py-4 border border-black hover:bg-white hover:text-black font-bold uppercase tracking-widest transition-colors text-xs ${inProductView ? 'w-full' : 'w-full md:w-auto'}`}>
                                Solicitar Información
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactForm;
