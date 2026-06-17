/**
 * Central in-memory data store for Boba Candles.
 * Replace with a database in production.
 */

export const categories = [
  { id: 'fruity', name: 'Fruity', slug: 'fruity', description: 'Bright, juicy fruit-forward scents', productCount: 0, active: true },
  { id: 'creamy', name: 'Creamy', slug: 'creamy', description: 'Smooth milk tea and cream profiles', productCount: 0, active: true },
  { id: 'floral', name: 'Floral', slug: 'floral', description: 'Delicate petals and tea house florals', productCount: 0, active: true },
  { id: 'dessert', name: 'Dessert', slug: 'dessert', description: 'Indulgent sweet shop inspirations', productCount: 0, active: true },
  { id: 'seasonal', name: 'Seasonal', slug: 'seasonal', description: 'Limited edition seasonal pours', productCount: 0, active: true },
  { id: 'custom', name: 'Custom', slug: 'custom', description: 'Bespoke customer blends', productCount: 0, active: true },
];

export const products = [
  { id: 'tarolatte', name: 'Taro Latte Glow', scentNotes: 'Taro root, sweet cream, vanilla bean', type: 'creamy', basePrice: 32, sizes: ['mini', 'classic', 'grand'], image: 'taro', badge: 'Bestseller', description: 'Creamy taro meets warm milk tea — our signature sip in candle form.', active: true, stock: 48 },
  { id: 'brown-sugar-boba', name: 'Brown Sugar Boba', scentNotes: 'Caramelized brown sugar, black tea, tapioca accord', type: 'dessert', basePrice: 34, sizes: ['classic', 'grand'], image: 'brown-sugar', badge: 'Fan Favourite', description: 'Rich, molasses-sweet aroma with a whisper of brewed tea.', active: true, stock: 36 },
  { id: 'matcha-cloud', name: 'Matcha Cloud', scentNotes: 'Ceremonial matcha, steamed milk, white musk', type: 'creamy', basePrice: 36, sizes: ['mini', 'classic', 'grand'], image: 'matcha', description: 'Earthy matcha layered with silky steamed milk.', active: true, stock: 52 },
  { id: 'lychee-blossom', name: 'Lychee Blossom', scentNotes: 'Fresh lychee, peony, soft jasmine', type: 'floral', basePrice: 35, sizes: ['classic', 'grand'], image: 'lychee', description: 'Juicy lychee fruit wrapped in delicate floral petals.', active: true, stock: 29 },
  { id: 'mango-passion', name: 'Mango Passion Fizz', scentNotes: 'Alphonso mango, passion fruit, sparkling sugar', type: 'fruity', basePrice: 33, sizes: ['mini', 'classic', 'grand'], image: 'mango', description: 'Tropical, bright, and effervescent — summer in a jar.', active: true, stock: 41 },
  { id: 'honeydew-mist', name: 'Honeydew Mist', scentNotes: 'Honeydew melon, cucumber water, mint leaf', type: 'fruity', basePrice: 31, sizes: ['classic', 'grand'], image: 'honeydew', description: 'Cool, refreshing melon with a spa-like finish.', active: true, stock: 33 },
  { id: 'ube-dream', name: 'Ube Dream', scentNotes: 'Purple yam, coconut milk, condensed cream', type: 'dessert', basePrice: 37, sizes: ['mini', 'classic', 'grand'], image: 'ube', badge: 'New', description: 'Vibrant ube sweetness with velvety coconut undertones.', active: true, stock: 55 },
  { id: 'rose-milk-tea', name: 'Rose Milk Tea', scentNotes: 'Damask rose, assam tea, oat milk', type: 'floral', basePrice: 38, sizes: ['classic', 'grand'], image: 'rose', description: 'Romantic rose petals steeped in creamy tea.', active: true, stock: 27 },
  { id: 'winter-pearl', name: 'Winter Pearl Milk', scentNotes: 'White chocolate, pearl sugar, winter spice', type: 'seasonal', basePrice: 39, sizes: ['classic', 'grand'], image: 'winter', badge: 'Limited', description: 'Festive white chocolate milk tea for the holiday season.', active: true, stock: 18 },
  { id: 'coconut-jelly', name: 'Coconut Jelly', scentNotes: 'Young coconut, pandan, palm sugar', type: 'creamy', basePrice: 34, sizes: ['mini', 'classic', 'grand'], image: 'coconut', description: 'Tropical coconut with a hint of pandan sweetness.', active: true, stock: 44 },
  { id: 'strawberry-shortcake', name: 'Strawberry Shortcake Sip', scentNotes: 'Wild strawberry, sponge cake, whipped cream', type: 'dessert', basePrice: 35, sizes: ['classic', 'grand'], image: 'strawberry', description: 'Dessert-shop nostalgia in a luxurious pour.', active: true, stock: 31 },
  { id: 'custom-blank', name: 'Your Custom Blend', scentNotes: 'Designed by you', type: 'custom', basePrice: 42, sizes: ['mini', 'classic', 'grand'], image: 'custom', description: 'Build your signature scent on our Custom page.', active: true, stock: 999 },
];

