import React, { useState, useRef } from 'react';
import { CheckCircle, Upload, User, Building2, Mail, Phone, MessageSquare, Layers, Hash, Paperclip, X } from 'lucide-react';
import { CATEGORIAS } from '../data/categorias';
import { COMPANY_INFO } from '../data/constants';

const QuoteView = () => {
    const [form, setForm] = useState({
        nombre: '', empresa: '', email: '', telefono: '',
        tipo_proyecto: '', categoria: '', cantidades: '', observaciones: ''
    });
    const [archivo, setArchivo] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef();

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleFile = (e) => setArchivo(e.target.files[0]);
    const removeFile = () => { setArchivo(null); fileRef.current.value = ''; };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simular envío
        const msg = `Hola, me gustaría cotizar un proyecto:%0A%0A*Nombre:* ${form.nombre}%0A*Empresa:* ${form.empresa}%0A*Email:* ${form.email}%0A*Teléfono:* ${form.telefono}%0A*Tipo de proyecto:* ${form.tipo_proyecto}%0A*Categoría:* ${form.categoria}%0A*Cantidades:* ${form.cantidades}%0A*Observaciones:* ${form.observaciones}`;
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            window.open(`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}?text=${msg}`, '_blank');
        }, 800);
    };

    const tiposProyecto = [
        'Uniformes nuevos para empresa', 'Reposición de uniformes', 'Evento especial',
        'Ropa de trabajo industrial', 'Uniformes médicos/hospitalarios', 'Uniformes de restaurante', 'Otro'
    ];

    const Field = ({ icon, label, children }) => (
        <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-widest">
                {icon} {label}
            </label>
            {children}
        </div>
    );

    const inputCls = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057B8] focus:border-transparent transition-all";

    if (submitted) return (
        <div className="flex-1 flex items-center justify-center py-32 px-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-black text-black mb-3">¡Solicitud enviada!</h2>
                <p className="text-gray-500 mb-6">
                    Te hemos redirigido a WhatsApp con todos los detalles de tu proyecto. Un asesor te contactará en breve.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => setSubmitted(false)} className="px-6 py-3 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">
                        Enviar otra cotización
                    </button>
                    <a href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                        className="px-6 py-3 bg-[#25D366] text-white rounded-lg text-sm font-bold hover:bg-[#1fad52] transition-colors">
                        Abrir WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 bg-[#f8f8f8]">
            {/* Hero */}
            <div className="bg-[#0A1628] text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-[#0057B8] text-xs font-bold uppercase tracking-[0.25em] mb-3 block">Paso 1 de 1</span>
                    <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">Cotiza tu Proyecto</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
                        Cuéntanos los detalles. Te asignamos un asesor especializado sin costo y te respondemos en menos de 24 horas.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Sidebar info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-black text-black text-lg mb-4">¿Por qué cotizar con nosotros?</h3>
                            {[
                                { t: 'Respuesta en 24h', d: 'Te contactamos el mismo día hábil.' },
                                { t: 'Sin mínimos fijos', d: 'Atendemos desde 12 hasta 500,000 piezas.' },
                                { t: 'Asesor dedicado', d: 'Un experto te guía en todo el proceso.' },
                                { t: 'Entrega garantizada', d: 'En 2 a 5 días hábiles para stock disponible.' },
                            ].map((item, i) => (
                                <div key={i} className={`py-3 ${i < 3 ? 'border-b border-gray-100' : ''}`}>
                                    <p className="text-sm font-bold text-black mb-0.5">{item.t}</p>
                                    <p className="text-xs text-gray-500">{item.d}</p>
                                </div>
                            ))}
                            <div className="mt-5 pt-4 border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Contacto directo</p>
                                <a href={`tel:${COMPANY_INFO.telefonos[0].replace(/\s/g,'')}`}
                                    className="text-sm font-semibold text-[#0057B8] hover:underline block">{COMPANY_INFO.whatsappDisplay}</a>
                                <a href={`mailto:${COMPANY_INFO.email}`}
                                    className="text-xs text-gray-400 hover:text-black transition-colors break-all">{COMPANY_INFO.email}</a>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-5">
                            <h2 className="text-xl font-black text-black mb-1">Datos de Contacto</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field icon={<User className="w-3 h-3" />} label="Nombre">
                                    <input required name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre completo" className={inputCls} />
                                </Field>
                                <Field icon={<Building2 className="w-3 h-3" />} label="Empresa">
                                    <input required name="empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de tu empresa" className={inputCls} />
                                </Field>
                                <Field icon={<Mail className="w-3 h-3" />} label="Correo electrónico">
                                    <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="correo@empresa.com" className={inputCls} />
                                </Field>
                                <Field icon={<Phone className="w-3 h-3" />} label="Teléfono">
                                    <input required name="telefono" value={form.telefono} onChange={handleChange} placeholder="+52 646 000 0000" className={inputCls} />
                                </Field>
                            </div>

                            <div className="border-t border-gray-100 pt-5">
                                <h2 className="text-xl font-black text-black mb-4">Detalles del Proyecto</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field icon={<Layers className="w-3 h-3" />} label="Tipo de proyecto">
                                        <select required name="tipo_proyecto" value={form.tipo_proyecto} onChange={handleChange} className={inputCls}>
                                            <option value="">Selecciona...</option>
                                            {tiposProyecto.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </Field>
                                    <Field icon={<Layers className="w-3 h-3" />} label="Categoría o tipo de prenda">
                                        <select name="categoria" value={form.categoria} onChange={handleChange} className={inputCls}>
                                            <option value="">Selecciona...</option>
                                            {CATEGORIAS.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                                            <option value="Varias">Varias categorías</option>
                                        </select>
                                    </Field>
                                    <Field icon={<Hash className="w-3 h-3" />} label="Cantidades aproximadas">
                                        <input required name="cantidades" value={form.cantidades} onChange={handleChange} placeholder="Ej: 50 camisas, 30 pantalones..." className={inputCls} />
                                    </Field>
                                </div>

                                <div className="mt-4">
                                    <Field icon={<MessageSquare className="w-3 h-3" />} label="Observaciones">
                                        <textarea name="observaciones" value={form.observaciones} onChange={handleChange} rows={4} placeholder="Colores, medidas, logotipo, fecha de entrega requerida, etc."
                                            className={`${inputCls} resize-none`} />
                                    </Field>
                                </div>

                                {/* File upload */}
                                <div className="mt-4">
                                    <Field icon={<Paperclip className="w-3 h-3" />} label="Adjuntar archivo (opcional)">
                                        <div>
                                            <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.xlsx,.doc,.docx" onChange={handleFile} className="hidden" id="file-upload" />
                                            {!archivo ? (
                                                <label htmlFor="file-upload" className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#0057B8] transition-colors">
                                                    <Upload className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-600 font-medium">Subir layout, brief o referencia</p>
                                                        <p className="text-xs text-gray-400">PDF, imagen, Word o Excel · Máx. 10MB</p>
                                                    </div>
                                                </label>
                                            ) : (
                                                <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3">
                                                    <Paperclip className="w-4 h-4 text-[#0057B8] flex-shrink-0" />
                                                    <span className="text-sm text-gray-700 flex-1 truncate">{archivo.name}</span>
                                                    <button type="button" onClick={removeFile} className="text-gray-400 hover:text-red-500">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </Field>
                                </div>
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full bg-[#0057B8] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#004A9E] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mt-2">
                                {loading ? (
                                    <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Procesando...</>
                                ) : (
                                    <><MessageSquare className="w-4 h-4" /> Enviar solicitud de cotización</>
                                )}
                            </button>
                            <p className="text-xs text-gray-400 text-center">
                                Al enviar, se abrirá WhatsApp con los detalles de tu solicitud. Tiempo de respuesta: menos de 24h.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteView;
