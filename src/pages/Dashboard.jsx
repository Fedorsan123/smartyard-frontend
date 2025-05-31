// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import SideNav from '../components/SideNav';
import './Dashboard.css';

export default function Dashboard() {
  // Статус бокового меню
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Статистика парковки
  const [freeSpots, setFreeSpots] = useState(null);
  const [totalSpots, setTotalSpots] = useState(null);

  // Список камер (превью из вашего потока MJPEG)
  const [cameras] = useState([
    {
      id: 1,
      name: 'Камера 1',
      previewUrl:
        'http://109.236.111.203/mjpg/video.mjpg',
    },
    {
      id: 2,
      name: 'Камера 2',
      previewUrl:
        'http://109.236.111.203/mjpg/video.mjpg',
    },
  ]);

  // Выбранная камера (для показа оверлея)
  const [selectedCam, setSelectedCam] = useState(null);

  useEffect(() => {
    // Пока ставим статичные числа
    setFreeSpots(58);
    setTotalSpots(64);

    // В будущем тут можно вызвать getFreeSpots() из API и getCameras()
  }, []);

  return (
    <div className="dashboard-container">
      {/* Если isNavOpen === true, рендерим SideNav */}
      {isNavOpen && <SideNav onClose={() => setIsNavOpen(false)} />}

      {/* Шапка */}
      <div className="dashboard-header">
        {/* Иконка меню (гамбургер). При клике открываем SideNav */}
        <div className="dashboard-menu-btn" onClick={() => setIsNavOpen(true)}>
          {/* Подставьте правильный путь к вашей SVG-иконке гамбургера */}
          <img src="/src/img/Menu.svg" alt="Menu" />
        </div>

        {/* Логотип «MY YARD» */}
        <div className="dashboard-logo">
          <img src="/src/img/MYYARD.svg" alt="My Yard" />
        </div>
      </div>

      {/* Основной контент */}
      <div className="dashboard-content">
        <div className="yard-card">
          <div className="yard-images">
            {cameras.map((cam) => (
              <div key={cam.id} className="yard-image">
                <img src={cam.previewUrl} alt={cam.name} />

                <div
                  className="camera-icon"
                  onClick={() => setSelectedCam(cam)}
                >
                  {/* Путь к вашей иконке камеры */}
                  <img src="/src/img/Camera.svg" alt="Camera Icon" />
                </div>
              </div>
            ))}
          </div>

          <div className="yard-info">
            <div className="yard-title">Мой двор</div>
            {freeSpots !== null && totalSpots !== null && (
              <div className="yard-subtitle">
                свободных мест: {freeSpots}/{totalSpots}
              </div>
            )}
          </div>
        </div>

        {/* Оверлей с большим превью */}
        {selectedCam && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
            }}
            onClick={() => setSelectedCam(null)}
          >
            <div
              style={{
                width: '90%',
                maxWidth: '600px',
                background: '#000',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedCam.previewUrl}
                alt={selectedCam.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedCam(null)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
