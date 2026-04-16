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
    1: { name: 'Лёгкий', questions: 5, range: [1, 10], desc: 'для начинающих', emoji: '🌱' },
    2: { name: 'Средний', questions: 10, range: [1, 100], desc: 'для уверенных', emoji: '🌿' },
    3: { name: 'Сложный', questions: 15, range: [10, 100], desc: 'для экспертов', emoji: '🌸' }
  };

  const generateQuestions = (selectedLevel) => {
    const settings = levelSettings[selectedLevel];
    const newQuestions = [];
    
    for (let i = 0; i < settings.questions; i++) {
      let x1, x2;
      
      if (selectedLevel === 2) {
        x1 = Math.floor(Math.random() * 9) + 1;
        x2 = Math.floor(Math.random() * 91) + 10;
      } else if (selectedLevel === 3) {
        x1 = Math.floor(Math.random() * 91) + 10;
        x2 = Math.floor(Math.random() * 91) + 10;
      } else {
        x1 = Math.floor(Math.random() * 10) + 1;
        x2 = Math.floor(Math.random() * 10) + 1;
      }
      
      newQuestions.push({
        id: i,
        x1: x1,
        x2: x2,
        correctAnswer: x1 * x2,
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
      setFeedback('Введите ответ');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
      return;
    }

    const answer = parseInt(userAnswer);
    if (isNaN(answer)) {
      setFeedback('Нужно ввести число');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
      return;
    }

    const currentQ = questions[currentQuestion];
    const isCorrect = (answer === currentQ.correctAnswer);

    if (isCorrect) {
      setScore(score + 1);
      setFeedback('Верно! Молодец!');
    } else {
      setFeedback(`Неверно! Правильный ответ: ${currentQ.correctAnswer}`);
    }

    setShowFeedback(true);
    setUserAnswer('');

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
    if (percentage === 100) return 'Молодец! Идеальный результат!';
    if (percentage >= 70) return 'Хорошо! Так держать!';
    if (percentage >= 50) return 'Постарайся ещё немного';
    if (percentage >= 30) return 'Старайся улучшить результат';
    return 'После тренировок у тебя всё получится!';
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

  // Экран выбора уровня
  if (!gameStarted && !showResult) {
    return (
      <div className="flower-container">
        <div className="petal petal-1"></div>
        <div className="petal petal-2"></div>
        <div className="petal petal-3"></div>
        <div className="petal petal-4"></div>
        <div className="petal petal-5"></div>
        <div className="petal petal-6"></div>
        <div className="flower-icon flower-icon-1">🌱</div>
        <div className="flower-icon flower-icon-2">🌿</div>
        <div className="flower-icon flower-icon-3">🌸</div>
        <div className="flower-icon flower-icon-4">🌼</div>
        <div className="content">
          <h1>Тренажёр</h1>
          <p className="subtitle">Выберите уровень сложности</p>
          <div className="levels">
            {[1, 2, 3].map((lvl) => (
              <button 
                key={lvl} 
                className={`level-card level-${lvl}`} 
                onClick={() => {
                  setLevel(lvl);
                  generateQuestions(lvl);
                }}
              >
                <span className="level-emoji">{levelSettings[lvl].emoji}</span>
                <div className="level-text">
                  <span className="level-name">{levelSettings[lvl].name}</span>
                  <span className="level-desc">
                    {levelSettings[lvl].questions} вопросов • числа {levelSettings[lvl].range[0]}–{levelSettings[lvl].range[1]}
                  </span>
                  <span className="level-sub">{levelSettings[lvl].desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Экран результатов
  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="flower-container">
        <div className="petal petal-1"></div>
        <div className="petal petal-2"></div>
        <div className="petal petal-3"></div>
        <div className="petal petal-4"></div>
        <div className="flower-icon flower-icon-1">🌱</div>
        <div className="flower-icon flower-icon-2">🌿</div>
        <div className="content">
          <h1>Тренажёр</h1>
          <h2>Ваш результат</h2>
          <div className="result-circle">
            <span className="result-score">{score}</span>
            <span className="result-total">/{questions.length}</span>
          </div>
          <div className="percentage">{percentage.toFixed(1)}%</div>
          <p className="result-message">{getResultMessage()}</p>
          <button className="restart-flower-btn" onClick={restartGame}>Пройти заново</button>
        </div>
      </div>
    );
  }

  // Экран игры
  const currentQ = questions[currentQuestion];
  return (
    <div className="flower-container">
      <div className="petal petal-1"></div>
      <div className="petal petal-2"></div>
      <div className="petal petal-3"></div>
      <div className="petal petal-4"></div>
      <div className="flower-icon flower-icon-1">🌱</div>
      <div className="flower-icon flower-icon-2">🌿</div>
      <div className="flower-icon flower-icon-3">🌸</div>
      <div className="content">
        <h1>Тренажёр</h1>
        <div className="game-info">
          <span className="question-count">Вопрос {currentQuestion + 1} из {questions.length}</span>
          <span className="game-score">{score}/{questions.length}</span>
        </div>
        <div className="question-flower">
          <h2>{currentQ.x1} × {currentQ.x2}</h2>
        </div>
        <div className="answer-area">
          <input
            type="text"
            className="flower-input"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Введите ответ"
            disabled={showFeedback}
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          />
          <button className="flower-btn" onClick={checkAnswer} disabled={showFeedback}>
            Проверить
          </button>
        </div>
        {showFeedback && (
          <div className={`flower-feedback ${feedback.includes('Верно') ? 'success-flower' : 'error-flower'}`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;