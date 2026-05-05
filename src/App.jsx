import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SubscriptionPopup from './components/SubscriptionPopup';
import HomeView from './views/HomeView';
import StoreView from './views/StoreView';
import ProductView from './views/ProductView';
import QuoteView from './views/QuoteView';
import AboutView from './views/AboutView';
import ServicesView from './views/ServicesView';
import View360 from './views/View360';
import TermsView from './views/TermsView';
import PrivacyView from './views/PrivacyView';
import BrandsView from './views/BrandsView';
import ContactView from './views/ContactView';
import LoginView from './views/LoginView';
import AdminView from './views/AdminView';
import WelcomeModal from './views/WelcomeModal';
import { INITIAL_PRODUCTS } from './data/productos';
import { COMPANY_INFO } from './data/constants';
import { useSEO } from './hooks/useSEO';

// ─── Hash helpers ────────────────────────────────────────────────────────────
// URL format:  /#/home  |  /#/store?categoria=industrial  |  /#/product/1  |  /#/quote?productId=1
const parseHash = () => {
    const raw = window.location.hash.replace(/^#\/?/, '') || 'home';
    const [path, queryStr] = raw.split('?');
    const segments = path.split('/').filter(Boolean);
    const view = segments[0] || 'home';
    const params = {};
    if (queryStr) new URLSearchParams(queryStr).forEach((v, k) => { params[k] = v; });
    if (view === 'product' && segments[1]) params.id = Number(segments[1]);
    return { view, params };
};

const buildHash = (viewName, extra) => {
    if (viewName === 'product' && extra?.id != null) return `#/product/${extra.id}`;
    if (viewName === 'store') {
        if (!extra) return '#/store';
        const q = new URLSearchParams();
        if (extra.categoria) q.set('categoria', extra.categoria);
        if (extra.brand) q.set('brand', extra.brand);
        if (extra.tipoBusqueda) q.set('tipo', extra.tipoBusqueda);
        const qs = q.toString();
        return `#/store${qs ? '?' + qs : ''}`;
    }
    if (viewName === 'quote' && extra?.product?.id != null)
        return `#/quote?productId=${extra.product.id}`;
    return `#/${viewName}`;
};

// ─── App ─────────────────────────────────────────────────────────────────────
const App = () => {
    const [view, setView] = useState('home');
    const [storeFilter, setStoreFilter] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [quoteProduct, setQuoteProduct] = useState(null);

    // Products — INITIAL_PRODUCTS siempre como base + extras del admin en localStorage
    const [extraProducts, setExtraProducts] = useState(() => {
        try {
            const saved = localStorage.getItem('upefr_extra_products');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });
    const products = [...INITIAL_PRODUCTS, ...extraProducts];
    const setProducts = (updater) => {
        setExtraProducts(prev => {
            const currentExtras = prev;
            const allCurrent = [...INITIAL_PRODUCTS, ...currentExtras];
            const next = typeof updater === 'function' ? updater(allCurrent) : updater;
            // Solo guardar los que NO están en INITIAL_PRODUCTS
            const initialIds = new Set(INITIAL_PRODUCTS.map(p => p.id));
            const newExtras = next.filter(p => !initialIds.has(p.id));
            return newExtras;
        });
    };
    const productsRef = useRef(products);
    useEffect(() => { productsRef.current = products; }, [products]);
    useEffect(() => {
        localStorage.setItem('upefr_extra_products', JSON.stringify(extraProducts));
    }, [extraProducts]);

    // Limpiar localStorage viejo si existe
    useEffect(() => {
        localStorage.removeItem('upefr_products');
    }, []);

    // ── Apply state from hash ──────────────────────────────────────────────
    const applyHash = () => {
        const { view: v, params } = parseHash();
        if (v === 'store') {
            const filter = {};
            if (params.categoria) filter.categoria = params.categoria;
            if (params.brand) filter.brand = params.brand;
            if (params.tipo) filter.tipoBusqueda = params.tipo;
            setStoreFilter(Object.keys(filter).length ? filter : null);
            setView('store');
        } else if (v === 'product') {
            setSelectedProductId(params.id ?? null);
            setView('product');
        } else if (v === 'quote') {
            if (params.productId) {
                const prod = productsRef.current.find(p => p.id === Number(params.productId));
                setQuoteProduct(prod || null);
            } else {
                setQuoteProduct(null);
            }
            setView('quote');
        } else {
            setStoreFilter(null);
            setView(v || 'home');
        }
    };

    // Register hash listener once on mount
    useEffect(() => {
        applyHash();
        window.addEventListener('hashchange', applyHash);
        return () => window.removeEventListener('hashchange', applyHash);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Scroll to top on navigation
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [view, selectedProductId]);

    // ── navigate() ────────────────────────────────────────────────────────
    const navigate = (viewName, extra) => {
        const hash = buildHash(viewName, extra);
        if (window.location.hash === hash) {
            applyHash(); // same hash, force refresh
        } else {
            window.location.hash = hash;
        }
    };

    const selectedProduct = products.find(p => p.id === selectedProductId);

    // SEO dinámico por vista
    useSEO(view, view === 'product' ? selectedProduct : null);

    const handleWhatsAppClick = () => {
        window.open(`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`, '_blank');
    };

    // topbar ~28px + header 60px = 88px
    const NavbarPaddingTop = 'pt-[88px]';

    const renderView = () => {
        switch (view) {
            case 'home':
                return <HomeView products={products} navigate={navigate} />;
            case 'store':
                return <StoreView key={JSON.stringify(storeFilter)} products={products} storeFilter={storeFilter} navigate={navigate} />;
            case 'product':
                if (!selectedProduct) {
                    // Product not found — go home
                    setTimeout(() => navigate('home'), 0);
                    return null;
                }
                return <ProductView product={selectedProduct} navigate={navigate} />;
            case 'quote':
                return <QuoteView product={quoteProduct} navigate={navigate} />;
            case 'about':
                return <AboutView navigate={navigate} />;
            case 'services':
                return <ServicesView navigate={navigate} />;
            case 'upe360':
                return <View360 navigate={navigate} />;
            case 'brands':
                return <BrandsView navigate={navigate} />;
            case 'contact':
                return <ContactView handleWhatsAppClick={handleWhatsAppClick} navigate={navigate} />;
            case 'login':
                return (
                    <LoginView
                        goHome={() => navigate('home')}
                        setIsAuthenticated={() => navigate('admin')}
                    />
                );
            case 'admin':
                return <AdminView products={products} setProducts={setProducts} navigate={navigate} />;
            case 'terms':
                return <TermsView />;
            case 'privacy':
                return <PrivacyView />;
            default:
                return <HomeView products={products} navigate={navigate} />;
        }
    };

    const hideChrome = ['admin', 'login'].includes(view);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar currentView={view} navigate={navigate} />
            <main className={`flex-1 flex flex-col ${NavbarPaddingTop}`}>
                {renderView()}
            </main>
            {!hideChrome && <Footer navigate={navigate} />}
            <WhatsAppButton />
            <SubscriptionPopup />
            <WelcomeModal />
        </div>
    );
};

export default App;
