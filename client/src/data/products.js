/**
 * Mock product catalogue for Boba Candles.
 * In production, products are fetched from /api/products.
 */

export const SCENT_TYPES = [
  'all',
  'fruity',
  'creamy',
  'floral',
  'dessert',
  'seasonal',
  'custom',
];

export const SIZE_OPTIONS = [
  { id: 'mini', label: 'Mini (4 oz)', priceModifier: 0 },
  { id: 'classic', label: 'Classic (8 oz)', priceModifier: 8 },
  { id: 'grand', label: 'Grand (12 oz)', priceModifier: 16 },
];

export const BASE_SCENTS = [
  { id: 'milk-tea', label: 'Classic Milk Tea', price: 12 },
  { id: 'oolong', label: 'Roasted Oolong', price: 14 },
  { id: 'jasmine', label: 'Jasmine Green', price: 13 },
  { id: 'coconut', label: 'Coconut Cream', price: 15 },
];

export const TOP_NOTES = [
  { id: 'taro', label: 'Taro', price: 4 },
  { id: 'brown-sugar', label: 'Brown Sugar', price: 3 },
  { id: 'lychee', label: 'Lychee', price: 5 },
  { id: 'matcha', label: 'Matcha', price: 4 },
  { id: 'mango', label: 'Mango', price: 4 },
  { id: 'rose', label: 'Rose', price: 5 },
  { id: 'honeydew', label: 'Honeydew', price: 4 },
  { id: 'ube', label: 'Ube', price: 5 },
];

export const JAR_STYLES = [
  { id: 'frosted', label: 'Frosted Glass', price: 0 },
  { id: 'amber', label: 'Amber Apothecary', price: 6 },
  { id: 'ceramic', label: 'Ceramic Boba Cup', price: 12 },
  { id: 'gift', label: 'Gift Box Set', price: 18 },
];

