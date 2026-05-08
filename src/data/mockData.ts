import type { ShoppingCategory, ShoppingProduct } from '../types';

export const shoppingCategories: ShoppingCategory[] = [
  { label: 'Tecnologia', icon: 'phone-portrait-outline' },
  { label: 'Moda', icon: 'shirt-outline' },
  { label: 'Casa', icon: 'home-outline' },
  { label: 'Viagens', icon: 'airplane-outline' },
  { label: 'Beleza', icon: 'sparkles-outline' },
  { label: 'Mercado', icon: 'basket-outline' },
];

export const shoppingProducts: ShoppingProduct[] = [
  {
    id: 'iphone-15',
    category: 'Tecnologia',
    name: 'Smartphone premium 128GB',
    store: 'Rocket Tech',
    price: 'R$ 4.799,00',
    oldPrice: 'R$ 5.299,00',
    cashback: '8%',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'headphone',
    category: 'Tecnologia',
    name: 'Fone Bluetooth Pro com cancelamento',
    store: 'Audio Prime',
    price: 'R$ 899,90',
    oldPrice: 'R$ 1.099,90',
    cashback: '10%',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'smartwatch',
    category: 'Tecnologia',
    name: 'Smartwatch fitness AMOLED',
    store: 'Rocket Wear',
    price: 'R$ 649,90',
    oldPrice: 'R$ 799,90',
    cashback: '7%',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'notebook',
    category: 'Tecnologia',
    name: 'Notebook ultrafino 16GB RAM',
    store: 'Tech Store',
    price: 'R$ 3.999,00',
    oldPrice: 'R$ 4.499,00',
    cashback: '6%',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sneaker',
    category: 'Moda',
    name: 'Tênis urbano premium',
    store: 'Rocket Style',
    price: 'R$ 349,90',
    oldPrice: 'R$ 459,90',
    cashback: '12%',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'bag',
    category: 'Moda',
    name: 'Bolsa minimalista couro sintético',
    store: 'Urban Bag',
    price: 'R$ 219,90',
    oldPrice: 'R$ 299,90',
    cashback: '9%',
    image:
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'jacket',
    category: 'Moda',
    name: 'Jaqueta casual corta vento',
    store: 'Street Club',
    price: 'R$ 279,90',
    oldPrice: 'R$ 349,90',
    cashback: '7%',
    image:
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'coffee',
    category: 'Casa',
    name: 'Cafeteira espresso compacta',
    store: 'Casa Rocket',
    price: 'R$ 599,90',
    oldPrice: 'R$ 749,90',
    cashback: '8%',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'chair',
    category: 'Casa',
    name: 'Cadeira ergonômica office',
    store: 'Home Prime',
    price: 'R$ 899,90',
    oldPrice: 'R$ 1.149,90',
    cashback: '6%',
    image:
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'lamp',
    category: 'Casa',
    name: 'Luminária inteligente LED',
    store: 'Smart Home',
    price: 'R$ 189,90',
    oldPrice: 'R$ 239,90',
    cashback: '5%',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hotel',
    category: 'Viagens',
    name: 'Diária em hotel premium',
    store: 'Rocket Travel',
    price: 'R$ 399,00',
    oldPrice: 'R$ 529,00',
    cashback: '10%',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'flight',
    category: 'Viagens',
    name: 'Passagem nacional promocional',
    store: 'Aero Club',
    price: 'R$ 489,00',
    oldPrice: 'R$ 699,00',
    cashback: '4%',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'perfume',
    category: 'Beleza',
    name: 'Perfume importado 100ml',
    store: 'Beauty Prime',
    price: 'R$ 299,90',
    oldPrice: 'R$ 399,90',
    cashback: '11%',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'skincare',
    category: 'Beleza',
    name: 'Kit skincare glow',
    store: 'Glow Store',
    price: 'R$ 149,90',
    oldPrice: 'R$ 199,90',
    cashback: '9%',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'market',
    category: 'Mercado',
    name: 'Combo mercado da semana',
    store: 'Market Prime',
    price: 'R$ 179,90',
    oldPrice: 'R$ 229,90',
    cashback: '5%',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
  },
];
