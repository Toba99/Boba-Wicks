import { Router } from 'express';
import {
  products,
  customOrders,
  contactMessages,
  homepageContent,
  orders,
} from '../store.js';

const router = Router();

router.get('/products', (_req, res) => {
  res.json({ products: products.filter((p) => p.active !== false) });
});

router.get('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id && p.active !== false);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ product });
});

router.get('/homepage', (_req, res) => {
  const featured = homepageContent.featuredProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);
  res.json({ content: homepageContent, featuredProducts: featured });
});

router.post('/custom-scent', (req, res) => {
  const {
    baseScentId,
    topNoteIds,
    sizeId,
    jarStyleId,
    labelName,
    giftMessage,
    email,
    name,
    estimatedPrice,
  } = req.body;

  if (!email || !name || !baseScentId || !sizeId || !jarStyleId) {
    return res.status(400).json({
      error: 'Missing required fields: name, email, base scent, size, and jar style.',
    });
  }

  const order = {
    id: `custom-${Date.now()}`,
    baseScentId,
    topNoteIds: topNoteIds ?? [],
    sizeId,
    jarStyleId,
    labelName: labelName ?? '',
    giftMessage: giftMessage ?? '',
    email,
    name,
    estimatedPrice,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  customOrders.unshift(order);
  res.status(201).json({ success: true, message: 'Custom scent request received', orderId: order.id });
});

router.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const entry = {
    id: `contact-${Date.now()}`,
    name,
    email,
    subject: subject ?? '',
    message,
    status: 'open',
    createdAt: new Date().toISOString(),
  };

  contactMessages.unshift(entry);
  res.status(201).json({ success: true, message: 'Message received', id: entry.id });
});

/** Customer checkout — creates order from cart payload */
router.post('/orders', (req, res) => {
  const { customerName, email, items, shippingAddress } = req.body;
  if (!customerName || !email || !items?.length) {
    return res.status(400).json({ error: 'Customer name, email, and items are required.' });
  }

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const order = {
    id: `ord-${Date.now()}`,
    customerName,
    email,
    items,
    total,
    status: 'pending',
    shippingAddress: shippingAddress ?? '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.unshift(order);
  res.status(201).json({ success: true, order });
});

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
