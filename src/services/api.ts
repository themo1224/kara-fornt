// src/services/api.ts
// Simple mock API for local dev — supports:
// POST /auth/login  (use email: user@example.com, password: password)
// GET  /auth/me
// POST /auth/logout
// Exposes: default api { post, get }, setAuthToken, attach401Interceptor

type ApiResp<T = any> = Promise<{ data: T }>;

let inMemoryToken: string | null = null;
const fakeUser = { id: 1, name: 'Demo User', email: 'user@example.com' };

function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function setAuthToken(token: string | null) {
  inMemoryToken = token;
}

export function attach401Interceptor(cb: () => void) {
  // noop for mock — kept for compatibility with real api usage
  // you could store cb and call it from places that simulate a 401
}

const api = {
  post: async (url: string, body?: any): ApiResp => {
    await delay();
    if (url === '/auth/login') {
      const { email, password } = body || {};
      if (email === 'user@example.com' && password === 'password') {
        const token = 'fake-token-123';
        inMemoryToken = token;
        return { data: { token, user: fakeUser } };
      }
      // simulate axios-like error
      return Promise.reject({
        response: { status: 401, data: { message: 'Invalid credentials' } },
      });
    }

    if (url === '/auth/logout') {
      inMemoryToken = null;
      return { data: { message: 'Logged out' } };
    }

    // fallback
    return { data: {} };
  },

  get: async (url: string): ApiResp => {
    await delay();
    if (url === '/auth/me') {
      if (inMemoryToken) return { data: fakeUser };
      return Promise.reject({
        response: { status: 401, data: { message: 'Unauthenticated' } },
      });
    }
    return { data: {} };
  },
};

export default api;
