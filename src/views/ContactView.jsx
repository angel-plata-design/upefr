import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, User, MessageCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactView = ({ handleWhatsAppClick }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-1 bg-white"
    >
        {/* Banner */}
        <div className="relative bg-black py-12 md:py-24 px-4 overflow-hidden border-b border-gray-200">
            <div className="relative z-10 max-w-[1600px] mx-auto text-center">
                <div className="inline-block bg-white text-black font-bold px-4 py-1.5 text-xs mb-6 uppercase tracking-widest">Atención Personalizada</div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight uppercase">
                    ¿Necesitas Ropa FR, Calzado<br className="hidden md:block" /> de Seguridad o EPP Certificado?
                </h1>
                <p className="text-sm md:text-base text-gray-300 mb-8 max-w-3xl mx-auto font-medium">
                    Te ayudamos a crear un programa de uniformes efectivo y a la medida de tu operación.
                </p>
                <div className="w-16 h-1 bg-white mx-auto mb-8 md:mb-16"></div>

                {/* Tarjetas de contacto */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-8">
                    {/* Oficina */}
                    <div className="bg-[#111] border border-gray-800 p-6 md:p-10 hover:border-gray-500 transition-all flex flex-col justify-center items-center group">
                        <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-sm font-bold mb-4 text-white uppercase tracking-widest">Oficina Corporativa</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Av. Libertad 1723, Maestros, 22840</p>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">Ensenada, B.C., Mexico</p>
                        <a href="mailto:info@uniformesprofesionales.mx" className="text-gray-300 font-medium block hover:text-white transition mt-auto mb-4 truncate w-full text-xs">info@uniformesprofesionales.mx</a>
                        <p className="text-white font-bold text-lg tracking-wide">+52 646 596 1975</p>
                    </div>

                    {/* Contacto */}
                    <div className="bg-[#111] border border-gray-800 p-6 md:p-10 hover:border-gray-500 transition-all flex flex-col justify-center items-center group">
                        <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-sm font-bold mb-2 text-white uppercase tracking-widest">José Cendejas</h3>
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-6">Gerente de Desarrollo de Negocios</p>
                        <a href="mailto:josec@uniformesprofesionales.mx" className="text-gray-300 font-medium block hover:text-white transition mt-auto mb-4 truncate w-full text-xs">josec@uniformesprofesionales.mx</a>
                        <p className="text-white font-bold text-base tracking-wide mb-1">+52 646 295 2269</p>
                        <p className="text-white font-bold text-base tracking-wide">+52 646 454 8538</p>
                    </div>

                    {/* WhatsApp */}
                    <div className="bg-white border border-gray-200 p-6 md:p-10 hover:border-black transition-all flex flex-col justify-center items-center group">
                        <div className="w-16 h-16 bg-black/5 flex items-center justify-center mb-6 group-hover:bg-black/10 transition-colors">
                            <MessageCircle className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-sm font-bold mb-4 text-black uppercase tracking-widest">WhatsApp Directo</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed text-sm">Cotizaciones, dudas y respuestas rápidas a un clic de distancia.</p>
                        <button onClick={() => handleWhatsAppClick()} className="mt-auto w-full bg-black hover:bg-gray-800 text-white px-6 py-4 font-bold text-xs uppercase tracking-widest transition flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 mr-3" />
                            +52 646 295 2269
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Formulario */}
        <div className="py-12 md:py-24 bg-[#f5f5f5] relative border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="bg-white p-10 md:p-14 border border-gray-200">
                    <h2 className="text-2xl font-bold text-center text-black mb-4 tracking-tight">Envíanos un mensaje directo</h2>
                    <div className="w-12 h-px bg-black mx-auto mb-6"></div>
                    <p className="text-center text-gray-500 mb-10 text-sm">Completa el formulario y un asesor experto se pondrá en contacto contigo a la brevedad.</p>
                    <ContactForm hideHeader={true} />
                </div>
            </div>
        </div>
    </motion.div>
);

export default ContactView;
