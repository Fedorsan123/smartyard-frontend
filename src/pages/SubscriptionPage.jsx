// src/pages/SubscriptionPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubscriptionPage.css';

export default function SubscriptionPage() {
  const navigate = useNavigate();

  // Состояние для информации о подписке
  const [planName, setPlanName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysLeft, setDaysLeft] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // При монтировании можно получить данные через API (пока — статично)
  useEffect(() => {
    // Симулируем задержку для загрузки (например, 1 секунда)
    setTimeout(() => {
      try {
        // Пример статичных данных, потом замените на API:
        setPlanName('Премиум');
        setEndDate('31 мая 2025');
        // Предположим, что сегодня 16 мая 2025 → осталось 15 дней
        setDaysLeft(30);
        setBenefits([
          'Аналитика загруженности',
          'Доступ к уведомлениям',
          'Без рекламы'
        ]);
      } catch (err) {
        console.error('Ошибка при загрузке подписки:', err);
        setError('Не удалось загрузить данные подписки');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, []);

  // Обработчик кнопки «←»
  const handleBack = () => {
    navigate(-1);
  };

  // Обработчик «Продлить подписку»
  const handleExtend = () => {
    // Здесь можно перенаправить на Payment или вызвать платёжный поток
    navigate('/payment');
  };

  if (loading) {
    return (
      <div className="subscription-container">
        <div className="subscription-header">
          <div className="subscription-back-btn" onClick={handleBack}>
            <img src="/src/img/Back.svg" alt="Back" />
          </div>
          <div className="subscription-logo">
            <img src="/src/img/MYYARD.svg" alt="My Yard" />
          </div>
        </div>
        <div className="subscription-content">
          <p>Загрузка информации о подписке…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-container">

      {/* Шапка */}
      <div className="subscription-header">
        <div className="subscription-back-btn" onClick={handleBack}>
          <img src="/src/img/Back.svg" alt="Back" />
        </div>
        <div className="subscription-logo">
          <img src="/src/img/MYYARD.svg" alt="My Yard" />
        </div>
      </div>

      {/* Основное содержимое */}
      <div className="subscription-content">
        <div className="subscription-title">О подписке</div>

        {error && (
          <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>
        )}

        {/* Карточка с информацией */}
        <div className="subscription-card">
          <div className="subscription-plan">{planName}</div>
          <div className="subscription-details">
            Действует до {endDate} ({daysLeft} {daysLeft === 1 ? 'день' : 'дня'})
          </div>

          {/* Список преимуществ */}
          <ul className="subscription-benefits">
            {benefits.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Кнопка «Продлить подписку» */}
        <button
          className="extend-button"
          onClick={handleExtend}
        >
          Продлить подписку
        </button>
      </div>
    </div>
  );
}
