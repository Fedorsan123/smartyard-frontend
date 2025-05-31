// src/components/CameraModal.jsx
import React from 'react';

export default function CameraModal({ camera, onClose }) {
  if (!camera) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: 'relative', width: '80%', maxWidth: '800px',
        background: '#000', borderRadius: '8px', overflow: 'hidden'
      }}>
        {/* Позже сюда вставим <video src={camera.streamUrl} controls autoPlay /> */}
        <div style={{
          padding: '1rem', color: '#fff', textAlign: 'center'
        }}>
          <h2>{camera.name}</h2>
          <p>Тут появится видеопоток</p>
        </div>
        <button onClick={onClose} style={{
          position: 'absolute', top: '8px', right: '8px',
          background: 'transparent', border: 'none',
          color: '#fff', fontSize: '1.5rem', cursor: 'pointer'
        }}>×</button>
      </div>
    </div>
  );
}
