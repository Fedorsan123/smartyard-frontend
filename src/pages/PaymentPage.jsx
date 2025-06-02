// src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

export default function PaymentPage() {
  const navigate = useNavigate();

  // Состояние формы
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Обработчик изменения полей
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Обработчик сабмита формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Здесь будет логика отправки данных на бэкенд (например, createPaymentIntent)
      // Пока — просто имитируем задержку и показываем alert
      await new Promise(res => setTimeout(res, 1000));
      alert('Оплата проведена (фейковый режим)');
      navigate('/dashboard'); // после успешной оплаты возвращаемся на главную
    } catch (err) {
      console.error(err);
      setError('Ошибка при оплате');
    } finally {
      setLoading(false);
    }
  };

  // Кнопка «назад»
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="payment-container">

      {/* Шапка = назад + логотип */}
      <div className="payment-header">
        <div className="payment-back-btn" onClick={handleBack}>
          <img src="/src/img/Back.svg" alt="Back" />
        </div>
        <div className="payment-logo">
          <img src="/src/img/MYYARD.svg" alt="My Yard" />
        </div>
      </div>

      {/* Основной контент */}
      <div className="payment-content">
        <div className="payment-title">Оплата</div>

        <form className="payment-form" onSubmit={handleSubmit}>
          {/* Номер карты */}
          <div className="input-group">
            <img className="icon" src="/src/img/CreditCard.svg" alt="Card" />
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="Номер карты"
              required
              maxLength={19}
            />
          </div>

          {/* Срок (MM/YY) */}
          <div className="input-group">
            <img className="icon" src="/src/img/Calendar.svg" alt="Expiry" />
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              required
              maxLength={5}
            />
          </div>

          {/* CVC */}
          <div className="input-group">
            <img className="icon" src="/src/img/Password.svg" alt="CVC" />
            <input
              type="password"
              name="cvc"
              value={form.cvc}
              onChange={handleChange}
              placeholder="CVC"
              required
              maxLength={4}
            />
          </div>

          {/* Кнопка «Оплатить» */}
          <button
            type="submit"
            className="pay-button"
            disabled={loading}
          >
            {loading ? 'Оплата…' : 'Оплатить'}
          </button>
          {error && (
            <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
