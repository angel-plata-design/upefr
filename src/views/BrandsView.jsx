import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BRANDS_FR = [
    {
        name: 'Bulwark',
        logo: 'bulwark.svg',
        desc: 'Marca líder mundial en vestimenta resistente al fuego con más de 50 años protegiendo trabajadores industriales. Certificada NFPA 2112, NFPA 70E, ASTM F1506, CSA Z462 y OSHA 1910.269. Cubre petróleo y gas, servicios públicos, construcción, transporte y manufactura.',
        categorias: ['industrial'],
    },
    {
        name: 'Ariat Work FR',
        logo: 'ariat work fr.svg',
        desc: 'Redefine la vestimenta FR fusionando estilo, tecnología y rendimiento. Camisas, chamarras y jeans FR con tecnología Moisture Movement™ y Greater Arm Mobility™. Certificada NFPA 2112, NFPA 70E, ASTM F1506, CAT 2, UL.',
        categorias: ['industrial', 'calzado'],
    },
    {
        name: 'Carhartt FR',
        logo: 'frcarhart.svg',
        desc: 'Línea FR que equilibra resistencia, comodidad y cumplimiento normativo. Materiales como algodón tratado FR, Ripstop y mezclas inherentes. Ampliamente usada en refinerías, construcción, servicios públicos y manufactura pesada. Certificada NFPA 2112, NFPA 70E, ASTM F1506, CAT 2, UL.',
        categorias: ['industrial'],
    },
    {
        name: 'Lakeland',
        logo: 'lakeland.svg',
        desc: 'Marca reconocida mundialmente con línea robusta de ropa FR, prendas desechables y alta visibilidad. Su sublínea Eagle FR ofrece tejidos inherentes de última generación. Certificada NFPA 2112, NFPA 70E, ASTM F1506, ISO 11612, IEC 61482-2, UL.',
        categorias: ['industrial', 'epp'],
    },
    {
        name: 'Kishigo',
        logo: 'kishigo.svg',
        desc: 'Más de cuatro décadas especializándose en ropa de alta visibilidad y prendas FR. Chalecos, camisas, chamarras, pantalones y accesorios con certificación ANSI. Ideal para obras viales, servicios públicos y construcción. Certificada ANSI/ISEA 107, NFPA 70E, ASTM F1506.',
        categorias: ['accesorios'],
    },
    {
        name: 'Timberland PRO',
        logo: 'timberland pro.svg',
        desc: 'Línea FR de alto rendimiento que combina durabilidad con tecnologías de absorción de humedad, control de olores, elasticidad estratégica y UPF 50+. Calzado diseñado ergonómicamente con amortiguación antifatiga. Certificada NFPA 2112, NFPA 70E, ASTM F1506, CAT 2, UL.',
        categorias: ['calzado', 'industrial'],
    },
    {
        name: 'Workrite',
        logo: 'workrite.svg',
        desc: 'División especializada de Bulwark enfocada en ropa FR de alto rendimiento para emergencias, bomberos y rescatistas. Utiliza fibras Nomex®, Kevlar® y mezclas inherentes. Certificada NFPA 1975, NFPA 2112, NFPA 70E, ASTM F1506, UL.',
        categorias: ['industrial'],
    },
    {
        name: 'Honeywell',
        logo: 'honeywell.svg',
        desc: 'EPP y soluciones de seguridad industrial de clase mundial. Protección craneal, visual, auditiva, respiratoria y anticaídas bajo estándares ANSI, OSHA y CE. Fabricante de prestigio global con presencia en los entornos industriales más exigentes.',
        categorias: ['epp'],
    },
    {
        name: '3M',
        logo: '3 M.svg',
        desc: 'Líder global en protección personal: respiradores, lentes, protección auditiva, guantes y equipos anticaídas. Cumple con las especificaciones técnicas más estrictas bajo estándares ANSI, OSHA y CE para cualquier entorno industrial de alto riesgo.',
        categorias: ['epp'],
    },
    {
        name: 'Ansell',
        logo: 'ansell.svg',
        desc: 'Guantes y ropa protectora de precisión para industria química, farmacéutica y manufactura. Catálogo robusto de protección de manos y cuerpo bajo los más estrictos estándares internacionales ANSI, EN y ISO.',
        categorias: ['epp'],
    },
    {
        name: 'MSA',
        logo: 'MSA.svg',
        desc: 'Cascos, detectores de gas, protección respiratoria y sistemas anticaídas de seguridad crítica. EPP desarrollado bajo estándares ANSI, OSHA y CE para operaciones en los entornos industriales más exigentes y de mayor riesgo.',
        categorias: ['epp'],
    },
    {
        name: 'Portwest',
        logo: 'portwest.svg',
        desc: 'Fabricante con presencia en más de 130 países. Fundada en Irlanda en 1904, su línea FR usa tejidos propios Bizflame, Modaflame y Araflame. Más de 1,400 productos certificados. Certificada NFPA 2112, NFPA 70E, ASTM F1506, ISO 11612, IEC 61482-2, CE, UL.',
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
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
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
                            <span className="text-xs font-medium uppercase tracking-widest text-[#0057B8] group-hover:underline flex items-center gap-1">
                                Ver productos <ArrowRight className="w-3 h-3" />
                            </span>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-50 border-t border-gray-100 py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-black mb-3">¿No encuentras tu marca?</h2>
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
