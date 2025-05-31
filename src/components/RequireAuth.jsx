// src/components/RequireAuth.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function RequireAuth({ children }) {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    // Если нет авторизации — редиректим на логин, сохранив путь в state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
