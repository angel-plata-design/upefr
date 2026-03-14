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
                    className="inline-block bg-[#c84126] text-white font-bold px-4 py-1.5 text-[10px] mb-6 uppercase tracking-[0.25em] rounded-full">
                    Nuestra Historia
                </motion.span>
                <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                    className="text-5xl md:text-6xl font-black mb-5 tracking-tight uppercase">
                    Uniformes Profesionales
                </motion.h1>
                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    Tu socio estratégico en soluciones integrales de uniformes industriales, corporativos, médicos y de restaurante.
                </motion.p>
            </div>
        </div>

        {/* About content */}
        <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col md:flex-row items-center gap-16">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-black text-black mb-6 leading-[1.1] tracking-tight uppercase">
                    Expertos en soluciones uniformes para empresas.
                </h2>
                <div className="w-16 h-1 bg-[#c84126] mb-8" />
                <p className="text-gray-600 mb-5 leading-relaxed">
                    En <strong className="text-black">Uniformes Profesionales</strong> comprendemos que el uniforme de tus colaboradores comunica la esencia de tu empresa. Somos especialistas en diseñar, fabricar y gestionar programas de uniformes para empresas de todos los tamaños.
                </p>
                <p className="text-gray-600 mb-10 leading-relaxed">
                    Ya sea que requieras uniformes para un equipo de <strong className="text-black">50 o 500,000</strong> personas, contamos con la capacidad logística, tecnología de gestión y red de marcas para darte exactamente lo que necesitas, cuando lo necesitas.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { n: '+10', l: 'Años de\nExperiencia' },
                        { n: '+500', l: 'Empresas\natendidas' },
                        { n: '24-48h', l: 'Tiempo de\nrespuesta' },
                        { n: '100%', l: 'Entregas\npuntuales' },
                    ].map((s, i) => (
                        <div key={i} className={`p-5 text-center rounded-xl ${i % 2 === 0 ? 'bg-[#f5f5f5]' : 'bg-[#1a1a2e]'}`}>
                            <span className={`block text-3xl font-black mb-1 ${i % 2 !== 0 ? 'text-white' : 'text-black'}`}>{s.n}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${i % 2 !== 0 ? 'text-gray-400' : 'text-gray-500'} whitespace-pre-line`}>{s.l}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 w-full">
                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000"
                        alt="Uniformes" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 border-l-4 border-[#c84126] pl-4">
                        <p className="text-white font-black text-xl leading-tight">Seguridad y estilo.<br />Sin compromisos.</p>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-[#f5f5f5] py-20 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { icon: <Target className="w-8 h-8 text-black" />, title: 'Misión', bg: 'bg-white', text: 'text-black', body: 'Proveer soluciones avanzadas en uniformes corporativos, industriales y médicos, garantizando la máxima calidad, personalización y cumplimiento de tiempos. Simplificamos cada aspecto del programa de uniformes de nuestros clientes.' },
                    { icon: <Eye className="w-8 h-8 text-white" />, title: 'Visión', bg: 'bg-[#1a1a2e]', text: 'text-white', body: 'Ser el principal socio estratégico nacional en la gestión integral de programas de uniformes, reconocidos por nuestra excelencia operativa, capacidad logística y compromiso absoluto con la satisfacción del cliente.' },
                ].map((item, i) => (
                    <div key={i} className={`${item.bg} p-12 rounded-2xl border ${i === 0 ? 'border-gray-100' : 'border-[#1a1a2e]'}`}>
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${i === 0 ? 'bg-gray-100' : 'bg-white/10'}`}>{item.icon}</div>
                        <h3 className={`text-2xl font-black ${item.text} mb-4 uppercase tracking-widest`}>{item.title}</h3>
                        <div className={`w-10 h-0.5 mb-5 ${i === 0 ? 'bg-gray-300' : 'bg-white/20'}`} />
                        <p className={`${i === 0 ? 'text-gray-600' : 'text-gray-300'} leading-relaxed text-sm`}>{item.body}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Benefits */}
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-black mb-3 uppercase tracking-tight">Por qué elegirnos</h2>
                <div className="w-12 h-1 bg-[#c84126] mx-auto" />
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
                        <div className="w-14 h-14 mx-auto bg-white text-black rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c84126] group-hover:text-white transition-colors duration-300">
                            {React.cloneElement(b.icon, { className: 'w-6 h-6' })}
                        </div>
                        <h4 className="font-black text-black text-sm uppercase tracking-wide mb-2">{b.t}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{b.d}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Contact info */}
        <div className="bg-[#1a1a2e] py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-black text-white text-center mb-10">Contáctanos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    {[
                        { icon: <Phone className="w-5 h-5 text-[#c84126]" />, label: 'Teléfono', val: COMPANY_INFO.whatsappDisplay },
                        { icon: <Mail className="w-5 h-5 text-[#c84126]" />, label: 'Email', val: COMPANY_INFO.email },
                        { icon: <MapPin className="w-5 h-5 text-[#c84126]" />, label: 'Oficina', val: COMPANY_INFO.direccion },
                    ].map((c, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            {c.icon}
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{c.label}</p>
                            <p className="text-white text-sm">{c.val}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button onClick={() => navigate('quote')} className="bg-[#c84126] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#a8341e] transition-colors">
                        Cotiza tu Proyecto
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

export default AboutView;
