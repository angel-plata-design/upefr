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
        <React.Fragment>
            {/* Announcement Bar */}
            <div className="bg-black text-white text-[10px] md:text-xs font-bold uppercase tracking-widest py-2.5 px-4 text-center w-full z-50 relative">
                <span className="animate-pulse">ENVÍO GRATIS EN COMPRAS MAYORES A $2,500 MXN</span>
            </div>
            {/* Utility Bar */}
            <div className="hidden md:flex bg-white py-1.5 px-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest justify-end space-x-6 border-b border-gray-100 w-full z-50 relative">
                <a href="#" className="hover:text-black transition-colors">Tiendas</a>
                <a href="#" className="hover:text-black transition-colors">Distribuidores</a>
                <button onClick={goToAdmin} className="hover:text-black transition-colors">Acceder</button>
            </div>
            <nav className="sticky top-0 w-full z-40 transition-all duration-300 bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-[70px]">
                        {/* Logo */}
                        <div className="flex items-center h-full">
                            <div
                                className="cursor-pointer select-none group mr-10"
                                onClick={goHome}
                            >
                                <img src={`${import.meta.env.BASE_URL}logo-oscuro.png`} alt="upeFR Logo" className="h-[40px] w-auto transition-transform duration-300" />
                            </div>
                        </div>

                        {/* Enlaces de Menú Desktop */}
                        <div className="hidden md:flex space-x-8 h-full items-center">
                            <button onClick={goHome} className={`h-full text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center ${currentView === 'home' ? 'text-black border-black' : 'text-gray-500 hover:text-black border-transparent'}`}>
                                INICIO
                            </button>

                            {/* MENÚ DESPLEGABLE: TIENDA / CATÁLOGO */}
                            <div className="relative group h-full flex items-center">
                                <button onClick={() => goToStore(null)} className={`h-full text-xs font-bold uppercase tracking-wider flex items-center transition-colors border-b-2 ${(currentView === 'store' || currentView === 'product') ? 'text-black border-black' : 'text-gray-500 hover:text-black border-transparent'}`}>
                                    TIENDA <ChevronDown className="w-3 h-3 ml-1" />
                                </button>
                                {/* Mega menú oculto */}
                                <div className="absolute top-[70px] left-1/2 -translate-x-1/2 bg-white text-black shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex space-x-16 p-10 border border-gray-200 min-w-max">
                                    {Object.entries(CATALOG_MENU).map(([category, brands]) => (
                                        <div key={category} className="flex flex-col min-w-[180px]">
                                            <h3
                                                onClick={() => goToStore({ type: 'mainCategory', value: category })}
                                                className="font-bold text-black text-sm uppercase mb-6 pb-2 border-b border-gray-200 cursor-pointer hover:text-gray-500 transition-colors flex items-center justify-between"
                                            >
                                                {category} <ChevronRight className="w-3 h-3 text-gray-400" />
                                            </h3>
                                            <ul className="space-y-4">
                                                {brands.map(brand => (
                                                    <li key={brand}>
                                                        <button
                                                            onClick={() => goToStore({ type: 'brand', value: brand })}
                                                            className="text-gray-600 hover:text-black hover:underline underline-offset-4 font-medium text-sm transition-all text-left w-full"
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

                            <button onClick={goToAbout} className={`h-full text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center ${currentView === 'about' ? 'text-black border-black' : 'text-gray-500 hover:text-black border-transparent'}`}>NOSOTROS</button>
                            <a href="https://flowmx.github.io/upeuniformes/" target="_blank" rel="noopener noreferrer" className="h-full text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors flex items-center gap-1 border-b-2 border-transparent">
                                UPE UNIFORMES <Globe className="w-3 h-3" />
                            </a>
                            <button onClick={goToContact} className={`h-full text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center ${currentView === 'contact' ? 'text-black border-black' : 'text-gray-500 hover:text-black border-transparent'}`}>CONTACTO</button>
                        </div>

                        {/* Iconos (Derecha) */}
                        <div className="flex items-center space-x-6 h-full">
                            <Search className="w-5 h-5 text-black cursor-pointer hover:text-gray-500 transition-colors" onClick={() => goToStore(null)} />
                            <div className="hidden md:block">
                                <User className="w-5 h-5 text-black cursor-pointer hover:text-gray-500 transition-colors" onClick={goToAdmin} />
                            </div>

                            {/* Botón menú móvil */}
                            <div className="md:hidden">
                                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black focus:outline-none p-2 mt-1">
                                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Segment Bar (Optional for below header categories) */}
                <div className="hidden md:flex w-full bg-[#111] text-white py-0 border-t border-[#333]">
                    <button onClick={() => goToStore({ type: 'mainCategory', value: 'Uniformes FR' })} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#222] transition-colors border-r border-[#333]">COMPRA UNIFORMES FR</button>
                    <button onClick={() => goToStore({ type: 'mainCategory', value: 'Calzado' })} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#222] transition-colors border-r border-[#333]">COMPRA CALZADO</button>
                    <button onClick={() => goToStore({ type: 'mainCategory', value: 'EPP' })} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#222] transition-colors">COMPRA EPP</button>
                </div>

                {/* Menú Móvil */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                        >
                            <div className="flex flex-col px-6 py-6 space-y-4">
                                <button onClick={() => { goHome(); setIsMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-wider py-2 ${currentView === 'home' ? 'text-black' : 'text-gray-500'}`}>INICIO</button>
                                <button onClick={() => { goToStore(null); setIsMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-wider py-2 ${currentView === 'store' || currentView === 'product' ? 'text-black' : 'text-gray-500'}`}>TIENDA</button>
                                <button onClick={() => { goToAbout(); setIsMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-wider py-2 ${currentView === 'about' ? 'text-black' : 'text-gray-500'}`}>NOSOTROS</button>
                                <a href="https://flowmx.github.io/upeuniformes/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-sm font-bold uppercase tracking-wider text-gray-500 py-2 flex items-center justify-between">
                                    UPE UNIFORMES <Globe className="w-4 h-4 opacity-50" />
                                </a>
                                <button onClick={() => { goToContact(); setIsMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-wider py-2 ${currentView === 'contact' ? 'text-black' : 'text-gray-500'}`}>CONTACTO</button>
                                <div className="h-px bg-gray-200 my-2"></div>
                                <button onClick={() => { goToAdmin(); setIsMobileMenuOpen(false); }} className="text-left text-sm font-bold uppercase tracking-wider text-gray-400 py-2 flex items-center"><User className="w-4 h-4 mr-2" /> ACCESO ADMIN</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </React.Fragment>
    );

    const Footer = () => (
        <footer className="bg-[#f5f5f5] text-black py-12 mt-auto border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-1">
                    <div className="mb-6">
                        <img src={`${import.meta.env.BASE_URL}logo-oscuro.png`} alt="upeFR Logo" className="h-8 w-auto opacity-90" />
                    </div>
                    <form className="mb-6" onSubmit={(e) => e.preventDefault()}>
                        <label className="block text-sm font-bold uppercase tracking-widest mb-3">Únete a upeFR</label>
                        <div className="flex">
                            <input type="email" placeholder="Correo electrónico" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none" />
                            <button type="submit" className="bg-[#c84126] text-white px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-orange-800 transition-colors rounded-none">Suscribir</button>
                        </div>
                    </form>
                    <div className="flex space-x-4 mt-6">
                        <a href="#" className="text-gray-500 hover:text-black transition"><ShieldCheck className="w-5 h-5" /></a>
                    </div>
                </div>
                <div className="md:col-span-1">
                    <h4 className="text-black font-bold uppercase tracking-widest text-xs mb-6">Nosotros</h4>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li><button onClick={goToAbout} className="hover:text-black hover:underline underline-offset-4 transition uppercase tracking-wider text-[11px] font-bold">Nuestra Historia</button></li>
                        <li><button onClick={goTo360} className="hover:text-black hover:underline underline-offset-4 transition uppercase tracking-wider text-[11px] font-bold">Experiencia upeFR 360°</button></li>
                    </ul>
                </div>
                <div className="md:col-span-1">
                    <h4 className="text-black font-bold uppercase tracking-widest text-xs mb-6">Ayuda / Soporte</h4>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li><button onClick={() => goToStore(null)} className="hover:text-black hover:underline underline-offset-4 transition uppercase tracking-wider text-[11px] font-bold">Catálogo</button></li>
                        <li><button onClick={goToContact} className="hover:text-black hover:underline underline-offset-4 transition uppercase tracking-wider text-[11px] font-bold">Contáctanos</button></li>
                        <li><a href="#" className="hover:text-black hover:underline underline-offset-4 transition uppercase tracking-wider text-[11px] font-bold">Devoluciones</a></li>
                    </ul>
                </div>
                <div className="md:col-span-1">
                    <h4 className="text-black font-bold uppercase tracking-widest text-xs mb-6">Contacto</h4>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li className="flex items-center"><Phone className="w-4 h-4 mr-3" /> <span className="text-[11px] font-bold tracking-wider">+52 646 596 1975</span></li>
                        <li className="flex items-center"><Mail className="w-4 h-4 mr-3" /> <span className="text-[11px] font-bold tracking-wider">info@uniformesprofesionales.mx</span></li>
                        <li className="flex items-start"><MapPin className="w-4 h-4 mr-3 mt-1" /> <span className="text-[11px] font-bold tracking-wider uppercase leading-relaxed">Av. Libertad 1723,<br/>Ensenada, B.C., Mexico</span></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 text-center text-[10px] uppercase tracking-widest text-gray-400 mt-16 pt-8 border-t border-gray-200">
                © {new Date().getFullYear()} UPEFR. TODOS LOS DERECHOS RESERVADOS.
            </div>
        </footer>
    );

    const ContactForm = ({ inProductView = false, hideHeader = false }) => (
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

                <form className={`space-y-4 text-left ${inProductView || hideHeader ? '' : 'bg-white p-8 mb-8 border border-gray-200'}`} onSubmit={(e) => { e.preventDefault(); alert("Mensaje enviado (Simulación)"); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Nombre *</label>
                            <input type="text" required className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black" />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Correo electrónico *</label>
                            <input type="email" required className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Número de teléfono</label>
                        <input type="tel" className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black" />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Mensaje *</label>
                        <textarea required rows="3" className="w-full p-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none transition-colors text-sm text-black"></textarea>
                    </div>
                    <div className={inProductView ? 'pt-2' : 'text-center pt-2'}>
                        <button type="submit" className={`bg-black text-white px-8 py-4 border border-black hover:bg-white hover:text-black font-bold uppercase tracking-widest transition-colors text-xs ${inProductView ? 'w-full' : 'w-full md:w-auto'}`}>
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
                <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentHeroImg}
                            src={heroImages[currentHeroImg]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.0, ease: "easeInOut" }}
                            alt="Hero"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    </AnimatePresence>
                    {/* Dark gradient for text readability, removing blue hue */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>

                    <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex flex-col md:flex-row items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="md:w-[55%] text-left"
                        >
                            <div className="inline-block text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b-2 border-[#c84126] pb-1">
                                /// NUEVA LÍNEA DE PROTECCIÓN
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-[1.05] tracking-tight">
                                Protección <br />Industrial.
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl font-medium leading-relaxed">
                                Encuentra tu nivel de seguridad perfecto con nuestras prendas certificadas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => goToStore({ type: 'mainCategory', value: 'Uniformes FR' })}
                                    className="bg-white text-black px-10 py-4 font-bold text-sm uppercase tracking-wider transition hover:bg-gray-200 flex items-center justify-center rounded-none"
                                >
                                    Comprar Uniformes FR
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => goToStore({ type: 'mainCategory', value: 'Calzado' })}
                                    className="bg-transparent border-2 border-white text-white px-10 py-4 font-bold text-sm uppercase tracking-wider transition hover:bg-white hover:text-black flex items-center justify-center rounded-none"
                                >
                                    Comprar Calzado
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                        {heroImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentHeroImg(idx)}
                                className={`h-1 transition-all duration-300 rounded-none ${idx === currentHeroImg ? 'bg-white w-12' : 'bg-white/40 hover:bg-white/80 w-8'}`}
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

                {/* Compra por Categoría (Ariat Style) */}
                <div className="max-w-[1600px] mx-auto px-4 py-16">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Categorías</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group cursor-pointer flex flex-col items-center" onClick={() => goToStore({ type: 'generic', value: 'Pantalones FR' })}>
                            <div className="w-full h-[400px] overflow-hidden mb-6 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800" alt="Pantalones" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <button className="border border-black text-black text-sm uppercase font-bold tracking-widest px-8 py-3 w-full max-w-[280px] hover:bg-black hover:text-white transition-colors duration-300 rounded-none">
                                Ropa para hombre
                            </button>
                        </div>
                        <div className="group cursor-pointer flex flex-col items-center" onClick={() => goToStore({ type: 'generic', value: 'Camisas FR' })}>
                            <div className="w-full h-[400px] overflow-hidden mb-6 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800" alt="Camisas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <button className="border border-black text-black text-sm uppercase font-bold tracking-widest px-8 py-3 w-full max-w-[280px] hover:bg-black hover:text-white transition-colors duration-300 rounded-none">
                                Ropa para mujer
                            </button>
                        </div>
                        <div className="group cursor-pointer flex flex-col items-center" onClick={() => goToStore({ type: 'generic', value: 'Calzado FR' })}>
                            <div className="w-full h-[400px] overflow-hidden mb-6 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800" alt="Calzado" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <button className="border border-black text-black text-sm uppercase font-bold tracking-widest px-8 py-3 w-full max-w-[280px] hover:bg-black hover:text-white transition-colors duration-300 rounded-none">
                                Calzado para hombre
                            </button>
                        </div>
                        <div className="group cursor-pointer flex flex-col items-center" onClick={() => goToStore({ type: 'generic', value: 'Calzado FR' })}>
                            <div className="w-full h-[400px] overflow-hidden mb-6 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1595341596013-640a232fbaec?auto=format&fit=crop&q=80&w=800" alt="Botas Dieléctricas" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <button className="border border-black text-black text-sm uppercase font-bold tracking-widest px-8 py-3 w-full max-w-[280px] hover:bg-black hover:text-white transition-colors duration-300 rounded-none">
                                Calzado para mujer
                            </button>
                        </div>
                    </div>
                </div>

                {/* Productos Destacados (Grid estilo Ariat) */}
                <div className="py-16 bg-white border-t border-gray-100 relative">
                    <div className="max-w-[1600px] mx-auto px-4 relative z-10">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-bold text-black tracking-tight">Rebajas / Lo Más Vendido</h2>
                            <button onClick={() => goToStore(null)} className="text-xs font-bold uppercase tracking-widest text-black hover:text-gray-500 flex items-center transition-colors">
                                VER TODO <ChevronRight className="w-3 h-3 ml-2" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
                            {products.slice(0, 5).map((product, index) => (
                                <div
                                    key={`${product.id}-${index}`}
                                    className="flex flex-col group cursor-pointer"
                                    onClick={() => goToProduct(product.id)}
                                >
                                    <div className="h-[300px] w-full bg-[#f5f5f5] mb-4 relative overflow-hidden flex items-center justify-center p-6">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 bg-[#f5f5f5] p-5 relative">
                                        <div className="text-[10px] text-gray-500 font-bold mb-1 tracking-wider uppercase">{product.mainCategory || 'Hombre'}</div>
                                        <h3 className="font-semibold text-black text-[13px] leading-snug mb-3 group-hover:underline underline-offset-2 decoration-1 line-clamp-2">
                                            {product.title}
                                        </h3>
                                        <div className="mt-auto">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-400 line-through text-xs font-medium">$ {(Math.random() * 3000 + 4000).toFixed(2)} MXN</span>
                                                <span className="text-[#c84126] font-bold text-sm">$ {(Math.random() * 2000 + 1000).toFixed(2)} MXN</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Descubre upeFR (Estilo Descubre Ariat) */}
                <div className="max-w-[1600px] mx-auto px-4 py-16">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Descubre upeFR</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group cursor-pointer flex flex-col">
                            <div className="w-full h-[500px] overflow-hidden mb-6">
                                <img src="https://images.unsplash.com/photo-1610415394142-d6b052f52d9b?auto=format&fit=crop&q=80&w=1000" alt="Colección para él" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <h3 className="text-lg font-bold text-black mb-2">Equipamiento para él y ella</h3>
                            <p className="text-gray-600 text-sm mb-4">Comodidad, rendimiento y estilo. Hay tantas opciones que no podrás elegir solo una.</p>
                            <div className="flex gap-4">
                                <button onClick={() => goToStore({ type: 'mainCategory', value: 'Uniformes FR' })} className="text-[11px] font-bold text-black uppercase tracking-widest hover:text-[#c84126] transition flex items-center">
                                    HOMBRE <ChevronRight className="w-3 h-3 ml-1" />
                                </button>
                                <button onClick={() => goToStore({ type: 'mainCategory', value: 'Uniformes FR' })} className="text-[11px] font-bold text-black uppercase tracking-widest hover:text-[#c84126] transition flex items-center">
                                    MUJER <ChevronRight className="w-3 h-3 ml-1" />
                                </button>
                            </div>
                        </div>
                        <div className="group cursor-pointer flex flex-col">
                            <div className="w-full h-[500px] overflow-hidden mb-6">
                                <img src="https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=1000" alt="Botas Premium" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <h3 className="text-lg font-bold text-black mb-2">Botas Premium</h3>
                            <p className="text-gray-600 text-sm mb-4">Estilo clásico, pieles de alta calidad y un ajuste impecable desde el primer uso.</p>
                            <div className="flex gap-4">
                                <button onClick={() => goToStore({ type: 'mainCategory', value: 'Calzado' })} className="text-[11px] font-bold text-black uppercase tracking-widest hover:text-[#c84126] transition flex items-center">
                                    HOMBRE <ChevronRight className="w-3 h-3 ml-1" />
                                </button>
                                <button onClick={() => goToStore({ type: 'mainCategory', value: 'Calzado' })} className="text-[11px] font-bold text-black uppercase tracking-widest hover:text-[#c84126] transition flex items-center">
                                    MUJER <ChevronRight className="w-3 h-3 ml-1" />
                                </button>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                {items.map(product => (
                    <div
                        key={product.id}
                        className="flex flex-col group cursor-pointer"
                        onClick={() => goToProduct(product.id)}
                    >
                        <div className="h-[300px] w-full bg-[#f5f5f5] mb-4 relative overflow-hidden flex items-center justify-center p-6">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col flex-1 bg-[#f5f5f5] p-5 relative">
                            <div className="text-[10px] text-gray-500 font-bold mb-1 tracking-wider uppercase">{product.mainCategory || 'Categoría'}</div>
                            <h3 className="font-semibold text-black text-[13px] leading-snug mb-3 group-hover:underline underline-offset-2 decoration-1 line-clamp-2">
                                {product.title}
                            </h3>
                            <div className="mt-auto">
                                <span className="text-black font-bold text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                                    VER DETALLES
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );

        return (
            <div className="flex-1 bg-white pb-20 pt-[80px] md:pt-[100px]">
                {/* Banner de la Tienda */}
                <div className="bg-[#f5f5f5] text-black py-16 relative border-t border-b border-gray-200">
                    <div className="max-w-[1600px] mx-auto px-4 text-center md:text-left relative z-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight uppercase">{title}</h1>
                        <p className="text-gray-600 text-sm md:text-base max-w-2xl font-medium">{subtitle}</p>
                    </div>
                </div>

                <div className="max-w-[1600px] mx-auto px-4 py-16">

                    {/* Si hay un filtro activo (VISTA DE RESULTADOS) */}
                    {isFiltered && (
                        <>
                            <div className="mb-10 flex justify-between items-center bg-[#f5f5f5] p-4 border border-gray-200">
                                <span className="text-black font-bold text-xs uppercase tracking-widest">Mostrando {displayedProducts.length} resultados</span>
                                <button onClick={() => setStoreFilter(null)} className="flex items-center text-black border-b border-black font-bold text-[10px] uppercase tracking-widest hover:text-gray-500 hover:border-gray-500 transition">
                                    <FilterX className="w-3 h-3 mr-2" /> Quitar Filtros
                                </button>
                            </div>

                            {displayedProducts.length > 0 ? (
                                <div className="mb-20">
                                    <ProductGrid items={displayedProducts} />
                                </div>
                            ) : (
                                <div className="text-center py-24 bg-[#f5f5f5] border border-gray-200 mb-20">
                                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-black mb-2 tracking-tight">No se encontraron productos</h3>
                                    <p className="text-gray-500 mb-8 text-sm">Prueba ajustando tu búsqueda o eliminando los filtros actuales.</p>
                                    <button onClick={() => setStoreFilter(null)} className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition rounded-none">Explorar Catálogo</button>
                                </div>
                            )}

                            {/* SECCIÓN DE MUESTRAS EN VISTA FILTRADA */}
                            <div className="border-t border-gray-200 pt-16">
                                <div className="mb-10 text-center md:text-left">
                                    <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight uppercase mb-2">Prendas de Muestra Recomendadas</h2>
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
                                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b-2 border-black pb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-black uppercase tracking-widest mb-2">Uniformes FR</h2>
                                        <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">Ropa de trabajo diseñada para proteger contra riesgos térmicos y arco eléctrico.</p>
                                    </div>
                                    <button onClick={() => goToStore({ type: 'mainCategory', value: 'Uniformes FR' })} className="hidden md:flex text-black hover:text-gray-500 font-bold text-[10px] uppercase tracking-widest items-center transition mt-4 md:mt-0">
                                        VER TODO <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <ProductGrid items={products.filter(p => p.mainCategory === 'Uniformes FR').slice(0, 4)} />
                                <button onClick={() => goToStore({ type: 'mainCategory', value: 'Uniformes FR' })} className="w-full mt-8 md:hidden border border-black text-black font-bold uppercase tracking-widest text-xs py-4 flex justify-center items-center hover:bg-black hover:text-white transition-colors rounded-none">
                                    VER TODO <ChevronRight className="w-3 h-3 ml-2" />
                                </button>
                            </div>

                            {/* Sección Calzado */}
                            <div>
                                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b-2 border-black pb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-black uppercase tracking-widest mb-2">Calzado de Seguridad</h2>
                                        <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">Botas industriales dieléctricas y de protección para los terrenos más difíciles.</p>
                                    </div>
                                    <button onClick={() => goToStore({ type: 'mainCategory', value: 'Calzado' })} className="hidden md:flex text-black hover:text-gray-500 font-bold text-[10px] uppercase tracking-widest items-center transition mt-4 md:mt-0">
                                        VER TODO <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <ProductGrid items={products.filter(p => p.mainCategory === 'Calzado').slice(0, 4)} />
                                <button onClick={() => goToStore({ type: 'mainCategory', value: 'Calzado' })} className="w-full mt-8 md:hidden border border-black text-black font-bold uppercase tracking-widest text-xs py-4 flex justify-center items-center hover:bg-black hover:text-white transition-colors rounded-none">
                                    VER TODO <ChevronRight className="w-3 h-3 ml-2" />
                                </button>
                            </div>

                            {/* Sección EPP */}
                            <div>
                                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b-2 border-black pb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-black uppercase tracking-widest mb-2">Equipo de Protección Personal (EPP)</h2>
                                        <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">Protección integral de pies a cabeza. Cascos, guantes y lentes de seguridad.</p>
                                    </div>
                                    <button onClick={() => goToStore({ type: 'mainCategory', value: 'EPP' })} className="hidden md:flex text-black hover:text-gray-500 font-bold text-[10px] uppercase tracking-widest items-center transition mt-4 md:mt-0">
                                        VER TODO <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <ProductGrid items={products.filter(p => p.mainCategory === 'EPP').slice(0, 4)} />
                                <button onClick={() => goToStore({ type: 'mainCategory', value: 'EPP' })} className="w-full mt-8 md:hidden border border-black text-black font-bold uppercase tracking-widest text-xs py-4 flex justify-center items-center hover:bg-black hover:text-white transition-colors rounded-none">
                                    VER TODO <ChevronRight className="w-3 h-3 ml-2" />
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
                className="flex-1 bg-white pt-[90px]"
            >
                {/* Breadcrumb Premium */}
                <div className="bg-white border-b border-gray-100 shadow-sm relative z-10 w-full mb-8">
                    <div className="max-w-[1600px] mx-auto px-4 py-4 flex flex-wrap items-center text-[10px] md:text-xs text-black font-bold uppercase tracking-widest">
                        <button onClick={() => goToStore(null)} className="flex items-center hover:text-gray-500 transition-colors">
                            <ArrowLeft className="w-3 h-3 mr-2" /> VOLVER
                        </button>
                        <span className="mx-4 text-gray-300">/</span>
                        <button onClick={() => goToStore({ type: 'mainCategory', value: product.mainCategory })} className="hover:text-gray-500 transition-colors">{product.mainCategory || product.category}</button>
                        <span className="mx-4 text-gray-300">/</span>
                        <button onClick={() => goToStore({ type: 'brand', value: product.brand })} className="text-gray-500 transition-colors hover:text-black">{product.brand}</button>
                    </div>
                </div>

                <div className="max-w-[1600px] mx-auto px-4 pb-16">
                    <div className="bg-white overflow-hidden">
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Imagen del Producto */}
                            <div className="lg:w-1/2 flex flex-col relative bg-[#f5f5f5] p-8 md:p-16">
                                <div className="h-[400px] md:h-[600px] flex items-center justify-center relative cursor-zoom-in">
                                    <motion.img
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        src={product.image}
                                        alt={product.title}
                                        className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-105"
                                    />
                                    {/* Etiqueta de Certificación */}
                                    <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 flex items-center">
                                        <ShieldCheck className="w-3 h-3 mr-2" /> CERTIFICADO
                                    </div>
                                </div>
                                {/* Miniaturas */}
                                <div className="flex space-x-4 mt-8 justify-center">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className={`w-20 h-20 border flex items-center justify-center p-2 bg-white cursor-pointer transition-all duration-300 ${item === 1 ? 'border-black' : 'border-transparent hover:border-gray-300'}`}>
                                            <img src={product.image} alt="thumb" className="max-h-full object-contain mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Detalles del Producto */}
                            <div className="lg:w-1/2 flex flex-col pt-8 md:pt-16">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-gray-500 font-bold text-xs mb-3 tracking-[0.2em] uppercase"
                                >
                                    {product.brand}
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-4xl font-extrabold text-black mb-6 leading-[1.1] tracking-tight"
                                >
                                    {product.title}
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col gap-2 mb-8 text-sm text-gray-800"
                                >
                                    <div><span className="font-bold mr-2 uppercase tracking-wider text-xs">SKU/POS:</span> {product.sku}</div>
                                    <div><span className="font-bold mr-2 uppercase tracking-wider text-xs">Estilo N°:</span> {product.style}</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-600 mb-10 w-full md:w-5/6"
                                >
                                    <h3 className="font-bold text-black uppercase tracking-widest text-xs mb-4 border-b border-gray-200 pb-2">
                                        Descripción del Equipo
                                    </h3>
                                    <p className="leading-relaxed text-sm">{product.description}</p>
                                </motion.div>

                                {/* Contacto WhatsApp en ProductView */}
                                <div className="mt-4 mb-10">
                                    <button onClick={() => handleWhatsAppClick(product)} className="w-full md:w-3/4 flex items-center justify-center space-x-2 bg-black text-white border border-black hover:bg-white hover:text-black px-8 py-4 font-bold text-sm uppercase tracking-widest transition-colors duration-300 rounded-none">
                                        Solicitar Cotización
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN INFERIOR: Contacto a ancho completo */}
                        <div className="bg-gray-50 border-t border-gray-200 p-8 lg:p-16 mt-16">
                            <div className="max-w-4xl mx-auto">
                                <div className="text-center mb-10">
                                    <h3 className="text-2xl font-bold text-black tracking-tight mb-2 uppercase">Información para Empresas</h3>
                                    <p className="text-gray-500 text-sm">Déjanos tus datos y un asesor se comunicará contigo.</p>
                                </div>
                                <div className="bg-white p-8 md:p-12 border border-black relative">
                                    <ContactForm inProductView={true} hideHeader={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="bg-white py-16 border-t border-gray-200">
                        <div className="max-w-[1600px] mx-auto px-4">
                            <h2 className="text-xl font-bold text-black mb-8 tracking-tight uppercase">Completar el look / Relacionados</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map(relProduct => (
                                    <div key={relProduct.id} className="flex flex-col group cursor-pointer" onClick={() => goToProduct(relProduct.id)}>
                                        <div className="h-72 w-full relative bg-[#f5f5f5] mb-4 flex items-center justify-center overflow-hidden">
                                            <img src={relProduct.image} alt={relProduct.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 p-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">{relProduct.brand}</div>
                                            <h3 className="font-semibold text-black text-xs line-clamp-2 group-hover:underline underline-offset-2">
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
            className="flex-1 bg-white pt-[90px]"
        >
            {/* Hero Banner */}
            <div className="relative bg-black text-white py-32 overflow-hidden border-b border-gray-200">
                <div className="absolute inset-0 bg-black/60 mix-blend-multiply z-10"></div>
                <img src="./conoce_upe.jpg" alt="About Hero" className="absolute inset-0 w-full h-full object-cover z-0" />
                <div className="relative z-20 max-w-[1600px] mx-auto px-4 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-block bg-white text-black font-bold px-4 py-1.5 text-[10px] mb-8 uppercase tracking-[0.2em] shadow-sm"
                    >
                        Nuestra Esencia
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight uppercase"
                    >
                        Conoce upeFR
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        Más de una década protegiendo a los trabajadores más exigentes de la industria con equipo FR certificado y de clase mundial.
                    </motion.p>
                </div>
            </div>

            {/* Historia y Experiencia */}
            <div className="max-w-[1600px] mx-auto px-4 py-24 flex flex-col md:flex-row items-center gap-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="md:w-1/2"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-8 leading-[1.1] tracking-tight uppercase">Expertos en seguridad industrial y protección Ignífuga.</h2>
                    <div className="w-16 h-1 bg-black mb-10"></div>
                    <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                        En <strong className="text-black font-bold">upeFR</strong> comprendemos que en entornos de alto riesgo, la calidad del equipo de protección no es negociable. Nos hemos consolidado como líderes en la distribución de ropa FR (Flame Resistant) y Equipos de Protección Personal (EPP) en México.
                    </p>
                    <p className="text-gray-600 mb-12 text-sm md:text-base leading-relaxed">
                        Trabajamos exclusivamente con las marcas globales más respetadas y garantizamos que cada prenda cumpla con rigurosas certificaciones internacionales como <span className="font-semibold text-black">NFPA 2112, NFPA 70E y ASTM</span>. Nuestro compromiso es que cada trabajador regrese a casa seguro.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="bg-[#f5f5f5] border border-gray-200 p-8 flex-1 text-center hover:-translate-y-1 transition-transform duration-300">
                            <span className="block text-4xl font-black text-black mb-3">+10</span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Años de<br />Experiencia</span>
                        </div>
                        <div className="bg-black border border-black p-8 flex-1 text-center hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                            <span className="block text-4xl font-black text-white mb-3 relative z-10">100%</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest relative z-10">Protección<br />Certificada</span>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="md:w-1/2 w-full relative"
                >
                    <div className="relative overflow-hidden h-[600px] border border-gray-200">
                        <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000" alt="Industria Segura" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-10">
                            <div className="border-l-4 border-white pl-6">
                                <p className="text-white font-bold text-2xl uppercase tracking-widest leading-tight">Seguridad sin<br />compromisos.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Misión y Visión */}
            <div className="bg-[#f5f5f5] py-24 border-y border-gray-200">
                <div className="max-w-[1600px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card Misión */}
                        <div className="bg-white p-12 border border-gray-200 relative group hover:-translate-y-1 transition-transform duration-300">
                            <Target className="w-10 h-10 text-black mb-8" />
                            <h3 className="text-2xl font-bold text-black mb-6 uppercase tracking-widest">Nuestra Misión</h3>
                            <div className="w-12 h-px bg-gray-300 mb-6"></div>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Proveer las soluciones más avanzadas e innovadoras en ropa de protección AR/FR y EPP, garantizando la máxima seguridad, comodidad y cumplimiento normativo para los trabajadores en las industrias más demandantes.
                            </p>
                        </div>
                        {/* Card Visión */}
                        <div className="bg-black p-12 border border-black relative group hover:-translate-y-1 transition-transform duration-300">
                            <Eye className="w-10 h-10 text-white mb-8" />
                            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">Nuestra Visión</h3>
                            <div className="w-12 h-px bg-gray-600 mb-6"></div>
                            <p className="text-gray-300 leading-relaxed text-sm relative z-10">
                                Ser el principal socio estratégico a nivel nacional en la gestión integral de programas de uniformes industriales, reconocidos por nuestra excelencia operativa, marcas de clase mundial y compromiso absoluto con la vida humana.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Beneficios Clave */}
            <div className="py-24 bg-white">
                <div className="max-w-[1600px] mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-4xl font-extrabold text-black mb-6 tracking-tight uppercase"
                        >
                            Beneficios Clave Para Tu Empresa
                        </motion.h2>
                        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
                        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">Con upeFR, no solo adquieres uniformes, obtienes un servicio integral pensado en la eficiencia y seguridad de tu operación.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Award className="w-6 h-6" />, title: "Calidad Premium", desc: "Las mejores marcas con tecnología textil de punta y resistencia garantizada." },
                            { icon: <Users className="w-6 h-6" />, title: "Atención Especializada", desc: "Asesoría experta para elegir el nivel de protección exacto que tu equipo necesita." },
                            { icon: <Truck className="w-6 h-6" />, title: "Logística Optimizada", desc: "Envíos y distribución eficiente para que nunca te falte equipo de protección." },
                            { icon: <Globe className="w-6 h-6" />, title: "Alcance Nacional", desc: "Cobertura en todo el país, adaptándonos a las normas locales e internacionales." }
                        ].map((benefit, i) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="text-center p-10 bg-[#f5f5f5] transition-colors border border-gray-200 hover:border-black group"
                            >
                                <div className="w-16 h-16 mx-auto bg-white text-black border border-gray-200 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                    {benefit.icon}
                                </div>
                                <h4 className="text-sm font-bold text-black uppercase tracking-widest mb-3">{benefit.title}</h4>
                                <p className="text-gray-500 leading-relaxed text-xs">{benefit.desc}</p>
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
            className="flex-1 bg-white pt-[90px]"
        >
            {/* Banner Contacto Mejorado */}
            <div className="relative bg-black py-24 px-4 overflow-hidden border-b border-gray-200">
                <div className="relative z-10 max-w-[1600px] mx-auto text-center">
                    <div className="inline-block bg-white text-black font-bold px-4 py-1.5 text-[10px] mb-6 uppercase tracking-widest">Atención Personalizada</div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight uppercase">
                        ¿Buscas Una Solución Innovadora<br className="hidden md:block" /> Para Ropa AR / FR / EPP?
                    </h1>
                    <p className="text-sm md:text-base text-gray-300 mb-8 max-w-3xl mx-auto font-medium">
                        Te ayudamos a crear un programa de uniformes efectivo y a la medida de tu operación.
                    </p>
                    <div className="w-16 h-1 bg-white mx-auto mb-16"></div>

                    {/* Tarjetas de Información */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-8">

                        {/* Oficina Corporativa */}
                        <div className="bg-[#111] border border-gray-800 p-10 hover:border-gray-500 transition-all flex flex-col justify-center items-center group">
                            <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-sm font-bold mb-4 text-white uppercase tracking-widest">Oficina Corporativa</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Av. Libertad 1723, Maestros, 22840</p>
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">Ensenada, B.C., Mexico</p>
                            <a href="mailto:info@uniformesprofesionales.mx" className="text-gray-300 font-medium block hover:text-white transition mt-auto mb-4 truncate w-full text-xs">info@uniformesprofesionales.mx</a>
                            <p className="text-white font-bold text-lg tracking-wide">+52 646 596 1975</p>
                        </div>

                        {/* José C. Ruiz */}
                        <div className="bg-[#111] border border-gray-800 p-10 hover:border-gray-500 transition-all flex flex-col justify-center items-center group">
                            <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-sm font-bold mb-2 text-white uppercase tracking-widest">José C. Ruiz</h3>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6">Desarrollo de Negocios</p>
                            <a href="mailto:josec@uniformesprofesionales.mx" className="text-gray-300 font-medium block hover:text-white transition mt-auto mb-4 truncate w-full text-xs">josec@uniformesprofesionales.mx</a>
                            <p className="text-white font-bold text-base tracking-wide mb-1">+52 646 295 2269</p>
                            <p className="text-white font-bold text-base tracking-wide">+52 646 454 8538</p>
                        </div>

                        {/* Whatsapp */}
                        <div className="bg-white border border-gray-200 p-10 hover:border-black transition-all flex flex-col justify-center items-center group">
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

            {/* Formulario de Contacto */}
            <div className="py-24 bg-[#f5f5f5] relative border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <div className="bg-white p-10 md:p-14 border border-gray-200">
                        <h2 className="text-2xl font-extrabold text-center text-black mb-4 uppercase tracking-widest">Envíanos un mensaje directo</h2>
                        <div className="w-12 h-px bg-black mx-auto mb-6"></div>
                        <p className="text-center text-gray-500 mb-10 text-sm">Completa el formulario y un asesor experto se pondrá en contacto contigo a la brevedad.</p>
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
            <div className="relative bg-black text-white py-32 overflow-hidden border-b border-gray-200">
                <div className="absolute inset-0 bg-black/60 mix-blend-multiply z-10"></div>
                <img src="./banner_upefr360.jpg" alt="Ingeniero con equipo de seguridad" className="absolute inset-0 w-full h-full object-cover z-0 scale-105 grayscale" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-10"></div>
                <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center justify-center space-x-2 bg-white text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm"
                    >
                        <ShieldCheck className="w-4 h-4 text-black mr-1" />
                        <span>Respuesta Integral B2B</span>
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight drop-shadow-md uppercase"
                    >
                        upe<span className="text-gray-400">FR</span> 360°
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-12"
                    >
                        Uniendo control estratégico para la gestión integral de uniformes y EPP. Evoluciona la forma en que equipas a tu personal.
                    </motion.p>
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => window.scrollTo({ top: document.getElementById('demo-form').offsetTop, behavior: 'smooth' })}
                        className="bg-white text-black px-12 py-5 font-bold text-sm uppercase tracking-widest transition-all shadow-md hover:bg-gray-200 transform border border-transparent hover:border-black flex items-center mx-auto"
                    >
                        Solicitar Demostración <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.button>
                </div>
            </div>

            {/* Intro - ¿Por qué elegir upeFR360? */}
            <div className="py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-extrabold text-black mb-8 tracking-tight uppercase"
                    >
                        ¿Por qué elegir upeFR360?
                    </motion.h2>
                    <div className="w-24 h-1 bg-black mx-auto mb-10"></div>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-600 max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed mb-20 font-light"
                    >
                        Diseñamos <strong className="font-bold text-black">upeFR 360°</strong> como una plataforma iterativa e innovadora que le permita administrar, monitorear y eficientar sus compras de EPP en tiempo real y a la medida de su operación.
                    </motion.p>

                    <h3 className="text-3xl font-bold text-black mb-12 text-left pl-4 border-l-4 border-black uppercase tracking-widest text-lg">Beneficios Clave</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                        {[
                            { icon: <BarChart3 className="w-6 h-6" />, title: "Garantice su control", desc: "El presupuesto se mantiene al margen" },
                            { icon: <Users className="w-6 h-6" />, title: "Asignación jerárquica", desc: "Por área, línea y perfil de operador" },
                            { icon: <Truck className="w-6 h-6" />, title: "Agilización total", desc: "Procesos de compra y entrega acelerados" },
                            { icon: <CheckCircle2 className="w-6 h-6" />, title: "Flujos automatizados", desc: "Validación y autorizaciones de compra inmediata" }
                        ].map((item, i) => (
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="bg-white p-8 border border-gray-200 hover:border-black transition-all duration-300 group hover:-translate-y-1 relative"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 -z-10 group-hover:bg-gray-100 transition-colors"></div>
                                <div className="w-16 h-16 bg-white border border-gray-200 text-black flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">{item.icon}</div>
                                <h4 className="font-bold text-black uppercase tracking-widest text-sm mb-3">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Los 4 Pilares (Zig-Zag Layout) */}
            <div className="bg-[#f5f5f5] py-32 border-y border-gray-200 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 space-y-32 relative z-10">

                    {/* Pilar 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full order-2 md:order-1 relative"
                        >
                            <img src="./img_pc.jpg" alt="Tienda en línea B2B" className="relative w-full h-[450px] object-cover border border-gray-200 group-hover:scale-[1.02] transition-transform duration-500 grayscale" />
                        </motion.div>
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full order-1 md:order-2"
                        >
                            <div className="inline-flex items-center text-[10px] font-bold text-black border border-black bg-white px-4 py-1.5 tracking-widest uppercase mb-4">Paso 1</div>
                            <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-6 leading-tight tracking-tight uppercase">Tienda B2B exclusiva y personalizada</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
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
                            <div className="inline-flex items-center text-[10px] font-bold text-black border border-black bg-white px-4 py-1.5 tracking-widest uppercase mb-4">Paso 2</div>
                            <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-6 leading-tight tracking-tight uppercase">Resumen y asignación de tallas</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Carga individual de medidas por cada empleado, lo que asegura una asignación de tallas correcta desde el primer pedido, reduciendo drásticamente las devoluciones, costos y tiempos de gestión.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full relative"
                        >
                            <img src="./img_asigtallas.jpg" alt="Gestión de tallas" className="relative w-full h-[450px] object-cover border border-gray-200 group-hover:scale-[1.02] transition-transform duration-500 grayscale" />
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
                            <img src="./img_logistica.jpg" alt="Logística optimizada" className="relative w-full h-[450px] object-cover border border-gray-200 group-hover:scale-[1.02] transition-transform duration-500 grayscale" />
                        </motion.div>
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full order-1 md:order-2"
                        >
                            <div className="inline-flex items-center text-[10px] font-bold text-black border border-black bg-white px-4 py-1.5 tracking-widest uppercase mb-4">Paso 3</div>
                            <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-6 leading-tight tracking-tight uppercase">Logística optimizada</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
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
                            <div className="inline-flex items-center text-[10px] font-bold text-black border border-black bg-white px-4 py-1.5 tracking-widest uppercase mb-4">Paso 4</div>
                            <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-6 leading-tight tracking-tight uppercase">Control automatizado y seguimiento</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Visualice de inmediato sus gastos e inventarios. Monitoreo del estatus de compras y autorizaciones jerárquicas online para total transparencia del presupuesto ejercido.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 w-full relative"
                        >
                            <img src="./img_Softlog.jpg" alt="Reportes y control" className="relative w-full h-[450px] object-cover border border-gray-200 group-hover:scale-[1.02] transition-transform duration-500 grayscale" />
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Differentiators (Producción & Soporte) - Copia exacta del Folleto */}
            <div className="bg-black py-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('./img_work.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay grayscale"></div>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-xl p-12 lg:p-16 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-colors duration-500 rounded-xl"
                    >
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700"><Factory className="w-80 h-80" /></div>
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 flex items-center relative z-10 text-white tracking-tight leading-tight uppercase">
                            Producción 100% Interna y control total.
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 relative z-10 font-medium">
                            Nos encargamos de todo el proceso productivo garantizando la continuidad de su requerimiento:
                        </p>
                        <div className="bg-white/5 p-6 mb-8 border border-white/5">
                            <ul className="space-y-4 relative z-10 font-bold text-sm uppercase tracking-widest">
                                <li className="flex items-center text-white"><span className="w-6 h-6 bg-white/10 flex items-center justify-center mr-4">1</span> Diseño y Especificación</li>
                                <li className="flex items-center text-white"><span className="w-6 h-6 bg-white/10 flex items-center justify-center mr-4">2</span> Materiales y Corte</li>
                                <li className="flex items-center text-white"><span className="w-6 h-6 bg-white/10 flex items-center justify-center mr-4">3</span> Confección Especializada</li>
                                <li className="flex items-center text-white"><span className="w-6 h-6 bg-white/10 flex items-center justify-center mr-4">4</span> Logística de Entrega</li>
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-white/20">
                            <p className="text-gray-400 text-sm mb-6 relative z-10 font-bold tracking-widest uppercase">
                                Sus Ventajas Directas:
                            </p>
                            <ul className="space-y-3 relative z-10 font-medium text-sm text-gray-300">
                                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-white mr-3" /> Costo eficiente sin intermediarios</li>
                                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-white mr-3" /> Mayor aseguramiento de calidad</li>
                                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-white mr-3" /> Rapidez estructural en tiempos de respuesta</li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#111] p-12 lg:p-16 border border-gray-800 relative overflow-hidden flex flex-col justify-center group rounded-xl"
                    >
                        <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700"><Headset className="w-80 h-80" /></div>
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 relative z-10 text-white tracking-tight leading-tight uppercase">
                            Soporte Interactivo<br />y Personalizado
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-12 relative z-10 font-medium">
                            En upeFR su éxito es nuestro compromiso continuado. Creemos en el seguimiento personalizado:
                        </p>
                        <div className="grid grid-cols-1 gap-6 relative z-10">
                            <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 flex flex-col items-start gap-4 hover:bg-white/10 transition-colors rounded-xl">
                                <div className="p-4 bg-white/10"><Users className="w-8 h-8 text-white" /></div>
                                <div>
                                    <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-2">Acompañamiento Constante</h4>
                                    <p className="text-gray-400 text-sm">Asignación de un Ejecutivo de Cuenta dedicado que conoce a fondo las directrices de su empresa.</p>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 flex flex-col items-start gap-4 hover:bg-white/10 transition-colors rounded-xl">
                                <div className="p-4 bg-white/10"><MessageCircle className="w-8 h-8 text-white" /></div>
                                <div>
                                    <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-2">Comodidad y Respuesta Rápida</h4>
                                    <p className="text-gray-400 text-sm">Canal directo de atención vía WhatsApp para dudas logísticas o administrativas en tiempo real.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* CTA Final y Formulario */}
            <div id="demo-form" className="py-24 bg-white relative border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-[#f5f5f5] p-10 md:p-14 border border-gray-200">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-4 uppercase tracking-widest">Impulsa la seguridad de tu empresa hoy mismo</h2>
                            <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
                            <p className="text-gray-500 text-sm md:text-base">Déjanos tus datos y un especialista te mostrará cómo <strong>upeFR 360°</strong> puede transformar la gestión de uniformes en tu organización.</p>
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
                className="flex-[1] flex items-center justify-center bg-[#f5f5f5] p-4 relative overflow-hidden pt-24 pb-12"
            >
                <div className="absolute inset-0 bg-black/60 mix-blend-multiply z-0"></div>
                <img src="./hero_upefr1.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 grayscale" />

                <div className="bg-white p-10 rounded-none border border-black max-w-md w-full relative z-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 -z-10"></div>
                    
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-black flex items-center justify-center text-white border border-black"><Lock className="w-8 h-8" /></div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-black mb-2 uppercase tracking-widest">Acceso Restringido</h2>
                        <p className="text-gray-500 text-center text-[10px] uppercase font-bold tracking-widest mt-2">Panel Administrativo</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2" htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                className={`w-full px-4 py-3 border rounded-none text-sm focus:outline-none focus:ring-1 focus:border-black hover:border-black transition-colors ${error ? 'border-red-500 focus:ring-red-500 text-red-500' : 'border-gray-300 focus:ring-black text-black'}`}
                                placeholder="••••••••"
                                required
                            />
                            {error && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white border border-black hover:bg-white hover:text-black font-bold py-4 px-4 uppercase tracking-widest transition-colors flex items-center justify-center text-xs rounded-none"
                        >
                            Acceder al Panel
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-gray-100">
                        <button onClick={goHome} className="text-[10px] text-gray-500 hover:text-black uppercase tracking-widest transition-colors border-b border-transparent hover:border-black pb-1">
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
            setNotification('PRODUCTO AGREGADO AL CATÁLOGO');
            setFormData({ title: '', sku: '', style: '', mainCategory: 'Uniformes FR', brand: CATALOG_MENU['Uniformes FR'][0], description: '', image: '' });
            setTimeout(() => setNotification(''), 3000);
        };

        const handleDelete = (id) => {
            if (window.confirm('¿ELIMINAR ESTE PRODUCTO?')) setProducts(products.filter(p => p.id !== id));
        };

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 bg-[#f5f5f5] p-4 md:p-8 pt-24"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-gray-200 pb-4">
                        <motion.h1
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-2xl font-bold text-black flex items-center tracking-widest uppercase"
                        >
                            <User className="w-8 h-8 mr-4 text-black" /> Panel de Administración
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
                            <div className="bg-white rounded-none p-8 border border-gray-200 relative overflow-hidden">
                                <h2 className="text-lg font-bold text-black mb-6 flex items-center uppercase tracking-widest">
                                    <Plus className="w-5 h-5 mr-3 text-black" /> Nuevo Producto
                                </h2>

                                <AnimatePresence>
                                    {notification && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="bg-black border border-black text-white p-4 rounded-none mb-6 text-xs uppercase tracking-widest font-bold flex items-center"
                                        >
                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                            {notification}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleAddProduct} className="space-y-5">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Título del Producto *</label>
                                        <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm text-black" placeholder="Ej. Pantalón Ignífugo..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">SKU / POS *</label>
                                            <input type="text" name="sku" required value={formData.sku} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm font-mono text-black" placeholder="100XXX" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Núm. Estilo *</label>
                                            <input type="text" name="style" required value={formData.style} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm font-mono text-black" placeholder="M5-FR" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Categoría *</label>
                                            <select name="mainCategory" value={formData.mainCategory} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm text-black appearance-none">
                                                {Object.keys(CATALOG_MENU).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Marca *</label>
                                            <select name="brand" value={formData.brand} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm text-black appearance-none">
                                                {CATALOG_MENU[formData.mainCategory].map(b => <option key={b} value={b}>{b}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">URL de la Imagen</label>
                                        <input type="url" name="image" value={formData.image} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm text-black" placeholder="https://..." />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Descripción</label>
                                        <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-sm text-black" placeholder="Características detalladas..."></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-black hover:bg-white text-white hover:text-black border border-black py-4 rounded-none font-bold uppercase tracking-widest text-xs transition-colors mt-4">
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
                            <div className="bg-white rounded-none border border-gray-200 overflow-hidden h-full flex flex-col">
                                <div className="p-6 md:p-8 bg-white border-b border-gray-200 flex justify-between items-center">
                                    <h2 className="text-lg font-bold text-black uppercase tracking-widest">Catálogo Actual</h2>
                                    <div className="bg-[#f5f5f5] text-black px-4 py-1.5 rounded-none text-xs font-bold border border-gray-200 tracking-widest">
                                        {products.length} PRODUCTOS
                                    </div>
                                </div>
                                <div className="overflow-x-auto flex-1 p-0 md:p-4">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#f5f5f5] border-b border-gray-200">
                                                <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Producto</th>
                                                <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden sm:table-cell">SKU / Estilo</th>
                                                <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden md:table-cell">Categoría</th>
                                                <th className="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <AnimatePresence>
                                                {products.map((product) => (
                                                    <motion.tr
                                                        key={product.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        layout
                                                        className="hover:bg-[#f5f5f5] transition-colors group"
                                                    >
                                                        <td className="p-4">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="w-14 h-14 bg-[#f5f5f5] flex items-center justify-center border border-gray-200 flex-shrink-0">
                                                                    <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                                                </div>
                                                                <div>
                                                                    <span className="text-sm font-bold text-black line-clamp-2 max-w-[250px] uppercase">{product.title}</span>
                                                                    <div className="sm:hidden text-[10px] font-mono font-bold text-gray-500 mt-1">{product.sku}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 hidden sm:table-cell">
                                                            <div className="text-xs font-mono font-bold text-black border border-gray-300 bg-white inline-block px-2 py-1">{product.sku}</div>
                                                            <div className="text-[10px] text-gray-500 mt-1.5 font-bold uppercase">{product.style}</div>
                                                        </td>
                                                        <td className="p-4 hidden md:table-cell">
                                                            <span className="bg-white border border-gray-300 text-black text-[10px] px-3 py-1.5 font-bold uppercase tracking-widest">{product.mainCategory || product.category}</span>
                                                            <div className="text-[10px] mt-2 text-gray-400 font-bold uppercase tracking-widest">{product.brand}</div>
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            <button
                                                                onClick={() => handleDelete(product.id)}
                                                                className="text-gray-400 hover:text-black bg-white hover:bg-gray-100 border border-gray-200 hover:border-black p-2.5 transition-colors"
                                                                title="Eliminar"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
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
                            className="bg-white rounded-none shadow-2xl max-w-3xl w-full relative overflow-hidden border border-gray-200"
                        >
                            {/* Decorative background subtle glows */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gray-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-black hover:bg-gray-100 rounded-none p-1.5 md:p-2 transition-colors focus:outline-none z-10 bg-white/50 backdrop-blur-sm"
                            >
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>

                            <div className="text-center p-6 pt-10 pb-2 md:p-8 md:pt-10 md:pb-4 relative z-10">
                                <h2 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-widest mb-1 md:mb-2">BIENVENIDO A <span className="text-gray-500">upe</span>FR</h2>
                                <p className="text-gray-500 text-sm md:text-lg">Por favor, selecciona el portal que deseas visitar hoy.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-6 pt-2 md:p-8 md:pt-4 relative z-10 max-h-[60vh] overflow-y-auto">
                                {/* Portal UPE FR */}
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setShowModal(false); }} // Cierra y se queda en la página actual
                                    className="group block border border-gray-200 rounded-none p-4 md:p-6 text-center hover:border-black hover:-translate-y-1 transition-all duration-300 bg-gray-50 hover:bg-white relative overflow-hidden"
                                >
                                    <div className="h-24 md:h-40 flex items-center justify-center mb-3 md:mb-4 bg-white rounded-none p-3 md:p-4 shadow-sm border border-gray-100 relative z-10">
                                        <img src={`${import.meta.env.BASE_URL}logo-oscuro.png`} alt="Logotipo upeFR" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-black transition-colors relative z-10">upeFR</h3>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2 font-medium relative z-10">Ropa Ignífuga y EPP de Alta Gama</p>
                                </a>

                                {/* Portal UPE Uniformes */}
                                <a
                                    href="https://flowmx.github.io/upeuniformes/" // URL corregida
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setShowModal(false)}
                                    className="group block border border-gray-200 rounded-none p-4 md:p-6 text-center hover:border-black hover:-translate-y-1 transition-all duration-300 bg-gray-50 hover:bg-white relative overflow-hidden"
                                >
                                    <div className="h-24 md:h-40 flex flex-col items-center justify-center mb-3 md:mb-4 bg-white rounded-none p-3 md:p-4 shadow-sm border border-gray-100 relative z-10">
                                        <img src={`${import.meta.env.BASE_URL}logo-uniformes.png`} alt="Logotipo upe Uniformes Profesionales" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-black transition-colors relative z-10">upe Uniformes</h3>
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