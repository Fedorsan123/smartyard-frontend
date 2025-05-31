// src/router.jsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import LoginPage    from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard    from './pages/Dashboard';
import ProfilePage  from './pages/ProfilePage';
import RequireAuth  from './components/RequireAuth';

const router = createBrowserRouter([
  // Редирект с корня "/" на /login
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  // Публичные маршруты без обёрток
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  // Приватные маршруты (каждый оборачиваем в RequireAuth отдельно)
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  // Все прочие пути → редирект на "/"
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

export default router;
