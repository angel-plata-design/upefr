import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

// Fix bug #3: imagen de fondo usa hero-slider-1.jpg existente + BASE_URL
const LoginView = ({ goHome, setIsAuthenticated }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            setError('Contraseña incorrecta');
            setPassword('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-[1] flex items-center justify-center bg-[#f5f5f5] p-4 relative overflow-hidden py-12 min-h-screen border-t border-gray-200"
        >
            <div className="absolute inset-0 bg-black/60 mix-blend-multiply z-0"></div>
            {/* Bug #3 corregido: usa imagen existente con BASE_URL */}
            <img src={`${import.meta.env.BASE_URL}hero-slider-1.jpg`} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 grayscale" />

            <div className="bg-white p-10 rounded-none border border-black max-w-md w-full relative z-10">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-black flex items-center justify-center text-white border border-black">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-black mb-2 uppercase tracking-widest">Acceso Restringido</h2>
                    <p className="text-gray-500 text-center text-xs uppercase font-bold tracking-widest mt-2">Panel Administrativo</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2" htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            className={`w-full px-4 py-3 border rounded-none text-sm focus:outline-none focus:ring-1 focus:border-black hover:border-black transition-colors ${error ? 'border-red-500 focus:ring-red-500 text-red-500' : 'border-gray-300 focus:ring-black text-black'}`}
                            placeholder="••••••••"
                            required
                        />
                        {error && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-widest flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white border border-black hover:bg-white hover:text-black font-bold py-4 px-4 uppercase tracking-widest transition-colors flex items-center justify-center text-xs rounded-none"
                    >
                        Acceder al Panel
                    </button>
                </form>

                <div className="mt-8 text-center pt-6 border-t border-gray-100">
                    <button onClick={goHome} className="text-xs text-gray-500 hover:text-black uppercase tracking-widest transition-colors border-b border-transparent hover:border-black pb-1">
                        Volver al sitio público
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default LoginView;
