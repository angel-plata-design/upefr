import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';

const SubscriptionPopup = () => {
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem('up_popup_dismissed');
        if (!dismissed) {
            const timer = setTimeout(() => setVisible(true), 3500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setVisible(false);
        localStorage.setItem('up_popup_dismissed', '1');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setTimeout(() => {
                setVisible(false);
                localStorage.setItem('up_popup_dismissed', '1');
            }, 2500);
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative bg-white max-w-md w-full rounded-xl shadow-2xl overflow-hidden">
                {/* Image header */}
                <div className="h-40 bg-gradient-to-br from-[#1a1a2e] to-[#c84126] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="absolute border border-white rounded-full"
                                style={{ width: `${80 + i * 40}px`, height: `${80 + i * 40}px`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                        ))}
                    </div>
                    <div className="text-center relative z-10">
                        <Mail className="w-10 h-10 text-white mx-auto mb-2 opacity-80" />
                        <p className="text-white font-black text-2xl tracking-tight">10% OFF</p>
                        <p className="text-white/80 text-xs font-medium">en tu primer pedido</p>
                    </div>
                </div>

                <button onClick={handleClose} className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6">
                    {!submitted ? (
                        <>
                            <h2 className="text-xl font-black text-black mb-1">Únete a nuestro catálogo exclusivo</h2>
                            <p className="text-gray-500 text-sm mb-4">
                                Recibe novedades, descuentos por volumen y tendencias en uniformes directamente en tu correo.
                            </p>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    required
                                    placeholder="tu@empresa.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c84126] focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="bg-[#c84126] text-white py-3 rounded-lg text-sm font-bold hover:bg-[#a8341e] transition-colors"
                                >
                                    Suscribirme y obtener mi descuento
                                </button>
                            </form>
                            <button onClick={handleClose} className="w-full text-center text-xs text-gray-400 mt-3 hover:text-gray-600 transition-colors">
                                No, gracias
                            </button>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                            <h3 className="text-lg font-black text-black mb-1">¡Listo!</h3>
                            <p className="text-gray-500 text-sm">Revisa tu correo para obtener tu código de descuento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPopup;
