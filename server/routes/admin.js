import { Router } from 'express';
import {
  products,
  categories,
  customOrders,
  orders,
  contactMessages,
  homepageContent,
  syncCategoryCounts,
  getAnalytics,
  ADMIN_USER,
} from '../store.js';
import {
  requireAuth,
  createSession,
  destroySession,
  validateCredentials,
} from '../middleware/auth.js';

const router = Router();

// ——— Auth ———
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!validateCredentials(email, password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = createSession(email);
  res.json({
    token,
    user: { email: ADMIN_USER.email, name: ADMIN_USER.name },
  });
});

router.post('/logout', requireAuth, (req, res) => {
  destroySession(req.token);
  res.json({ success: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: { email: req.admin.email, name: req.admin.name } });
});

// ——— Analytics ———
router.get('/analytics', requireAuth, (_req, res) => {
  res.json(getAnalytics());
});

// ——— Products ———
router.get('/products', requireAuth, (_req, res) => {
  res.json({ products });
});

router.post('/products', requireAuth, (req, res) => {
  const { name, scentNotes, type, basePrice, sizes, image, badge, description, stock, active } = req.body;
  if (!name || !type || basePrice == null) {
    return res.status(400).json({ error: 'Name, type, and base price are required.' });
  }
  const id = req.body.id || name.toLowerCase().replace(/\s+/g, '-').slice(0, 40);
  if (products.find((p) => p.id === id)) {
    return res.status(409).json({ error: 'Product ID already exists.' });
  }
  const product = {
    id,
    name,
    scentNotes: scentNotes ?? '',
    type,
    basePrice: Number(basePrice),
    sizes: sizes ?? ['classic'],
    image: image ?? 'custom',
    badge: badge ?? undefined,
    description: description ?? '',
    stock: stock ?? 0,
    active: active !== false,
  };
  products.push(product);
  syncCategoryCounts();
  res.status(201).json({ product });
});

router.put('/products/:id', requireAuth, (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body, id: products[idx].id };
  syncCategoryCounts();
  res.json({ product: products[idx] });
});

router.delete('/products/:id', requireAuth, (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(idx, 1);
  syncCategoryCounts();
  res.json({ success: true });
});

// ——— Categories ———
router.get('/categories', requireAuth, (_req, res) => {
  syncCategoryCounts();
  res.json({ categories });
});

router.post('/categories', requireAuth, (req, res) => {
  const { name, slug, description, active } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required.' });
  const id = slug || name.toLowerCase().replace(/\s+/g, '-');
  if (categories.find((c) => c.id === id)) {
    return res.status(409).json({ error: 'Category already exists.' });
  }
  const category = { id, name, slug: id, description: description ?? '', productCount: 0, active: active !== false };
  categories.push(category);
  res.status(201).json({ category });
});

router.put('/categories/:id', requireAuth, (req, res) => {
  const idx = categories.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Category not found' });
  categories[idx] = { ...categories[idx], ...req.body, id: categories[idx].id };
  syncCategoryCounts();
  res.json({ category: categories[idx] });
});

router.delete('/categories/:id', requireAuth, (req, res) => {
  const inUse = products.some((p) => p.type === req.params.id);
  if (inUse) {
    return res.status(400).json({ error: 'Cannot delete category with assigned products.' });
  }
  const idx = categories.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Category not found' });
  categories.splice(idx, 1);
  res.json({ success: true });
});

// ——— Custom requests ———
router.get('/custom-requests', requireAuth, (_req, res) => {
  res.json({ requests: customOrders });
});

router.put('/custom-requests/:id', requireAuth, (req, res) => {
  const idx = customOrders.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Request not found' });
  customOrders[idx] = { ...customOrders[idx], ...req.body, id: customOrders[idx].id };
  res.json({ request: customOrders[idx] });
});

// ——— Orders ———
router.get('/orders', requireAuth, (_req, res) => {
  res.json({ orders });
});

router.put('/orders/:id', requireAuth, (req, res) => {
  const idx = orders.findIndex((o) => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  orders[idx] = {
    ...orders[idx],
    ...req.body,
    id: orders[idx].id,
    updatedAt: new Date().toISOString(),
  };
  res.json({ order: orders[idx] });
});

// ——— Inquiries ———
router.get('/inquiries', requireAuth, (_req, res) => {
  res.json({ inquiries: contactMessages });
});

router.put('/inquiries/:id', requireAuth, (req, res) => {
  const idx = contactMessages.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Inquiry not found' });
  contactMessages[idx] = { ...contactMessages[idx], ...req.body, id: contactMessages[idx].id };
  res.json({ inquiry: contactMessages[idx] });
});

// ——— Homepage ———
router.get('/homepage', requireAuth, (_req, res) => {
  res.json({ content: homepageContent });
});

router.put('/homepage', requireAuth, (req, res) => {
  Object.assign(homepageContent, req.body);
  res.json({ content: homepageContent });
});

export default router;
