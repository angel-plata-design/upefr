import React, { useState, useMemo, useEffect } from 'react';
import { FilterX, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIAS } from '../data/categorias';

// Helper: find the real brand name in products using case-insensitive + prefix match
const findRealBrand = (products, brandQuery) => {
    if (!brandQuery) return null;
    const lower = brandQuery.toLowerCase();
    // 1. Exact case-insensitive match
    const exact = products.find(p => p.brand && p.brand.toLowerCase() === lower);
    if (exact) return exact.brand;
    // 2. Prefix match — e.g. "Carhartt FR" matches product brand "Carhartt"
    //    or product brand "Carhartt FR" matches query "Carhartt"
    const prefix = products.find(p => {
        if (!p.brand) return false;
        const pLower = p.brand.toLowerCase();
        return pLower.startsWith(lower) || lower.startsWith(pLower);
    });
    return prefix ? prefix.brand : brandQuery;
};

// Helper: find the real tipoprenda matching a query (handles plural/singular, partial match)
const findRealTipo = (products, tipoQuery) => {
    if (!tipoQuery) return null;
    const lower = tipoQuery.toLowerCase();
    // Try exact match first
    const exact = products.find(p => p.tipoprenda && p.tipoprenda.toLowerCase() === lower);
    if (exact) return exact.tipoprenda;
    // Try partial match (e.g. "Camisas FR" matches "Camisa FR" or "Camisa industrial")
    const queryBase = lower.replace(/s\b/g, '').replace(/es\b/g, ''); // strip plurals
    const found = products.find(p => {
        if (!p.tipoprenda) return false;
        const pBase = p.tipoprenda.toLowerCase().replace(/s\b/g, '').replace(/es\b/g, '');
        return pBase.includes(queryBase) || queryBase.includes(pBase);
    });
    return found ? found.tipoprenda : tipoQuery;
};

// Interleave products from different categories for visual variety
const diversifyShuffle = (prods) => {
    const byCategory = {};
    prods.forEach(p => {
        const cat = p.mainCategory || 'other';
        if (!byCategory[cat]) byCategory[cat] = [];
        byCategory[cat].push(p);
    });
    const cats = Object.keys(byCategory);
    if (cats.length <= 1) return prods;
    const result = [];
    const maxLen = Math.max(...cats.map(c => byCategory[c].length));
    for (let i = 0; i < maxLen; i++) {
        for (const cat of cats) {
            if (i < byCategory[cat].length) result.push(byCategory[cat][i]);
        }
    }
    return result;
};

