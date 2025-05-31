// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api';
import './RegisterPage.css'; // наши стили

export default function RegisterPage() {
  const navigate = useNavigate();

  // Состояние формы
  const [form, setForm] = useState({
    email: '',
    full_name: '',
    password: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Обработчик изменения любого поля
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Реальный вызов API. Он ожидает { username, full_name, email, password }
      // Если у вас нет поля username, можно использовать email в качестве username:
      await register({
        username: form.email,        // или какой-то другой логики для username
        full_name: form.full_name,
        email: form.email,
        password: form.password
        // Адрес не требуется API: если бэкенд не поддерживает address, просто не передаём его
      });
      // После успешной регистрации — переходим на страницу входа
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Не удалось зарегистрироваться');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Шапка с логотипом */}
      <div className="login-header">
        <img src="src/img/MYYARD.svg" alt="My Yard" />
      </div>

      {/* Основная область */}
      <div className="login-content">
        <div className="login-title">Регистрация</div>

        <form className="login-form" onSubmit={handleSubmit} style={{ width: '80%', maxWidth: '360px' }}>
          {/* Поле Email */}
          <div className="input-group">
            <img className="icon" src="src/img/Email.svg" alt="" />
            <input
              type="email"
              name="email"
              placeholder="email@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Поле ФИО */}
          <div className="input-group">
            <img className="icon" src="src/img/User.svg" alt="" />
            <input
              type="text"
              name="full_name"
              placeholder="ФИО"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Поле Пароль */}
          <div className="input-group">
            <img className="icon" src="src/img/Password.svg" alt="" />
            <input
              type="password"
              name="password"
              placeholder="Пароль123"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Поле Адрес (иконка слева и стрелка справа) */}
          <div className="input-group">
            <img className="icon" src="src/img/Address.svg" alt="" />
            <input
              type="text"
              name="address"
              placeholder="Адрес"
              value={form.address}
              onChange={handleChange}
              required
            />
            <img className="icon-right" src="src/img/ArrowDown.svg" alt="" />
          </div>

          {/* Кнопка «Зарегистрироваться» */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Загрузка…' : 'Зарегистрироваться'}
          </button>
        </form>

        {/* Ошибка */}
        {error && (
          <p style={{ color: 'red', marginTop: '12px', textAlign: 'center' }}>
            {error}
          </p>
        )}

        {/* Ссылка «Уже есть аккаунт? Войти» */}
        <div className="register-link">
          Уже есть аккаунт?
          <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}
