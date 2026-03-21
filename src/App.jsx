import React, { useState, useEffect } from 'react';
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
import WelcomeModal from './views/WelcomeModal';
import { INITIAL_PRODUCTS } from './data/productos';

const App = () => {
    const [view, setView] = useState('home');
    const [storeFilter, setStoreFilter] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [products] = useState(INITIAL_PRODUCTS);

    // Scroll to top on view change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [view, selectedProductId]);

    // navigate(viewName, extraParams)
    const navigate = (viewName, extra) => {
        if (viewName === 'store') {
            setStoreFilter(extra || null);
            setView('store');
        } else if (viewName === 'product') {
            setSelectedProductId(extra?.id || null);
            setView('product');
        } else {
            setView(viewName);
        }
    };

    const selectedProduct = products.find(p => p.id === selectedProductId);

    // topbar ~28px + header 60px = 88px
    const NavbarPaddingTop = 'pt-[88px]';

    const renderView = () => {
        switch (view) {
            case 'home':
                return <HomeView products={products} navigate={navigate} />;
            case 'store':
                return <StoreView products={products} storeFilter={storeFilter} navigate={navigate} />;
            case 'product':
                return <ProductView product={selectedProduct} navigate={navigate} />;
            case 'quote':
                return <QuoteView />;
            case 'about':
                return <AboutView navigate={navigate} />;
            case 'services':
                return <ServicesView navigate={navigate} />;
            case 'upe360':
                return <View360 navigate={navigate} />;
            case 'brands':
                return <BrandsView navigate={navigate} />;
            case 'terms':
                return <TermsView />;
            case 'privacy':
                return <PrivacyView />;
            default:
                return <HomeView products={products} navigate={navigate} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar currentView={view} navigate={navigate} />
            <main className={`flex-1 flex flex-col ${NavbarPaddingTop}`}>
                {renderView()}
            </main>
            <Footer navigate={navigate} />
            <WhatsAppButton />
            <SubscriptionPopup />
            <WelcomeModal />
        </div>
    );
};

export default App;