import React from 'react';
import { COMPANY_INFO } from '../data/constants';

const WhatsAppButton = () => {
    const number = COMPANY_INFO.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent('Hola, me gustaría cotizar uniformes para mi empresa.');

    return (
        <a
            href={`https://wa.me/${number}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
        >
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-black text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                ¡Cotiza ahora!
            </span>
            <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.85.75 5.53 2.07 7.85L.5 31.5l7.86-2.06A15.47 15.47 0 0016 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.4a12.88 12.88 0 01-6.57-1.8l-.47-.28-4.67 1.22 1.24-4.56-.3-.48A12.9 12.9 0 013.1 16C3.1 9.14 8.14 3.1 15 3.1 21.86 3.1 26.9 9.14 26.9 16c0 6.86-5.04 12.9-10.9 12.9zm7.07-9.66c-.39-.2-2.3-1.13-2.65-1.26-.36-.13-.62-.2-.88.2-.26.38-1 1.26-1.23 1.52-.22.26-.45.29-.84.1-.39-.2-1.64-.6-3.12-1.92-1.15-1.02-1.93-2.28-2.16-2.67-.22-.39-.02-.6.17-.79.17-.17.39-.45.58-.67.2-.22.26-.38.39-.64.13-.26.06-.49-.03-.68-.1-.2-.88-2.12-1.21-2.9-.32-.76-.64-.66-.88-.67l-.75-.01c-.26 0-.68.1-1.04.49-.35.39-1.35 1.32-1.35 3.22s1.38 3.74 1.57 4c.2.26 2.72 4.15 6.59 5.82.92.4 1.64.64 2.2.82.93.3 1.77.26 2.44.16.74-.11 2.3-.94 2.63-1.85.32-.9.32-1.68.22-1.85-.1-.17-.36-.26-.75-.46z"/>
                </svg>
            </div>
        </a>
    );
};

export default WhatsAppButton;