export const products = [
  {
    id: 'tarolatte',
    name: 'Taro Latte Glow',
    scentNotes: 'Taro root, sweet cream, vanilla bean',
    type: 'creamy',
    basePrice: 32,
    sizes: ['mini', 'classic', 'grand'],
    image: 'taro',
    badge: 'Bestseller',
    description: 'Creamy taro meets warm milk tea — our signature sip in candle form.',
  },
  {
    id: 'brown-sugar-boba',
    name: 'Brown Sugar Boba',
    scentNotes: 'Caramelized brown sugar, black tea, tapioca accord',
    type: 'dessert',
    basePrice: 34,
    sizes: ['classic', 'grand'],
    image: 'brown-sugar',
    badge: 'Fan Favourite',
    description: 'Rich, molasses-sweet aroma with a whisper of brewed tea.',
  },
  {
    id: 'matcha-cloud',
    name: 'Matcha Cloud',
    scentNotes: 'Ceremonial matcha, steamed milk, white musk',
    type: 'creamy',
    basePrice: 36,
    sizes: ['mini', 'classic', 'grand'],
    image: 'matcha',
    description: 'Earthy matcha layered with silky steamed milk.',
  },
  {
    id: 'lychee-blossom',
    name: 'Lychee Blossom',
    scentNotes: 'Fresh lychee, peony, soft jasmine',
    type: 'floral',
    basePrice: 35,
    sizes: ['classic', 'grand'],
    image: 'lychee',
    description: 'Juicy lychee fruit wrapped in delicate floral petals.',
  },
  {
    id: 'mango-passion',
    name: 'Mango Passion Fizz',
    scentNotes: 'Alphonso mango, passion fruit, sparkling sugar',
    type: 'fruity',
    basePrice: 33,
    sizes: ['mini', 'classic', 'grand'],
    image: 'mango',
    description: 'Tropical, bright, and effervescent — summer in a jar.',
  },
  {
    id: 'honeydew-mist',
    name: 'Honeydew Mist',
    scentNotes: 'Honeydew melon, cucumber water, mint leaf',
    type: 'fruity',
    basePrice: 31,
    sizes: ['classic', 'grand'],
    image: 'honeydew',
    description: 'Cool, refreshing melon with a spa-like finish.',
  },
  {
    id: 'ube-dream',
    name: 'Ube Dream',
    scentNotes: 'Purple yam, coconut milk, condensed cream',
    type: 'dessert',
    basePrice: 37,
    sizes: ['mini', 'classic', 'grand'],
    image: 'ube',
    badge: 'New',
    description: 'Vibrant ube sweetness with velvety coconut undertones.',
  },
  {
    id: 'rose-milk-tea',
    name: 'Rose Milk Tea',
    scentNotes: 'Damask rose, assam tea, oat milk',
    type: 'floral',
    basePrice: 38,
    sizes: ['classic', 'grand'],
    image: 'rose',
    description: 'Romantic rose petals steeped in creamy tea.',
  },
  {
    id: 'winter-pearl',
    name: 'Winter Pearl Milk',
    scentNotes: 'White chocolate, pearl sugar, winter spice',
    type: 'seasonal',
    basePrice: 39,
    sizes: ['classic', 'grand'],
    image: 'winter',
    badge: 'Limited',
    description: 'Festive white chocolate milk tea for the holiday season.',
  },
  {
    id: 'coconut-jelly',
    name: 'Coconut Jelly',
    scentNotes: 'Young coconut, pandan, palm sugar',
    type: 'creamy',
    basePrice: 34,
    sizes: ['mini', 'classic', 'grand'],
    image: 'coconut',
    description: 'Tropical coconut with a hint of pandan sweetness.',
  },
  {
    id: 'strawberry-shortcake',
    name: 'Strawberry Shortcake Sip',
    scentNotes: 'Wild strawberry, sponge cake, whipped cream',
    type: 'dessert',
    basePrice: 35,
    sizes: ['classic', 'grand'],
    image: 'strawberry',
    description: 'Dessert-shop nostalgia in a luxurious pour.',
  },
  {
    id: 'custom-blank',
    name: 'Your Custom Blend',
    scentNotes: 'Designed by you',
    type: 'custom',
    basePrice: 42,
    sizes: ['mini', 'classic', 'grand'],
    image: 'custom',
    description: 'Build your signature scent on our Custom page.',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How long do Boba Wicks burn?',
    answer:
      'Our 8 oz classics burn for approximately 45–50 hours. Grand sizes offer up to 70 hours of fragrance.',
  },
  {
    question: 'What wax do you use?',
    answer:
      'We use a premium coconut-soy blend for a clean, even burn and excellent scent throw.',
  },
  {
    question: 'Can I order a fully custom scent?',
    answer:
      'Yes! Visit our Custom Scents page to mix base notes, top notes, jar style, and personalised labels.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'We currently ship within the United States and Canada. EU expansion is planned for 2026.',
  },
  {
    question: 'Are your candles gift-ready?',
    answer:
      'Every candle arrives in signature blush packaging with tissue, seal, and care card — ready to gift.',
  },
];

/** Calculate price for a given product and size */
export function getProductPrice(product, sizeId = 'classic') {
  const size = SIZE_OPTIONS.find((s) => s.id === sizeId) ?? SIZE_OPTIONS[1];
  return product.basePrice + size.priceModifier;
}

/** Calculate custom candle estimate */
export function calculateCustomPrice({ baseScentId, topNoteIds = [], sizeId, jarStyleId }) {
  const base = BASE_SCENTS.find((b) => b.id === baseScentId)?.price ?? 12;
  const tops = topNoteIds.reduce((sum, id) => {
    const note = TOP_NOTES.find((n) => n.id === id);
    return sum + (note?.price ?? 0);
  }, 0);
  const size = SIZE_OPTIONS.find((s) => s.id === sizeId)?.priceModifier ?? 8;
  const jar = JAR_STYLES.find((j) => j.id === jarStyleId)?.price ?? 0;
  return base + tops + size + jar + 18; // base craftsmanship fee
}