export const customOrders = [
  {
    id: 'custom-1700000001',
    baseScentId: 'milk-tea',
    topNoteIds: ['taro', 'brown-sugar'],
    sizeId: 'classic',
    jarStyleId: 'ceramic',
    labelName: "Mia's Birthday Blend",
    giftMessage: 'Happy 25th!',
    email: 'mia@example.com',
    name: 'Mia Chen',
    estimatedPrice: 58,
    status: 'in_review',
    createdAt: '2025-05-18T10:30:00.000Z',
  },
  {
    id: 'custom-1700000002',
    baseScentId: 'jasmine',
    topNoteIds: ['lychee', 'rose'],
    sizeId: 'grand',
    jarStyleId: 'gift',
    labelName: 'Anniversary Glow',
    giftMessage: '',
    email: 'james@example.com',
    name: 'James Park',
    estimatedPrice: 72,
    status: 'pending',
    createdAt: '2025-05-20T14:15:00.000Z',
  },
];

export const orders = [
  {
    id: 'ord-1001',
    customerName: 'Sarah Kim',
    email: 'sarah.k@example.com',
    items: [{ productId: 'tarolatte', name: 'Taro Latte Glow', size: 'classic', quantity: 2, price: 40 }],
    total: 80,
    status: 'shipped',
    shippingAddress: '123 Blossom Ave, San Francisco, CA',
    createdAt: '2025-05-15T09:00:00.000Z',
    updatedAt: '2025-05-17T11:00:00.000Z',
  },
  {
    id: 'ord-1002',
    customerName: 'Alex Rivera',
    email: 'alex.r@example.com',
    items: [{ productId: 'ube-dream', name: 'Ube Dream', size: 'grand', quantity: 1, price: 53 }],
    total: 53,
    status: 'processing',
    shippingAddress: '456 Pearl St, Los Angeles, CA',
    createdAt: '2025-05-19T16:45:00.000Z',
    updatedAt: '2025-05-19T16:45:00.000Z',
  },
  {
    id: 'ord-1003',
    customerName: 'Emma Walsh',
    email: 'emma.w@example.com',
    items: [
      { productId: 'matcha-cloud', name: 'Matcha Cloud', size: 'mini', quantity: 1, price: 36 },
      { productId: 'brown-sugar-boba', name: 'Brown Sugar Boba', size: 'classic', quantity: 1, price: 42 },
    ],
    total: 78,
    status: 'delivered',
    shippingAddress: '789 Tea Lane, Seattle, WA',
    createdAt: '2025-05-10T08:20:00.000Z',
    updatedAt: '2025-05-14T10:00:00.000Z',
  },
  {
    id: 'ord-1004',
    customerName: 'Jordan Lee',
    email: 'jordan@example.com',
    items: [{ productId: 'winter-pearl', name: 'Winter Pearl Milk', size: 'classic', quantity: 3, price: 47 }],
    total: 141,
    status: 'pending',
    shippingAddress: '321 Cedar Rd, Portland, OR',
    createdAt: '2025-05-21T12:00:00.000Z',
    updatedAt: '2025-05-21T12:00:00.000Z',
  },
];

