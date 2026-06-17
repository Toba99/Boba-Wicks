/** API origin in production (e.g. https://your-api.onrender.com). Empty = same origin / Vite proxy. */
const API_ORIGIN = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_ORIGIN}${normalized}`;
}

export async function parseJsonResponse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    if (text.trimStart().startsWith('<!DOCTYPE') || text.trimStart().startsWith('<html')) {
      throw new Error(
        'API unavailable — the site is only hosting the frontend. Deploy the server and set VITE_API_URL in Netlify.'
      );
    }
    throw new Error('Invalid response from server');
  }
}
