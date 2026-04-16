import MinimalFlowers from './components/MinimalFlowers';
import React, { useState } from 'react';
import LevelSelector from './components/LevelSelector';
import Question from './components/Question';
import Result from './components/Result';
import './App.css';

function App() {
  // Состояния
  const [gameState, setGameState] = useState('levelSelect');
  const [level, setLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);

  // Функция проверки ответа
  const checkAnswer = (userAnswer, correctAnswer) => {
    if (userAnswer === correctAnswer) {
      setScore(score + 1);
      return true;
    }
    return false;
  };

  // Функция старта игры
  const startGame = async (selectedLevel) => {
    setLevel(selectedLevel);
    setGameState('loading');
    
    try {
      // Генерация вопросов в зависимости от уровня
      const newQuestions = [];
      const count = selectedLevel === 1 ? 5 : selectedLevel === 2 ? 10 : 15;
      
      for (let i = 0; i < count; i++) {
        let x1, x2;
        if (selectedLevel === 1) {
          x1 = Math.floor(Math.random() * 10) + 1;
          x2 = Math.floor(Math.random() * 10) + 1;
        } else if (selectedLevel === 2) {
          x1 = Math.floor(Math.random() * 9) + 1;
          x2 = Math.floor(Math.random() * 91) + 10;
        } else {
          x1 = Math.floor(Math.random() * 91) + 10;
          x2 = Math.floor(Math.random() * 91) + 10;
        }
        
        newQuestions.push({
          text: `${x1} × ${x2}`,
          correctAnswer: x1 * x2,
          userAnswer: null
        });
      }
      
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameState('playing');
    } catch (err) {
      setError('Ошибка при генерации вопросов');
      setGameState('levelSelect');
    }
  };

  // Функция обработки ответа
  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = (answer === currentQuestion.correctAnswer);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Обновляем вопрос с ответом пользователя
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQuestion,
      userAnswer: answer,
      isCorrect: isCorrect
    };
    setQuestions(updatedQuestions);
    
    // Переход к следующему вопросу
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameState('result');
      }
    }, 1000);
  };

  // Перезапуск игры
  const restartGame = () => {
    setGameState('levelSelect');
    setLevel(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setError('');
    setScore(0);
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
        
        {gameState === 'loading' && (
          <div className="loading">Загрузка вопросов... 🌸</div>
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
          <Result 
            questions={questions}
            score={score}
            onRestart={restartGame}
          />
        )}
      </main>
      
      <footer className="footer">
        <p>🧮 Тренажёр • 2026</p>
      </footer>
    </div>
  );
}

export default App;