export const contactMessages = [
  {
    id: 'contact-1700000001',
    name: 'Lisa Nguyen',
    email: 'lisa@example.com',
    subject: 'Wholesale inquiry',
    message: 'Interested in stocking Boba Wicks in our boutique. Please share wholesale pricing.',
    status: 'open',
    createdAt: '2025-05-19T11:00:00.000Z',
  },
  {
    id: 'contact-1700000002',
    name: 'Tom Bradley',
    email: 'tom@example.com',
    subject: 'Order delay',
    message: 'My order ord-1002 has been processing for 3 days. Can you provide an update?',
    status: 'open',
    createdAt: '2025-05-20T09:30:00.000Z',
  },
];

export const homepageContent = {
  hero: {
    eyebrow: 'Luxury Boba-Inspired Candles',
    title: 'Sip the scent.',
    titleAccent: 'Feel the moment.',
    subtitle:
      'Hand-poured candles that capture your favourite boba flavours — from taro latte to brown sugar boba — in gift-worthy, long-lasting luxury.',
    ctaPrimary: 'Shop Scents',
    ctaSecondary: 'Create Custom Candle',
  },
  stats: [
    { value: '50hr+', label: 'Burn time' },
    { value: '100%', label: 'Hand-poured' },
    { value: '12+', label: 'Signature scents' },
  ],
  featuredProductIds: ['tarolatte', 'brown-sugar-boba', 'matcha-cloud', 'ube-dream'],
  pillars: [
    { title: 'Premium wax blend', description: 'Clean-burning coconut-soy for 45–70 hours of fragrance.' },
    { title: 'Gift-worthy packaging', description: 'Blush tissue, wax seal, and care card in every box.' },
    { title: 'Small-batch poured', description: 'Hand-poured in our studio — never mass-produced.' },
  ],
  customCta: {
    eyebrow: 'Bespoke',
    title: 'Create your signature scent',
    subtitle:
      "Mix base notes, top accents, jar styles, and a personalised label — we'll hand-pour a candle that's uniquely yours.",
    buttonText: 'Start Customising',
  },
};

/** Active admin sessions: token -> { email, expiresAt } */
export const activeSessions = new Map();

/** Demo admin credentials */
export const ADMIN_USER = {
  email: 'admin@bobacandles.com',
  password: 'admin123',
  name: 'Studio Admin',
};

/** Recalculate category product counts */
export function syncCategoryCounts() {
  categories.forEach((cat) => {
    cat.productCount = products.filter((p) => p.type === cat.id && p.active !== false).length;
  });
}

syncCategoryCounts();

/** Generate analytics snapshot from store data */
export function getAnalytics() {
  const revenueByMonth = [
    { month: 'Jan', revenue: 4200, orders: 38 },
    { month: 'Feb', revenue: 5100, orders: 45 },
    { month: 'Mar', revenue: 4800, orders: 42 },
    { month: 'Apr', revenue: 6200, orders: 58 },
    { month: 'May', revenue: 7400, orders: 67 },
  ];

  const ordersByStatus = {
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  const topProducts = [...products]
    .filter((p) => p.type !== 'custom')
    .slice(0, 5)
    .map((p, i) => ({
      id: p.id,
      name: p.name,
      sales: [120, 98, 87, 76, 65][i] ?? 50,
      revenue: [3840, 3332, 2871, 2736, 2275][i] ?? 2000,
    }));

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0) + 27700;
  const customPending = customOrders.filter((c) => c.status === 'pending').length;
  const openInquiries = contactMessages.filter((c) => c.status !== 'resolved').length;

  return {
    overview: {
      totalRevenue,
      totalOrders: orders.length + 156,
      totalProducts: products.filter((p) => p.active).length,
      pendingCustomRequests: customPending,
      openInquiries,
      conversionRate: 3.8,
      avgOrderValue: 68,
    },
    revenueByMonth,
    ordersByStatus,
    topProducts,
    recentActivity: [
      ...orders.slice(-3).map((o) => ({
        type: 'order',
        id: o.id,
        label: `Order ${o.id} — $${o.total}`,
        status: o.status,
        time: o.createdAt,
      })),
      ...customOrders.slice(-2).map((c) => ({
        type: 'custom',
        id: c.id,
        label: `Custom request from ${c.name}`,
        status: c.status,
        time: c.createdAt,
      })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time)),
  };
}
