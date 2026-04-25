import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Truck, Shield, RefreshCw, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIAS } from '../data/categorias';
import { COMPANY_INFO } from '../data/constants';

const ProductView = ({ product, navigate }) => {
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedImg, setSelectedImg] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);

    if (!product) return (
        <div className="flex-1 flex items-center justify-center py-40">
            <div className="text-center">
                <p className="text-gray-400 text-lg mb-4">Producto no encontrado.</p>
                <button onClick={() => navigate('store')} className="bg-black text-white px-6 py-2 rounded-md text-sm font-bold">
                    Ver catálogo
                </button>
            </div>
        </div>
    );

    const currentColor = product.colores?.[selectedColor];
    const images = currentColor?.imagenes || [product.image];
    const catInfo = CATEGORIAS.find(c => c.id === product.mainCategory);

    const handleColorChange = (idx) => {
        setSelectedColor(idx);
        setSelectedImg(0);
    };

    const prevImg = () => setSelectedImg(p => (p - 1 + images.length) % images.length);
    const nextImg = () => setSelectedImg(p => (p + 1) % images.length);

    const whatsappMsg = encodeURIComponent(
        `Hola, me interesa el producto: ${product.title} (SKU: ${product.sku}). ¿Podrían darme información y cotización?`
    );

    return (
        <div className="flex-1 bg-white">
            {/* Breadcrumb */}
            <div className="border-b border-gray-100 py-3">
                <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-xs text-gray-400">
                    <button onClick={() => navigate('home')} className="hover:text-black transition-colors">Inicio</button>
                    <ChevronRight className="w-3 h-3" />
                    <button onClick={() => navigate('store')} className="hover:text-black transition-colors">Catálogo</button>
                    {catInfo && <>
                        <ChevronRight className="w-3 h-3" />
                        <button onClick={() => navigate('store', { categoria: product.mainCategory })} className="hover:text-black transition-colors">{catInfo.nombre}</button>
                    </>}
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">

                    {/* LEFT — Gallery */}
                    <div className="flex flex-col gap-4">
                        {/* Main image */}
                        <div className="relative h-[480px] md:h-[560px] bg-gray-50 rounded-2xl overflow-hidden group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`${selectedColor}-${selectedImg}`}
                                    src={images[selectedImg]}
                                    alt={`${product.title} - ${currentColor?.nombre}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            {images.length > 1 && (
                                <>
                                    <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                            {product.popular && (
                                <div className="absolute top-4 left-4">
                                    <span className="flex items-center gap-1 bg-[#0057B8] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        <Star className="w-3 h-3 fill-white" /> Más Popular
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImg(i)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === selectedImg ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Details */}
                    <div className="flex flex-col">
                        {/* Brand */}
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-[#0057B8] uppercase tracking-widest">{product.brand}</span>
                            {catInfo && (
                                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest border border-gray-200 px-2 py-0.5 rounded-full">
                                    {catInfo.nombre}
                                </span>
                            )}
                        </div>

                        <h1 className="text-2xl md:text-3xl font-black text-black leading-tight mb-1">{product.title}</h1>
                        <p className="text-xs text-gray-400 mb-4">Estilo: <span className="font-semibold text-gray-600">{product.style}</span> · SKU: <span className="font-semibold text-gray-600">{product.sku}</span></p>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6 border-t border-gray-100 pt-4">{product.description}</p>

                        {/* Color selector */}
                        {product.colores && product.colores.length > 0 && (
                            <div className="mb-5">
                                <p className="text-xs font-bold text-black uppercase tracking-widest mb-2">
                                    Color: <span className="font-normal text-gray-500 normal-case tracking-normal">{currentColor?.nombre}</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.colores.map((color, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleColorChange(i)}
                                            title={color.nombre}
                                            className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${i === selectedColor ? 'border-black scale-110 shadow-md' : 'border-transparent hover:border-gray-400'}`}
                                            style={{ backgroundColor: color.hex }}
                                        >
                                            {i === selectedColor && (
                                                <div className="absolute inset-0.5 rounded-full border-2 border-white pointer-events-none" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size selector */}
                        {product.tallas && product.tallas.length > 0 && (
                            <div className="mb-6">
                                <p className="text-xs font-bold text-black uppercase tracking-widest mb-2">
                                    Talla: <span className="font-normal text-gray-500 normal-case tracking-normal">{selectedSize || 'Selecciona'}</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.tallas.map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedSize(t)}
                                            className={`px-3 py-1.5 text-xs font-semibold border rounded-md transition-all ${selectedSize === t ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Composition */}
                        {product.composicion && (
                            <div className="text-xs text-gray-500 mb-6 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                                <span className="font-bold text-gray-700">Composición: </span>{product.composicion}
                            </div>
                        )}

                        {/* CTAs */}
                        <div className="flex flex-col gap-3 mt-auto">
                            <button
                                onClick={() => navigate('quote', { product })}
                                className="w-full bg-[#0057B8] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#004A9E] transition-colors flex items-center justify-center gap-2"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Solicitar Cotización
                            </button>
                            <a
                                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}?text=${whatsappMsg}`}
                                target="_blank" rel="noopener noreferrer"
                                className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#1fad52] transition-colors flex items-center justify-center gap-2"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                Consultar por WhatsApp
                            </a>
                        </div>

                        {/* Guarantees */}
                        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
                            {[
                                { icon: <Truck className="w-4 h-4" />, text: 'Envío nacional' },
                                { icon: <Shield className="w-4 h-4" />, text: 'Calidad garantizada' },
                                { icon: <RefreshCw className="w-4 h-4" />, text: 'Cambios fáciles' },
                            ].map((g, i) => (
                                <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                                    <div className="text-gray-400">{g.icon}</div>
                                    <span className="text-[10px] text-gray-500 font-medium leading-tight">{g.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
