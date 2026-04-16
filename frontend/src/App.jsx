import MinimalFlowers from './components/MinimalFlowers';
import React, { useState } from 'react';
import LevelSelector from './components/LevelSelector';
import Question from './components/Question';
import Result from './components/Result';
import axios from 'axios';
import './App.css';


function App() {
  const [gameState, setGameState] = useState('levelSelect');
  const [level, setLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState('');

  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setCurrentQuestionIndex(0);
    setGameState('playing');
    setError('');
};

 const checkAnswer = (userAnswer, correctAnswer) => {
    if (userAnswer === correctAnswer) {
        return true;
    }
    return false;
};
      
      setTimeout(() => {
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setGameState('result');
        }
      }, 1500);
      
    } catch (error) {
      console.error('Ошибка при проверке ответа:', error);
      setError('Ошибка при проверке ответа');
    }
  };

  const restartGame = () => {
    setGameState('levelSelect');
    setLevel(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setError('');
  };

  return (
    <div className="app">
      <MinimalFlowers /> 
      
      <header className="header">
        <div className="header-content">
          <div className="brand">
            <span className="brand-icon">🌸</span>
            <span className="brand-name">Тренажёр</span>
          </div>
          <div className="header-gradient"></div>
        </div>
      </header>
      
      <main className="main">
        {error && <div className="error-message">{error}</div>}
        
        {gameState === 'levelSelect' && (
          <LevelSelector onSelectLevel={startGame} />
        )}
        
        {gameState === 'playing' && questions.length > 0 && (
          <Question 
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        )}
        
        {gameState === 'result' && (
          <Result onRestart={restartGame} />
        )}
      </main>
      
      <footer className="footer">
        <p>🧮 Тренажёр • 2026</p>
      </footer>
    </div>
  );
}

export default App;
