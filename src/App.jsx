import React, { useState, useEffect } from 'react';
import { Search, User, Menu, Phone, Mail, MapPin, ArrowLeft, ArrowRight, MessageCircle, Plus, Trash2, CheckCircle, ShieldCheck, ChevronDown, ChevronRight, Truck, FilterX, Target, Eye, Award, Users, Globe, Monitor, Ruler, BarChart3, Headset, Factory, CheckCircle2, X, Shield, AlertTriangle } from 'lucide-react';
import { Shirt, Footprints, Flame, Layers, Scissors, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- NUEVAS CATEGORÍAS DEL MENÚ ---
const CATALOG_MENU = {
    "Uniformes FR": ["Ariat FR", "Axe FR", "Best Welds", "Black Stallion FR", "Bulwark", "Carhartt", "CAT", "Dickies", "Kishigo", "Lakeland", "MCR Safety", "Oberon", "PortWest", "Red Kap", "Stanco FR", "Timberland", "Workrite"],
    "Calzado": ["Ariat", "Kodiak", "Terra", "Timberland", "Wolverine", "Cat Footwear"],
    "EPP": ["3M", "Ansell", "Bullard", "Dupont", "Honeywell", "MCR Safety", "MSA", "Tillman"]
};

// --- DATOS INICIALES (Simulando una base de datos) ---
const INITIAL_PRODUCTS = [
    {
        id: 1,
        title: "Bulwark - Camisa ignífuga ligera resistente a las llamas",
        sku: "10041118",
        style: "BW-LIGHT",
        mainCategory: "Uniformes FR",
        brand: "Bulwark",
        description: "Camisa de trabajo FR ligera diseñada para máxima transpirabilidad. Confeccionada con tejido inherente que absorbe la humedad y ofrece secado rápido. Cumple con normativas NFPA 2112, ideal para largas jornadas en el sector petrolero o eléctrico brindando confort sin sacrificar seguridad. Incluye triple costura y botones de melamina resistentes a altas temperaturas.",
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Bulwark - Chamarra de seguridad alta visibilidad FR",
        sku: "8890211",
        style: "BW-HV-JKT",
        mainCategory: "Uniformes FR",
        brand: "Bulwark",
        description: "Chamarra resistente al fuego con cintas reflectantes de 3M. Proporciona protección térmica superior contra el frío y arco eléctrico, manteniendo una alta visibilidad en entornos de baja iluminación. Forro interior de algodón FR, puños ajustables y cremallera frontal oculta de latón Nomex.",
        image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Bulwark - Sudadera con capucha ignífuga pesada",
        sku: "10084462",
        style: "BW-HOODIE",
        mainCategory: "Uniformes FR",
        brand: "Bulwark",
        description: "Sudadera FR cómoda y duradera de tejido de punto polar. Cuenta con capucha de tres piezas con cordón de ajuste FR y bolsillos calentadores de manos. Ideal para capas intermedias y cumple con normativas de protección térmica industrial (HRC 2).",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: "Terra - Bota de trabajo Logger Shock Shield impermeable",
        sku: "10050840",
        style: "TR-LOGGER",
        mainCategory: "Calzado",
        brand: "Terra",
        description: "Calzado de seguridad industrial de alto rendimiento. Fabricado con cuero hidrofugado resistente al agua y retardante de llama. Suela antideslizante con protección dieléctrica (EH) y puntera compuesta ultraligera para jornadas extremas y terrenos irregulares. Plantilla anti-fatiga integrada.",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 5,
        title: "Terra - Bota industrial dieléctrica con casquillo",
        sku: "10050841",
        style: "TR-DIELECTRIC",
        mainCategory: "Calzado",
        brand: "Terra",
        description: "Botas de protección dieléctrica certificada, diseñadas ergonómicamente con plantilla antifatiga. Casquillo de policarbonato que soporta impactos pesados sin transferir temperatura. Suela resistente a aceites y químicos industriales. Perfectas para el sector eléctrico.",
        image: "https://images.unsplash.com/photo-1595341596013-640a232fbaec?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 6,
        title: "Carhartt - Pantalón de trabajo FR lona resistente",
        sku: "CH-FR-PNT1",
        style: "CH-CANVAS",
        mainCategory: "Uniformes FR",
        brand: "Carhartt",
        description: "Pantalones de lona FR de uso rudo. Costuras triples reforzadas, bolsillos utilitarios y tejido resistente a la abrasión. Protección y durabilidad extrema para trabajos pesados de soldadura, construcción o manufactura. Corte relajado para mayor movilidad.",
        image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 7,
        title: "Carhartt - Overol de trabajo FR clásico",
        sku: "CH-OVERALL-1",
        style: "CH-OVR",
        mainCategory: "Uniformes FR",
        brand: "Carhartt",
        description: "Overol completo FR con pechera, tirantes elásticos ajustables y múltiples bolsillos para herramientas. Ofrece excelente cobertura y protección térmica total, con cremalleras en las piernas para usar cómodamente con botas de trabajo. Resistente al arco eléctrico.",
        image: "https://images.unsplash.com/photo-1610415394142-d6b052f52d9b?auto=format&fit=crop&q=80&w=800",
    },
    // --- NUEVOS PRODUCTOS AGREGADOS PARA ENRIQUECER EL CATÁLOGO ---
    {
        id: 8,
        title: "3M - Lentes de Seguridad Virtua anti-empaño",
        sku: "3M-VIRTUA-01",
        style: "VIRTUA-CCS",
        mainCategory: "EPP",
        brand: "3M",
        description: "Lentes de protección ocular ligeros con tecnología anti-empaño Scotchgard. Diseño envolvente para excelente cobertura lateral. Compatibles con tapones auditivos.",
        image: "https://images.unsplash.com/photo-1584305574647-0cc9f9e10260?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 9,
        title: "Ansell - Guantes ActivArmr resistentes al fuego y corte",
        sku: "ANS-GLV-FR",
        style: "ACTIVARMR-97",
        mainCategory: "EPP",
        brand: "Ansell",
        description: "Guantes de protección industrial avanzados. Ofrecen resistencia al arco eléctrico (Nivel 2), protección contra llamas y alta resistencia a cortes y abrasiones. Ideales para maniobras peligrosas.",
        image: "https://images.unsplash.com/photo-1555919692-0b22ff7bc7fb?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 10,
        title: "MSA - Casco de Seguridad V-Gard con suspensión Fas-Trac",
        sku: "MSA-VGARD-WHT",
        style: "VGARD-STD",
        mainCategory: "EPP",
        brand: "MSA",
        description: "Casco de seguridad tipo cachucha con ranuras. Fabricado en polietileno de alta densidad. Incluye suspensión de matraca Fas-Trac III para un ajuste rápido y seguro. Protección dieléctrica clase E.",
        image: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 11,
        title: "Ariat FR - Camisa de trabajo manga larga de algodón sólido",
        sku: "ART-SHRT-02",
        style: "ARIAT-SOLID",
        mainCategory: "Uniformes FR",
        brand: "Ariat FR",
        description: "Camisa Ariat resistente a las llamas. Combina un diseño clásico profesional con tecnología de absorción de humedad para mantenerte fresco en el campo. Cumple NFPA 2112.",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 12,
        title: "Timberland PRO - Bota de Seguridad Boondock 6\" Impermeable",
        sku: "TB-PRO-BDK",
        style: "BOONDOCK-6",
        mainCategory: "Calzado",
        brand: "Timberland",
        description: "Botas de trabajo rudo con tecnología antifatiga. Puntera de material compuesto asimétrica y cuero impermeable premium. Suela de TPU resistente al frío, aceites y abrasiones.",
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
    },
    // --- AÑADIMOS MÁS PRODUCTOS PARA COMPLETAR LAS MUESTRAS EN LA TIENDA ---
    {
        id: 13,
        title: "Wolverine - Botas Hellcat UltraSpring de Fibra de Carbono",
        sku: "WOLV-HELLCAT",
        style: "W08091",
        mainCategory: "Calzado",
        brand: "Wolverine",
        description: "La comodidad de unos tenis con la protección de unas botas de trabajo. Amortiguación UltraSpring, puntera de fibra de carbono ultraligera y protección dieléctrica ASTM.",
        image: "https://images.unsplash.com/photo-1582236371192-801538a7c2e0?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 14,
        title: "Honeywell - Tapones Auditivos Reutilizables SmartFit",
        sku: "HON-SMARTFIT",
        style: "SMF-30",
        mainCategory: "EPP",
        brand: "Honeywell",
        description: "Protección auditiva con tecnología de material conformable que utiliza el calor corporal para adaptarse a la forma del canal auditivo, ofreciendo un ajuste personalizado. NRR 25.",
        image: "https://images.unsplash.com/photo-1584305574647-0cc9f9e10260?auto=format&fit=crop&q=80&w=800",
    }
];

const CATEGORIES_DATA = [
    { name: "Pantalones FR", icon: Layers },
    { name: "Camisas FR", icon: Shirt },
    { name: "Chamarras FR", icon: Flame },
    { name: "Chalecos FR", icon: Shield },
    { name: "Calzado FR", icon: Footprints },
    { name: "Mandiles FR", icon: Hexagon }
];

export default function App() {
    // Estado principal de navegación
    const [currentView, setCurrentView] = useState('home'); // 'home', 'store', 'product', 'about', 'contact', '360', 'admin'
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [storeFilter, setStoreFilter] = useState(null); // { type: 'mainCategory'|'brand'|'generic', value: string }
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de Autenticación de Admin

    // --- FUNCIONES DE NAVEGACIÓN ---
    const goHome = () => { setCurrentView('home'); window.scrollTo(0, 0); };

    const goToStore = (filter = null) => {
        setStoreFilter(filter);
        setCurrentView('store');
        window.scrollTo(0, 0);
    };

    const goToProduct = (id) => {
        setSelectedProductId(id);
        setCurrentView('product');
        window.scrollTo(0, 0);
    };

    const goToAbout = () => { setCurrentView('about'); window.scrollTo(0, 0); };
    const goToContact = () => { setCurrentView('contact'); window.scrollTo(0, 0); };
    const goTo360 = () => { setCurrentView('360'); window.scrollTo(0, 0); };
    const goToAdmin = () => { setCurrentView('admin'); window.scrollTo(0, 0); };

    // --- FUNCIÓN DE WHATSAPP ---
    const handleWhatsAppClick = (product = null) => {
        const phoneNumber = "526462952269";
        let message = "Hola, me gustaría recibir asesoría sobre sus productos y uniformes industriales.";
        if (product) {
            message = `Hola, me interesa obtener más información sobre el producto:\n\n*${product.title}*\nSKU: ${product.sku}\nEstilo: ${product.style}\n\n¿Podrían apoyarme con una cotización?`;
        }
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // --- SUB-COMPONENTES COMUNES ---

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const Navbar = () => (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <div className="flex items-center h-full">
                        <div
                            className="text-3xl font-extrabold tracking-tighter cursor-pointer select-none group mr-10 relative"
                            onClick={goHome}
                            onDoubleClick={goToAdmin}
                            title="Doble clic para admin"
                        >
                            <img src={`${import.meta.env.BASE_URL}logo-oscuro.png`} alt="upeFR Logo" className="h-[46px] w-auto relative z-10 transition-transform duration-300 group-hover:scale-105" />
                            <motion.div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></motion.div>
                        </div>
                    </div>

                    {/* Enlaces de Menú Desktop */}
                    <div className="hidden md:flex space-x-1 text-sm font-semibold h-full items-center">
                        <button onClick={goHome} className={`px-4 py-2 rounded-full transition-all duration-300 ${currentView === 'home' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}>
                            Inicio
                        </button>

                        {/* MENÚ DESPLEGABLE: TIENDA / CATÁLOGO */}
                        <div className="relative group h-full flex items-center px-2">
                            <button onClick={() => goToStore(null)} className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${(currentView === 'store' || currentView === 'product') ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}>
                                Tienda <ChevronDown className="w-4 h-4 ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                            </button>
                            {/* Mega menú oculto */}
                            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl text-gray-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex space-x-12 p-8 z-50 border border-gray-100 min-w-max translate-y-4 group-hover:translate-y-0">
                                {Object.entries(CATALOG_MENU).map(([category, brands]) => (
                                    <div key={category} className="flex flex-col min-w-[160px]">
                                        <h3
                                            onClick={() => goToStore({ type: 'mainCategory', value: category })}
                                            className="font-bold text-gray-900 text-base mb-4 pb-2 border-b border-gray-100 cursor-pointer hover:text-blue-600 transition-colors flex items-center justify-between"
                                        >
                                            {category} <ChevronRight className="w-3 h-3 text-gray-300" />
                                        </h3>
                                        <ul className="space-y-2.5">
                                            {brands.map(brand => (
                                                <li key={brand}>
                                                    <button
                                                        onClick={() => goToStore({ type: 'brand', value: brand })}
                                                        className="text-gray-500 hover:text-blue-600 hover:translate-x-1 font-medium text-sm transition-all text-left w-full flex items-center"
                                                    >
                                                        {brand}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={goTo360} className={`px-4 py-2 rounded-full transition-all duration-300 ${currentView === '360' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}>upeFR 360°</button>
                        <button onClick={goToAbout} className={`px-4 py-2 rounded-full transition-all duration-300 ${currentView === 'about' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}>Nosotros</button>
                        <a href="https://flowmx.github.io/upeuniformes/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#0c345f] hover:text-[#0f447a] transition-colors flex items-center gap-1 border border-[#0c345f]/30 px-3 py-1.5 rounded-full hover:bg-[#0c345f]/5">
                            upe Uniformes <Globe className="w-3 h-3" />
                        </a>
                        <button onClick={goToContact} className={`px-5 py-2 rounded-full font-bold transition-all duration-300 ${currentView === 'contact' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-gray-900 text-white hover:bg-blue-600 shadow-md shadow-gray-900/10'}`}>Contacto</button>
                    </div>

                    {/* Iconos (Derecha) */}
                    <div className="flex items-center space-x-5 h-full">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => goToStore(null)} />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden md:block">
                            <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" onClick={goToAdmin} />
                        </motion.div>

                        {/* Botón menú móvil */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-blue-600 focus:outline-none p-2 mt-1">
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menú Móvil */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
                    >
                        <div className="flex flex-col px-4 py-6 space-y-4">
                            <button onClick={() => { goHome(); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold py-2 ${currentView === 'home' ? 'text-blue-600' : 'text-gray-700'}`}>Inicio</button>
                            <button onClick={() => { goToStore(null); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold py-2 ${currentView === 'store' || currentView === 'product' ? 'text-blue-600' : 'text-gray-700'}`}>Tienda</button>
                            <button onClick={() => { goTo360(); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold py-2 ${currentView === '360' ? 'text-blue-600' : 'text-gray-700'}`}>upeFR 360°</button>
                            <button onClick={() => { goToAbout(); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold py-2 ${currentView === 'about' ? 'text-blue-600' : 'text-gray-700'}`}>Sobre Nosotros</button>
                            <a href="https://flowmx.github.io/upeuniformes/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-lg font-bold text-[#0c345f] py-2 flex items-center justify-between">
                                upe Uniformes <Globe className="w-5 h-5 opacity-50" />
                            </a>
                            <button onClick={() => { goToContact(); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold py-2 ${currentView === 'contact' ? 'text-blue-600' : 'text-gray-700'}`}>Contacto</button>
                            <div className="h-px bg-gray-100 my-2"></div>
                            <button onClick={() => { goToAdmin(); setIsMobileMenuOpen(false); }} className="text-left text-lg font-semibold text-gray-500 py-2 flex items-center"><User className="w-5 h-5 mr-2" /> Acceso Admin</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );

    const Footer = () => (
        <footer className="bg-[#082240] text-gray-300 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <div className="mb-4">
                        <img src={`${import.meta.env.BASE_URL}logo-blanco.png`} alt="upeFR Logo" className="h-10 w-auto opacity-90" />
                    </div>
                    <p className="text-sm mb-4">Especialistas en ropa de protección profesional, equipos FR (Flame Resistant) y uniformes de alta calidad para la industria.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition"><ShieldCheck className="w-6 h-6" /></a>
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
                    <ul className="space-y-2 text-sm">
                        <li><button onClick={() => goToStore(null)} className="hover:text-white transition">Catálogo de Productos</button></li>
                        <li><button onClick={goToAbout} className="hover:text-white transition">Sobre Nosotros</button></li>
                        <li><button onClick={goToContact} className="hover:text-white transition">Contacto</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Contacto</h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +52 646 596 1975</li>
                        <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@uniformesprofesionales.mx</li>
                        <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Ensenada, B.C., Mexico</li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-sm mt-8 pt-8 border-t border-gray-700">
                © {new Date().getFullYear()} upeFR. Todos los derechos reservados.
            </div>
        </footer>
    );

    const ContactForm = ({ inProductView = false, hideHeader = false }) => (
        <div className={`${inProductView ? 'bg-white rounded-xl shadow-lg border border-gray-100 p-8' : (hideHeader ? '' : 'bg-gray-50 py-16 px-4 border-t border-gray-200')}`}>
            <div className={inProductView || hideHeader ? '' : 'max-w-3xl mx-auto text-center'}>
                {!hideHeader && (
                    <>
                        <h3 className={`font-bold text-[#0c345f] mb-2 ${inProductView ? 'text-2xl' : 'text-3xl'}`}>
                            ¿Buscas Una Solución Innovadora Para Ropa AR / FR / EPP?
                        </h3>
                        <p className={`text-gray-600 mb-8 ${inProductView ? 'text-sm' : 'text-lg'}`}>
                            Te ayudamos a crear un programa de uniformes efectivo y a la medida de tu operación.<br />
                            <span className="font-bold text-[#0c345f] block mt-2">¡Contáctanos hoy!</span>
                        </p>
                    </>
                )}

                <form className={`space-y-4 text-left ${inProductView || hideHeader ? '' : 'bg-white p-8 rounded-xl shadow-sm border border-gray-100'}`} onSubmit={(e) => { e.preventDefault(); alert("Mensaje enviado (Simulación)"); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
                            <input type="text" required className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0c345f] outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico *</label>
                            <input type="email" required className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0c345f] outline-none transition" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Número de teléfono</label>
                        <input type="tel" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0c345f] outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mensaje *</label>
                        <textarea required rows="3" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0c345f] outline-none transition"></textarea>
                    </div>
                    <div className={inProductView ? 'pt-2' : 'text-center pt-2'}>
                        <button type="submit" className={`bg-[#0c345f] hover:bg-[#0f447a] text-white px-8 py-3 rounded font-bold uppercase tracking-wider transition shadow-md ${inProductView ? 'w-full' : 'w-full md:w-auto'}`}>
                            Solicitar Información
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    // --- VISTAS (PÁGINAS) DE LA APLICACIÓN ---

    // 1. HOME
    // 1. HOME
    const HomeView = () => {
        const [currentHeroImg, setCurrentHeroImg] = useState(0);

        const heroImages = [
            `${import.meta.env.BASE_URL}hero-slider-1.jpg`,
            `${import.meta.env.BASE_URL}hero-slider-2.jpg`,
            `${import.meta.env.BASE_URL}hero-slider-3.jpg`
        ];

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentHeroImg((prev) => (prev + 1) % heroImages.length);
            }, 4000);
            return () => clearInterval(interval);
        }, [heroImages.length]);

        const brandsList = [
            { name: "3M", img: `${import.meta.env.BASE_URL}3 M.svg` },
            { name: "5.11", img: `${import.meta.env.BASE_URL}5.11.svg` },
            { name: "Ansell", img: `${import.meta.env.BASE_URL}ansell.svg` },
            { name: "Ariat Work FR", img: `${import.meta.env.BASE_URL}ariat work fr.svg` },
            { name: "Ariat Work", img: `${import.meta.env.BASE_URL}ariat work.svg` },
            { name: "Axe FR", img: `${import.meta.env.BASE_URL}axe fr.svg` },
            { name: "Benchmark", img: `${import.meta.env.BASE_URL}benchmark.svg` },
            { name: "Best Welds", img: `${import.meta.env.BASE_URL}bestwelds.svg` },
            { name: "Black Stallion", img: `${import.meta.env.BASE_URL}blackstallion.svg` },
            { name: "Bullard", img: `${import.meta.env.BASE_URL}bullard.svg` },
            { name: "Bulwark", img: `${import.meta.env.BASE_URL}bulwark.svg` },
            { name: "CAT FR", img: `${import.meta.env.BASE_URL}cat fr.svg` },
            { name: "CAT", img: `${import.meta.env.BASE_URL}cat.svg` },
            { name: "Die Hard", img: `${import.meta.env.BASE_URL}die hard.svg` },
            { name: "Dickies", img: `${import.meta.env.BASE_URL}dikies.svg` },
            { name: "DuPont", img: `${import.meta.env.BASE_URL}dunpont.svg` },
            { name: "Eagle FR", img: `${import.meta.env.BASE_URL}eagle fr.svg` },
            { name: "Carhartt FR", img: `${import.meta.env.BASE_URL}frcarhart.svg` },
            { name: "Georgia Boot", img: `${import.meta.env.BASE_URL}georgia boot.svg` },
            { name: "Honeywell", img: `${import.meta.env.BASE_URL}honeywell.svg` },
            { name: "IFR", img: `${import.meta.env.BASE_URL}ifr.svg` },
            { name: "Keen", img: `${import.meta.env.BASE_URL}keen.svg` },
            { name: "Kishigo", img: `${import.meta.env.BASE_URL}kishigo.svg` },
            { name: "Kodiak", img: `${import.meta.env.BASE_URL}kodiak.svg` },
            { name: "Lakeland", img: `${import.meta.env.BASE_URL}lakeland.svg` },
            { name: "Lapco FR", img: `${import.meta.env.BASE_URL}lapco fr.svg` },
            { name: "MCR Safety", img: `${import.meta.env.BASE_URL}mcr safety.svg` },
            { name: "MSA", img: `${import.meta.env.BASE_URL}MSA.svg` },
            { name: "Oberon", img: `${import.meta.env.BASE_URL}oberon.svg` },
            { name: "Portwest", img: `${import.meta.env.BASE_URL}portwest.svg` },
            { name: "Rasco FR", img: `${import.meta.env.BASE_URL}rasco fr.svg` },
            { name: "Red Kap", img: `${import.meta.env.BASE_URL}redkap.svg` },
            { name: "Stanco", img: `${import.meta.env.BASE_URL}stanco.svg` },
            { name: "Terra", img: `${import.meta.env.BASE_URL}terra.svg` },
            { name: "Tillman", img: `${import.meta.env.BASE_URL}tillman.svg` },
            { name: "Timberland PRO FR", img: `${import.meta.env.BASE_URL}timberland pro fr.svg` },
            { name: "Timberland PRO", img: `${import.meta.env.BASE_URL}timberland pro.svg` },
            { name: "Wolverine", img: `${import.meta.env.BASE_URL}wolverine.svg` },
            { name: "Workrite", img: `${import.meta.env.BASE_URL}workrite.svg` }
        ];

        // Just double it to have enough for infinite scroll effect 
        const marqueeBrands = [...brandsList, ...brandsList];

        // Create a longer list to loop continuously
        const sliderProducts = [...products, ...products];

        return (
            <div className="flex-1 bg-gray-50 overflow-x-hidden pt-20">
                <style>{`
                  @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                  .animate-scroll { animation: scroll 80s linear infinite; display: flex; width: max-content; }
                  .animate-scroll:hover { animation-play-state: paused; }
                `}</style>

                {/* Hero section */}
                <div className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentHeroImg}
                            src={heroImages[currentHeroImg]}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            alt="Hero"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0c345f]/95 via-[#0c345f]/60 to-transparent z-10"></div>

                    <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex flex-col md:flex-row items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="md:w-1/2 text-left"
                        >
                            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm border border-blue-400/30">
                                <ShieldCheck className="w-5 h-5 text-blue-400" />
                                <span>Protección Industrial de Clase Mundial</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                                Seguridad Que <br /><span className="text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.5)]">Protege Tu Vida.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl font-light leading-relaxed">
                                Equipamiento garantizado y certificado globalmente. Porque en los entornos más peligrosos, no existen segundas oportunidades.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => goToStore(null)}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center group"
                                >
                                    Catálogo de Productos <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={goTo360}
                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition flex items-center justify-center"
                                >
                                    Descubre upeFR 360°
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                        {heroImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentHeroImg(idx)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentHeroImg ? 'bg-blue-400 w-16' : 'bg-white/30 hover:bg-white/50 w-8'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Marcas Slider */}
                <div className="bg-white border-b border-gray-100 py-8 overflow-hidden relative z-30 shadow-sm">
                    <div className="animate-scroll flex items-center px-8 text-gray-400 hover:text-gray-800 transition-colors duration-500">
                        {marqueeBrands.map((brand, index) => (
                            <div key={index} className="mx-10 cursor-pointer flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" onClick={() => goToStore({ type: 'brand', value: brand.name })}>
                                {brand.img ? (
                                    <img src={brand.img} alt={brand.name} className="h-14 w-auto max-w-[160px] object-contain" />
                                ) : (
                                    <span className="text-2xl font-bold whitespace-nowrap">
                                        {brand.name}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compra por Categoría */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="flex items-center justify-between mb-8 border-b pb-4">
                        <h2 className="text-3xl font-bold text-[#0c345f]">Compra por Categoría</h2>
                        <button onClick={() => goToStore(null)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center">
                            Ver todas <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {CATEGORIES_DATA.map((cat, index) => (
                            <div key={index} onClick={() => goToStore({ type: 'generic', value: cat.name })} className="bg-white border border-gray-100 flex flex-col items-center justify-center h-36 md:h-44 rounded-xl group cursor-pointer shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#0c345f] group-hover:bg-[#0c345f] group-hover:text-white transition-colors duration-300 mb-4 shadow-sm">
                                    <cat.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-[#0c345f] font-bold text-sm text-center px-2 group-hover:text-blue-700 transition-colors">{cat.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Productos Destacados (Slider) */}
                <div className="py-24 bg-white border-t border-gray-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <div className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Lo Más Vendido</div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c345f] inline-block relative tracking-tight">
                                Productos Destacados
                                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-blue-600 rounded-full"></span>
                            </h2>
                        </div>
                    </div>

                    <div className="relative w-full z-10">
                        <div className="animate-scroll-products py-8 px-4 flex gap-8">
                            {products.map((product, index) => (
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    key={`${product.id}-${index}`}
                                    className="w-[320px] flex-shrink-0 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col overflow-hidden border border-gray-100/50 group"
                                >
                                    <div className="h-72 w-full relative bg-gray-50/50 p-8 flex items-center justify-center cursor-pointer overflow-hidden" onClick={() => goToProduct(product.id)}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#0c345f] text-[10px] uppercase font-bold px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                                            {product.brand}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1 bg-white">
                                        <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => goToProduct(product.id)}>
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-4">SKU: {product.sku}</p>
                                        <div className="mt-auto pt-4 border-t border-gray-50">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); goToProduct(product.id); }}
                                                className="w-full bg-blue-50 text-blue-700 font-bold py-3 rounded-xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center text-sm shadow-sm"
                                            >
                                                Ver Detalles <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 text-center max-w-7xl mx-auto px-4 relative z-10">
                        <button onClick={() => goToStore(null)} className="px-10 py-4 rounded-full font-bold text-sm transition-all bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600 shadow-sm hover:shadow flex items-center mx-auto">
                            Ver Todo el Catálogo <ChevronRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>

                {/* Sobre Nosotros (Resumen) */}
                <div className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <div className="text-sm font-bold tracking-widest text-[#b3a48e] uppercase mb-3">Sobre Nosotros</div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0c345f] mb-6 leading-tight">
                                Protegiendo a los trabajadores <span className="text-gray-900">más exigentes.</span>
                            </h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                En <strong>upeFR</strong>, somos líderes y especialistas en la distribución de ropa FR (Flame Resistant) y Equipos de Protección Personal (EPP).
                            </p>
                            <button onClick={goToAbout} className="text-[#0c345f] font-bold border-b-2 border-[#0c345f] hover:text-blue-600 hover:border-blue-600 transition pb-1 flex items-center">
                                Conoce nuestra historia <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 md:h-[400px]">
                                <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000" alt="Industria Segura" className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                <ContactForm />
            </div>
        );
    };

    // 2. STORE (TIENDA COMPLETA CON FILTROS Y MUESTRAS)
    const StoreView = () => {
        // Lógica de filtrado
        let displayedProducts = products;
        let isFiltered = false;
        let title = "Catálogo de Soluciones";
        let subtitle = "Explora nuestro portafolio de uniformes FR, calzado y equipo de protección personal.";

        if (storeFilter) {
            isFiltered = true;
            if (storeFilter.type === 'mainCategory') {
                displayedProducts = products.filter(p => p.mainCategory === storeFilter.value);
                title = storeFilter.value;
                subtitle = `Mostrando todos los equipos y prendas de la categoría: ${storeFilter.value}`;
            } else if (storeFilter.type === 'brand') {
                displayedProducts = products.filter(p => p.brand === storeFilter.value || p.title.includes(storeFilter.value));
                title = storeFilter.value;
                subtitle = `Colección oficial de productos de la marca ${storeFilter.value}`;
            } else if (storeFilter.type === 'generic') {
                const searchWord = storeFilter.value.split(' ')[0].toLowerCase();
                displayedProducts = products.filter(p => p.title.toLowerCase().includes(searchWord) || p.description.toLowerCase().includes(searchWord));
                title = storeFilter.value;
                subtitle = `Resultados encontrados para: ${storeFilter.value}`;
            }
        }

        // Pequeño componente interno para renderizar tarjetas de producto para evitar código repetido
        // Pequeño componente interno para renderizar tarjetas de producto para evitar código repetido
        const ProductGrid = ({ items }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map(product => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        key={product.id}
                        className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col overflow-hidden border border-gray-100/50 group"
                    >
                        <div className="h-72 w-full relative bg-gray-50/50 p-8 flex items-center justify-center cursor-pointer overflow-hidden" onClick={() => goToProduct(product.id)}>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 drop-shadow-md" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#0c345f] text-[10px] uppercase font-bold px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                                {product.brand}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1 bg-white">
                            <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => goToProduct(product.id)}>
                                {product.title}
                            </h3>
                            <p className="text-gray-500 text-sm mb-4">SKU: {product.sku}</p>
                            <div className="mt-auto pt-4 border-t border-gray-50">
                                <button onClick={(e) => { e.stopPropagation(); goToProduct(product.id); }} className="w-full bg-blue-50 text-blue-700 font-bold py-3 rounded-xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center text-sm shadow-sm">
                                    Ver Detalles <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        );

        return (
            <div className="flex-1 bg-gray-50 pb-20 pt-20">
                {/* Banner de la Tienda */}
                <div className="bg-[#0c345f] text-white py-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">{title}</h1>
                        <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto font-light">{subtitle}</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-12">

                    {/* Si hay un filtro activo (VISTA DE RESULTADOS) */}
                    {isFiltered && (
                        <>
                            <div className="mb-8 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <span className="text-gray-600 font-medium">Mostrando {displayedProducts.length} resultados</span>
                                <button onClick={() => setStoreFilter(null)} className="flex items-center text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded transition">
                                    <FilterX className="w-4 h-4 mr-2" /> Quitar Filtros
                                </button>
                            </div>

                            {displayedProducts.length > 0 ? (
                                <div className="mb-20">
                                    <ProductGrid items={displayedProducts} />
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm mb-20">
                                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-700 mb-2">No se encontraron productos</h3>
                                    <p className="text-gray-500 mb-6">Actualmente no tenemos productos registrados con este filtro.</p>
                                    <button onClick={() => setStoreFilter(null)} className="bg-[#0c345f] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition">Explorar Todo el Catálogo</button>
                                </div>
                            )}

                            {/* SECCIÓN DE MUESTRAS EN VISTA FILTRADA */}
                            <div className="border-t border-gray-200 pt-16">
                                <div className="text-center mb-10">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#0c345f] mb-2">Prendas de Muestra Recomendadas</h2>
                                    <p className="text-gray-500">Sigue explorando otras opciones de nuestro catálogo general.</p>
                                </div>
                                {/* Seleccionamos 4 productos aleatorios diferentes a los filtrados si es posible */}
                                <ProductGrid items={products.slice(0, 4)} />
                            </div>
                        </>
                    )}

                    {/* Si NO hay filtro (VISTA GENERAL DE TIENDA POR SECCIONES) */}
                    {!isFiltered && (
                        <div className="space-y-24">

                            {/* Sección Uniformes FR */}
                            <div>
                                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-4">
                                    <div>
                                        <h2 className="text-3xl font-extrabold text-[#0c345f] mb-2">Uniformes FR (Anti-flama)</h2>
                                        <p className="text-gray-600 max-w-2xl">Ropa de trabajo diseñada para proteger contra riesgos térmicos y arco eléctrico, cumpliendo con NFPA 2112 y 70E. Encuentra camisas, pantalones, chamarras y overoles de las mejores marcas.</p>
                                    </div>
                                    <button onClick={() => goToStore({ type: 'mainCategory', value: 'Uniformes FR' })} className="hidden md:flex text-[#b3a48e] hover:text-[#0c345f] font-bold text-sm items-center transition mt-4 md:mt-0">
                                        Ver todo Uniformes FR <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                {/* Tomamos hasta 4 productos de Uniformes FR como muestra */}
                                <ProductGrid items={products.filter(p => p.mainCategory === 'Uniformes FR').slice(0, 4)} />
                                <button onClick={() => goToStore({ type: 'mainCategory', value: 'Uniformes FR' })} className="w-full mt-6 md:hidden bg-gray-100 text-[#0c345f] font-bold py-3 rounded-lg flex justify-center items-center">
                                    Ver todo Uniformes FR <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>

                            {/* Sección Calzado */}
                            <div>
                                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-4">
                                    <div>
                                        <h2 className="text-3xl font-extrabold text-[#0c345f] mb-2">Calzado de Seguridad</h2>
                                        <p className="text-gray-600 max-w-2xl">Botas industriales dieléctricas, con casquillo compuesto o de acero, impermeables y anti-fatiga. Protege los pasos de tu equipo en los terrenos más difíciles.</p>
                                    </div>
                                    <button onClick={() => goToStore({ type: 'mainCategory', value: 'Calzado' })} className="hidden md:flex text-[#b3a48e] hover:text-[#0c345f] font-bold text-sm items-center transition mt-4 md:mt-0">
                                        Ver todo Calzado <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <ProductGrid items={products.filter(p => p.mainCategory === 'Calzado').slice(0, 4)} />
                                <button onClick={() => goToStore({ type: 'mainCategory', value: 'Calzado' })} className="w-full mt-6 md:hidden bg-gray-100 text-[#0c345f] font-bold py-3 rounded-lg flex justify-center items-center">
                                    Ver todo Calzado <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>

                            {/* Sección EPP */}
                            <div>
                                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-4">
                                    <div>
                                        <h2 className="text-3xl font-extrabold text-[#0c345f] mb-2">Equipo de Protección Personal (EPP)</h2>
                                        <p className="text-gray-600 max-w-2xl">Protección integral de pies a cabeza. Desde cascos tipo cachucha y lentes de seguridad anti-empaño hasta guantes resistentes a cortes y fuego.</p>
                                    </div>
                                    <button onClick={() => goToStore({ type: 'mainCategory', value: 'EPP' })} className="hidden md:flex text-[#b3a48e] hover:text-[#0c345f] font-bold text-sm items-center transition mt-4 md:mt-0">
                                        Ver todo EPP <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <ProductGrid items={products.filter(p => p.mainCategory === 'EPP').slice(0, 4)} />
                                <button onClick={() => goToStore({ type: 'mainCategory', value: 'EPP' })} className="w-full mt-6 md:hidden bg-gray-100 text-[#0c345f] font-bold py-3 rounded-lg flex justify-center items-center">
                                    Ver todo EPP <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 3. PRODUCT DETAIL
    const ProductView = () => {
        const product = products.find(p => p.id === selectedProductId);
        if (!product) return <div className="p-20 text-center">Producto no encontrado.</div>;

        const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 bg-gray-50 pt-[80px]"
            >
                {/* Breadcrumb Premium */}
                <div className="bg-white border-b border-gray-100 shadow-sm relative z-10 w-full mb-4">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center text-sm text-gray-500 font-medium">
                        <button onClick={() => goToStore(null)} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al catálogo
                        </button>
                        <span className="mx-3 text-gray-300">|</span>
                        <button onClick={() => goToStore({ type: 'mainCategory', value: product.mainCategory })} className="hover:text-blue-600 transition-colors">{product.mainCategory || product.category}</button>
                        <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                        <button onClick={() => goToStore({ type: 'brand', value: product.brand })} className="text-blue-600 font-bold hover:text-blue-800 transition-colors underline-offset-4 hover:underline">{product.brand}</button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 pb-12">
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100">
                        <div className="flex flex-col lg:flex-row">
                            {/* Imagen del Producto */}
                            <div className="lg:w-1/2 p-8 lg:p-16 bg-gray-50/50 flex flex-col justify-center relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
                                <div className="bg-white rounded-2xl p-8 border border-gray-100 h-[400px] md:h-[500px] flex items-center justify-center shadow-sm relative group cursor-zoom-in">
                                    <motion.img
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        src={product.image}
                                        alt={product.title}
                                        className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                                    />
                                    {/* Etiqueta de Certificación */}
                                    <div className="absolute top-4 left-4 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm">
                                        <ShieldCheck className="w-3 h-3 mr-1" /> Certificado
                                    </div>
                                </div>
                                {/* Miniaturas */}
                                <div className="flex space-x-4 mt-8 justify-center">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center p-2 bg-white cursor-pointer transition-all duration-300 hover:shadow-md ${item === 1 ? 'border-blue-600 shadow-sm' : 'border-gray-200 hover:border-blue-400'}`}>
                                            <img src={product.image} alt="thumb" className="max-h-full object-contain mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Detalles del Producto */}
                            <div className="lg:w-1/2 p-8 lg:p-16 border-l border-gray-100 flex flex-col">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-block bg-[#0c345f] text-white font-bold px-4 py-1.5 rounded-md text-xs mb-6 tracking-widest uppercase shadow-sm"
                                >
                                    {product.brand}
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-[1.1] tracking-tight"
                                >
                                    {product.title}
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-wrap gap-4 mb-10"
                                >
                                    <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 flex items-center shadow-sm hover:shadow-md transition-shadow">
                                        <span className="text-gray-400 text-xs font-bold uppercase mr-3 tracking-wider">SKU / POS</span>
                                        <span className="text-xl font-mono font-bold text-[#0c345f]">{product.sku}</span>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 flex items-center shadow-sm hover:shadow-md transition-shadow">
                                        <span className="text-gray-400 text-xs font-bold uppercase mr-3 tracking-wider">Estilo N°</span>
                                        <span className="text-xl font-mono font-bold text-gray-800">{product.style}</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="prose prose-blue text-gray-600 mb-0"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2" /> Descripción del Equipo
                                    </h3>
                                    <p className="leading-relaxed text-lg">{product.description}</p>
                                </motion.div>
                            </div>
                        </div>

                        {/* SECCIÓN INFERIOR: Contacto y WhatsApp a ancho completo */}
                        <div className="bg-white border-t border-gray-100 p-8 lg:p-12">
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-green-50 rounded-2xl p-6 md:p-8 border border-green-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-xl font-extrabold text-green-900 mb-2">¿Deseas una cotización rápida con un asesor?</h3>
                                        <p className="text-green-800">Atención personalizada y precios especiales por volumen.</p>
                                    </div>
                                    <button onClick={() => handleWhatsAppClick(product)} className="w-full md:w-auto flex-shrink-0 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 whitespace-nowrap">
                                        <MessageCircle className="w-6 h-6" />
                                        <span>Contactar por WhatsApp</span>
                                    </button>
                                </div>

                                <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-bl-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                                    <h3 className="text-2xl font-bold text-[#0c345f] mb-2 relative z-10">Solicitar Información</h3>
                                    <p className="text-gray-500 mb-8 relative z-10">Déjanos tus datos y nos comunicaremos contigo a la brevedad.</p>
                                    <div className="relative z-10">
                                        <ContactForm inProductView={true} hideHeader={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {relatedProducts.length > 0 && (
                    <div className="bg-white py-16 border-t border-gray-200">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-2xl font-bold text-[#0c345f] mb-8">También podría interesarte</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map(relProduct => (
                                    <div key={relProduct.id} className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 group">
                                        <div className="h-56 w-full relative bg-gray-50 p-4 flex items-center justify-center cursor-pointer" onClick={() => goToProduct(relProduct.id)}>
                                            <img src={relProduct.image} alt={relProduct.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">{relProduct.brand}</div>
                                            <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 hover:text-[#0c345f] cursor-pointer" onClick={() => goToProduct(relProduct.id)}>
                                                {relProduct.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        );
    };

    // 4. ABOUT (SOBRE NOSOTROS)
    const AboutView = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 bg-white pt-20"
        >
            {/* Hero Banner */}
            <div className="relative bg-[#0c345f] text-white py-32 overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply z-10"></div>
                <img src="./conoce_upe.jpg" alt="About Hero" className="absolute inset-0 w-full h-full object-cover z-0 scale-105" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-10"></div>
                <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-block bg-[#b3a48e]/90 backdrop-blur-sm text-white font-bold px-5 py-2 rounded-full text-xs mb-8 uppercase tracking-widest shadow-lg border border-[#b3a48e]/50"
                    >
                        Nuestra Esencia
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-extrabold mb-8 drop-shadow-lg tracking-tight"
                    >
                        Conoce upeFR
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md leading-relaxed font-light"
                    >
                        Más de una década protegiendo a los trabajadores más exigentes de la industria con equipo FR certificado y de clase mundial.
                    </motion.p>
                </div>
            </div>

            {/* Historia y Experiencia */}
            <div className="max-w-7xl mx-auto px-4 py-32 flex flex-col md:flex-row items-center gap-20">
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="md:w-1/2"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c345f] mb-8 leading-[1.15] tracking-tight">Expertos en seguridad industrial y protección Ignífuga.</h2>
                    <div className="w-24 h-1.5 bg-[#b3a48e] mb-10 rounded-full"></div>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        En <strong className="text-[#0c345f] font-bold">upeFR</strong> comprendemos que en entornos de alto riesgo, la calidad del equipo de protección no es negociable. Nos hemos consolidado como líderes en la distribución de ropa FR (Flame Resistant) y Equipos de Protección Personal (EPP) en México.
                    </p>
                    <p className="text-gray-600 mb-12 text-lg leading-relaxed">
                        Trabajamos exclusivamente con las marcas globales más respetadas y garantizamos que cada prenda cumpla con rigurosas certificaciones internacionales como <span className="font-semibold text-gray-800">NFPA 2112, NFPA 70E y ASTM</span>. Nuestro compromiso es que cada trabajador regrese a casa seguro.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-3xl flex-1 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <span className="block text-5xl font-black text-blue-600 mb-3">+10</span>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Años de<br />Experiencia</span>
                        </div>
                        <div className="bg-[#0c345f] border border-[#0a2b50] p-8 rounded-3xl flex-1 text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <span className="block text-5xl font-black text-white mb-3 relative z-10">100%</span>
                            <span className="text-xs font-bold text-blue-200 uppercase tracking-widest relative z-10">Protección<br />Certificada</span>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="md:w-1/2 w-full relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-[2.5rem] -z-10 transform -rotate-3 blur-sm"></div>
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[600px] border border-white">
                        <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000" alt="Industria Segura" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c345f]/90 via-[#0c345f]/20 to-transparent flex items-end p-10">
                            <div className="border-l-4 border-[#b3a48e] pl-6">
                                <p className="text-white font-bold text-3xl drop-shadow-lg leading-tight">Seguridad sin<br />compromisos.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Misión y Visión */}
            <div className="bg-gray-50 py-32 border-y border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#b3a48e]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Card Misión */}
                        <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-full -z-10 group-hover:bg-[#0c345f]/5 transition-colors duration-500"></div>
                            <Target className="w-14 h-14 text-[#b3a48e] mb-8" />
                            <h3 className="text-3xl font-bold text-[#0c345f] mb-6">Nuestra Misión</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Proveer las soluciones más avanzadas e innovadoras en ropa de protección AR/FR y EPP, garantizando la máxima seguridad, comodidad y cumplimiento normativo para los trabajadores en las industrias más demandantes.
                            </p>
                        </div>
                        {/* Card Visión */}
                        <div className="bg-[#0c345f] p-12 rounded-3xl shadow-xl border border-[#0a2b50] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-tl-full -z-0"></div>
                            <Eye className="w-14 h-14 text-[#b3a48e] mb-8 relative z-10" />
                            <h3 className="text-3xl font-bold text-white mb-6 relative z-10">Nuestra Visión</h3>
                            <p className="text-blue-100 leading-relaxed text-lg relative z-10">
                                Ser el principal socio estratégico a nivel nacional en la gestión integral de programas de uniformes industriales, reconocidos por nuestra excelencia operativa, marcas de clase mundial y compromiso absoluto con la vida humana.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Beneficios Clave */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-extrabold text-[#0c345f] mb-6 tracking-tight"
                        >
                            Beneficios Clave Para Tu Empresa
                        </motion.h2>
                        <div className="w-20 h-1.5 bg-[#b3a48e] mx-auto rounded-full mb-6 relative">
                            <div className="absolute inset-0 bg-[#b3a48e] blur-sm opacity-50"></div>
                        </div>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">Con upeFR, no solo adquieres uniformes, obtienes un servicio integral pensado en la eficiencia y seguridad de tu operación.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Award className="w-8 h-8" />, title: "Calidad Premium", desc: "Las mejores marcas con tecnología textil de punta y resistencia garantizada." },
                            { icon: <Users className="w-8 h-8" />, title: "Atención Especializada", desc: "Asesoría experta para elegir el nivel de protección exacto que tu equipo necesita." },
                            { icon: <Truck className="w-8 h-8" />, title: "Logística Optimizada", desc: "Envíos y distribución eficiente para que nunca te falte equipo de protección." },
                            { icon: <Globe className="w-8 h-8" />, title: "Alcance Nacional", desc: "Cobertura en todo el país, adaptándonos a las normas locales e internacionales." }
                        ].map((benefit, i) => (
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="text-center p-10 rounded-3xl bg-gray-50/50 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-transparent hover:border-blue-100 group cursor-default"
                            >
                                <div className="w-20 h-20 mx-auto bg-white text-blue-600 border border-blue-50 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#0c345f] group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                                    {benefit.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#0c345f] transition-colors">{benefit.title}</h4>
                                <p className="text-gray-500 leading-relaxed text-sm">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    // 5. CONTACT (CONTACTO)
    const ContactView = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 bg-gray-50 pt-20"
        >
            {/* Banner Contacto Mejorado (Dark Blue con Acentos Dorados) */}
            <div className="relative bg-[#0c345f] py-28 px-4 overflow-hidden">
                {/* Efectos decorativos de fondo */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b3a48e]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <div className="inline-block bg-[#b3a48e] text-white font-bold px-4 py-1.5 rounded-full text-sm mb-6 uppercase tracking-widest shadow-lg">Atención Personalizada</div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-md tracking-tight">
                        ¿Buscas Una Solución Innovadora<br className="hidden md:block" /> Para Ropa AR / FR / EPP?
                    </h1>
                    <p className="text-lg md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light">
                        Te ayudamos a crear un programa de uniformes efectivo y a la medida de tu operación.
                    </p>
                    <div className="w-24 h-1.5 bg-[#b3a48e] mx-auto rounded-full mb-16"></div>

                    {/* Tarjetas de Información Flotantes con Glassmorphism */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-8">

                        {/* Oficina Corporativa */}
                        <div className="bg-[#0a2b50]/60 backdrop-blur-md border border-[#164a85] p-10 rounded-3xl hover:bg-[#164a85]/50 transition-all shadow-2xl flex flex-col justify-center items-center group">
                            <div className="w-16 h-16 bg-[#b3a48e]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MapPin className="w-8 h-8 text-[#b3a48e]" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Oficina Corporativa</h3>
                            <p className="text-blue-100 text-base leading-relaxed">Av. Libertad 1723, Maestros, 22840</p>
                            <p className="text-blue-100 text-base mb-4 leading-relaxed">Ensenada, B.C., Mexico</p>
                            <a href="mailto:info@uniformesprofesionales.mx" className="text-[#b3a48e] font-medium block hover:text-white transition mt-auto mb-2 truncate w-full">info@uniformesprofesionales.mx</a>
                            <p className="text-white font-bold text-xl tracking-wide">+52 646 596 1975</p>
                        </div>

                        {/* José C. Ruiz */}
                        <div className="bg-[#0a2b50]/60 backdrop-blur-md border border-[#164a85] p-10 rounded-3xl hover:bg-[#164a85]/50 transition-all shadow-2xl flex flex-col justify-center items-center group">
                            <div className="w-16 h-16 bg-[#b3a48e]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <User className="w-8 h-8 text-[#b3a48e]" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-white">José C. Ruiz</h3>
                            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">Gerente de Desarrollo de Negocios</p>
                            <a href="mailto:josec@uniformesprofesionales.mx" className="text-[#b3a48e] font-medium block hover:text-white transition mt-auto mb-3 truncate w-full">josec@uniformesprofesionales.mx</a>
                            <p className="text-white font-bold text-lg tracking-wide mb-1">+52 646 295 2269</p>
                            <p className="text-white font-bold text-lg tracking-wide">+52 646 454 8538</p>
                        </div>

                        {/* Whatsapp */}
                        <div className="bg-[#0a2b50]/60 backdrop-blur-md border border-[#164a85] p-10 rounded-3xl hover:bg-[#164a85]/50 transition-all shadow-2xl flex flex-col justify-center items-center group">
                            <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-8 h-8 text-[#25D366]" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">WhatsApp Directo</h3>
                            <p className="text-blue-100 mb-8 leading-relaxed">Cotizaciones, dudas y respuestas rápidas a un clic de distancia.</p>
                            <button onClick={() => handleWhatsAppClick()} className="mt-auto w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 rounded-xl font-bold text-lg transition shadow-[0_0_15px_rgba(37,211,102,0.4)] flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]">
                                <MessageCircle className="w-6 h-6 mr-3" />
                                +52 646 2952269
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Formulario de Contacto Flotante */}
            <div className="py-24 bg-gray-50 relative">
                <div className="max-w-4xl mx-auto px-4 relative z-10 -mt-24">
                    <div className="bg-white p-10 md:p-14 rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                        <h2 className="text-3xl font-extrabold text-center text-[#0c345f] mb-3">Envíanos un mensaje directo</h2>
                        <p className="text-center text-gray-500 mb-10 text-lg">Completa el formulario y un asesor experto se pondrá en contacto contigo a la brevedad.</p>
                        <ContactForm hideHeader={true} />
                    </div>
                </div>
            </div>
        </motion.div>
    );

    // 6. UPEFR 360 (PROGRAMA INTEGRAL - MEJORADO CON LA INFO REAL)
    const View360 = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 bg-white pt-20"
        >
            {/* Hero Banner upeFR 360 */}
            <div className="relative bg-[#0c345f] text-white py-32 overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply z-10"></div>
                <img src="./banner_upefr360.jpg" alt="Ingeniero con equipo de seguridad" className="absolute inset-0 w-full h-full object-cover z-0 scale-105" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-10"></div>
                <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center justify-center space-x-2 bg-[#b3a48e]/90 backdrop-blur-sm border border-[#b3a48e]/50 text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest mb-8 shadow-lg"
                    >
                        <ShieldCheck className="w-5 h-5 text-white mr-1" />
                        <span>Respuesta Integral B2B</span>
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight drop-shadow-lg"
                    >
                        upe<span className="text-blue-400">FR</span> 360°
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-3xl text-blue-100 max-w-4xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md"
                    >
                        Uniendo control estratégico para la gestión integral de uniformes y EPP. Evoluciona la forma en que equipas a tu personal.
                    </motion.p>
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => window.scrollTo({ top: document.getElementById('demo-form').offsetTop, behavior: 'smooth' })}
                        className="bg-white hover:bg-gray-50 text-[#0c345f] px-12 py-5 rounded-full font-extrabold text-lg transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-100 flex items-center mx-auto"
                    >
                        Solicitar Demostración <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.button>
                </div>
            </div>

            {/* Intro - ¿Por qué elegir upeFR360? */}
            <div className="py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-extrabold text-[#0c345f] mb-8 tracking-tight"
                    >
                        ¿Por qué elegir upeFR360?
                    </motion.h2>
                    <div className="w-24 h-1.5 bg-[#b3a48e] mx-auto rounded-full mb-10 relative">
                        <div className="absolute inset-0 bg-[#b3a48e] blur-sm opacity-50"></div>
                    </div>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-600 max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed mb-20 font-light"
                    >
                        Diseñamos <strong className="font-bold text-[#0c345f]">upeFR 360°</strong> como una plataforma iterativa e innovadora que le permita administrar, monitorear y eficientar sus compras de EPP en tiempo real y a la medida de su operación.
                    </motion.p>

                    <h3 className="text-3xl font-bold text-gray-900 mb-12 text-left pl-4 border-l-4 border-blue-600">Beneficios Clave</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                        {[
                            { icon: <BarChart3 className="w-8 h-8" />, title: "Garantice su control", desc: "El presupuesto se mantiene al margen" },
                            { icon: <Users className="w-8 h-8" />, title: "Asignación jerárquica", desc: "Por área, línea y perfil de operador" },
                            { icon: <Truck className="w-8 h-8" />, title: "Agilización total", desc: "Procesos de compra y entrega acelerados" },
                            { icon: <CheckCircle2 className="w-8 h-8" />, title: "Flujos automatizados", desc: "Validación y autorizaciones de compra inmediata" }
                        ].map((item, i) => (
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-10 group-hover:bg-blue-100/50 transition-colors"></div>
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">{item.icon}</div>
                                <h4 className="font-bold text-gray-900 text-xl mb-3">{item.title}</h4>
                                <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Los 4 Pilares (Zig-Zag Layout) */}
            <div className="bg-gray-50 py-32 border-y border-gray-100 relative overflow-hidden">
                <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-[20%] left-0 w-[600px] h-[600px] bg-[#b3a48e]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 space-y-32 relative z-10">

                    {/* Pilar 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full order-2 md:order-1 relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-transparent rounded-[2.5rem] -z-10 transform rotate-2 blur-sm group-hover:rotate-3 transition-transform duration-500"></div>
                            <img src="./img_pc.jpg" alt="Tienda en línea B2B" className="relative rounded-[2rem] shadow-2xl w-full h-[450px] object-cover border-4 border-white group-hover:scale-[1.02] transition-transform duration-500" />
                        </motion.div>
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full order-1 md:order-2"
                        >
                            <div className="inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">Paso 1</div>
                            <h3 className="text-4xl lg:text-5xl font-extrabold text-[#0c345f] mb-6 leading-tight tracking-tight">Tienda B2B exclusiva y personalizada</h3>
                            <p className="text-gray-600 text-xl leading-relaxed">
                                Creamos un portal web con una experiencia de compra personalizada de acuerdo a los lineamientos y cuotas autorizadas de su empresa. Un portal privado sólo para sus empleados o supervisores autorizados.
                            </p>
                        </motion.div>
                    </div>

                    {/* Pilar 2 */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full"
                        >
                            <div className="inline-flex items-center text-sm font-bold text-[#b3a48e] bg-[#b3a48e]/10 px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">Paso 2</div>
                            <h3 className="text-4xl lg:text-5xl font-extrabold text-[#0c345f] mb-6 leading-tight tracking-tight">Resumen y asignación de tallas</h3>
                            <p className="text-gray-600 text-xl leading-relaxed">
                                Carga individual de medidas por cada empleado, lo que asegura una asignación de tallas correcta desde el primer pedido, reduciendo drásticamente las devoluciones, costos y tiempos de gestión.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-l from-[#b3a48e]/20 to-transparent rounded-[2.5rem] -z-10 transform -rotate-2 blur-sm group-hover:-rotate-3 transition-transform duration-500"></div>
                            <img src="./img_asigtallas.jpg" alt="Gestión de tallas" className="relative rounded-[2rem] shadow-2xl w-full h-[450px] object-cover border-4 border-white group-hover:scale-[1.02] transition-transform duration-500" />
                        </motion.div>
                    </div>

                    {/* Pilar 3 */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full order-2 md:order-1 relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-transparent rounded-[2.5rem] -z-10 transform rotate-2 blur-sm group-hover:rotate-3 transition-transform duration-500"></div>
                            <img src="./img_logistica.jpg" alt="Logística optimizada" className="relative rounded-[2rem] shadow-2xl w-full h-[450px] object-cover border-4 border-white group-hover:scale-[1.02] transition-transform duration-500" />
                        </motion.div>
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full order-1 md:order-2"
                        >
                            <div className="inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">Paso 3</div>
                            <h3 className="text-4xl lg:text-5xl font-extrabold text-[#0c345f] mb-6 leading-tight tracking-tight">Logística optimizada</h3>
                            <p className="text-gray-600 text-xl leading-relaxed">
                                Entregas en esquema de paquetes individuales (kitting) o centralizados, directos a sitio o sucursal por empleado. Hacemos que la distribución interna deje de ser un dolor de cabeza para su equipo.
                            </p>
                        </motion.div>
                    </div>

                    {/* Pilar 4 */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full"
                        >
                            <div className="inline-flex items-center text-sm font-bold text-[#b3a48e] bg-[#b3a48e]/10 px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">Paso 4</div>
                            <h3 className="text-4xl lg:text-5xl font-extrabold text-[#0c345f] mb-6 leading-tight tracking-tight">Control automatizado y seguimiento</h3>
                            <p className="text-gray-600 text-xl leading-relaxed">
                                Visualice de inmediato sus gastos e inventarios. Monitoreo del estatus de compras y autorizaciones jerárquicas online para total transparencia del presupuesto ejercido.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-l from-[#b3a48e]/20 to-transparent rounded-[2.5rem] -z-10 transform -rotate-2 blur-sm group-hover:-rotate-3 transition-transform duration-500"></div>
                            <img src="./img_Softlog.jpg" alt="Reportes y control" className="relative rounded-[2rem] shadow-2xl w-full h-[450px] object-cover border-4 border-white group-hover:scale-[1.02] transition-transform duration-500" />
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Differentiators (Producción & Soporte) - Copia exacta del Folleto */}
            <div className="bg-[#0c345f] py-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('./img_work.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-xl p-12 lg:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-colors duration-500"
                    >
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700"><Factory className="w-80 h-80" /></div>
                        <h3 className="text-4xl md:text-5xl font-extrabold mb-8 flex items-center relative z-10 text-white tracking-tight leading-tight">
                            Producción 100% Interna y control total.
                        </h3>
                        <p className="text-blue-100/90 text-xl leading-relaxed mb-8 relative z-10 font-light">
                            Nos encargamos de todo el proceso productivo garantizando la continuidad de su requerimiento:
                        </p>
                        <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
                            <ul className="space-y-4 relative z-10 font-bold text-lg">
                                <li className="flex items-center text-white"><span className="w-8 h-8 rounded-full bg-[#b3a48e]/20 text-[#b3a48e] flex items-center justify-center mr-4">1</span> Diseño y Especificación</li>
                                <li className="flex items-center text-white"><span className="w-8 h-8 rounded-full bg-[#b3a48e]/20 text-[#b3a48e] flex items-center justify-center mr-4">2</span> Materiales y Corte</li>
                                <li className="flex items-center text-white"><span className="w-8 h-8 rounded-full bg-[#b3a48e]/20 text-[#b3a48e] flex items-center justify-center mr-4">3</span> Confección Especializada</li>
                                <li className="flex items-center text-white"><span className="w-8 h-8 rounded-full bg-[#b3a48e]/20 text-[#b3a48e] flex items-center justify-center mr-4">4</span> Logística de Entrega</li>
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-white/20">
                            <p className="text-[#b3a48e] text-xl mb-6 relative z-10 font-bold tracking-wide uppercase">
                                Sus Ventajas Directas:
                            </p>
                            <ul className="space-y-3 relative z-10 font-medium text-lg">
                                <li className="flex items-center text-white"><CheckCircle className="w-6 h-6 text-[#25D366] mr-3" /> Costo eficiente sin intermediarios</li>
                                <li className="flex items-center text-white"><CheckCircle className="w-6 h-6 text-[#25D366] mr-3" /> Mayor aseguramiento de calidad</li>
                                <li className="flex items-center text-white"><CheckCircle className="w-6 h-6 text-[#25D366] mr-3" /> Rapidez estructural en tiempos de respuesta</li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-[#0a2b50] to-[#0c345f] p-12 lg:p-16 rounded-[2.5rem] border border-[#164a85] shadow-2xl relative overflow-hidden flex flex-col justify-center group"
                    >
                        <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700"><Headset className="w-80 h-80" /></div>
                        <h3 className="text-4xl md:text-5xl font-extrabold mb-8 relative z-10 text-white tracking-tight leading-tight">
                            Soporte Interactivo<br />y Personalizado
                        </h3>
                        <p className="text-blue-100 text-xl leading-relaxed mb-12 relative z-10 font-light">
                            En upeFR su éxito es nuestro compromiso continuado. Creemos en el seguimiento personalizado:
                        </p>
                        <div className="grid grid-cols-1 gap-6 relative z-10">
                            <div className="bg-[#164a85]/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/20 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 group/card hover:bg-[#164a85]/60 transition-colors">
                                <div className="p-4 bg-blue-500/20 rounded-xl group-hover/card:bg-blue-500/40 transition-colors"><Users className="w-10 h-10 text-white" /></div>
                                <div>
                                    <h4 className="font-bold text-white text-xl mb-2">Acompañamiento Constante</h4>
                                    <p className="text-blue-100">Asignación de un Ejecutivo de Cuenta dedicado que conoce a fondo las directrices de su empresa.</p>
                                </div>
                            </div>
                            <div className="bg-[#b3a48e]/20 backdrop-blur-sm p-8 rounded-2xl border border-[#b3a48e]/30 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 group/card hover:bg-[#b3a48e]/30 transition-colors">
                                <div className="p-4 bg-[#b3a48e]/30 rounded-xl group-hover/card:bg-[#b3a48e]/50 transition-colors"><MessageCircle className="w-10 h-10 text-white" /></div>
                                <div>
                                    <h4 className="font-bold text-white text-xl mb-2">Comodidad y Respuesta Rápida</h4>
                                    <p className="text-blue-100">Canal directo de atención vía WhatsApp para dudas logísticas o administrativas en tiempo real.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>


                </div>
            </div>

            {/* CTA Final y Formulario */}
            <div id="demo-form" className="py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-gray-50 p-10 md:p-14 rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0c345f] mb-4">Impulsa la seguridad de tu empresa hoy mismo</h2>
                            <p className="text-gray-500 text-lg">Déjanos tus datos y un especialista te mostrará cómo <strong>upeFR 360°</strong> puede transform la gestión de uniformes en tu organización.</p>
                        </div>
                        {/* Reutilizamos el ContactForm pero sin sus títulos por defecto */}
                        <ContactForm hideHeader={true} />
                    </div>
                </div>
            </div>

        </motion.div>
    );

    // 7. LOGIN ADMIN
    const LoginView = () => {
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');

        const handleLogin = (e) => {
            e.preventDefault();
            // Basic client-side protection for demo purposes
            if (password === 'admin123') {
                setIsAuthenticated(true);
            } else {
                setError('Contraseña incorrecta');
                setPassword('');
            }
        };

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 bg-gray-50 flex items-center justify-center p-4 pt-24 pb-12"
            >
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-10"></div>

                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-6">
                            <img src="./logo-oscuro.png" alt="upeFR Logo" className="h-[46px] w-auto" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#0c345f]">Acceso Restringido</h2>
                        <p className="text-gray-500 text-sm mt-1">Ingresa tu contraseña de administrador para continuar.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100'} focus:outline-none focus:border-blue-500 focus:ring-4 transition-all bg-gray-50`}
                                placeholder="••••••••"
                                required
                            />
                            {error && <p className="text-red-500 text-sm mt-2 font-medium flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#0c345f] hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                            Acceder al Panel
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button onClick={goHome} className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
                            Volver al sitio público
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    };

    // 8. ADMIN / CMS
    const AdminView = () => {
        const [formData, setFormData] = useState({ title: '', sku: '', style: '', mainCategory: 'Uniformes FR', brand: CATALOG_MENU['Uniformes FR'][0], description: '', image: '' });
        const [notification, setNotification] = useState('');

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            if (name === 'mainCategory') {
                setFormData({ ...formData, mainCategory: value, brand: CATALOG_MENU[value][0] });
            } else {
                setFormData({ ...formData, [name]: value });
            }
        };

        const handleAddProduct = (e) => {
            e.preventDefault();
            const newProduct = { ...formData, id: Date.now(), image: formData.image || "https://images.unsplash.com/photo-1584305574647-0cc9f9e10260?auto=format&fit=crop&q=80&w=800" };
            setProducts([newProduct, ...products]);
            setNotification('¡Producto agregado exitosamente al catálogo!');
            setFormData({ title: '', sku: '', style: '', mainCategory: 'Uniformes FR', brand: CATALOG_MENU['Uniformes FR'][0], description: '', image: '' });
            setTimeout(() => setNotification(''), 3000);
        };

        const handleDelete = (id) => {
            if (window.confirm('¿Estás seguro de eliminar este producto?')) setProducts(products.filter(p => p.id !== id));
        };

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 bg-gray-50 p-4 md:p-8 pt-24"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <motion.h1
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-4xl font-extrabold text-[#0c345f] flex items-center tracking-tight"
                        >
                            <User className="w-10 h-10 mr-4 text-[#b3a48e]" /> Panel de Administración
                        </motion.h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Area de Subida */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-4"
                        >
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-10"></div>
                                <h2 className="text-2xl font-bold text-[#0c345f] mb-6 flex items-center">
                                    <Plus className="w-6 h-6 mr-3 text-green-500" /> Nuevo Producto
                                </h2>

                                <AnimatePresence>
                                    {notification && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl mb-6 text-sm font-semibold flex items-center shadow-sm"
                                        >
                                            <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                                            {notification}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleAddProduct} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Título del Producto *</label>
                                        <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm text-gray-800 font-medium" placeholder="Ej. Pantalón Ignífugo..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">SKU / POS *</label>
                                            <input type="text" name="sku" required value={formData.sku} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-mono text-gray-800" placeholder="100XXX" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Núm. Estilo *</label>
                                            <input type="text" name="style" required value={formData.style} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-mono text-gray-800" placeholder="M5-FR" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Categoría *</label>
                                            <select name="mainCategory" value={formData.mainCategory} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm text-gray-800 font-medium appearance-none">
                                                {Object.keys(CATALOG_MENU).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Marca *</label>
                                            <select name="brand" value={formData.brand} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm text-gray-800 font-medium appearance-none">
                                                {CATALOG_MENU[formData.mainCategory].map(b => <option key={b} value={b}>{b}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">URL de la Imagen</label>
                                        <input type="url" name="image" value={formData.image} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm text-gray-800" placeholder="https://..." />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción</label>
                                        <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm text-gray-800" placeholder="Características detalladas..."></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-[#0c345f] hover:bg-[#0a2b50] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-4">
                                        Guardar Producto en Catálogo
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Lista de Productos */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-8"
                        >
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden h-full flex flex-col">
                                <div className="p-6 md:p-8 bg-white border-b border-gray-100 flex justify-between items-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-gray-50/50 rounded-bl-full -z-10"></div>
                                    <h2 className="text-2xl font-bold text-[#0c345f]">Catálogo Actual</h2>
                                    <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100 shadow-sm">
                                        {products.length} productos
                                    </div>
                                </div>
                                <div className="overflow-x-auto flex-1 p-2">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="p-4 md:p-6 text-xs font-bold text-gray-500 uppercase tracking-widest rounded-tl-xl border-b border-gray-100">Producto</th>
                                                <th className="p-4 md:p-6 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 hidden sm:table-cell">SKU / Estilo</th>
                                                <th className="p-4 md:p-6 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 hidden md:table-cell">Categoría</th>
                                                <th className="p-4 md:p-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-center rounded-tr-xl border-b border-gray-100">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            <AnimatePresence>
                                                {products.map((product) => (
                                                    <motion.tr
                                                        key={product.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        layout
                                                        className="hover:bg-blue-50/30 transition-colors group"
                                                    >
                                                        <td className="p-4 md:p-6">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden flex-shrink-0">
                                                                    <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                                                </div>
                                                                <div>
                                                                    <span className="text-sm font-bold text-gray-900 line-clamp-2 max-w-[250px] group-hover:text-blue-600 transition-colors">{product.title}</span>
                                                                    <div className="sm:hidden text-xs font-mono font-bold text-[#0c345f] mt-1">{product.sku}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 md:p-6 hidden sm:table-cell">
                                                            <div className="text-sm font-mono font-bold text-[#0c345f] bg-blue-50 inline-block px-2 py-1 rounded">{product.sku}</div>
                                                            <div className="text-xs text-gray-500 mt-1.5 font-medium">{product.style}</div>
                                                        </td>
                                                        <td className="p-4 md:p-6 hidden md:table-cell">
                                                            <span className="bg-gray-100 border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full font-semibold">{product.mainCategory || product.category}</span>
                                                            <div className="text-[10px] mt-2 text-gray-500 font-bold uppercase tracking-wider">{product.brand}</div>
                                                        </td>
                                                        <td className="p-4 md:p-6 text-center">
                                                            <button
                                                                onClick={() => handleDelete(product.id)}
                                                                className="text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-100 p-2.5 rounded-xl transition-all shadow-sm hover:shadow"
                                                                title="Eliminar"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </AnimatePresence>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        );
    };

    // --- MODAL DE BIENVENIDA (Redirección de Portales) ---
    const WelcomeModal = () => {
        const [showModal, setShowModal] = useState(false);

        useEffect(() => {
            const yaSeMostro = sessionStorage.getItem('upePopupVisto');
            if (!yaSeMostro) {
                setShowModal(true);
                sessionStorage.setItem('upePopupVisto', 'true');
            }
        }, []);

        return (
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()} // Prevent clicking inside from closing
                            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full relative overflow-hidden border border-gray-100"
                        >
                            {/* Decorative background subtle glows */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full p-2 transition-colors focus:outline-none z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center p-6 pb-2 md:p-8 md:pb-4 relative z-10">
                                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c345f] mb-1 md:mb-2">¡Bienvenido a <span className="text-blue-500">upe</span>FR!</h2>
                                <p className="text-gray-500 text-sm md:text-lg">Por favor, selecciona el portal que deseas visitar hoy.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-6 pt-2 md:p-8 md:pt-4 relative z-10 max-h-[60vh] overflow-y-auto">
                                {/* Portal UPE FR */}
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setShowModal(false); }} // Cierra y se queda en la página actual
                                    className="group block border-2 border-gray-100 rounded-2xl p-4 md:p-6 text-center hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gray-50/50 hover:bg-white relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="h-24 md:h-40 flex items-center justify-center mb-3 md:mb-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 relative z-10">
                                        <img src={`${import.meta.env.BASE_URL}logo-oscuro.png`} alt="Logotipo upeFR" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-extrabold text-[#0c345f] group-hover:text-blue-600 transition-colors relative z-10">upeFR</h3>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2 font-medium relative z-10">Ropa Ignífuga y EPP de Alta Gama</p>
                                </a>

                                {/* Portal UPE Uniformes */}
                                <a
                                    href="https://flowmx.github.io/upeuniformes/" // URL corregida
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setShowModal(false)}
                                    className="group block border-2 border-gray-100 rounded-2xl p-4 md:p-6 text-center hover:border-[#b3a48e]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gray-50/50 hover:bg-white relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#b3a48e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="h-24 md:h-40 flex flex-col items-center justify-center mb-3 md:mb-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 relative z-10">
                                        <img src={`${import.meta.env.BASE_URL}logo-uniformes.png`} alt="Logotipo upe Uniformes Profesionales" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-extrabold text-[#0c345f] group-hover:text-[#b3a48e] transition-colors relative z-10">upe Uniformes</h3>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2 font-medium relative z-10">Uniformes Corporativos e Industriales</p>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };

    // --- RENDERIZADO CONDICIONAL DE RUTAS ---
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <WelcomeModal />
            <Navbar />

            {currentView === 'home' && <HomeView />}
            {currentView === 'store' && <StoreView />}
            {currentView === 'product' && <ProductView />}
            {currentView === 'about' && <AboutView />}
            {currentView === 'contact' && <ContactView />}
            {currentView === '360' && <View360 />}

            {/* Ruteo de Área de Administración con Autenticación */}
            {currentView === 'admin' && (
                isAuthenticated ? <AdminView /> : <LoginView />
            )}

            {currentView !== 'admin' && currentView !== '360' && <Footer />}
        </div>
    );
}