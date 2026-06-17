import { apiUrl, parseJsonResponse } from '../lib/apiBase';

const API = apiUrl('/api/admin');
const TOKEN_KEY = 'boba_admin_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await parseJsonResponse(res);

  if (res.status === 401) {
    clearToken();
    window.location.href = '/admin/login';
    throw new Error('Session expired');
  }

  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const adminApi = {
  login: (email, password) =>
    fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(async (res) => {
      const data = await parseJsonResponse(res);
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setToken(data.token);
      return data;
    }),

  logout: () => request('/logout', { method: 'POST' }).finally(clearToken),

  me: () => request('/me'),

  analytics: () => request('/analytics'),

  products: {
    list: () => request('/products'),
    create: (body) => request('/products', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    remove: (id) => request(`/products/${id}`, { method: 'DELETE' }),
  },

  categories: {
    list: () => request('/categories'),
    create: (body) => request('/categories', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    remove: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
  },

  customRequests: {
    list: () => request('/custom-requests'),
    update: (id, body) =>
      request(`/custom-requests/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  },

  orders: {
    list: () => request('/orders'),
    update: (id, body) => request(`/orders/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  },

  inquiries: {
    list: () => request('/inquiries'),
    update: (id, body) => request(`/inquiries/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  },

  homepage: {
    get: () => request('/homepage'),
    update: (body) => request('/homepage', { method: 'PUT', body: JSON.stringify(body) }),
  },
};
