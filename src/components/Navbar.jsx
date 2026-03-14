import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { CATEGORIAS } from '../data/categorias';
import { COMPANY_INFO, MENSAJE_MAYOREO } from '../data/constants';

const Navbar = ({ currentView, navigate }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredCat, setHoveredCat] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const megaMenuRef = useRef(null);
    let hideTimeout = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleMouseEnterCat = (catId) => {
        clearTimeout(hideTimeout.current);
        setHoveredCat(catId);
    };

    const handleMouseLeave = () => {
        hideTimeout.current = setTimeout(() => setHoveredCat(null), 150);
    };

    const handleNavClick = (view, extra) => {
        setMenuOpen(false);
        setHoveredCat(null);
        navigate(view, extra);
    };

    const navLinks = [
        { label: 'Inicio', view: 'home' },
        { label: 'Catálogo', view: 'store' },
        { label: 'Servicios', view: 'services' },
        { label: 'UPE360', view: 'upe360' },
        { label: 'Nosotros', view: 'about' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* TOP BAR */}
            <div className="bg-[#1a1a2e] text-white text-[11px] py-2 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex-1 overflow-hidden">
                        <div className="animate-marquee whitespace-nowrap">
                            {MENSAJE_MAYOREO}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{MENSAJE_MAYOREO}
                        </div>
                    </div>
                    <a
                        href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-1.5 text-green-400 font-semibold hover:text-green-300 transition-colors"
                    >
                        <Phone className="w-3 h-3" />
                        {COMPANY_INFO.whatsappDisplay}
                    </a>
                </div>
            </div>

            {/* MAIN HEADER */}
            <div className={`bg-white border-b transition-shadow duration-300 ${scrolled ? 'shadow-md border-gray-200' : 'border-gray-100'}`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <button
                            onClick={() => handleNavClick('home')}
                            className="flex items-center gap-3 group"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}logo-oscuro.png`}
                                alt="Uniformes Profesionales"
                                className="h-9 w-auto"
                            />
                        </button>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={handleMouseLeave}>
                            {/* Categorías mega-menú */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnterCat('all')}
                            >
                                <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-black transition-colors rounded-md hover:bg-gray-50">
                                    Categorías <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${hoveredCat === 'all' ? 'rotate-180' : ''}`} />
                                </button>

                                {hoveredCat === 'all' && (
                                    <div
                                        ref={megaMenuRef}
                                        onMouseEnter={() => clearTimeout(hideTimeout.current)}
                                        onMouseLeave={handleMouseLeave}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[820px] bg-white border border-gray-200 shadow-2xl rounded-lg p-6 grid grid-cols-4 gap-6 z-50"
                                    >
                                        {CATEGORIAS.map(cat => (
                                            <div key={cat.id}>
                                                <button
                                                    onClick={() => handleNavClick('store', { categoria: cat.id })}
                                                    className="font-bold text-black text-sm mb-2 hover:text-[#c84126] transition-colors block text-left w-full"
                                                >
                                                    {cat.nombre}
                                                </button>
                                                <div className="flex flex-col gap-1">
                                                    {cat.tipos.slice(0, 4).map(tipo => (
                                                        <button
                                                            key={tipo}
                                                            onClick={() => handleNavClick('store', { categoria: cat.id, tipoBusqueda: tipo })}
                                                            className="text-xs text-gray-500 hover:text-black text-left transition-colors py-0.5"
                                                        >
                                                            {tipo}
                                                        </button>
                                                    ))}
                                                    <button
                                                        onClick={() => handleNavClick('store', { categoria: cat.id })}
                                                        className="text-[10px] font-bold text-[#c84126] uppercase tracking-wide mt-1 text-left hover:underline"
                                                    >
                                                        Ver todo →
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {navLinks.map(link => (
                                <button
                                    key={link.view}
                                    onClick={() => handleNavClick(link.view)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${currentView === link.view ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}
                                >
                                    {link.label}
                                </button>
                            ))}

                            {/* CTA */}
                            <button
                                onClick={() => handleNavClick('quote')}
                                className="ml-3 bg-[#c84126] text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-[#a8341e] transition-colors"
                            >
                                Cotiza tu Proyecto
                            </button>
                        </nav>

                        {/* Mobile burger */}
                        <button
                            className="lg:hidden p-2"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
                    <div className="px-4 py-4 flex flex-col gap-1">
                        {navLinks.map(link => (
                            <button
                                key={link.view}
                                onClick={() => handleNavClick(link.view)}
                                className="text-left px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                {link.label}
                            </button>
                        ))}
                        <div className="border-t border-gray-100 pt-3 mt-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Categorías</p>
                            {CATEGORIAS.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleNavClick('store', { categoria: cat.id })}
                                    className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md block w-full"
                                >
                                    {cat.nombre}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => handleNavClick('quote')}
                            className="mt-3 bg-[#c84126] text-white px-4 py-3 rounded-md text-sm font-bold"
                        >
                            Cotiza tu Proyecto
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 30s linear infinite; display: inline-block; }
            `}</style>
        </header>
    );
};

export default Navbar;
