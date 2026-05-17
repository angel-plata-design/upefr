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
        { label: 'Nuestra Empresa', view: 'about' },
        { label: 'Servicios', view: 'services' },
        { label: 'UPE FR 360', view: 'upe360' },
        { label: 'Nuestras Marcas FR', view: 'brands' },
        { label: 'Cotiza tu Proyecto', view: 'quote' },
        { label: 'Términos del Servicio', view: 'terms' },
        { label: 'Aviso de Privacidad', view: 'privacy' },
    ];

    return (
        <footer className="bg-[#060E1A] text-gray-300">
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
                            Especialistas en uniformes resistentes a flama (FR) para industrias de alto riesgo. Certificación NFPA, personalización y entrega garantizada.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { href: COMPANY_INFO.redes.facebook, icon: <Facebook className="w-4 h-4" />, label: 'Facebook' },
                                { href: COMPANY_INFO.redes.instagram, icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
                                { href: COMPANY_INFO.redes.linkedin, icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
                            ].map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                                    className="w-11 h-11 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#0057B8] hover:border-[#0057B8] transition-all duration-300">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                        {/* UPE Uniformes cross-link */}
                        <a
                            href="https://angel-plata-design.github.io/upeuniformes/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-b border-gray-600 hover:border-white pb-0.5"
                        >
                            <ChevronRight className="w-3 h-3" /> UPE — Uniformes Profesionales
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
                                        <ChevronRight className="w-3 h-3 text-[#0057B8] opacity-0 group-hover:opacity-100 transition-opacity" />
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
                                        <ChevronRight className="w-3 h-3 text-[#0057B8] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {s.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 — Contacto + Suscripción */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contacto</h4>
                        <div className="flex flex-col gap-4 mb-6 text-sm text-gray-400">
                            <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-start gap-2 hover:text-white transition-colors">
                                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#0057B8]" />
                                {COMPANY_INFO.email}
                            </a>
                            {COMPANY_INFO.sucursales.map(suc => (
                                <div key={suc.ciudad} className="flex flex-col gap-1">
                                    <span className="text-white font-semibold text-xs uppercase tracking-wider">{suc.nombre} — {suc.ciudad}</span>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#0057B8]" />
                                        <span>{suc.direccion}</span>
                                    </div>
                                    <a href={`tel:${suc.tel1.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                        <Phone className="w-4 h-4 flex-shrink-0 text-[#0057B8]" />
                                        {suc.tel1}
                                    </a>
                                    <a href={`https://wa.me/${suc.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                                        <Phone className="w-4 h-4 flex-shrink-0 text-[#25D366]" />
                                        {suc.tel2} <span className="text-[#25D366] text-xs">WhatsApp</span>
                                    </a>
                                </div>
                            ))}
                        </div>

                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-3">Newsletter</h4>
                        {!subOk ? (
                            <form onSubmit={handleSub} className="flex gap-2">
                                <input
                                    type="email" required placeholder="tu@correo.com"
                                    value={subEmail} onChange={e => setSubEmail(e.target.value)}
                                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm placeholder-gray-500 text-white focus:outline-none focus:border-[#0057B8]"
                                />
                                <button type="submit" className="bg-[#0057B8] hover:bg-[#004A9E] transition-colors px-3 py-2 rounded-lg">
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
                    <p>© {new Date().getFullYear()} UPE FR — Uniformes Resistentes a Flama. Todos los derechos reservados.</p>
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
