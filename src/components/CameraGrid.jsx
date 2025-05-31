// src/components/CameraGrid.jsx
import React from 'react';

export default function CameraGrid({ cameras, onSelect }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1rem'
    }}>
      {cameras.map(cam => (
        <div
          key={cam.id}
          style={{
            position: 'relative',
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
          onClick={() => onSelect(cam)}
        >
          {/* 
            Здесь в будущем вместо <div> будет <video src={cam.streamUrl} />
            Пока — заглушка с именем камеры 
          */}
          <div style={{
            background: '#000', color: '#fff',
            height: '120px', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            {cam.name}
          </div>
        </div>
      ))}
    </div>
  );
}
