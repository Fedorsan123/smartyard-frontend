// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { getProfile, updateProfile } from '../api'; // если API ещё нет — оставьте закомментированным
import './ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  // Состояние для формы: address, full_name, password
  const [form, setForm] = useState({
    address: 'ул. Адрес, д. 228',
    full_name: 'Иванов Иван Иванович',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // При монтировании: можно получить данные из API, но пока ставим статичные
  useEffect(() => {
    // Если есть API, получить текущий профиль:
    /*
    getProfile()
      .then((data) => {
        setForm({
          address: data.address || 'ул. Адрес, д. 228',
          full_name: data.full_name,
          password: '', // мы не заполняем пароль
        });
      })
      .catch((err) => {
        console.error('getProfile error', err);
      })
      .finally(() => setLoading(false));
    */
    // Пока просто убираем loading сразу
    setLoading(false);
  }, []);

  // Обработчик изменения полей
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Отправка формы (обновление профиля)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      // Если есть API, то:
      // await updateProfile({ full_name: form.full_name, email: form.email });
      // Например, для адреса /password нужно отдельное API. Зависит от бэкенда.
      alert('Данные сохранены (фейковый режим)');
    } catch (err) {
      console.error('updateProfile error', err);
      setError('Не удалось сохранить изменения');
    } finally {
      setSaving(false);
    }
  };

  // Кнопка «назад»
  const handleBack = () => {
    navigate(-1); // возврат на предыдущую страницу
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-topbar" />
        <div className="profile-header">
          <div className="profile-back-btn">
            <img src="/src/img/Back.svg" alt="Back" />
          </div>
          <div className="profile-logo">
            <img src="/src/img/MYYARD.svg" alt="My Yard" />
          </div>
        </div>
        <div className="profile-content">
          <p>Загрузка данных…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">

      {/* Шапка */}
      <div className="profile-header">
        <div className="profile-back-btn" onClick={handleBack}>
          <img src="/src/img/Back.svg" alt="Back" />
        </div>
        <div className="profile-logo">
          <img src="/src/img/MYYARD.svg" alt="My Yard" />
        </div>
      </div>

      {/* Основное содержимое */}
      <div className="profile-content">
        <div className="profile-title">Настройки</div>

        <form class="profile-form" onSubmit={handleSubmit}>
          {/* Поле «Адрес» */}
          <div className="input-group">
            <img className="icon" src="/src/img/Address.svg" alt="Home" />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Адрес"
              required
            />
            <img className="icon-right" src="/src/img/ArrowDown.svg" alt="Toggle" />
          </div>

          {/* Поле «ФИО» */}
          <div className="input-group">
            <img className="icon" src="/src/img/User.svg" alt="User" />
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="ФИО"
              required
            />
            <img className="icon-right" src="/src/img/Pencil.svg" alt="Edit" />
          </div>

          {/* Поле «Пароль» */}
          <div className="input-group">
            <img className="icon" src="/src/img/Password.svg" alt="Lock" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Пароль"
              required
            />
            <img className="icon-right" src="/src/img/Pencil.svg" alt="Edit" />
          </div>

          {/* Кнопка «Сохранить» */}
          <button
            type="submit"
            className="login-button"
            style={{ marginBottom: '16px' }}
            disabled={saving}
          >
            {saving ? 'Сохраняем…' : 'Сохранить'}
          </button>
          {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
