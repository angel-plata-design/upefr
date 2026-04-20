import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ExternalLink, User, Flame } from 'lucide-react';
import { COMPANY_INFO, MENSAJE_MAYOREO } from '../data/constants';

// FR categories for the mega menu
const TIPOS_PRENDA_FR = [
    'Camisas FR',
    'Playeras FR',
    'Chamarras FR',
    'Pantalones FR',
    'Overoles',
    'Chalecos FR',
];

const CATEGORIAS_FR = [
    { id: 'industrial', label: 'Ropa FR' },
    { id: 'calzado', label: 'Calzado de Seguridad' },
    { id: 'epp', label: 'EPP Especializado' },
    { id: 'accesorios', label: 'Accesorios FR' },
];

const MARCAS_FR_MENU = [
    'Bulwark',
    'Ariat Work FR',
    'Carhartt FR',
    'Lakeland',
    'Kishigo',
    'Timberland PRO',
];

const UPE_UNIFORMES_URL = 'https://flowmx.github.io/upeuniformes/';

const Navbar = ({ currentView, navigate }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false);
    const [sobreOpen, setSobreOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const catTimeout = useRef(null);
    const sobreTimeout = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavClick = (view, extra) => {
        setMenuOpen(false);
        setCatOpen(false);
        setSobreOpen(false);
        navigate(view, extra);
    };

    // Hover helpers
    const openCat = () => { clearTimeout(catTimeout.current); setCatOpen(true); };
    const closeCat = () => { catTimeout.current = setTimeout(() => setCatOpen(false), 160); };
    const openSobre = () => { clearTimeout(sobreTimeout.current); setSobreOpen(true); };
    const closeSobre = () => { sobreTimeout.current = setTimeout(() => setSobreOpen(false), 160); };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* ── TOP BAR ── */}
            <div className="bg-[#0A1628] text-white text-[11px] py-1.5 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    {/* Marquee left */}
                    <div className="flex-1 overflow-hidden">
                        <div className="animate-marquee whitespace-nowrap text-gray-300">
                            🔥 Descuentos por mayoreo arriba de 12 piezas&nbsp;&nbsp;•&nbsp;&nbsp;Entregas a todo México&nbsp;&nbsp;•&nbsp;&nbsp;Uniformes FR certificados NFPA 70E / NFPA 2112
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            🔥 Descuentos por mayoreo arriba de 12 piezas&nbsp;&nbsp;•&nbsp;&nbsp;Entregas a todo México&nbsp;&nbsp;•&nbsp;&nbsp;Uniformes FR certificados NFPA 70E / NFPA 2112
                        </div>
                    </div>
                    {/* Right links */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <a
                            href={UPE_UNIFORMES_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors font-semibold"
                        >
                            <ExternalLink className="w-3 h-3" />
                            UPE Uniformes
                        </a>
                        <span className="text-gray-600">|</span>
                        <button
                            onClick={() => handleNavClick('login')}
                            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors font-semibold"
                        >
                            <User className="w-3 h-3" />
                            Ingresar
                        </button>
                    </div>
                </div>
            </div>

            {/* ── MAIN HEADER ── */}
            <div className={`bg-white border-b transition-shadow duration-300 ${scrolled ? 'shadow-md border-gray-200' : 'border-gray-100'}`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-[60px]">

                        {/* Logo */}
                        <button
                            onClick={() => handleNavClick('home')}
                            className="flex items-center gap-2 group"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}logo-oscuro.png`}
                                alt="UPE FR — Uniformes Resistentes a Flama"
                                className="h-9 w-auto"
                            />
                        </button>

                        {/* ── DESKTOP NAV ── */}
                        <nav className="hidden lg:flex items-center gap-0.5">

                            {/* CATEGORÍAS — mega menú */}
                            <div
                                className="relative"
                                onMouseEnter={openCat}
                                onMouseLeave={closeCat}
                            >
                                <button className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${catOpen ? 'text-black bg-gray-100' : 'text-gray-700 hover:text-black hover:bg-gray-50'}`}>
                                    Categorías
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {catOpen && (
                                    <div
                                        onMouseEnter={() => clearTimeout(catTimeout.current)}
                                        onMouseLeave={closeCat}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[700px] bg-white border border-gray-200 shadow-2xl rounded-b-xl rounded-tr-xl p-6 z-50"
                                    >
                                        <div className="grid grid-cols-3 gap-6">
                                            {/* Col 1: Tipo de Prenda */}
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Tipo de Prenda</p>
                                                <div className="flex flex-col gap-1">
                                                    {TIPOS_PRENDA_FR.map(tipo => (
                                                        <button
                                                            key={tipo}
                                                            onClick={() => handleNavClick('store', { tipoBusqueda: tipo })}
                                                            className="text-sm text-gray-600 hover:text-black text-left py-0.5 transition-colors hover:translate-x-0.5 transform duration-150"
                                                        >
                                                            {tipo}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Col 2: Categorías */}
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Categorías</p>
                                                <div className="flex flex-col gap-1">
                                                    {CATEGORIAS_FR.map(cat => (
                                                        <button
                                                            key={cat.id}
                                                            onClick={() => handleNavClick('store', { categoria: cat.id })}
                                                            className="text-sm text-gray-600 hover:text-black text-left py-0.5 transition-colors hover:translate-x-0.5 transform duration-150"
                                                        >
                                                            {cat.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Col 3: Marcas FR */}
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Marcas FR</p>
                                                <div className="flex flex-col gap-1">
                                                    {MARCAS_FR_MENU.map(marca => (
                                                        <button
                                                            key={marca}
                                                            onClick={() => handleNavClick('store', { brand: marca })}
                                                            className="text-sm text-gray-600 hover:text-black text-left py-0.5 transition-colors hover:translate-x-0.5 transform duration-150"
                                                        >
                                                            {marca}
                                                        </button>
                                                    ))}
                                                    <button
                                                        onClick={() => handleNavClick('brands')}
                                                        className="mt-2 text-xs font-bold text-[#0057B8] uppercase tracking-wide text-left hover:underline flex items-center gap-1"
                                                    >
                                                        👉 Ver todas las marcas FR →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Nuestras Marcas */}
                            <button
                                onClick={() => handleNavClick('brands')}
                                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${currentView === 'brands' ? 'text-black bg-gray-100' : 'text-gray-700 hover:text-black hover:bg-gray-50'}`}
                            >
                                Nuestras Marcas
                            </button>

                            {/* Servicios */}
                            <button
                                onClick={() => handleNavClick('services')}
                                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${currentView === 'services' ? 'text-black bg-gray-100' : 'text-gray-700 hover:text-black hover:bg-gray-50'}`}
                            >
                                Servicios
                            </button>

                            {/* SOBRE NOSOTROS — dropdown simple */}
                            <div
                                className="relative"
                                onMouseEnter={openSobre}
                                onMouseLeave={closeSobre}
                            >
                                <button className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${(currentView === 'about' || currentView === 'upe360') ? 'text-black bg-gray-100' : 'text-gray-700 hover:text-black hover:bg-gray-50'}`}>
                                    Sobre Nosotros
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${sobreOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {sobreOpen && (
                                    <div
                                        onMouseEnter={() => clearTimeout(sobreTimeout.current)}
                                        onMouseLeave={closeSobre}
                                        className="absolute top-full right-0 mt-0 w-48 bg-white border border-gray-200 shadow-xl rounded-b-xl rounded-tl-xl py-2 z-50"
                                    >
                                        <button
                                            onClick={() => handleNavClick('about')}
                                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                                        >
                                            Nuestra Empresa
                                        </button>
                                        <button
                                            onClick={() => handleNavClick('upe360')}
                                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors flex items-center gap-2"
                                        >
                                            <Flame className="w-3.5 h-3.5 text-[#0057B8]" />
                                            UPE FR 360
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* CTA — Cotiza tu Proyecto */}
                            <button
                                onClick={() => handleNavClick('quote')}
                                className="ml-3 bg-[#0057B8] text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-[#004A9E] transition-colors shadow-sm hover:shadow-md"
                            >
                                Cotiza tu Proyecto
                            </button>
                        </nav>

                        {/* Mobile burger */}
                        <button
                            className="lg:hidden p-2 text-gray-700"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Abrir menú"
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── MOBILE MENU ── */}
            {menuOpen && (
                <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
                    <div className="px-4 py-4 flex flex-col gap-1">
                        <button onClick={() => handleNavClick('home')} className="text-left px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md">Inicio</button>
                        <button onClick={() => handleNavClick('brands')} className="text-left px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md">Nuestras Marcas</button>
                        <button onClick={() => handleNavClick('services')} className="text-left px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md">Servicios</button>
                        <button onClick={() => handleNavClick('about')} className="text-left px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md">Nuestra Empresa</button>
                        <button onClick={() => handleNavClick('upe360')} className="text-left px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md flex items-center gap-2">
                            <Flame className="w-3.5 h-3.5 text-[#0057B8]" /> UPE FR 360
                        </button>

                        <div className="border-t border-gray-100 pt-3 mt-2">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-3 mb-2">Categorías</p>
                            {CATEGORIAS_FR.map(cat => (
                                <button key={cat.id} onClick={() => handleNavClick('store', { categoria: cat.id })}
                                    className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md block w-full">
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-3 mt-1">
                            <a
                                href={UPE_UNIFORMES_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-500 hover:text-black"
                            >
                                <ExternalLink className="w-3.5 h-3.5" /> UPE Uniformes Profesionales
                            </a>
                        </div>

                        <button
                            onClick={() => handleNavClick('quote')}
                            className="mt-3 bg-[#0057B8] text-white px-4 py-3 rounded-md text-sm font-bold text-center"
                        >
                            Cotiza tu Proyecto
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 35s linear infinite; display: inline-block; }
            `}</style>
        </header>
    );
};

export default Navbar;
