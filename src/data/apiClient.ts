/**
 * Single switch between mock data (AsyncStorage) and a real backend.
 *
 * Set EXPO_PUBLIC_API_BASE_URL in .env to the backend's base URL and every
 * repository in src/data/*Repository.ts automatically starts calling it
 * instead of AsyncStorage — no other file needs to change. Leave it empty
 * (or delete .env) to keep using mock data.
 */
export const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL ?? '').replace(/\/$/, '');
export const isApiConfigured = API_BASE_URL.length > 0;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API ${options?.method ?? 'GET'} ${path} failed: ${res.status} ${res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined }),
};
