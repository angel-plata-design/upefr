import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Truck, Globe, Phone, Mail, MapPin, ShieldCheck, Zap, Flame, Wrench, Factory, HardHat } from 'lucide-react';
import { COMPANY_INFO } from '../data/constants';

const AboutView = ({ navigate }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 bg-white">
        {/* Hero */}
        <div className="relative bg-black text-white py-16 md:py-28 overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}conoce_upe.jpg`} alt="Sobre Nosotros" className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                    className="inline-block bg-[#0057B8] text-white font-bold px-4 py-1.5 text-xs mb-6 uppercase tracking-[0.25em] rounded-full">
                    Nuestra Historia
                </motion.span>
                <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5 tracking-tight">
                    UPE FR — Seguridad,<br />Cumplimiento y Control.
                </motion.h1>
                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    Tu aliado estratégico en ropa resistente al fuego, arco eléctrico, calzado de seguridad y EPP industrial certificado.
                </motion.p>
            </div>
        </div>

        {/* About content */}
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-[1.1] tracking-tight">
                    Especialistas en ropa resistente al fuego y protección industrial.
                </h2>
                <div className="w-16 h-1 bg-[#0057B8] mb-8" />
                <p className="text-gray-600 mb-5 leading-relaxed">
                    En <strong className="text-black">UPE FR</strong> somos especialistas en ropa resistente al fuego (FR), arco eléctrico, calzado de seguridad y equipo de protección industrial. Con más de 10 años de experiencia, nos hemos convertido en un aliado estratégico para empresas del sector energético, petroquímico, gas, servicios públicos y manufactura.
                </p>
                <p className="text-gray-600 mb-10 leading-relaxed">
                    Nuestra fortaleza está en integrar todo en un solo proveedor: marcas líderes, prendas certificadas, producción interna, logística nacional, soporte técnico y la plataforma digital <strong className="text-black">upeFR360</strong>, que permite controlar cada aspecto del programa de uniformes. Ofrecemos variedad, cumplimiento, tiempos rápidos y trazabilidad completa.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { n: '+10', l: 'Años de\nExperiencia' },
                        { n: '+500', l: 'Empresas\nProtegidas' },
                        { n: '7', l: 'Industrias\nAtendidas' },
                        { n: '100%', l: 'Cumplimiento\nNormativo' },
                    ].map((s, i) => (
                        <div key={i} className={`p-5 text-center rounded-xl ${i % 2 === 0 ? 'bg-[#f5f5f5]' : 'bg-[#0A1628]'}`}>
                            <span className={`block text-3xl font-bold mb-1 ${i % 2 !== 0 ? 'text-white' : 'text-black'}`}>{s.n}</span>
                            <span className={`text-xs font-medium uppercase tracking-widest ${i % 2 !== 0 ? 'text-gray-400' : 'text-gray-500'} whitespace-pre-line`}>{s.l}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 w-full">
                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                    <img src={`${import.meta.env.BASE_URL}img_work.jpg`}
                        alt="Uniformes" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 border-l-4 border-[#0057B8] pl-4">
                        <p className="text-white font-bold text-xl leading-tight">Seguridad y estilo.<br />Sin compromisos.</p>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-[#f5f5f5] py-20 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { icon: <Target className="w-8 h-8 text-black" />, title: 'Misión', bg: 'bg-white', text: 'text-black', body: 'Proveer ropa FR certificada, calzado de seguridad y EPP especializado, garantizando que cada colaborador cuente con la protección adecuada para su nivel de riesgo. Simplificamos la gestión de uniformes FR con marcas líderes, producción interna y la plataforma upeFR360.' },
                    { icon: <Eye className="w-8 h-8 text-white" />, title: 'Visión', bg: 'bg-[#0A1628]', text: 'text-white', body: 'Ser el principal aliado estratégico en la gestión integral de programas de uniformes FR en México, reconocidos por nuestras certificaciones NFPA/ASTM, excelencia operativa, trazabilidad total y cumplimiento normativo garantizado.' },
                ].map((item, i) => (
                    <div key={i} className={`${item.bg} p-12 rounded-2xl border ${i === 0 ? 'border-gray-100' : 'border-[#0A1628]'}`}>
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${i === 0 ? 'bg-gray-100' : 'bg-white/10'}`}>{item.icon}</div>
                        <h3 className={`text-2xl font-bold ${item.text} mb-4 uppercase tracking-widest`}>{item.title}</h3>
                        <div className={`w-10 h-0.5 mb-5 ${i === 0 ? 'bg-gray-300' : 'bg-white/20'}`} />
                        <p className={`${i === 0 ? 'text-gray-600' : 'text-gray-300'} leading-relaxed text-sm`}>{item.body}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Benefits */}
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 tracking-tight">Por qué elegirnos</h2>
                <div className="w-12 h-1 bg-[#0057B8] mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { icon: <Award />, t: 'Calidad Premium', d: 'Las mejores marcas con certificaciones nacionales e internacionales.' },
                    { icon: <Users />, t: 'Atención Personalizada', d: 'Asesor dedicado desde el primer contacto hasta la entrega.' },
                    { icon: <Truck />, t: 'Logística Optimizada', d: 'Procesamos y enviamos en 24-48h para stock disponible.' },
                    { icon: <Globe />, t: 'Alcance Nacional', d: 'Cobertura en toda la República Mexicana.' },
                ].map((b, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        className="text-center p-8 bg-[#f5f5f5] rounded-2xl border border-gray-100 hover:border-black group transition-all duration-300 hover:-translate-y-1">
                        <div className="w-14 h-14 mx-auto bg-white text-black rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0057B8] group-hover:text-white transition-colors duration-300">
                            {React.cloneElement(b.icon, { className: 'w-6 h-6' })}
                        </div>
                        <h4 className="font-semibold text-black text-sm mb-2">{b.t}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{b.d}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* IMPORTANCIA DEL UNIFORME FR */}
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <span className="inline-block text-[#0057B8] font-bold text-xs uppercase tracking-[0.2em] mb-3">Decisión estratégica</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight tracking-tight">
                        Importancia del<br /><span className="text-[#0057B8]">Uniforme FR</span>
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        <strong className="text-black">El uniforme FR no es un gasto operativo más.</strong> Es una decisión estratégica con impacto directo en la seguridad, productividad y cumplimiento normativo de tu organización.
                    </p>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Un programa bien administrado evita riesgos, protege al colaborador y fortalece la imagen de la empresa ante auditorías internas y externas. Además, garantiza que cada área cumpla con los estándares <strong className="text-black">NFPA, ASTM y OSHA</strong>, reduciendo significativamente accidentes, sanciones y tiempos muertos operativos.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        <strong className="text-black">El resultado es simple:</strong> tu equipo está protegido, tu operación está documentada y tú tienes tranquilidad legal, operativa y financiera.
                    </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="relative h-[400px] rounded-2xl overflow-hidden">
                    <img src={`${import.meta.env.BASE_URL}hero-slider-3.jpg`} alt="Uniformes FR en uso" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-white font-bold text-lg">Seguridad, cumplimiento y control.</p>
                        <p className="text-gray-300 text-sm mt-1">NFPA 70E · NFPA 2112 · ASTM F1506</p>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* INDUSTRIAS */}
        <div className="bg-[#f5f5f5] border-y border-gray-100 py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 tracking-tight">Industrias que <span className="text-[#0057B8]">protegemos</span></h2>
                    <div className="w-12 h-1 bg-[#0057B8] mx-auto mb-4" />
                    <p className="text-gray-500 max-w-xl mx-auto text-sm">Cada industria tiene necesidades específicas. Seleccionamos prendas certificadas y configuramos programas que aseguran cumplimiento, eficiencia y uniformidad en toda la operación.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { icon: <Zap className="w-5 h-5" />, name: 'Electricidad', norm: 'ASTM 1506 · OSHA 1910.269 · NFPA 70E', desc: 'Ropa FR para cuadrillas de distribución, transmisión, mantenimiento en campo, subestaciones y trabajos en proximidad de líneas energizadas.' },
                        { icon: <Factory className="w-5 h-5" />, name: 'Perforación, refinación y petroquímica', norm: 'NFPA 2112 · ASTM F1930', desc: 'Ropa FR diseñada para soportar temperaturas extremas, llamas repentinas y ambientes industriales severos durante toda la jornada.' },
                        { icon: <Wrench className="w-5 h-5" />, name: 'Eléctrica Industrial', norm: 'ASTM 1506 · OSHA 1910.269 · NFPA 70E', desc: 'Protección confiable ante riesgos de arco eléctrico en plantas industriales, cuartos eléctricos, mantenimiento y operaciones energéticas.' },
                        { icon: <Flame className="w-5 h-5" />, name: 'Gas y Servicios Públicos', norm: 'ASTM F1930 · NFPA 2112', desc: 'Ropa FR que protege contra los efectos potencialmente fatales del fuego repentino para empresas de gas, agua, energía e infraestructura.' },
                        { icon: <HardHat className="w-5 h-5" />, name: 'Metales y Fundición', norm: 'ASTM F1002 · ASTM F955', desc: 'Prendas resistentes para proteger contra dispersión de metal fundido en operaciones de fundición, metalurgia, hornos y soldadura.' },
                        { icon: <Truck className="w-5 h-5" />, name: 'Transporte', norm: 'OSHA 1910.269 · NFPA 70E', desc: 'Uniformes FR certificados para operadores, técnicos de mantenimiento y conductores en ambientes con riesgos eléctricos o térmicos.' },
                        { icon: <Factory className="w-5 h-5" />, name: 'Manufactura Química', norm: 'NFPA 2112 · NFPA 2113', desc: 'Uniformes FR para operación segura en ambientes con exposición a químicos, calor y riesgos combinados. Líneas de producción y plantas de procesamiento.' },
                        { icon: <Zap className="w-5 h-5" />, name: 'Eléctrica y Servicios', norm: 'ASTM F1506 · NFPA 70E', desc: 'Protección completa para plantas industriales, cuartos eléctricos y operaciones energéticas que requieren cumplimiento OSHA.' },
                    ].map((ind, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                            className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#0057B8] hover:shadow-md transition-all duration-300 flex gap-4">
                            <div className="w-10 h-10 bg-[#0057B8]/10 rounded-lg flex items-center justify-center text-[#0057B8] flex-shrink-0 mt-0.5">
                                {ind.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-black mb-1">{ind.name}</h4>
                                <p className="text-xs font-semibold text-[#0057B8] mb-2">{ind.norm}</p>
                                <p className="text-sm text-gray-500 leading-relaxed">{ind.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        {/* TIPOS DE PROTECCIÓN */}
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 tracking-tight">Tipos de protección <span className="text-[#0057B8]">contra riesgos</span></h2>
                <div className="w-12 h-1 bg-[#0057B8] mx-auto mb-4" />
                <p className="text-gray-500 max-w-xl mx-auto text-sm">Nuestras prendas cumplen con normas internacionales reconocidas, garantizando seguridad, confiabilidad y desempeño en cada puesto de trabajo.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                    { norm: 'NFPA 70E', title: 'Protección contra arco eléctrico', desc: 'La ropa FR certificada bajo NFPA 70E protege al colaborador de lesiones graves causadas por eventos de arco eléctrico. Esencial para cuadrillas eléctricas, mantenimiento y distribución.' },
                    { norm: 'OSHA 1910.269 / 1910.132', title: 'Arco eléctrico en servicios públicos', desc: 'Protección certificada para líneas energizadas, subestaciones, transformadores, reparaciones de emergencia y operaciones de infraestructura.' },
                    { norm: 'NFPA 2112 / NFPA 2113', title: 'Protección contra fuego repentino', desc: 'Protege a los trabajadores en casos de ignición repentina, fugas de gas, vapores inflamables o fallas de proceso en petroquímica, gas y manufactura.' },
                    { norm: 'ASTM F955 / ASTM F1002', title: 'Dispersión de metal fundido', desc: 'Prendas diseñadas para resistir salpicaduras de metal derretido en procesos de fundición, hornos, metalurgia y manufactura pesada.' },
                    { norm: 'ASTM F2412 / F2413 / F2892', title: 'Calzado protector', desc: 'Calzado dieléctrico e industrial certificado para absorber impacto, resistir perforaciones y proteger contra descargas eléctricas.' },
                    { norm: 'ANSI / OSHA / CE', title: 'EPP Especializado', desc: 'Protección craneal, visual, auditiva, respiratoria y anticaídas bajo los estándares internacionales más estrictos. Fabricantes de prestigio global.' },
                ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                        className="bg-[#f5f5f5] rounded-xl p-6 border border-gray-100 hover:border-[#0057B8] hover:bg-white transition-all duration-300">
                        <span className="inline-block text-[#0057B8] font-bold text-xs uppercase tracking-widest mb-3 border-b border-[#0057B8] pb-1">{item.norm}</span>
                        <h4 className="font-bold text-black mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* EPP — Equipo de Protección Personal */}
        <div className="bg-[#0A1628] py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                    <div>
                        <span className="inline-block text-[#0057B8] font-bold text-xs uppercase tracking-[0.2em] mb-3">EPP</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
                            Equipo de <span className="text-[#0057B8]">protección personal</span>
                        </h2>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            La correcta selección del EPP es crítica para la integridad operativa. Contamos con un catálogo robusto que abarca protección craneal, visual, auditiva, respiratoria y anticaídas, desarrollado bajo los más estrictos estándares internacionales (ANSI, OSHA, CE).
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Al colaborar con <strong className="text-white">fabricantes de prestigio global</strong>, garantizamos que cada producto implementado en su planta o proyecto cumpla con las especificaciones técnicas requeridas. Asesoramos en la elección del equipo adecuado para asegurar un cumplimiento normativo del 100% ante cualquier entidad regulatoria.
                        </p>
                    </div>
                    <div className="relative h-[350px] rounded-2xl overflow-hidden">
                        <img src={`${import.meta.env.BASE_URL}hero-slider-4.jpg`} alt="EPP industrial" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 to-transparent" />
                    </div>
                </div>
                {/* EPP Brands */}
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Marcas EPP que distribuimos</p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        {[
                            { name: '3M', img: `${import.meta.env.BASE_URL}3 M.svg` },
                            { name: 'Honeywell', img: `${import.meta.env.BASE_URL}honeywell.svg` },
                            { name: 'MSA', img: `${import.meta.env.BASE_URL}MSA.svg` },
                            { name: 'DuPont', img: `${import.meta.env.BASE_URL}dunpont.svg` },
                            { name: 'Ansell', img: `${import.meta.env.BASE_URL}ansell.svg` },
                            { name: 'Bullard', img: `${import.meta.env.BASE_URL}bullard.svg` },
                        ].map(b => (
                            <div key={b.name} className="bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-colors">
                                <img src={b.img} alt={b.name} className="h-10 w-28 object-contain brightness-0 invert" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Contact info */}
        <div className="bg-[#0A1628] py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-white text-center mb-10">Contáctanos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    {[
                        { icon: <Phone className="w-5 h-5 text-[#0057B8]" />, label: 'Teléfono', val: COMPANY_INFO.whatsappDisplay },
                        { icon: <Mail className="w-5 h-5 text-[#0057B8]" />, label: 'Email', val: COMPANY_INFO.email },
                        { icon: <MapPin className="w-5 h-5 text-[#0057B8]" />, label: 'Oficina', val: COMPANY_INFO.direccion },
                    ].map((c, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            {c.icon}
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{c.label}</p>
                            <p className="text-white text-sm">{c.val}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button onClick={() => navigate('quote')} className="bg-[#0057B8] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#004A9E] transition-colors">
                        Cotiza tu Proyecto
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

export default AboutView;
