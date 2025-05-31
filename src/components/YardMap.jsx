// src/components/YardMap.jsx
import React, { useRef, useEffect } from 'react';

export default function YardMap({
  width = 600,
  height = 400,
  rows = 4,
  cols = 8,
  spotSize = 50,
  gap = 10
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // фон
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);

    // рисуем места в виде прямоугольников
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * (spotSize + gap) + gap;
        const y = r * (spotSize + gap) + gap;
        ctx.fillStyle = '#9acd32';        // «свободное»
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.fillRect(x, y, spotSize, spotSize);
        ctx.strokeRect(x, y, spotSize, spotSize);
      }
    }
  }, [width, height, rows, cols, spotSize, gap]);

  return (
    <div style={{ border: '1px solid #ccc', display: 'inline-block' }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ display: 'block' }}
      />
    </div>
  );
}
