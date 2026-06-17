/**
 * Boba Candles API — public storefront + admin management.
 */
import express from 'express';
import cors from 'cors';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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
