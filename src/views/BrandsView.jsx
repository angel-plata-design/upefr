import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BRANDS_FR = [
    {
        name: 'Bulwark',
        logo: 'bulwark.svg',
        desc: 'Líder en ropa FR para industria eléctrica y petroquímica.',
        categorias: ['industrial'],
    },
    {
        name: 'Ariat Work FR',
        logo: 'ariat work fr.svg',
        desc: 'Ropa y calzado FR con tecnología avanzada de protección.',
        categorias: ['industrial', 'calzado'],
    },
    {
        name: 'Carhartt FR',
        logo: 'frcarhart.svg',
        desc: 'Durabilidad extrema con protección antiflama certificada.',
        categorias: ['industrial'],
    },
    {
        name: 'Lakeland',
        logo: 'lakeland.svg',
        desc: 'Ropa de protección química, FR y alta visibilidad.',
        categorias: ['industrial', 'epp'],
    },
    {
        name: 'Kishigo',
        logo: 'kishigo.svg',
        desc: 'Especialistas en chalecos y accesorios de alta visibilidad.',
        categorias: ['accesorios'],
    },
    {
        name: 'Timberland PRO',
        logo: 'timberland pro.svg',
        desc: 'Calzado de seguridad con máximo confort y protección.',
        categorias: ['calzado'],
    },
    {
        name: 'Workrite',
        logo: 'workrite.svg',
        desc: 'Ropa FR de alta calidad para industrias de alto riesgo.',
        categorias: ['industrial'],
    },
    {
        name: 'Honeywell',
        logo: 'honeywell.svg',
        desc: 'EPP y soluciones de seguridad industrial de clase mundial.',
        categorias: ['epp'],
    },
    {
        name: '3M',
        logo: '3 M.svg',
        desc: 'Protección personal líder global: respiradores, lentes, guantes.',
        categorias: ['epp'],
    },
    {
        name: 'Ansell',
        logo: 'ansell.svg',
        desc: 'Guantes y ropa protectora de precisión para industria.',
        categorias: ['epp'],
    },
    {
        name: 'MSA',
        logo: 'MSA.svg',
        desc: 'Cascos, detectores de gas y EPP de seguridad crítica.',
        categorias: ['epp'],
    },
    {
        name: 'Portwest',
        logo: 'portwest.svg',
        desc: 'Amplia gama de ropa FR y EPP certificados internacionalmente.',
        categorias: ['industrial', 'epp'],
    },
];

const BrandsView = ({ navigate }) => {
    return (
        <div className="min-h-screen bg-white">

            {/* HEADER */}
            <div className="bg-[#0A1628] py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="inline-block text-[#0057B8] font-bold text-xs uppercase tracking-[0.2em] mb-3">Catálogo de Marcas</span>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Nuestras Marcas FR
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg">
                        Trabajamos exclusivamente con marcas certificadas para garantizar la seguridad de tu equipo.
                    </p>
                </div>
            </div>

            {/* BRANDS GRID */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {BRANDS_FR.map((brand, i) => (
                        <motion.button
                            key={brand.name}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -4 }}
                            onClick={() => navigate('store', { brand: brand.name })}
                            className="group bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-gray-400 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
                        >
                            {/* Logo */}
                            <div className="h-20 flex items-center justify-center mb-4 w-full">
                                <img
                                    src={`${import.meta.env.BASE_URL}${brand.logo}`}
                                    alt={brand.name}
                                    className="max-h-full max-w-[120px] object-contain grayscale group-hover:grayscale-0 transition-all duration-400"
                                />
                            </div>

                            <h3 className="font-bold text-sm text-black mb-1">{brand.name}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">{brand.desc}</p>

                            {/* Ver productos */}
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0057B8] group-hover:underline flex items-center gap-1">
                                Ver productos <ArrowRight className="w-3 h-3" />
                            </span>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-50 border-t border-gray-100 py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-black text-black mb-3">¿No encuentras tu marca?</h2>
                    <p className="text-gray-500 mb-6">Contáctanos. Trabajamos con muchas más marcas según tu proyecto.</p>
                    <button
                        onClick={() => navigate('quote')}
                        className="bg-[#0057B8] text-white px-8 py-3.5 rounded-md text-sm font-bold hover:bg-[#004A9E] transition-colors"
                    >
                        Cotiza tu Proyecto
                    </button>
                </div>
            </section>
        </div>
    );
};

export default BrandsView;
