// src/router.jsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import LoginPage    from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard    from './pages/Dashboard';
import ProfilePage  from './pages/ProfilePage';
import PaymentPage  from './pages/PaymentPage';
import SubscriptionPage  from './pages/SubscriptionPage'; 
import RequireAuth  from './components/RequireAuth';

const router = createBrowserRouter([
  { path: '/',        element: <Navigate to="/login" replace /> },
  { path: '/login',   element: <LoginPage /> },
  { path: '/register',element: <RegisterPage /> },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/profile',
    element:<ProfilePage />
  },
  {
    path: '/payment',
    element: <PaymentPage />
  },
  {
    path: '/subscription-info',
    element:<SubscriptionPage />
  },
  { path: '*', element: <Navigate to="/" replace /> }
]);

export default router;
