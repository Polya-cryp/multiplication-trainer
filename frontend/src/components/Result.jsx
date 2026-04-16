import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

function Result({ onRestart }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`${API_URL}/result`);
        setResult(response.data);
      } catch (error) {
        console.error('Ошибка при получении результатов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  const getSeasonEmoji = (points) => {
    if (points >= 90) return '🌺';
    if (points >= 70) return '🌸';
    if (points >= 50) return '🌷';
    if (points >= 30) return '🌱';
    return '🍂';
  };

  if (loading) {
    return <div className="loading">Загрузка результатов...</div>;
  }

  if (!result) {
    return <div className="error-message">Не удалось загрузить результаты 🌧️</div>;
  }

  return (
    <div className="result-container">
      <h2>Результат {getSeasonEmoji(result.points)}</h2>
      
      <div className="result-card">
        <div className="score">
          {result.correct}/{result.total}
        </div>
        
        <div className="percentage">
          {result.points}%
        </div>
        
        <div className="comment">
          {result.comment}
        </div>
        
        <button onClick={onRestart} className="restart-btn">
          🌸 Пройти заново 🌸
        </button>
      </div>
    </div>
  );
}

export default Result;