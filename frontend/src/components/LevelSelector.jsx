import React from 'react';

function LevelSelector({ onSelectLevel }) {
  return (
    <div className="level-selector">
      <h2>Тренажёр</h2>
      <p className="level-subtitle">Выберите уровень сложности 🌸</p>
      
      <div className="level-buttons">
        <button onClick={() => onSelectLevel(1)} className="level-btn easy">
          <h3>🍃 Легкий</h3>
          <p>5 вопросов • числа 1–10</p>
          <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>🌱 для начинающих</p>
        </button>
        
        <button onClick={() => onSelectLevel(2)} className="level-btn medium">
          <h3>🌸 Средний</h3>
          <p>10 вопросов • числа 1–100</p>
          <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>🌷 для уверенных</p>
        </button>
        
        <button onClick={() => onSelectLevel(3)} className="level-btn hard">
          <h3>🌺 Сложный</h3>
          <p>15 вопросов • числа 10–100</p>
          <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>🌸 для экспертов</p>
        </button>
      </div>
    </div>
  );
}

export default LevelSelector;