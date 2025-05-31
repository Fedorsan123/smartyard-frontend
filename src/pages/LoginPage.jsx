// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

import './LoginPage.css'; // подключаем стили

export default function LoginPage() {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Если у вас сейчас «фейковый» login, он просто установит user
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src="src\img\MYYARD.svg" alt="" srcset="" />
      </div>

      {/* Основное содержимое: форма */}
      <div className="login-content">
        <div className="login-title">Вход</div>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Поле Email */}
          <div className="input-group">
            <img className='icon' src="src\img\Email.svg" alt="" srcset="" />
            <input
              type="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Поле Пароль */}
          <div className="input-group">
            <img className='icon' src="src\img\Password.svg" alt="" srcset="" />
            <input
              type="password"
              placeholder="Пароль123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Кнопка «Войти» */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Загрузка…' : 'Войти'}
          </button>
        </form>

        {/* Ошибка, если не удалось войти */}
        {error && (
          <p style={{ color: 'red', marginTop: '12px', textAlign: 'center' }}>
            {error}
          </p>
        )}

        {/* Ссылка на страницу регистрации */}
        <div className="register-link">
          Нет аккаунта?
          <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}
