import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Scissors, Printer, Shirt, Package, ShieldCheck, BarChart3, GitBranch, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIAS, MARCAS_DESTACADAS_POR_CATEGORIA } from '../data/categorias';
import { COMPANY_INFO } from '../data/constants';

// FR-specific categories for the home grid
const CATEGORIAS_FR_HOME = [
    {
        id: 'industrial',
        nombre: 'Ropa FR',
        imagen: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'calzado',
        nombre: 'Calzado de Seguridad',
        imagen: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'epp',
        nombre: 'EPP Especializado',
        imagen: 'https://images.unsplash.com/photo-1631556097045-917e5b8d1e24?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'accesorios',
        nombre: 'Accesorios FR',
        imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    },
];

const HomeView = ({ products, navigate }) => {
    const [currentHeroImg, setCurrentHeroImg] = useState(0);
    const [activeBrandTab, setActiveBrandTab] = useState('industrial');

    const heroImages = [
        `${import.meta.env.BASE_URL}hero-slider-1.jpg`,
        `${import.meta.env.BASE_URL}hero-slider-2.jpg`,
        `${import.meta.env.BASE_URL}hero-slider-3.jpg`,
    ];

    useEffect(() => {
        const t = setInterval(() => setCurrentHeroImg(p => (p + 1) % heroImages.length), 5000);
        return () => clearInterval(t);
    }, []);

    const allBrands = [
        { name: "3M", img: `${import.meta.env.BASE_URL}3 M.svg` },
        { name: "5.11", img: `${import.meta.env.BASE_URL}5.11.svg` },
        { name: "Ansell", img: `${import.meta.env.BASE_URL}ansell.svg` },
        { name: "Ariat Work FR", img: `${import.meta.env.BASE_URL}ariat work fr.svg` },
        { name: "Benchmark", img: `${import.meta.env.BASE_URL}benchmark.svg` },
        { name: "Best Welds", img: `${import.meta.env.BASE_URL}bestwelds.svg` },
        { name: "Bullard", img: `${import.meta.env.BASE_URL}bullard.svg` },
        { name: "Bulwark", img: `${import.meta.env.BASE_URL}bulwark.svg` },
        { name: "CAT", img: `${import.meta.env.BASE_URL}cat.svg` },
        { name: "Dickies", img: `${import.meta.env.BASE_URL}dikies.svg` },
        { name: "DuPont", img: `${import.meta.env.BASE_URL}dunpont.svg` },
        { name: "Honeywell", img: `${import.meta.env.BASE_URL}honeywell.svg` },
        { name: "Keen", img: `${import.meta.env.BASE_URL}keen.svg` },
        { name: "Kishigo", img: `${import.meta.env.BASE_URL}kishigo.svg` },
        { name: "Lakeland", img: `${import.meta.env.BASE_URL}lakeland.svg` },
        { name: "MSA", img: `${import.meta.env.BASE_URL}MSA.svg` },
        { name: "Portwest", img: `${import.meta.env.BASE_URL}portwest.svg` },
        { name: "Red Kap", img: `${import.meta.env.BASE_URL}redkap.svg` },
        { name: "Terra", img: `${import.meta.env.BASE_URL}terra.svg` },
        { name: "Timberland PRO", img: `${import.meta.env.BASE_URL}timberland pro.svg` },
        { name: "Wolverine", img: `${import.meta.env.BASE_URL}wolverine.svg` },
        { name: "Workrite", img: `${import.meta.env.BASE_URL}workrite.svg` },
    ];
    const doubleBrands = [...allBrands, ...allBrands];

    const popularProducts = products.filter(p => p.popular).slice(0, 6);

    const services = [
        { icon: <Shirt className="w-7 h-7" />, title: 'Bordado', desc: 'Logos y textos bordados de alta definición. Hilo de primera calidad.' },
        { icon: <Printer className="w-7 h-7" />, title: 'DTF (Impresión Directa)', desc: 'Transferencia full color sin límite de colores. Acabado suave y duradero.' },
        { icon: <Scissors className="w-7 h-7" />, title: 'Serigrafía', desc: 'Impresión tradicional de alta resolución para volúmenes grandes.' },
        { icon: <Package className="w-7 h-7" />, title: 'Empaque Personalizado', desc: 'Etiquetado, doblado y presentación final según tus especificaciones.' },
    ];

    const brandTabs = [
        { id: 'industrial', label: 'Industrial FR' },
        { id: 'corporativo', label: 'Corporativo' },
        { id: 'calzado', label: 'Calzado' },
        { id: 'epp', label: 'EPP' },
    ];

    const upe360Features = [
        { icon: <BarChart3 className="w-5 h-5" />, title: 'Control de Pedidos', desc: 'Seguimiento en tiempo real de cada orden.' },
        { icon: <GitBranch className="w-5 h-5" />, title: 'Trazabilidad Total', desc: 'Historial completo de cada prenda y cliente.' },
        { icon: <CheckCircle className="w-5 h-5" />, title: 'Cumplimiento', desc: 'Garantía de entrega en tiempo y forma.' },
        { icon: <ShieldCheck className="w-5 h-5" />, title: 'Organización', desc: 'Gestión estructurada de tu programa de uniformes.' },
    ];

    return (
        <div className="flex-1 overflow-x-hidden bg-white">
            <style>{`
                @keyframes scroll-x { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .brands-scroll { animation: scroll-x 50s linear infinite; }
                .brands-scroll:hover { animation-play-state: paused; }
            `}</style>

            {/* HERO */}
            <div className="relative h-screen min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentHeroImg}
                        src={heroImages[currentHeroImg]}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Hero"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent z-10" />
                <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
                        <span className="inline-block text-[#0057B8] font-bold text-xs uppercase tracking-[0.25em] mb-4 border-b border-[#0057B8] pb-1">
                            Uniformes Resistentes a Flama · NFPA 2112 · NFPA 70E
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-5">
                            Protección que<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">no falla nunca.</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
                            Uniformes FR certificados, calzado de seguridad y EPP especializado para industria energética y trabajos de alto riesgo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                onClick={() => navigate('store')}
                                className="bg-white text-black px-8 py-4 font-bold text-sm uppercase tracking-wider rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                            >
                                Ver Catálogo <ArrowRight className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                onClick={() => navigate('quote')}
                                className="bg-[#0057B8] text-white px-8 py-4 font-bold text-sm uppercase tracking-wider rounded-md flex items-center justify-center gap-2 hover:bg-[#004A9E] transition-colors"
                            >
                                Cotiza tu Proyecto
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {heroImages.map((_, i) => (
                        <button key={i} onClick={() => setCurrentHeroImg(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === currentHeroImg ? 'bg-white w-10' : 'bg-white/40 w-6 hover:bg-white/70'}`} />
                    ))}
                </div>
            </div>

            {/* BRAND MARQUEE */}
            <div className="bg-white border-y border-gray-100 py-6 overflow-hidden">
                <div className="brands-scroll flex items-center">
                    {doubleBrands.map((b, i) => (
                        <button key={i} onClick={() => navigate('store', { brand: b.name })}
                            className="mx-8 flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <img src={b.img} alt={b.name} className="h-10 w-auto max-w-[130px] object-contain" />
                        </button>
                    ))}
                </div>
            </div>

            {/* CATEGORÍAS FR */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-3">Categorías</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">Soluciones FR certificadas para cada tipo de riesgo industrial.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CATEGORIAS_FR_HOME.map((cat, i) => (
                        <motion.button
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                            onClick={() => navigate('store', { categoria: cat.id })}
                            className="group relative h-48 md:h-64 overflow-hidden rounded-xl shadow-md"
                        >
                            <img src={cat.imagen} alt={cat.nombre} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                                <p className="text-white font-bold text-lg leading-tight">{cat.nombre}</p>
                                <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Ver más <ChevronRight className="w-3 h-3" />
                                </p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* PRODUCTOS POPULARES */}
            {popularProducts.length > 0 && (
                <section className="bg-[#f8f8f8] border-y border-gray-100 py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Productos Populares</h2>
                                <p className="text-gray-500 text-sm mt-1">Los favoritos de nuestros clientes</p>
                            </div>
                            <button onClick={() => navigate('store')} className="hidden sm:flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-black hover:text-[#0057B8] transition-colors">
                                Ver todo <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {popularProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    whileHover={{ y: -4 }}
                                    onClick={() => navigate('product', { id: product.id })}
                                    className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="h-44 overflow-hidden bg-gray-50 relative">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {product.popular && (
                                            <span className="absolute top-2 left-2 bg-[#0057B8] text-white text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{product.brand}</p>
                                        <h3 className="text-sm font-semibold text-black leading-snug line-clamp-2">{product.title}</h3>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); navigate('quote'); }}
                                            className="mt-2 w-full text-center text-xs font-semibold text-[#0057B8] uppercase tracking-wider hover:underline"
                                        >
                                            Cotizar →
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* MARCAS POR CATEGORÍA */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-2">Marcas Premium por Categoría</h2>
                    <p className="text-gray-500 text-sm">Trabajamos con las mejores marcas certificadas del mundo</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {brandTabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveBrandTab(tab.id)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeBrandTab === tab.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeBrandTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-wrap justify-center items-center gap-8"
                    >
                        {(MARCAS_DESTACADAS_POR_CATEGORIA[activeBrandTab] || []).map(marca => (
                            <button
                                key={marca.nombre}
                                onClick={() => navigate('store', { brand: marca.nombre })}
                                className="p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300 group grayscale hover:grayscale-0"
                            >
                                <img
                                    src={`${import.meta.env.BASE_URL}${marca.logo}`}
                                    alt={marca.nombre}
                                    className="h-12 w-32 object-contain"
                                />
                            </button>
                        ))}
                    </motion.div>
                </AnimatePresence>
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('brands')}
                        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-gray-800 transition-colors"
                    >
                        Ver todas las marcas <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* SERVICIOS DE DECORADO */}
            <section className="bg-[#0A1628] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">Servicios de Decorado</h2>
                        <p className="text-gray-400 max-w-xl mx-auto text-sm">Personalizamos cada prenda con tu logo y la identidad de tu empresa.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {services.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-[#0057B8]/20 rounded-lg flex items-center justify-center mb-4 text-[#0057B8] group-hover:bg-[#0057B8] group-hover:text-white transition-all duration-300">
                                    {s.icon}
                                </div>
                                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center">
                        <button
                            onClick={() => navigate('services')}
                            className="inline-flex items-center gap-2 bg-[#0057B8] text-white px-8 py-3 rounded-md text-sm font-bold hover:bg-[#004A9E] transition-colors"
                        >
                            Ver todos los servicios <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* UPE FR 360 — TEASER */}
            <section className="py-20 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left text */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="inline-block text-[#0057B8] font-bold text-xs uppercase tracking-[0.2em] mb-3">Sistema Integral</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-4 leading-tight">
                                UPE FR 360
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                Más que uniformes — un sistema completo de gestión. Control total de tus pedidos, trazabilidad por cliente y cumplimiento garantizado.
                            </p>
                            <button
                                onClick={() => navigate('upe360')}
                                className="inline-flex items-center gap-2 bg-[#0A1628] text-white px-7 py-3.5 rounded-md text-sm font-bold hover:bg-black transition-colors group"
                            >
                                Conoce más sobre UPE FR 360
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Right grid */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {upe360Features.map((f, i) => (
                                <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-200 transition-colors">
                                    <div className="w-9 h-9 bg-[#0057B8]/10 rounded-lg flex items-center justify-center mb-3 text-[#0057B8]">
                                        {f.icon}
                                    </div>
                                    <h4 className="font-bold text-sm text-black mb-1">{f.title}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <section className="relative py-24 overflow-hidden bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
                        ¿Listo para proteger a tu equipo?
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
                        Cuéntanos tu proyecto y te asignamos un asesor especializado en uniformes FR sin costo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('quote')}
                            className="bg-[#0057B8] text-white px-10 py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-[#004A9E] transition-colors"
                        >
                            Cotiza tu Proyecto
                        </button>
                        <a
                            href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, quiero cotizar uniformes FR.')}`}
                            target="_blank" rel="noopener noreferrer"
                            className="bg-[#25D366] text-white px-10 py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-[#1fad52] transition-colors flex items-center justify-center gap-2"
                        >
                            WhatsApp Directo
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeView;
