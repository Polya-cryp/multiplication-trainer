import React, { useEffect, useState } from 'react';

function MinimalFlowers() {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    // Создаем минималистичные цветы (всего 8 штук)
    const newFlowers = [];
    const count = 8; // мало цветов
    
    // Один цвет - розовый, чуть темнее фона
    const flowerColor = '#ff8a9f'; // #ff8a9f - чуть темнее #fff5f7
    
    // Минималистичные формы цветов
    const shapes = [
      'circle',      // круг
      'daisy',       // ромашка (3 лепестка)
      'dot',         // точка
      'line',        // линия
      'simple-flower' // простой цветок
    ];

    for (let i = 0; i < count; i++) {
      // Выбираем случайную форму
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      // Размер от 30 до 60 пикселей
      const size = Math.random() * 30 + 30;
      
      // Позиция (немного смещаем от краев)
      const left = Math.random() * 80 + 10; // 10-90%
      const top = Math.random() * 80 + 10;  // 10-90%
      
      // Медленная анимация
      const duration = Math.random() * 40 + 40; // 40-80 секунд
      const delay = Math.random() * -20;
      
      newFlowers.push({
        id: `minimal-flower-${i}`,
        shape,
        size,
        left,
        top,
        duration,
        delay,
        rotation: Math.random() * 360,
        color: flowerColor
      });
    }

    setFlowers(newFlowers);
  }, []);

  const renderFlower = (flower) => {
    const { shape, size, color, rotation } = flower;
    const center = size / 2;
    
    switch(shape) {
      case 'circle':
        // Простой круг
        return (
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={center}
              cy={center}
              r={size * 0.4}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        );
      
      case 'daisy':
        // Ромашка (3 лепестка)
        return (
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Лепесток 1 (верх) */}
            <path
              d={`M ${center} ${center * 0.2} L ${center} ${center * 0.8}`}
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Лепесток 2 (левый) */}
            <path
              d={`M ${center * 0.2} ${center} L ${center * 0.8} ${center}`}
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Лепесток 3 (правый) */}
            <path
              d={`M ${center * 1.8} ${center} L ${center * 1.2} ${center}`}
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Центр */}
            <circle
              cx={center}
              cy={center}
              r={size * 0.1}
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          </svg>
        );
      
      case 'dot':
        // Простая точка с кругом вокруг
        return (
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={center}
              cy={center}
              r={size * 0.15}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
            />
            <circle
              cx={center}
              cy={center}
              r={size * 0.05}
              fill={color}
              stroke="none"
            />
          </svg>
        );
      
      case 'line':
        // Линия с кружком на конце
        return (
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <path
              d={`M ${center * 0.3} ${center * 0.7} L ${center * 0.7} ${center * 0.3}`}
              stroke={color}
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle
              cx={center * 0.3}
              cy={center * 0.7}
              r={size * 0.08}
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
            <circle
              cx={center * 0.7}
              cy={center * 0.3}
              r={size * 0.08}
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          </svg>
        );
      
      case 'simple-flower':
        // Простой цветок с 4 лепестками
        return (
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* 4 лепестка в виде полукругов */}
            <path
              d={`M ${center} ${center * 0.2} Q ${center * 1.3} ${center * 0.4}, ${center} ${center * 0.6}`}
              stroke={color}
              strokeWidth="1"
              fill="none"
            />
            <path
              d={`M ${center} ${center * 0.2} Q ${center * 0.7} ${center * 0.4}, ${center} ${center * 0.6}`}
              stroke={color}
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx={center}
              cy={center}
              r={size * 0.1}
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="minimal-flowers">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="minimal-flower"
          style={{
            left: `${flower.left}%`,
            top: `${flower.top}%`,
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            animation: `drift ${flower.duration}s ${flower.delay}s infinite linear`,
            transform: `rotate(${flower.rotation}deg)`,
          }}
        >
          {renderFlower(flower)}
        </div>
      ))}
    </div>
  );
}

export default MinimalFlowers;