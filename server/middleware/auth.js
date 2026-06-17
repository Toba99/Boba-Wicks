import crypto from 'crypto';
import { activeSessions, ADMIN_USER } from '../store.js';

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function createSession(email) {
  const token = crypto.randomBytes(32).toString('hex');
  activeSessions.set(token, {
    email,
    name: ADMIN_USER.name,
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
  return token;
}

export function destroySession(token) {
  activeSessions.delete(token);
}

export function validateCredentials(email, password) {
  return email === ADMIN_USER.email && password === ADMIN_USER.password;
}

/** Extract bearer token from Authorization header */
function getToken(req) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7);
}

/** Middleware — require valid admin session */
export function requireAuth(req, res, next) {
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const session = activeSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    activeSessions.delete(token);
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }

  req.admin = session;
  req.token = token;
  next();
}
