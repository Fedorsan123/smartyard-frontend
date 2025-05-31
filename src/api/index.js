import { getToken } from '../hooks/useAuth';

/**
 * Базовый URL для всех запросов (берётся из .env)
 */
const BASE = import.meta.env.VITE_API_BASE;

/**
 * Универсальная функция для запросов к API.
 * @param {string} path — путь к ресурсу, например '/auth/login/'.
 * @param {object} options — настройки fetch: { method, headers, body }.
 * @returns {Promise<any>} — распарсенный JSON-ответ.
 */
export async function apiFetch(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  
  // Добавляем заголовок Authorization, если есть токен
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(BASE + path, {
    ...options,
    headers,
  });

  if (!res.ok) {
    // Если пришла ошибка, получаем текст из тела и бросаем его
    const errorText = await res.text();
    throw new Error(errorText);
  }

  // Возвращаем JSON, если всё ОК
  return res.json();
}

/**
 * Вход пользователя.
 * POST /auth/login/ → { refresh, access }
 */
export function login({ email, password }) {
  return apiFetch('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Регистрация пользователя.
 * POST /auth/register/ → { id, email, message }
 */
export function register({ username, full_name, email, password }) {
  return apiFetch('/auth/register/', {
    method: 'POST',
    body: JSON.stringify({ username, full_name, email, password }),
  });
}

/**
 * Получение числа свободных парковочных мест.
 * GET /parking/ → { free_spots }
 */
export function getFreeSpots() {
  return apiFetch('/parking/');
}

/**
 * Получение списка камер.
 * GET /cameras/ → [{ id, name, ip_address, location, ... }, …]
 */
export function getCameras() {
  return apiFetch('/cameras/');
}

/**
 * Получить данные профиля текущего пользователя.
 * GET /profile/ → { full_name, email, notifications_enabled, ... }
 */
export function getProfile() {
  return apiFetch('/profile/');
}

/**
 * Обновить данные профиля.
 * PUT /profile/ с { full_name, email } → { full_name, email, ... }
 */
export function updateProfile({ full_name, email }) {
  return apiFetch('/profile/', {
    method: 'PUT',
    body: JSON.stringify({ full_name, email }),
  });
}
