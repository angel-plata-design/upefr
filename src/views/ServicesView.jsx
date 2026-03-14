import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Printer, Shirt, Package, CheckCircle, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/constants';

const services = [
    {
        id: 'bordado',
        icon: <Scissors className="w-10 h-10" />,
        title: 'Bordado',
        subtitle: 'Identidad institucional en cada prenda',
        description: 'El bordado aporta una presencia duradera y de alta gama a tus uniformes corporativos. Utilizamos maquinaria computarizada de última generación que garantiza una fidelidad perfecta a tu logotipo y colores institucionales.',
        features: ['Alta resolución y definición de colores', 'Resistente a lavados industriales', 'Compatible con cualquier tela', 'Ideal para logos, nombres y áreas de bordado grandes'],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000',
        color: '#c84126',
    },
    {
        id: 'dtf',
        icon: <Printer className="w-10 h-10" />,
        title: 'DTF (Direct to Film)',
        subtitle: 'Full color sin límite de detalles',
        description: 'La tecnología DTF permite imprimir diseños de alta complejidad con degradados, sombras y fotografías directamente sobre la prenda. Es la opción ideal cuando los detalles del diseño son fundamentales.',
        features: ['Impresión full color sin límite de colores', 'Acabado suave y flexible al tacto', 'Sin cargos adicionales por número de colores', 'Perfecto para logos multitono y arte detallado'],
        image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&q=80&w=1000',
        color: '#1a1a2e',
    },
    {
        id: 'serigrafia',
        icon: <Shirt className="w-10 h-10" />,
        title: 'Serigrafía',
        subtitle: 'El estándar de la industria para grandes tirajes',
        description: 'La serigrafía es el método más tradicional y rentable para impresiones de alto volumen. Ofrece una cobertura sólida y excelente durabilidad, siendo la elección preferida para tirajes de 50 piezas o más.',
        features: ['Excelente rentabilidad en grandes volúmenes', 'Tintas de alta pigmentación y durabilidad', 'Acabados especiales: plastisol, agua, brillo', 'Hasta 6 colores por diseño'],
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1000',
        color: '#064e3b',
    },
    {
        id: 'empaque',
        icon: <Package className="w-10 h-10" />,
        title: 'Empaque y Presentación Final',
        subtitle: 'La última milla que hace la diferencia',
        description: 'Nos ocupamos de los detalles finales: etiquetado con nombre del empleado, doblado profesional, empaque individual o grupal y presentación en cajas o bolsas con tu identidad. Entregamos listo para distribuir.',
        features: ['Etiquetado individualizado por empleado', 'Doblado y troquelado profesional', 'Empaque en caja o bolsa con branding', 'Distribución directa a sucursales o empleados'],
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000',
        color: '#374151',
    },
];

const ServicesView = ({ navigate }) => (
    <div className="flex-1 bg-white">
        {/* Hero */}
        <div className="relative bg-[#1a1a2e] text-white py-28 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-[#1a1a2e]/80" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-block bg-[#c84126] text-white text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-6">
                        Personalización
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">Servicios de Decorado</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Transformamos cada prenda en una extensión de tu identidad corporativa. Desde una pieza hasta decenas de miles.
                    </p>
                </motion.div>
            </div>
        </div>

        {/* Services */}
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex flex-col gap-24">
                {services.map((s, i) => (
                    <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                    >
                        {/* Image */}
                        <div className="lg:w-1/2 w-full">
                            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
                                <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    {s.icon}
                                </div>
                            </div>
                        </div>
                        {/* Text */}
                        <div className="lg:w-1/2 w-full">
                            <span className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: s.color }}>Servicio</span>
                            <h2 className="text-3xl md:text-4xl font-black text-black mb-1 tracking-tight">{s.title}</h2>
                            <p className="text-gray-400 text-sm italic mb-4">{s.subtitle}</p>
                            <div className="w-12 h-1 mb-6" style={{ backgroundColor: s.color }} />
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">{s.description}</p>
                            <ul className="flex flex-col gap-2">
                                {s.features.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: s.color }} />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* CTA */}
        <div className="bg-[#f8f8f8] border-t border-gray-100 py-20">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-black mb-4">¿Qué servicio necesitas?</h2>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                    Nuestros asesores te guían para elegir el método de decorado que mejor se adapta a tu prenda, presupuesto y volumen.
                </p>
                <button
                    onClick={() => navigate('quote')}
                    className="inline-flex items-center gap-2 bg-[#c84126] text-white px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#a8341e] transition-colors"
                >
                    Cotizar decorado <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
);

export default ServicesView;
