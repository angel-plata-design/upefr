import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, BarChart3, Users, Truck, CheckCircle2, CheckCircle, Factory, Headset, MessageCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';

// Fix bug #2: todas las rutas de imagen corregidas con BASE_URL
const View360 = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-1 bg-white"
    >
        {/* Hero Banner */}
        <div className="relative bg-black text-white py-32 overflow-hidden border-b border-gray-200">
            <div className="absolute inset-0 bg-black/60 mix-blend-multiply z-10"></div>
            {/* Bug #2 corregido */}
            <img src={`${import.meta.env.BASE_URL}banner_upefr360.jpg`} alt="Ingeniero con equipo de seguridad" className="absolute inset-0 w-full h-full object-cover z-0 scale-105 grayscale" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-10"></div>
            <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center justify-center space-x-2 bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
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
                <motion.a
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    href="https://uniformesprofesionales.mx/store/#/?role_id=22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all mx-auto"
                >
                    Ver Tienda Demo <ArrowRight className="w-4 h-4" />
                </motion.a>
            </div>
        </div>

        {/* ¿Por qué elegir upeFR360? */}
        <div className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-black mb-8 tracking-tight uppercase"
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
                    Diseñamos <strong className="font-bold text-black">upeFR 360°</strong> como una plataforma iterativa e innovadora que le permita administrar, monitorear y eficientar su gestión de EPP en tiempo real y a la medida de su operación.
                </motion.p>

                <h3 className="text-lg font-bold text-black mb-12 text-left pl-4 border-l-4 border-black uppercase tracking-widest">Beneficios Clave</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {[
                        { icon: <ShieldCheck className="w-6 h-6" />, title: "Cumplimiento normativo garantizado", desc: "Cumples con las principales normas internacionales: NFPA 70E, NFPA 2112, ASTM F1506 para cada nivel de riesgo." },
                        { icon: <CheckCircle2 className="w-6 h-6" />, title: "Reduce accidentes y riesgos legales", desc: "Uniformes certificados FR reducen sanciones OSHA, accidentes laborales y exposición legal de la empresa." },
                        { icon: <BarChart3 className="w-6 h-6" />, title: "Centraliza compras y presupuesto", desc: "Un solo sistema para compras, seguimiento de inventario y control total del presupuesto asignado." },
                        { icon: <Users className="w-6 h-6" />, title: "Refuerza imagen y credibilidad", desc: "Uniformes consistentes y certificados proyectan profesionalismo ante clientes, auditores y reguladores." },
                        { icon: <Truck className="w-6 h-6" />, title: "Agiliza procesos de RH y auditoría", desc: "Automatiza solicitudes, autorizaciones jerárquicas y reportes de entrega para RH, seguridad industrial y logística." },
                        { icon: <CheckCircle2 className="w-6 h-6" />, title: "Controla recursos y elimina fugas", desc: "Trazabilidad completa por empleado elimina mermas, fraudes y entregas indebidas de uniformes y EPP." },
                    ].map((item, i) => (
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            key={i}
                            className="bg-white p-8 border border-gray-200 hover:border-black transition-all duration-300 group hover:-translate-y-1 relative"
                        >
                            <div className="w-14 h-14 bg-white border border-gray-200 text-black flex items-center justify-center mb-5 group-hover:bg-black group-hover:text-white transition-colors duration-300">{item.icon}</div>
                            <h4 className="font-bold text-black uppercase tracking-widest text-sm mb-3">{item.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        {/* Los 4 Pilares */}
        <div className="bg-[#f5f5f5] py-32 border-y border-gray-200 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 space-y-32 relative z-10">

                {/* Pilar 1 */}
                <div className="flex flex-col md:flex-row items-center gap-16 group">
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 w-full order-2 md:order-1 relative">
                        {/* Bug #2 corregido */}
                        <img src={`${import.meta.env.BASE_URL}img_pc.jpg`} alt="Tienda en línea B2B" className="relative w-full h-[450px] object-cover border border-gray-200 group-hover:scale-[1.02] transition-transform duration-500 grayscale" />
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 w-full order-1 md:order-2">
                        <div className="inline-flex items-center text-xs font-bold text-black border border-black bg-white px-4 py-1.5 tracking-widest uppercase mb-4">Paso 1</div>
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-6 leading-tight tracking-tight uppercase">Tienda B2B exclusiva y personalizada</h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Creamos un portal web con una experiencia de abastecimiento personalizada de acuerdo a los lineamientos y cuotas autorizadas de su empresa. Un portal privado sólo para sus empleados o supervisores autorizados.
                        </p>
                    </motion.div>
                </div>

                {/* Pilar 2 */}
                <div className="flex flex-col md:flex-row items-center gap-16 group">
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 w-full">
                        <div className="inline-flex items-center text-xs font-bold text-black border border-black bg-white px-4 py-1.5 tracking-widest uppercase mb-4">Paso 2</div>
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-6 leading-tight tracking-tight uppercase">Resumen y asignación de tallas</h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Carga individual de medidas por cada empleado, lo que asegura una asignación de tallas correcta desde el primer pedido, reduciendo drásticamente las devoluciones, costos y tiempos de gestión.
                        </p>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 w-full relative">
                        {/* Bug #2 corregido */}
                        <img src={`${import.meta.env.BASE_URL}img_asigtallas.jpg`} alt="Gestión de tallas" className="relative w-full h-[450px] object-cover border border-gray-200 group-hover:scale-[1.02] transition-transform duration-500 grayscale" />
                    </motion.div>
                </div>

                {/* Pilar 3 */}
                <div className="flex flex-col md:flex-row items-center gap-16 group">
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 w-full order-2 md:order-1 relative">
                        {/* Bug #2 corregido */}
                        <img src={`${import.meta.env.BASE_URL}img_logistica.jpg`} alt="Logística optimizada" className="relative w-full h-[450px] object-cover border border-gray-200 group-hover:scale-[1.02] transition-transform duration-500 grayscale" />
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 w-full order-1 md:order-2">
                        <div className="inline-flex items-center text-xs font-bold text-black border border-black bg-white px-4 py-1.5 tracking-widest uppercase mb-4">Paso 3</div>
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-6 leading-tight tracking-tight uppercase">Logística optimizada</h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Entregas en esquema de paquetes individuales (kitting) o centralizados, directos a sitio o sucursal por empleado. Hacemos que la distribución interna deje de ser un dolor de cabeza para su equipo.
                        </p>
                    </motion.div>
                </div>

                {/* Pilar 4 */}
                <div className="flex flex-col md:flex-row items-center gap-16 group">
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 w-full">
                        <div className="inline-flex items-center text-xs font-bold text-black border border-black bg-white px-4 py-1.5 tracking-widest uppercase mb-4">Paso 4</div>
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-black mb-6 leading-tight tracking-tight uppercase">Control automatizado y seguimiento</h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Visualice de inmediato sus gastos e inventarios. Monitoreo del estatus de solicitudes y autorizaciones jerárquicas online para total transparencia del presupuesto ejercido.
                        </p>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="md:w-1/2 w-full relative">
                        {/* Bug #2 corregido */}
                        <img src={`${import.meta.env.BASE_URL}img_Softlog.jpg`} alt="Reportes y control" className="relative w-full h-[450px] object-cover border border-gray-200 group-hover:scale-[1.02] transition-transform duration-500 grayscale" />
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Diferenciadores */}
        <div className="bg-black py-32 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-xl p-12 lg:p-16 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-colors duration-500 rounded-xl"
                >
                    <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700"><Factory className="w-80 h-80" /></div>
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-8 relative z-10 text-white tracking-tight leading-tight uppercase">
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
                        <p className="text-gray-400 text-sm mb-6 relative z-10 font-bold tracking-widest uppercase">Sus Ventajas Directas:</p>
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

        {/* CTA / Formulario */}
        <div id="demo-form" className="py-24 bg-white relative border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-[#f5f5f5] p-10 md:p-14 border border-gray-200">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 uppercase tracking-widest">Impulsa la seguridad de tu empresa hoy mismo</h2>
                        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
                        <p className="text-gray-500 text-sm md:text-base">Déjanos tus datos y un especialista te mostrará cómo <strong>upeFR 360°</strong> puede transformar la gestión de uniformes en tu organización.</p>
                    </div>
                    <ContactForm hideHeader={true} />
                </div>
            </div>
        </div>
    </motion.div>
);

export default View360;