const StoreView = ({ products, storeFilter, navigate }) => {
    const [search, setSearch] = useState('');
    const [activeCategoria, setActiveCategoria] = useState(storeFilter?.categoria || 'todos');
    const [activeSexo, setActiveSexo] = useState(null);
    const [activeBrand, setActiveBrand] = useState(() => findRealBrand(products, storeFilter?.brand));
    const [activeTipo, setActiveTipo] = useState(() => findRealTipo(products, storeFilter?.tipoBusqueda));
    const [showFilters, setShowFilters] = useState(false);

    // Sync filters when storeFilter prop changes (navigation from other views)
    useEffect(() => {
        setActiveCategoria(storeFilter?.categoria || 'todos');
        setActiveBrand(findRealBrand(products, storeFilter?.brand));
        setActiveTipo(findRealTipo(products, storeFilter?.tipoBusqueda));
        setActiveSexo(null);
        setSearch('');
    }, [storeFilter]);

    const clearAll = () => {
        setActiveCategoria('todos'); setActiveSexo(null);
        setActiveBrand(null); setActiveTipo(null); setSearch('');
    };

    const displayed = useMemo(() => {
        let r = products;
        if (activeCategoria !== 'todos') r = r.filter(p => p.mainCategory === activeCategoria);
        if (activeSexo) r = r.filter(p => p.sexo === activeSexo || p.sexo === 'Unisex');
        if (activeBrand) {
            const brandLower = activeBrand.toLowerCase();
            r = r.filter(p => {
                if (!p.brand) return false;
                const pLower = p.brand.toLowerCase();
                return pLower === brandLower || pLower.startsWith(brandLower) || brandLower.startsWith(pLower);
            });
        }
        if (activeTipo) r = r.filter(p => p.tipoprenda && p.tipoprenda.toLowerCase() === activeTipo.toLowerCase());
        if (search) r = r.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || (p.brand && p.brand.toLowerCase().includes(search.toLowerCase())));
        // If no filters, diversify display so it's not all boots
        const noFilters = activeCategoria === 'todos' && !activeSexo && !activeBrand && !activeTipo && !search;
        return noFilters ? diversifyShuffle(r) : r;
    }, [products, activeCategoria, activeSexo, activeBrand, activeTipo, search]);

    const availableBrands = useMemo(() => [...new Set(
        (activeCategoria !== 'todos' ? products.filter(p => p.mainCategory === activeCategoria) : products)
            .map(p => p.brand).filter(Boolean)
    )].sort(), [products, activeCategoria]);

    const availableTipos = useMemo(() => [...new Set(
        (activeCategoria !== 'todos' ? products.filter(p => p.mainCategory === activeCategoria) : products)
            .map(p => p.tipoprenda).filter(Boolean)
    )].sort(), [products, activeCategoria]);

    const hasFilters = activeCategoria !== 'todos' || activeSexo || activeBrand || activeTipo || search;

    const FilterSection = ({ title, children }) => (
        <div className="border-b border-gray-100 pb-4 mb-4">
            <p className="text-xs font-bold text-black uppercase tracking-widest mb-3">{title}</p>
            {children}
        </div>
    );

    const RadioOpt = ({ label, checked, onChange }) => (
        <label className="flex items-center gap-2 cursor-pointer group py-1">
            <input type="radio" className="accent-[#0057B8]" checked={checked} onChange={onChange} />
            <span className={`text-sm transition-colors ${checked ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-black'}`}>{label}</span>
        </label>
    );

    const SidebarContent = () => (
        <div className="flex flex-col gap-0">
            <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{displayed.length} resultado{displayed.length !== 1 ? 's' : ''}</span>
                {hasFilters && (
                    <button onClick={clearAll} className="text-xs text-[#0057B8] font-bold uppercase tracking-wider hover:underline">Limpiar todo</button>
                )}
            </div>

            <FilterSection title="Categoría">
                <RadioOpt label="Todos" checked={activeCategoria === 'todos'} onChange={() => { setActiveCategoria('todos'); setActiveBrand(null); setActiveTipo(null); }} />
                {CATEGORIAS.map(cat => (
                    <RadioOpt key={cat.id} label={cat.nombre} checked={activeCategoria === cat.id}
                        onChange={() => { setActiveCategoria(cat.id); setActiveBrand(null); setActiveTipo(null); }} />
                ))}
            </FilterSection>

            <FilterSection title="Sexo">
                <RadioOpt label="Todos" checked={!activeSexo} onChange={() => setActiveSexo(null)} />
                {['Hombre', 'Mujer', 'Unisex'].map(s => (
                    <RadioOpt key={s} label={s} checked={activeSexo === s} onChange={() => setActiveSexo(s)} />
                ))}
            </FilterSection>

            {availableTipos.length > 0 && (
                <FilterSection title="Tipo de prenda">
                    <RadioOpt label="Todos" checked={!activeTipo} onChange={() => setActiveTipo(null)} />
                    {availableTipos.map(t => (
                        <RadioOpt key={t} label={t} checked={activeTipo === t} onChange={() => setActiveTipo(t)} />
                    ))}
                </FilterSection>
            )}

            {availableBrands.length > 0 && (
                <FilterSection title="Marca">
                    <RadioOpt label="Todas" checked={!activeBrand} onChange={() => setActiveBrand(null)} />
                    <div className="max-h-44 overflow-y-auto pr-1 flex flex-col">
                        {availableBrands.map(b => (
                            <RadioOpt key={b} label={b} checked={activeBrand === b} onChange={() => setActiveBrand(b)} />
                        ))}
                    </div>
                </FilterSection>
            )}
        </div>
    );

    return (
        <div className="flex-1 bg-white min-h-screen">
            {/* Banner */}
            <div className="bg-[#f5f5f5] border-b border-gray-200 py-14">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-2">Catálogo</h1>
                    <p className="text-gray-500 text-sm max-w-xl">Explora nuestro portafolio completo. Selecciona los productos de tu interés y solicita cotización empresarial.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search + mobile filter toggle */}
                <div className="flex gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text" placeholder="Buscar productos o marcas..."
                            value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">
                        <SlidersHorizontal className="w-4 h-4" /> Filtros
                    </button>
                </div>

                {/* Active filter badges */}
                {hasFilters && (
                    <div className="flex flex-wrap gap-2 mb-5">
                        {activeCategoria !== 'todos' && (
                            <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
                                {CATEGORIAS.find(c => c.id === activeCategoria)?.nombre}
                                <button onClick={() => setActiveCategoria('todos')}><X className="w-3 h-3" /></button>
                            </span>
                        )}
                        {activeSexo && (
                            <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
                                {activeSexo}<button onClick={() => setActiveSexo(null)}><X className="w-3 h-3" /></button>
                            </span>
                        )}
                        {activeBrand && (
                            <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
                                {activeBrand}<button onClick={() => setActiveBrand(null)}><X className="w-3 h-3" /></button>
                            </span>
                        )}
                        {activeTipo && (
                            <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
                                {activeTipo}<button onClick={() => setActiveTipo(null)}><X className="w-3 h-3" /></button>
                            </span>
                        )}
                    </div>
                )}

                <div className="flex gap-8">
                    {/* Sidebar desktop */}
                    <aside className="hidden lg:block w-56 flex-shrink-0">
                        <SidebarContent />
                    </aside>

                    {/* Mobile sidebar overlay */}
                    {showFilters && (
                        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setShowFilters(false)}>
                            <div className="absolute right-0 top-0 h-full w-72 bg-white p-5 overflow-y-auto" onClick={e => e.stopPropagation()}>
                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="font-bold text-black">Filtros</h3>
                                    <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
                                </div>
                                <SidebarContent />
                            </div>
                        </div>
                    )}

                    {/* Grid */}
                    <div className="flex-1">
                        {displayed.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <FilterX className="w-12 h-12 text-gray-200 mb-4" />
                                <p className="text-gray-500 font-medium mb-3">No hay productos con estos filtros.</p>
                                <button onClick={clearAll} className="text-sm font-bold text-black underline underline-offset-4">Limpiar filtros</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {displayed.map(product => (
                                    <div
                                        key={product.id}
                                        onClick={() => navigate('product', { id: product.id })}
                                        className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="relative h-52 bg-gray-50 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {product.popular && (
                                                <span className="absolute top-2 left-2 bg-[#0057B8] text-white text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">
                                                    Popular
                                                </span>
                                            )}
                                            {/* Color dots */}
                                            {product.colores?.length > 1 && (
                                                <div className="absolute bottom-2 right-2 flex gap-1">
                                                    {product.colores.slice(0, 4).map((c, i) => (
                                                        <div key={i} className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ backgroundColor: c.hex }} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">{product.brand}</p>
                                            <h3 className="text-sm font-semibold text-black leading-snug line-clamp-2 mb-2">{product.title}</h3>
                                            <span className="text-xs font-semibold text-[#0057B8] uppercase tracking-wider">Cotizar →</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreView;
