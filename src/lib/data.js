export const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'telefonos', label: 'Teléfonos' },
  { id: 'laptops', label: 'Laptops' },
  { id: 'audio', label: 'Audio' },
  { id: 'videojuegos', label: 'Videojuegos' },
];

// 6 productos destacados para el carrusel de la página principal
export const CAROUSEL_PRODUCTS = [
  {
    id: 'prod_iphone17',
    name: 'iPhone 17 Pro Max',
    price: 6935960,
    currency: 'COP',
    category: 'telefonos',
    description: 'El iPhone más avanzado con chip A18 Bionic, diseño de titanio aeroespacial y sistema de cámaras pro con teleobjetivo de 5x. Pantalla Super Retina XDR de 6.7 pulgadas con ProMotion.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_s24ultra',
    name: 'Samsung Galaxy S24 Ultra',
    price: 2900900,
    currency: 'COP',
    category: 'telefonos',
    description: 'Inteligencia artificial avanzada, S Pen integrado y cámara principal de 200MP. Rendimiento superior para gaming y productividad con el procesador Snapdragon 8 Gen 3 for Galaxy.',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_macbook',
    name: 'MacBook Air',
    price: 4499000,
    currency: 'COP',
    category: 'laptops',
    description: 'Superpotenciado por el chip M3 de Apple, diseño ultradelgado, chasis de aluminio 100% reciclado y batería para hasta 18 horas de uso ininterrumpido.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_airpods',
    name: 'AirPods Max',
    price: 2799000,
    currency: 'COP',
    category: 'audio',
    description: 'Audio de alta fidelidad, cancelación activa de ruido líder en la industria y diseño over-ear premium para un ajuste excepcional y acústica inmersiva.',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_ps5',
    name: 'PlayStation 5',
    price: 3344900,
    currency: 'COP',
    category: 'videojuegos',
    description: 'Juegos de próxima generación con tiempos de carga ultrarrápidos gracias a su SSD de alta velocidad, respuesta háptica, gatillos adaptativos y audio 3D.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_xbox_series_x',
    name: 'Xbox Series X',
    price: 3299000,
    currency: 'COP',
    category: 'videojuegos',
    description: 'La consola Xbox más potente con 12 teraflops de potencia gráfica, resolución hasta 4K a 120fps, SSD de 1TB y retrocompatibilidad con cuatro generaciones de juegos.',
    image: 'https://images.hostinger.com/55c3cda2-a1b7-4d87-add0-3cd80aed4977.png'
  }
];

