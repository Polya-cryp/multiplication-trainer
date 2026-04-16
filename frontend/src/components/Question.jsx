import React, { useState } from 'react';

function Question({ question, questionNumber, totalQuestions, onAnswer }) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const numAnswer = Number(answer);
    if (isNaN(numAnswer)) {
      setError('Пожалуйста, введите число');
      return;
    }
    
    setError('');
    setFeedback(null);
    onAnswer(numAnswer, (result) => {
      setFeedback({
        type: result.correct ? 'success' : 'error',
        message: result.message
      });
      
      setTimeout(() => {
        setFeedback(null);
        setAnswer('');
      }, 1500);
    });
  };

  return (
    <div className="question-container">
      <div className="progress">
        <span>Вопрос {questionNumber} из {totalQuestions}</span>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="question-card">
        <h2>{question.text}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="question-input-group">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Введите ответ"
              autoFocus
              disabled={feedback !== null}
            />
            {error && <div className="error">{error}</div>}
            
            {feedback && (
              <div className={`feedback ${feedback.type}`}>
                {feedback.message}
              </div>
            )}
            
            <button type="submit" disabled={feedback !== null}>
              {feedback ? '✓' : 'Проверить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Question;