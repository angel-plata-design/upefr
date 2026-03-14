import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/constants';
import { CATEGORIAS } from '../data/categorias';

const Footer = ({ navigate }) => {
    const [subEmail, setSubEmail] = useState('');
    const [subOk, setSubOk] = useState(false);

    const handleSub = (e) => {
        e.preventDefault();
        if (subEmail) { setSubOk(true); setSubEmail(''); }
    };

    const sections = [
        { label: 'Inicio', view: 'home' },
        { label: 'Nosotros', view: 'about' },
        { label: 'Servicios de Decorado', view: 'services' },
        { label: 'UPE360', view: 'upe360' },
        { label: 'Cotiza tu Proyecto', view: 'quote' },
        { label: 'Términos del Servicio', view: 'terms' },
        { label: 'Aviso de Privacidad', view: 'privacy' },
    ];

    return (
        <footer className="bg-[#0f0f1a] text-gray-300">
            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Col 1 — Marca */}
                    <div>
                        <img
                            src={`${import.meta.env.BASE_URL}logo-blanco.png`}
                            alt="Uniformes Profesionales"
                            className="h-10 w-auto mb-4 opacity-90"
                        />
                        <p className="text-sm text-gray-400 leading-relaxed mb-5">
                            Tu socio estratégico en soluciones de uniformes industriales, corporativos y médicos. Calidad, personalización y entrega garantizada.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { href: COMPANY_INFO.redes.facebook, icon: <Facebook className="w-4 h-4" />, label: 'Facebook' },
                                { href: COMPANY_INFO.redes.instagram, icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
                                { href: COMPANY_INFO.redes.linkedin, icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
                            ].map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                                    className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#c84126] hover:border-[#c84126] transition-all duration-300">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                        {/* UPEFR link */}
                        <a
                            href="https://flowmx.github.io/upefr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#c84126] hover:text-white transition-colors border-b border-[#c84126] pb-0.5"
                        >
                            <ChevronRight className="w-3 h-3" /> upeFR — Ropa Antiflama
                        </a>
                    </div>

                    {/* Col 2 — Categorías */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Categorías</h4>
                        <ul className="flex flex-col gap-2">
                            {CATEGORIAS.map(cat => (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => navigate('store', { categoria: cat.id })}
                                        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                                    >
                                        <ChevronRight className="w-3 h-3 text-[#c84126] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {cat.nombre}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 — Secciones */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Información</h4>
                        <ul className="flex flex-col gap-2">
                            {sections.map(s => (
                                <li key={s.view}>
                                    <button
                                        onClick={() => navigate(s.view)}
                                        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                                    >
                                        <ChevronRight className="w-3 h-3 text-[#c84126] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {s.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 — Contacto + Suscripción */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contacto</h4>
                        <div className="flex flex-col gap-3 mb-6 text-sm text-gray-400">
                            <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-start gap-2 hover:text-white transition-colors">
                                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#c84126]" />
                                {COMPANY_INFO.email}
                            </a>
                            <a href={`tel:${COMPANY_INFO.telefonos[0].replace(/\s/g, '')}`} className="flex items-start gap-2 hover:text-white transition-colors">
                                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#c84126]" />
                                {COMPANY_INFO.whatsappDisplay}
                            </a>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#c84126]" />
                                <span>{COMPANY_INFO.direccion}</span>
                            </div>
                        </div>

                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-3">Newsletter</h4>
                        {!subOk ? (
                            <form onSubmit={handleSub} className="flex gap-2">
                                <input
                                    type="email" required placeholder="tu@correo.com"
                                    value={subEmail} onChange={e => setSubEmail(e.target.value)}
                                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm placeholder-gray-500 text-white focus:outline-none focus:border-[#c84126]"
                                />
                                <button type="submit" className="bg-[#c84126] hover:bg-[#a8341e] transition-colors px-3 py-2 rounded-lg">
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </form>
                        ) : (
                            <p className="text-green-400 text-sm font-semibold">✓ ¡Suscrito exitosamente!</p>
                        )}
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Uniformes Profesionales. Todos los derechos reservados.</p>
                    <div className="flex gap-4">
                        <button onClick={() => navigate('terms')} className="hover:text-white transition-colors">Términos</button>
                        <button onClick={() => navigate('privacy')} className="hover:text-white transition-colors">Privacidad</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