export const FEATURED_PRODUCTS = [
  {
    id: 'prod_iphone17',
    name: 'iPhone 17 Pro Max',
    price: 6935960,
    currency: 'COP',
    category: 'telefonos',
    description: 'El iPhone más avanzado con chip A18 Bionic, diseño de titanio aeroespacial y sistema de cámaras pro con teleobjetivo de 5x. Pantalla Super Retina XDR de 6.7 pulgadas con ProMotion.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_iphone16',
    name: 'iPhone 16',
    price: 4499000,
    currency: 'COP',
    category: 'telefonos',
    description: 'El iPhone 16 combina el chip A18 con un sistema de cámaras renovado de 48MP, Control de Cámara táctil y USB-C. Pantalla OLED de 6.1 pulgadas con Dynamic Island y batería de larga duración.',
    image: 'https://images.hostinger.com/93c68cb6-3a09-4a0f-ad94-2849b29521ab.png'
  },
  {
    id: 'prod_motorola_edge50',
    name: 'Motorola Edge 50',
    price: 2299000,
    currency: 'COP',
    category: 'telefonos',
    description: 'Pantalla pOLED curva de 6.7 pulgadas con 144Hz, cámara de 50MP con estabilización óptica y diseño ultradelgado con acabado vegano. Carga rápida de 68W y procesador Snapdragon 7 Gen 1.',
    image: 'https://images.hostinger.com/70455a8b-069a-442c-ad06-b9d450d5fff7.png'
  },
  {
    id: 'prod_s24ultra',
    name: 'Samsung Galaxy S24 Ultra',
    price: 2900900,
    currency: 'COP',
    category: 'telefonos',
    description: 'Inteligencia artificial avanzada, S Pen integrado y cámara principal de 200MP. Rendimiento superior para gaming y productividad con el procesador Snapdragon 8 Gen 3 for Galaxy.',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_macbook',
    name: 'MacBook Air',
    price: 4499000,
    currency: 'COP',
    category: 'laptops',
    description: 'Superpotenciado por el chip M3 de Apple, diseño ultradelgado, chasis de aluminio 100% reciclado y batería para hasta 18 horas de uso ininterrumpido.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_asus_rog',
    name: 'ASUS ROG Strix G16',
    price: 6999000,
    currency: 'COP',
    category: 'laptops',
    description: 'Laptop gamer de alto rendimiento con procesador Intel Core i9 de 13ª generación, gráficos NVIDIA RTX 4070, pantalla de 16 pulgadas a 240Hz y teclado RGB con retroiluminación personalizable.',
    image: 'https://images.hostinger.com/26675bb9-9464-4e64-b0e1-dc58d48f069d.png'
  },
  {
    id: 'prod_hp_pavilion',
    name: 'HP Pavilion 15',
    price: 3499000,
    currency: 'COP',
    category: 'laptops',
    description: 'Laptop versátil con procesador AMD Ryzen 7, 16GB de RAM y SSD de 512GB. Pantalla IPS de 15.6 pulgadas Full HD ideal para trabajo, estudio y entretenimiento diario.',
    image: 'https://images.hostinger.com/201d9d80-c358-49c4-a788-a3a75c01bab0.png'
  },
  {
    id: 'prod_airpods',
    name: 'AirPods Max',
    price: 2799000,
    currency: 'COP',
    category: 'audio',
    description: 'Audio de alta fidelidad, cancelación activa de ruido líder en la industria y diseño over-ear premium para un ajuste excepcional y acústica inmersiva.',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_sony_wh1000xm5',
    name: 'Sony WH-1000XM5',
    price: 1299000,
    currency: 'COP',
    category: 'audio',
    description: 'Auriculares inalámbricos con la mejor cancelación de ruido del mercado, sonido de alta resolución, 30 horas de batería y llamadas con claridad cristalina gracias a sus 8 micrófonos.',
    image: 'https://images.hostinger.com/61872064-a9d7-43a9-9dd1-71ea00015670.png'
  },
  {
    id: 'prod_jbl_charge5',
    name: 'JBL Charge 5',
    price: 649000,
    currency: 'COP',
    category: 'audio',
    description: 'Bocina portátil Bluetooth con sonido JBL Pro, bajos potentes, resistente al agua y al polvo (IP67) y 20 horas de reproducción. Funciona como power bank para cargar tus dispositivos.',
    image: 'https://images.hostinger.com/bff90fea-77bd-4d29-99da-f88cc877eb46.png'
  },
  {
    id: 'prod_alexa',
    name: 'Amazon Alexa',
    price: 348166,
    currency: 'COP',
    category: 'audio',
    description: 'Altavoz inteligente Echo Dot con control por voz, sonido envolvente mejorado y compatibilidad con cientos de dispositivos de hogar inteligente.',
    image: 'https://images.unsplash.com/photo-1568910748155-01cb99b373ce?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_ps5',
    name: 'PlayStation 5',
    price: 3344900,
    currency: 'COP',
    category: 'videojuegos',
    description: 'Juegos de próxima generación con tiempos de carga ultrarrápidos gracias a su SSD de alta velocidad, respuesta háptica, gatillos adaptativos y audio 3D.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod_nintendo_switch',
    name: 'Nintendo Switch OLED',
    price: 1899000,
    currency: 'COP',
    category: 'videojuegos',
    description: 'Consola híbrida con vibrante pantalla OLED de 7 pulgadas, modo portátil, de mesa y TV. Joy-Con con colores rojo y azul neón y 64GB de almacenamiento interno.',
    image: 'https://images.hostinger.com/228536ab-2fa1-445f-8560-8489f9df4f0f.png'
  },
  {
    id: 'prod_xbox_series_x',
    name: 'Xbox Series X',
    price: 3299000,
    currency: 'COP',
    category: 'videojuegos',
    description: 'La consola Xbox más potente con 12 teraflops de potencia gráfica, resolución hasta 4K a 120fps, SSD de 1TB y retrocompatibilidad con cuatro generaciones de juegos.',
    image: 'https://images.hostinger.com/55c3cda2-a1b7-4d87-add0-3cd80aed4977.png'
  }
];
