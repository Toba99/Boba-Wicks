/**
 * Boba Candles API — public storefront + admin management.
 */
import express from 'express';
import cors from 'cors';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim())
  : undefined;

app.use(
  cors({
    origin: allowedOrigins ?? true,
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'Boba Wicks API', docs: 'Use /api/* routes' });
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

const server = app.listen(PORT, () => {
  console.log(`Boba Candles API running at http://localhost:${PORT}`);
  console.log(`Admin login: admin@bobacandles.com / admin123`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `\nPort ${PORT} is already in use. Stop the other process and retry:\n` +
        `  lsof -i :${PORT} -t | xargs kill\n`
    );
    process.exit(1);
  }
  throw err;
});
