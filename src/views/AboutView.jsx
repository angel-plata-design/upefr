import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Truck, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/constants';

const AboutView = ({ navigate }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 bg-white">
        {/* Hero */}
        <div className="relative bg-black text-white py-28 overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}conoce_upe.jpg`} alt="Sobre Nosotros" className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                    className="inline-block bg-[#0057B8] text-white font-bold px-4 py-1.5 text-xs mb-6 uppercase tracking-[0.25em] rounded-full">
                    Nuestra Historia
                </motion.span>
                <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                    className="text-5xl md:text-6xl font-bold mb-5 tracking-tight">
                    UPE FR — Seguridad,<br />Cumplimiento y Control.
                </motion.h1>
                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    Tu aliado estratégico en ropa resistente al fuego, arco eléctrico, calzado de seguridad y EPP industrial certificado.
                </motion.p>
            </div>
        </div>

        {/* About content */}
        <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col md:flex-row items-center gap-16">
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
                    <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000"
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

        {/* Industrias */}
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 tracking-tight">Industrias que protegemos</h2>
                <div className="w-12 h-1 bg-[#0057B8] mx-auto mb-4" />
                <p className="text-gray-500 max-w-xl mx-auto text-sm">Cada industria tiene necesidades específicas. Seleccionamos prendas certificadas y configuramos programas que aseguran cumplimiento, eficiencia y uniformidad en toda la operación.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                    { name: 'Electricidad', norm: 'NFPA 70E · OSHA 1910.269' },
                    { name: 'Petróleo y Gas', norm: 'NFPA 2112 · ASTM F1930' },
                    { name: 'Refinación y Petroquímica', norm: 'NFPA 2112 · ASTM F1506' },
                    { name: 'Gas y Servicios Públicos', norm: 'NFPA 2112 · OSHA 1910.132' },
                    { name: 'Metales y Fundición', norm: 'ASTM F1002 · ASTM F955' },
                    { name: 'Transporte', norm: 'OSHA 1910.269 · NFPA 70E' },
                    { name: 'Manufactura Química', norm: 'NFPA 2112 · NFPA 2113' },
                    { name: 'Eléctrica Industrial', norm: 'ASTM F1506 · NFPA 70E' },
                ].map((ind, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                        className="bg-[#f5f5f5] rounded-xl p-5 border border-gray-100 hover:border-[#0057B8] hover:bg-white transition-all duration-300">
                        <div className="w-2 h-2 rounded-full bg-[#0057B8] mb-3" />
                        <h4 className="font-semibold text-sm text-black mb-1">{ind.name}</h4>
                        <p className="text-xs text-gray-400">{ind.norm}</p>
                    </motion.div>
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
