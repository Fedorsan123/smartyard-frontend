// src/components/SideNav.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideNav.css';

export default function SideNav({ onClose }) {
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const navigate = useNavigate();

  // Открыть/закрыть подпункты «Загруженность»
  const toggleAnalytics = () => {
    setAnalyticsOpen(!analyticsOpen);
  };

  // Навигация и закрытие меню
  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="sidenav-overlay" onClick={onClose}>
      <div className="sidenav" onClick={(e) => e.stopPropagation()}>
        {/* Секция «Мои данные» */}
        <div className="sidenav-section">
          <div className="sidenav-header">Мои данные</div>
          <div className="sidenav-link" onClick={() => handleNavigate('/profile')}>Настройки</div>
        </div>

        <hr />

        {/* Секция «Подписка» */}
        <div className="sidenav-section">
          <div className="sidenav-header">Подписка</div>
          <div className="sidenav-link" onClick={() => handleNavigate('/payment')}>Оплата</div>
          <div className="sidenav-link"onClick={() => handleNavigate('/subscription-info')}>О подписке</div>
        </div>

        <hr />

        {/* Секция «Аналитика» */}
        <div className="sidenav-section">
          <div className="sidenav-header">Аналитика</div>

          {/* Collapsible элемент «Загруженность» */}
          <div className="sidenav-link collapsible" onClick={toggleAnalytics}>
            <span>Загруженность</span>
            <span className={`arrow ${analyticsOpen ? 'open' : ''}`}>▼</span>
          </div>

          {analyticsOpen && (
            <div className="sidenav-submenu">
              <div className="sidenav-link" onClick={() => handleNavigate('/dashboard')}>
                Мой двор
              </div>
              <div className="sidenav-link" onClick={() => handleNavigate('#')}>
                Скоро
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
