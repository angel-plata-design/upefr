import { useEffect } from 'react';

const BASE = 'https://angel-plata-design.github.io/upefr';
const DEFAULT_IMG = `${BASE}/hero-slider-1.jpg`;

const SEO_CONFIG = {
    home: {
        title: 'UPE FR — Ropa Resistente al Fuego, Calzado y EPP Certificado',
        description: 'Especialistas en ropa FR certificada (NFPA 2112, NFPA 70E, ASTM F1506), calzado de seguridad y EPP industrial. Bulwark, Ariat, Carhartt y más de 20 marcas líderes. Entregas en toda México.',
    },
    store: {
        title: 'Catálogo de Productos FR — UPE FR',
        description: 'Explora más de 400 productos certificados: ropa ignífuga, calzado de seguridad y EPP industrial. Marcas Bulwark, Ariat, Carhartt, Timberland PRO, CAT y más.',
    },
    about: {
        title: 'Nuestra Empresa — UPE FR',
        description: 'Más de 10 años siendo el aliado estratégico de la industria energética, petroquímica y eléctrica en México. Conoce quiénes somos y por qué nos eligen.',
    },
    services: {
        title: 'Servicios de Decorado — Bordado, DTF, Serigrafía | UPE FR',
        description: 'Personalizamos cada prenda con tu logo: bordado computarizado, impresión DTF full color, serigrafía y empaque individualizado por empleado.',
    },
    upe360: {
        title: 'UPE FR 360° — Sistema Integral de Gestión de Uniformes',
        description: 'Plataforma B2B para gestionar tu programa de uniformes FR: tienda privada, asignación de tallas, logística optimizada y control automatizado en tiempo real.',
    },
    brands: {
        title: 'Nuestras Marcas FR — Bulwark, Ariat, Carhartt y más | UPE FR',
        description: 'Distribuidores autorizados de las mejores marcas de ropa FR y calzado de seguridad: Bulwark, Ariat, Carhartt, Timberland PRO, Workrite, CAT, Dickies y más.',
    },
    contact: {
        title: 'Contacto — UPE FR',
        description: 'Habla directamente con nuestros asesores. Cotizaciones, dudas y atención personalizada vía WhatsApp, email o teléfono. Respondemos en menos de 24h.',
    },
    quote: {
        title: 'Cotiza tu Proyecto — UPE FR',
        description: 'Cuéntanos los detalles de tu proyecto de uniformes FR o EPP. Te asignamos un asesor especializado sin costo y respondemos en menos de 24 horas.',
    },
    terms: {
        title: 'Términos del Servicio — UPE FR',
        description: 'Conoce los términos y condiciones de nuestros servicios de venta y distribución de uniformes industriales y equipo de protección personal.',
    },
    privacy: {
        title: 'Aviso de Privacidad — UPE FR',
        description: 'Aviso de privacidad de UPE FR — Uniformes Profesionales. Conoce cómo protegemos y utilizamos tu información personal.',
    },
};

const setMeta = (name, content, attr = 'name') => {
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

export const useSEO = (view, product = null) => {
    useEffect(() => {
        let title, description, image;

        if (view === 'product' && product) {
            title = `${product.title} — UPE FR`;
            description = product.description
                ? product.description.slice(0, 155) + '...'
                : `${product.title}. Producto certificado disponible en UPE FR. Cotiza sin compromiso.`;
            image = product.image || DEFAULT_IMG;
        } else {
            const config = SEO_CONFIG[view] || SEO_CONFIG.home;
            title = config.title;
            description = config.description;
            image = DEFAULT_IMG;
        }

        // Title
        document.title = title;

        // Meta description
        setMeta('description', description);

        // Open Graph
        setMeta('og:title', title, 'property');
        setMeta('og:description', description, 'property');
        setMeta('og:image', image, 'property');
        setMeta('og:url', `${BASE}/#/${view}${product ? '/' + product.id : ''}`, 'property');

        // Twitter
        setMeta('twitter:title', title);
        setMeta('twitter:description', description);
        setMeta('twitter:image', image);

    }, [view, product]);
};
