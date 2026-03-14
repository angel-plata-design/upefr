// Productos enriquecidos con colores, galería, tallas, composición, popularidad
export const INITIAL_PRODUCTS = [
    {
        id: 1,
        title: "Bulwark - Camisa ignífuga ligera resistente a las llamas",
        sku: "10041118",
        style: "BW-LIGHT",
        mainCategory: "industrial",
        tipoprenda: "Camisa industrial",
        brand: "Bulwark",
        sexo: "Hombre",
        popular: true,
        precio: null, // Sin precio visible — cotizar
        description: "Camisa de trabajo FR ligera diseñada para máxima transpirabilidad. Confeccionada con tejido inherente que absorbe la humedad y ofrece secado rápido. Cumple con normativas NFPA 2112, ideal para largas jornadas en el sector petrolero o eléctrico.",
        composicion: "88% Algodón / 12% Nylon FR inherente",
        tallas: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        colores: [
            {
                nombre: "Azul Marino",
                hex: "#1e3a5f",
                imagenes: [
                    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Gris",
                hex: "#6b7280",
                imagenes: [
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Khaki",
                hex: "#c3b091",
                imagenes: [
                    "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1613852348851-df1739db8201?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Bulwark - Chamarra de seguridad alta visibilidad FR",
        sku: "8890211",
        style: "BW-HV-JKT",
        mainCategory: "industrial",
        tipoprenda: "Chamarra",
        brand: "Bulwark",
        sexo: "Unisex",
        popular: true,
        precio: null,
        description: "Chamarra resistente al fuego con cintas reflectantes de 3M. Proporciona protección térmica superior contra el frío y arco eléctrico, manteniendo alta visibilidad en entornos de baja iluminación.",
        composicion: "100% Algodón FR con forro Nomex",
        tallas: ["S", "M", "L", "XL", "2XL", "3XL"],
        colores: [
            {
                nombre: "Naranja Alta Visibilidad",
                hex: "#f97316",
                imagenes: [
                    "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1547955922-85912e223015?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Amarillo Alta Visibilidad",
                hex: "#fbbf24",
                imagenes: [
                    "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Carhartt FR - Overol de trabajo clásico",
        sku: "CH-OVERALL-1",
        style: "CH-OVR",
        mainCategory: "industrial",
        tipoprenda: "Overol",
        brand: "Carhartt",
        sexo: "Hombre",
        popular: true,
        precio: null,
        description: "Overol completo FR con pechera, tirantes elásticos ajustables y múltiples bolsillos para herramientas. Excelente cobertura y protección térmica total. Resistente al arco eléctrico.",
        composicion: "100% Algodón FR Duck",
        tallas: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        colores: [
            {
                nombre: "Marrón Oscuro",
                hex: "#78350f",
                imagenes: [
                    "https://images.unsplash.com/photo-1610415394142-d6b052f52d9b?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1614252368572-a1b2c4667e4f?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1562183241-840b8af0721e?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Azul Marino",
                hex: "#1e3a5f",
                imagenes: [
                    "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1610415394142-d6b052f52d9b?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: "Terra - Bota Logger Shock Shield impermeable",
        sku: "10050840",
        style: "TR-LOGGER",
        mainCategory: "calzado",
        tipoprenda: "Bota industrial",
        brand: "Terra",
        sexo: "Hombre",
        popular: true,
        precio: null,
        description: "Calzado de seguridad industrial de alto rendimiento. Cuero hidrofugado resistente al agua y retardante de llama. Suela antideslizante con protección dieléctrica (EH) y puntera compuesta ultraligera.",
        composicion: "Cuero de primera calidad con suela de goma compuesta",
        tallas: ["25", "26", "27", "28", "29", "30", "31", "32"],
        colores: [
            {
                nombre: "Negro",
                hex: "#111827",
                imagenes: [
                    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1595341596013-640a232fbaec?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Café",
                hex: "#92400e",
                imagenes: [
                    "https://images.unsplash.com/photo-1595341596013-640a232fbaec?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 5,
        title: "MSA - Casco V-Gard con suspensión Fas-Trac",
        sku: "MSA-VGARD-WHT",
        style: "VGARD-STD",
        mainCategory: "epp",
        tipoprenda: "Casco",
        brand: "MSA",
        sexo: "Unisex",
        popular: true,
        precio: null,
        description: "Casco de seguridad tipo cachucha con ranuras. Polietileno de alta densidad. Suspensión de matraca Fas-Trac III para ajuste rápido y seguro. Protección dieléctrica clase E.",
        composicion: "Polietileno de alta densidad (HDPE)",
        tallas: ["Talla única ajustable"],
        colores: [
            {
                nombre: "Blanco",
                hex: "#f9fafb",
                imagenes: [
                    "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1631556097045-917e5b8d1e24?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1618436917352-cd3541d8f9dd?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581093450021-4bef6b83e2b4?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Amarillo",
                hex: "#fbbf24",
                imagenes: [
                    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1631556097045-917e5b8d1e24?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1618436917352-cd3541d8f9dd?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Naranja",
                hex: "#f97316",
                imagenes: [
                    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1631556097045-917e5b8d1e24?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1618436917352-cd3541d8f9dd?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 6,
        title: "Dickies - Camisa corporativa manga larga Oxford",
        sku: "DCK-OXF-01",
        style: "DCK-OXFORD",
        mainCategory: "corporativo",
        tipoprenda: "Camisa de vestir",
        brand: "Dickies",
        sexo: "Hombre",
        popular: true,
        precio: null,
        description: "Camisa corporativa de popelina Oxford. Ideal para uniformes empresariales de oficina, recepción y servicio al cliente. Corte regular, cuello punto, puño con botón.",
        composicion: "65% Poliéster / 35% Algodón",
        tallas: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colores: [
            {
                nombre: "Blanco",
                hex: "#ffffff",
                imagenes: [
                    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Azul Cielo",
                hex: "#bfdbfe",
                imagenes: [
                    "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 7,
        title: "Dickies Medical - Scrub Set manga corta",
        sku: "DCK-MED-01",
        style: "DCK-SCRUB",
        mainCategory: "medico",
        tipoprenda: "Scrub",
        brand: "Dickies Medical",
        sexo: "Mujer",
        popular: true,
        precio: null,
        description: "Conjunto de scrub ligero y cómodo para profesionales de la salud. Tela de alta resistencia fácil de lavar, con múltiples bolsillos funcionales. Diseño moderno y profesional.",
        composicion: "55% Algodón / 45% Poliéster",
        tallas: ["XS", "S", "M", "L", "XL", "2XL"],
        colores: [
            {
                nombre: "Verde Quirúrgico",
                hex: "#065f46",
                imagenes: [
                    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1583912267550-d6aae0da7e07?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Azul Royal",
                hex: "#1d4ed8",
                imagenes: [
                    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1583912267550-d6aae0da7e07?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Blanco",
                hex: "#f9fafb",
                imagenes: [
                    "https://images.unsplash.com/photo-1583912267550-d6aae0da7e07?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 8,
        title: "Benchmark - Polo corporativo manga corta Dri-Balance",
        sku: "BM-POLO-01",
        style: "BM-POLO",
        mainCategory: "corporativo",
        tipoprenda: "Polo",
        brand: "Benchmark",
        sexo: "Unisex",
        popular: false,
        precio: null,
        description: "Polo de desempeño con tecnología Dri-Balance para mantenerte fresco. Perfecto para uniformes corporativos de ventas, recepción o servicio al cliente. Fácil cuidado, tela resistente a manchas.",
        composicion: "100% Poliéster microfibra Dri-Balance",
        tallas: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        colores: [
            {
                nombre: "Negro",
                hex: "#111827",
                imagenes: [
                    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Rojo",
                hex: "#dc2626",
                imagenes: [
                    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 9,
        title: "Red Kap - Pantalón industrial cargo resistente",
        sku: "RK-CARGO-01",
        style: "PT20",
        mainCategory: "industrial",
        tipoprenda: "Pantalón cargo",
        brand: "Red Kap",
        sexo: "Hombre",
        popular: false,
        precio: null,
        description: "Pantalón cargo industrial de alta resistencia. Tela ripstop reforzada en rodillas y fondillo. Múltiples bolsillos funcionales, cintura elástica en espalda. Resistente a manchas industriales.",
        composicion: "65% Poliéster / 35% Algodón ripstop",
        tallas: ["28", "30", "32", "34", "36", "38", "40", "42"],
        colores: [
            {
                nombre: "Azul Marino",
                hex: "#1e3a5f",
                imagenes: [
                    "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1565084888279-aca607bb7ef0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Gris Oscuro",
                hex: "#374151",
                imagenes: [
                    "https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1565084888279-aca607bb7ef0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 10,
        title: "Ansell - Guantes ActivArmr resistentes al fuego y corte",
        sku: "ANS-GLV-FR",
        style: "ACTIVARMR-97",
        mainCategory: "epp",
        tipoprenda: "Guantes",
        brand: "Ansell",
        sexo: "Unisex",
        popular: false,
        precio: null,
        description: "Guantes de protección industrial avanzados. Resistencia al arco eléctrico (Nivel 2), protección contra llamas y alta resistencia a cortes y abrasiones.",
        composicion: "Fibra Kevlar / Algodón FR con recubrimiento de nitrilo",
        tallas: ["S (7)", "M (8)", "L (9)", "XL (10)", "2XL (11)"],
        colores: [
            {
                nombre: "Negro/Gris",
                hex: "#1f2937",
                imagenes: [
                    "https://images.unsplash.com/photo-1618436917352-cd3541d8f9dd?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1631556097045-917e5b8d1e24?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1618436917352-cd3541d8f9dd?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 11,
        title: "Benchmark - Filipina de cocina manga corta",
        sku: "BM-CHEF-01",
        style: "BM-COOK",
        mainCategory: "restaurante",
        tipoprenda: "Filipina",
        brand: "Benchmark",
        sexo: "Unisex",
        popular: false,
        precio: null,
        description: "Filipina de cocina profesional de doble pechera, resistente a manchas y de fácil lavado. Botones de perla, puños ajustables. Ideal para brigadas de cocina y restaurantes.",
        composicion: "65% Poliéster / 35% Algodón",
        tallas: ["XS", "S", "M", "L", "XL", "2XL"],
        colores: [
            {
                nombre: "Blanco",
                hex: "#f9fafb",
                imagenes: [
                    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Negro",
                hex: "#111827",
                imagenes: [
                    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 12,
        title: "Timberland PRO - Bota Boondock 6\" Impermeable",
        sku: "TB-PRO-BDK",
        style: "BOONDOCK-6",
        mainCategory: "calzado",
        tipoprenda: "Bota industrial",
        brand: "Timberland PRO",
        sexo: "Hombre",
        popular: false,
        precio: null,
        description: "Bota de trabajo rudo con tecnología antifatiga. Puntera de material compuesto asimétrica y cuero impermeable premium. Suela de TPU resistente al frío, aceites y abrasiones.",
        composicion: "Cuero premium full-grain / Suela Rubber Lug",
        tallas: ["25", "26", "27", "28", "29", "30", "31"],
        colores: [
            {
                nombre: "Trigo",
                hex: "#d4a166",
                imagenes: [
                    "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1595341596013-640a232fbaec?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Negro",
                hex: "#111827",
                imagenes: [
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1595341596013-640a232fbaec?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 13,
        title: "Kishigo - Chaleco de alta visibilidad Clase 2",
        sku: "KIS-HV-01",
        style: "1910",
        mainCategory: "accesorios",
        tipoprenda: "Chaleco de alta visibilidad",
        brand: "Kishigo",
        sexo: "Unisex",
        popular: false,
        precio: null,
        description: "Chaleco de alta visibilidad certificado ANSI/ISEA Clase 2. Malla transpirable, cierres de velcro y 2 bolsillos frontales. Cintas reflectantes de 5 cm. Para dirección de tráfico, construcción y obra.",
        composicion: "100% Poliéster malla alta visibilidad",
        tallas: ["S/M", "L/XL", "2XL/3XL", "4XL/5XL"],
        colores: [
            {
                nombre: "Amarillo/Lima",
                hex: "#a3e635",
                imagenes: [
                    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1547551100-a1c4f6a99058?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581093450021-4bef6b83e2b4?auto=format&fit=crop&q=80&w=800",
                ]
            },
            {
                nombre: "Naranja",
                hex: "#f97316",
                imagenes: [
                    "https://images.unsplash.com/photo-1547551100-a1c4f6a99058?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581093450021-4bef6b83e2b4?auto=format&fit=crop&q=80&w=800",
                ]
            },
        ],
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    },
];
