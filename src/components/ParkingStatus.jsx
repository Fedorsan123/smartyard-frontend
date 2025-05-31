// src/components/ParkingStatus.jsx
import React, { useState, useEffect } from 'react';
import { getFreeSpots } from '../api';

export default function ParkingStatus() {
  const [freeSpots, setFreeSpots] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getFreeSpots();
      setFreeSpots(data.free_spots);
    } catch (err) {
      console.error('ParkingStatus error:', err);  // <-- теперь err используется
      setError('Не удалось получить данные');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Загрузка статуса парковки…</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Свободных мест: {freeSpots}</h2>
      {/* TODO: сюда добавим Canvas/SVG с планом двора */}
    </div>
  );
}
