const ACCESS_TOKEN_KEY = 'accessToken';

// 👇 여기에 'export'가 반드시 있어야 합니다!
export const tokenStorage = {
  get() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  set(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  remove() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};