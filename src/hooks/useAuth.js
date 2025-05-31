// src/hooks/useAuth.js

/**
 * Возвращает access-токен из localStorage
 */
export function getToken() {
  return localStorage.getItem('access') || null;
}

/**
 * Сохраняет пару токенов в localStorage
 * @param {{ access: string, refresh: string }} tokens
 */
export function setTokens({ access, refresh }) {
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
}

/**
 * Удаляет токены из localStorage (logout)
 */
export function clearTokens() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}
