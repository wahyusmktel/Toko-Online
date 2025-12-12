// Mock Data for ShopRed E-Commerce

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  sold: number;
  category: string;
  description: string;
  stock: number;
  variants?: { name: string; options: string[] }[];
  shop: {
    name: string;
    location: string;
    rating: number;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export const categories: Category[] = [
  { id: "1", name: "Elektronik", icon: "Smartphone", color: "#EE4D2D" },
  { id: "2", name: "Fashion Pria", icon: "Shirt", color: "#2196F3" },
  { id: "3", name: "Fashion Wanita", icon: "ShoppingBag", color: "#E91E63" },
  { id: "4", name: "Kecantikan", icon: "Sparkles", color: "#9C27B0" },
  { id: "5", name: "Kesehatan", icon: "Heart", color: "#4CAF50" },
  { id: "6", name: "Rumah Tangga", icon: "Home", color: "#FF9800" },
  { id: "7", name: "Olahraga", icon: "Dumbbell", color: "#00BCD4" },
  { id: "8", name: "Makanan", icon: "UtensilsCrossed", color: "#795548" },
  { id: "9", name: "Mainan", icon: "Gamepad2", color: "#673AB7" },
  { id: "10", name: "Otomotif", icon: "Car", color: "#607D8B" },
];

export const banners: Banner[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
    title: "Flash Sale 12.12",
    subtitle: "Diskon hingga 90%",
    link: "/flash-sale",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop",
    title: "Fashion Week",
    subtitle: "Koleksi Terbaru",
    link: "/products?category=fashion",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=400&fit=crop",
    title: "Tech Deals",
    subtitle: "Gadget Terbaik",
    link: "/products?category=elektronik",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB - Natural Titanium",
    price: 21999000,
    originalPrice: 24999000,
    discount: 12,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    rating: 4.9,
    sold: 2543,
    category: "Elektronik",
    description: "iPhone 15 Pro Max dengan chip A17 Pro, kamera 48MP, dan bodi titanium premium.",
    stock: 50,
    variants: [
      { name: "Warna", options: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"] },
      { name: "Kapasitas", options: ["256GB", "512GB", "1TB"] },
    ],
    shop: { name: "Apple Official Store", location: "Jakarta Selatan", rating: 4.9 },
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 19499000,
    originalPrice: 22999000,
    discount: 15,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    rating: 4.8,
    sold: 1876,
    category: "Elektronik",
    description: "Galaxy S24 Ultra dengan S Pen terintegrasi dan kamera 200MP.",
    stock: 35,
    variants: [
      { name: "Warna", options: ["Titanium Gray", "Titanium Black", "Titanium Violet"] },
    ],
    shop: { name: "Samsung Indonesia", location: "Jakarta Pusat", rating: 4.8 },
  },
  {
    id: "3",
    name: "MacBook Pro 14 M3 Pro 512GB",
    price: 32999000,
    originalPrice: 35999000,
    discount: 8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    sold: 892,
    category: "Elektronik",
    description: "MacBook Pro dengan chip M3 Pro, layar Liquid Retina XDR, dan baterai hingga 17 jam.",
    stock: 25,
    variants: [
      { name: "Warna", options: ["Space Black", "Silver"] },
      { name: "RAM", options: ["18GB", "36GB"] },
    ],
    shop: { name: "Apple Official Store", location: "Jakarta Selatan", rating: 4.9 },
  },
  {
    id: "4",
    name: "Nike Air Jordan 1 Retro High OG",
    price: 2899000,
    originalPrice: 3599000,
    discount: 19,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.7,
    sold: 5621,
    category: "Fashion Pria",
    description: "Sepatu ikonik dengan desain klasik dan kenyamanan maksimal.",
    stock: 100,
    variants: [
      { name: "Ukuran", options: ["40", "41", "42", "43", "44", "45"] },
    ],
    shop: { name: "Nike Official", location: "Bandung", rating: 4.8 },
  },
  {
    id: "5",
    name: "Kemeja Linen Premium Relaxed Fit",
    price: 299000,
    originalPrice: 459000,
    discount: 35,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
    rating: 4.6,
    sold: 3421,
    category: "Fashion Pria",
    description: "Kemeja linen premium dengan potongan relaxed fit yang nyaman.",
    stock: 200,
    variants: [
      { name: "Warna", options: ["White", "Light Blue", "Beige", "Navy"] },
      { name: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] },
    ],
    shop: { name: "UNIQLO Indonesia", location: "Jakarta", rating: 4.7 },
  },
  {
    id: "6",
    name: "Dress Midi Floral Summer Collection",
    price: 389000,
    originalPrice: 549000,
    discount: 29,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    rating: 4.8,
    sold: 2156,
    category: "Fashion Wanita",
    description: "Dress midi dengan motif floral cantik untuk tampilan musim panas.",
    stock: 150,
    variants: [
      { name: "Warna", options: ["Pink Floral", "Blue Floral", "Yellow Floral"] },
      { name: "Ukuran", options: ["XS", "S", "M", "L"] },
    ],
    shop: { name: "Zara Indonesia", location: "Surabaya", rating: 4.6 },
  },
  {
    id: "7",
    name: "Tas Selempang Kulit Premium",
    price: 599000,
    originalPrice: 899000,
    discount: 33,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    rating: 4.7,
    sold: 1823,
    category: "Fashion Wanita",
    description: "Tas selempang kulit asli dengan desain elegan dan praktis.",
    stock: 80,
    variants: [
      { name: "Warna", options: ["Black", "Brown", "Tan", "Burgundy"] },
    ],
    shop: { name: "Fossil Official", location: "Jakarta", rating: 4.8 },
  },
  {
    id: "8",
    name: "Serum Vitamin C 20% Brightening",
    price: 189000,
    originalPrice: 289000,
    discount: 35,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    rating: 4.8,
    sold: 12543,
    category: "Kecantikan",
    description: "Serum vitamin C 20% untuk mencerahkan dan meratakan warna kulit.",
    stock: 500,
    shop: { name: "Somethinc Official", location: "Jakarta", rating: 4.9 },
  },
  {
    id: "9",
    name: "Sunscreen SPF 50+ PA++++",
    price: 149000,
    originalPrice: 199000,
    discount: 25,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    rating: 4.9,
    sold: 25678,
    category: "Kecantikan",
    description: "Sunscreen dengan perlindungan maksimal SPF 50+ PA++++.",
    stock: 800,
    shop: { name: "Skin1004 Official", location: "Jakarta", rating: 4.8 },
  },
  {
    id: "10",
    name: "Smart Watch Pro Max Ultra",
    price: 4999000,
    originalPrice: 6999000,
    discount: 29,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    rating: 4.7,
    sold: 3421,
    category: "Elektronik",
    description: "Smartwatch premium dengan fitur kesehatan lengkap dan baterai tahan lama.",
    stock: 60,
    variants: [
      { name: "Warna", options: ["Titanium", "Gold", "Silver"] },
      { name: "Ukuran", options: ["41mm", "45mm", "49mm"] },
    ],
    shop: { name: "Tech Gallery", location: "Jakarta", rating: 4.7 },
  },
  {
    id: "11",
    name: "Wireless Earbuds Pro 2",
    price: 1299000,
    originalPrice: 1799000,
    discount: 28,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    rating: 4.8,
    sold: 8765,
    category: "Elektronik",
    description: "Earbuds wireless dengan ANC dan bass yang kuat.",
    stock: 200,
    variants: [
      { name: "Warna", options: ["White", "Black"] },
    ],
    shop: { name: "Audio Pro Shop", location: "Bandung", rating: 4.6 },
  },
  {
    id: "12",
    name: "Blender Portable USB Rechargeable",
    price: 159000,
    originalPrice: 249000,
    discount: 36,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop",
    rating: 4.5,
    sold: 15234,
    category: "Rumah Tangga",
    description: "Blender portable dengan baterai USB rechargeable untuk smoothie on-the-go.",
    stock: 300,
    variants: [
      { name: "Warna", options: ["Pink", "Blue", "Green", "White"] },
    ],
    shop: { name: "Home Living", location: "Surabaya", rating: 4.5 },
  },
];

export const flashSaleProducts = products.slice(0, 6).map(p => ({
  ...p,
  discount: Math.floor(Math.random() * 30) + 50, // 50-80% discount
  flashSaleEnds: new Date(Date.now() + 3600000 * 5), // 5 hours from now
}));

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatSold = (sold: number): string => {
  if (sold >= 1000) {
    return `${(sold / 1000).toFixed(1)}rb`;
  }
  return sold.toString();
};
