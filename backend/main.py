from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from random import randint
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite использует порт 5173
    allow_methods=["*"],
    allow_headers=["*"],
)

class LevelRequest(BaseModel):
    level: int

class QuestionResponse(BaseModel):
    question_id: int
    text: str
    x1: int
    x2: int

class AnswerRequest(BaseModel):
    question_id: int
    answer: int
    level: int

class ResultResponse(BaseModel):
    correct: bool
    correct_answer: int
    message: str

current_questions = []
correct_count = 0
total_questions = 0

@app.post("/start", response_model=List[QuestionResponse])
def start_test(level_req: LevelRequest):
    global current_questions, correct_count, total_questions
    
    level = level_req.level
    
    if level == 1:
        total_questions = 5
        start = 1
        end = 10
    elif level == 2:
        total_questions = 10
        start = 1
        end = 100
    else:
        total_questions = 15
        start = 10
        end = 100
    
    current_questions = []
    for i in range(total_questions):
        if level == 2:
            x1 = randint(1, 9)
            x2 = randint(10, 100)
        else:
            x1 = randint(start, end)
            x2 = randint(start, end)
        
        current_questions.append({
            "id": i,
            "x1": x1,
            "x2": x2,
            "correct_answer": x1 * x2
        })
    
    correct_count = 0
    
    return [
        QuestionResponse(
            question_id=q["id"],
            text=f"Сколько будет {q['x1']} * {q['x2']}?",
            x1=q["x1"],
            x2=q["x2"]
        )
        for q in current_questions
    ]

@app.post("/check/{question_index}", response_model=ResultResponse)
def check_answer(question_index: int, answer_req: AnswerRequest):
    global correct_count
    
    question = current_questions[question_index]
    is_correct = (answer_req.answer == question["correct_answer"])
    
    if is_correct:
        correct_count += 1
        message = "Верно, молодец!"
    else:
        message = f"Неверно! Правильный ответ: {question['correct_answer']}"
    
    return ResultResponse(
        correct=is_correct,
        correct_answer=question["correct_answer"],
        message=message
    )

@app.get("/result")
def get_result():
    global correct_count, total_questions
    
    if total_questions == 0:
        return {"error": "Тест ещё не начат"}
    
    points = (correct_count / total_questions) * 100
    
    if points == 100:
        comment = "молодец!"
    elif points >= 70:
        comment = "хорошо"
    elif points >= 50:
        comment = "неплохо"
    elif points >= 30:
        comment = "старайся лучше"
    else:
        comment = "нужно повышать уровень знаний"
    
    return {
        "correct": correct_count,
        "total": total_questions,
        "points": round(points, 2),
        "comment": comment
    }
