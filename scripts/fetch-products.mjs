/**
 * fetch-products.mjs
 * Jala todos los productos de upefr.mx (Shopify) y genera src/data/productos.js
 * Uso: node scripts/fetch-products.mjs
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://www.upefr.mx';

// ── Mapeo product_type → mainCategory ──────────────────────────────────────
const CATEGORY_MAP = {
    'Camisa': 'industrial',
    'Camiseta': 'industrial',
    'Camiseta manga larga': 'industrial',
    'Pantalón': 'industrial',
    'Jean': 'industrial',
    'Chaqueta': 'industrial',
    'Chamarra': 'industrial',
    'Mono': 'industrial',
    'Sudadera': 'industrial',
    'Chaleco': 'industrial',
    'Chaleco de Seguridad': 'industrial',
    'Parka': 'industrial',
    'Bota': 'calzado',
    'Zapato': 'calzado',
    'Calzado': 'calzado',
    'Calzoncillos': 'accesorios',
    'Pasa montañas': 'accesorios',
    'Pasamontañas': 'accesorios',
    'Guantes': 'epp',
    'Casco': 'epp',
    'Lentes': 'epp',
    'Respirador': 'epp',
};

// ── Mapeo tipoprenda ────────────────────────────────────────────────────────
const TIPO_MAP = {
    'Camisa': 'Camisa industrial',
    'Camiseta': 'Playera FR',
    'Camiseta manga larga': 'Playera FR',
    'Pantalón': 'Pantalón FR',
    'Jean': 'Pantalón FR',
    'Chaqueta': 'Chamarra FR',
    'Chamarra': 'Chamarra FR',
    'Mono': 'Overol',
    'Sudadera': 'Playera FR',
    'Chaleco': 'Chaleco FR',
    'Bota': 'Calzado de seguridad',
    'Zapato': 'Calzado de seguridad',
};

// ── Strip HTML ──────────────────────────────────────────────────────────────
const stripHtml = (html) =>
    (html || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();

// Marcas conocidas para validar extracción
const KNOWN_BRANDS = [
    'Ariat', 'Bulwark', 'Carhartt', 'CAT', 'Dickies', 'Red Kap', 'Workrite',
    'Timberland', 'Timberland PRO', 'Wolverine', 'Terra', 'Kodiak', 'Kishigo',
    'Lakeland', 'MCR Safety', 'Best Welds', 'Black Stallion', 'Tillman',
    'PortWest', 'Portwest', 'Stanco', 'Oberon', 'Axe', 'AXE', '3M', 'MSA',
    'Ansell', 'Honeywell', 'Keen', 'DuPont', 'Benchmark',
];

// ── Extraer marca del título ────────────────────────────────────────────────
const extractBrand = (title) => {
    const parts = title.split(' - ');
    if (parts.length >= 2) {
        const candidate = parts[0].trim();
        // Verificar que sea una marca conocida o una palabra corta (≤15 chars, no descripción)
        if (candidate.length <= 20 && !candidate.includes(',')) return candidate;
    }
    // Buscar marca conocida en el título
    const found = KNOWN_BRANDS.find(b => title.startsWith(b));
    return found || 'UPE FR';
};

// ── Extraer SKU del handle ──────────────────────────────────────────────────
const extractSku = (handle, variants) => {
    if (variants?.[0]?.sku) return variants[0].sku;
    // Tomar el último segmento del handle como SKU
    const parts = handle.split('-');
    return parts[parts.length - 1].toUpperCase();
};

// ── Extraer tallas de variantes ─────────────────────────────────────────────
const extractTallas = (variants, options) => {
    const sizeOption = options?.find(o =>
        ['talla', 'size', 'tamaño', 'talle'].includes(o.name.toLowerCase())
    );
    if (sizeOption) return sizeOption.values;
    if (variants?.length > 1) return variants.map(v => v.option1).filter(Boolean);
    return ['S', 'M', 'L', 'XL', '2XL', '3XL'];
};

// ── Fetch con reintentos ────────────────────────────────────────────────────
const fetchJson = async (url, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (e) {
            if (i === retries - 1) throw e;
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
    }
};

// ── Main ───────────────────────────────────────────────────────────────────
const run = async () => {
    console.log('🔄 Obteniendo productos de upefr.mx...\n');

    let allProducts = [];
    let page = 1;

    while (true) {
        const url = `${BASE_URL}/products.json?limit=250&page=${page}`;
        console.log(`  📦 Página ${page}...`);
        const data = await fetchJson(url);

        if (!data.products || data.products.length === 0) break;
        allProducts = allProducts.concat(data.products);
        console.log(`     ${data.products.length} productos obtenidos (total: ${allProducts.length})`);

        if (data.products.length < 250) break;
        page++;
        await new Promise(r => setTimeout(r, 300)); // respetar rate limit
    }

    console.log(`\n✅ Total de productos: ${allProducts.length}`);
    console.log('🔄 Convirtiendo al formato del catálogo...\n');

    const converted = allProducts.map((p, i) => {
        const brand = extractBrand(p.title);
        const productType = p.product_type || '';
        const mainCategory = CATEGORY_MAP[productType] || 'industrial';
        const tipoprenda = TIPO_MAP[productType] || 'Camisa industrial';
        const sku = extractSku(p.handle, p.variants);
        const style = p.handle.split('-').slice(-1)[0].toUpperCase();
        const tallas = extractTallas(p.variants, p.options);
        const image = p.images?.[0]?.src || '';
        const description = stripHtml(p.body_html);

        return {
            id: i + 1,
            title: p.title,
            sku,
            style,
            mainCategory,
            tipoprenda,
            brand,
            sexo: 'Unisex',
            popular: i < 10, // top 10 como populares
            precio: null,
            description: description.slice(0, 400),
            composicion: '',
            tallas,
            colores: [],
            image,
            shopifyId: p.id,
            shopifyHandle: p.handle,
        };
    });

    // ── Generar archivo JS ─────────────────────────────────────────────────
    const output = `// Auto-generado desde upefr.mx — ${new Date().toISOString().slice(0, 10)}
// Total: ${converted.length} productos
export const INITIAL_PRODUCTS = ${JSON.stringify(converted, null, 4)};
`;

    const outPath = resolve(__dirname, '../src/data/productos.js');
    writeFileSync(outPath, output, 'utf-8');

    console.log(`✅ Archivo generado: src/data/productos.js`);
    console.log(`   ${converted.length} productos listos para el catálogo`);

    // ── Resumen por marca ──────────────────────────────────────────────────
    const byBrand = {};
    converted.forEach(p => {
        byBrand[p.brand] = (byBrand[p.brand] || 0) + 1;
    });
    console.log('\n📊 Productos por marca:');
    Object.entries(byBrand).sort((a, b) => b[1] - a[1]).forEach(([brand, count]) => {
        console.log(`   ${brand}: ${count}`);
    });
};

run().catch(console.error);
