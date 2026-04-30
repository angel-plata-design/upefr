import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const UPE_UNIFORMES_URL = 'https://flowmx.github.io/upeuniformes/';

const WelcomeModal = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const yaSeMostro = sessionStorage.getItem('upePopupVisto');
        if (!yaSeMostro) {
            setShowModal(true);
            sessionStorage.setItem('upePopupVisto', 'true');
        }
    }, []);

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setShowModal(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white shadow-2xl max-w-2xl w-full relative overflow-hidden"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-black hover:bg-gray-100 p-1.5 transition-colors focus:outline-none z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Header */}
                        <div className="bg-[#0A1628] px-8 py-6 text-center">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0057B8] mb-1">Bienvenido a UPE</p>
                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                                ¿Qué tipo de uniformes estás buscando?
                            </h2>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">

                            {/* Opción 1 — UPE Uniformes Profesionales */}
                            <a
                                href={UPE_UNIFORMES_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setShowModal(false)}
                                className="group flex flex-col items-center text-center p-8 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                            >
                                <div className="h-14 flex items-center justify-center mb-4">
                                    <img src={`${import.meta.env.BASE_URL}logo-uniformes.png`} alt="UPE Uniformes Profesionales" className="h-10 w-auto object-contain" />
                                </div>
                                <h3 className="text-lg font-bold text-black uppercase tracking-wider mb-2">
                                    Uniformes Profesionales
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Uniformes corporativos, industriales, médicos, restaurante, EPP y calzado.
                                </p>
                                <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors border-b border-gray-300 group-hover:border-black pb-0.5">
                                    Ir a UPE →
                                </span>
                            </a>

                            {/* Opción 2 — UPE FR */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="group flex flex-col items-center text-center p-8 hover:bg-[#0A1628] transition-all duration-300 cursor-pointer"
                            >
                                <div className="h-14 flex items-center justify-center mb-4">
                                    <img src={`${import.meta.env.BASE_URL}logo-oscuro.png`} alt="UPE FR" className="h-10 w-auto object-contain group-hover:brightness-0 group-hover:invert transition-all" />
                                </div>
                                <h3 className="text-lg font-bold text-black group-hover:text-white uppercase tracking-wider mb-2 transition-colors">
                                    Uniformes FR
                                </h3>
                                <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors">
                                    Uniformes antiflama certificados, calzado de seguridad y EPP especializado para industria energética y trabajos de alto riesgo.
                                </p>
                                <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-[#0057B8] group-hover:text-white transition-colors border-b border-[#0057B8] group-hover:border-white pb-0.5">
                                    Entrar a UPE FR →
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;
