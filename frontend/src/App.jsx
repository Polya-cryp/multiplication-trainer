// frontend/src/App.jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [level, setLevel] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const levelSettings = {
    1: { name: 'Легкий', questions: 5, range: [1, 10], emoji: '🔍' },
    2: { name: 'Средний', questions: 10, range: [1, 100], emoji: '🟢' },
    3: { name: 'Сложный', questions: 15, range: [10, 100], emoji: '🟡' }
  };

  const generateQuestions = (selectedLevel) => {
    const settings = levelSettings[selectedLevel];
    const newQuestions = [];
    
    for (let i = 0; i < settings.questions; i++) {
      let x1, x2;
      
      if (selectedLevel === 2) {
        x1 = Math.floor(Math.random() * 9) + 1;
        x2 = Math.floor(Math.random() * 91) + 10;
      } else {
        x1 = Math.floor(Math.random() * (settings.range[1] - settings.range[0] + 1)) + settings.range[0];
        x2 = Math.floor(Math.random() * (settings.range[1] - settings.range[0] + 1)) + settings.range[0];
      }
      
      newQuestions.push({
        id: i,
        x1: x1,
        x2: x2,
        correctAnswer: x1 * x2,
        userAnswer: null,
        isCorrect: false
      });
    }
    
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setGameStarted(true);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback('❌ Введите ответ!');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
      return;
    }

    const answer = parseInt(userAnswer);
    if (isNaN(answer)) {
      setFeedback('❌ Введите число!');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
      return;
    }

    const currentQ = questions[currentQuestion];
    const isCorrect = (answer === currentQ.correctAnswer);

    // Обновляем вопрос
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion] = {
      ...currentQ,
      userAnswer: answer,
      isCorrect: isCorrect
    };
    setQuestions(updatedQuestions);

    // Обновляем счет
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('✅ Верно! Молодец!');
    } else {
      setFeedback(`❌ Неверно! Правильный ответ: ${currentQ.correctAnswer}`);
    }

    setShowFeedback(true);
    setUserAnswer('');

    // Переход к следующему вопросу
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
        setGameStarted(false);
      }
    }, 1500);
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return '🏆 Молодец!!! Идеальный результат!';
    if (percentage >= 70) return '👍 Хорошо! Так держать!';
    if (percentage >= 50) return '📚 Постарайся еще немного';
    if (percentage >= 30) return '💪 Старайся улучшить результат';
    return '✨ После многочисленных тренировок у тебя все получится!';
  };

  const restartGame = () => {
    setLevel(null);
    setGameStarted(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setShowFeedback(false);
    setUserAnswer('');
  };

  // Экран выбора уровня (ВАШ ДИЗАЙН)
  if (!gameStarted && !showResult) {
    return (
      <div className="container">
        <h1>Тренажёр</h1>
        <p className="subtitle">Выберите уровень сложности 🎓</p>
        <div className="levels">
          {[1, 2, 3].map((lvl) => (
            <button 
              key={lvl} 
              className={`level-btn level-${lvl}`} 
              onClick={() => {
                setLevel(lvl);
                generateQuestions(lvl);
              }}
            >
              <span className="level-emoji">{levelSettings[lvl].emoji}</span>
              <div className="level-info">
                <span className="level-name">{levelSettings[lvl].name}</span>
                <span className="level-details">
                  {levelSettings[lvl].questions} вопросов • числа {levelSettings[lvl].range[0]}–{levelSettings[lvl].range[1]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Экран результатов
  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="container result-container">
        <h1>Тренажёр</h1>
        <h2>📊 Ваш результат</h2>
        <div className="score-circle">
          <span className="score-number">{score}</span>
          <span className="score-total">/{questions.length}</span>
        </div>
        <div className="percentage">{percentage.toFixed(1)}%</div>
        <p className="result-message">{getResultMessage()}</p>
        <button className="restart-btn" onClick={restartGame}>🔄 Пройти заново</button>
      </div>
    );
  }

  // Экран игры (ВАШ ДИЗАЙН)
  const currentQ = questions[currentQuestion];
  return (
    <div className="container game-container">
      <h1>Тренажёр</h1>
      <div className="question-header">
        <span className="question-counter">Вопрос {currentQuestion + 1} из {questions.length}</span>
        <span className="score-display">⭐ {score}/{questions.length}</span>
      </div>
      <div className="question-box">
        <h2 className="question-text">
          {currentQ.x1} × {currentQ.x2}
        </h2>
      </div>
      <div className="answer-section">
        <input
          type="text"
          className="answer-input"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Введите ответ"
          disabled={showFeedback}
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
        />
        <button className="check-btn" onClick={checkAnswer} disabled={showFeedback}>
          ПРОВЕРИТЬ
        </button>
      </div>
      {showFeedback && (
        <div className={`feedback-message ${feedback.includes('Верно') ? 'success' : 'error'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}

export default App;