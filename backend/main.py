from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only, restrict in prod!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLUES = [
    {"character": "中", "translation": "middle"},
    {"character": "国", "translation": "country"},
]
ANSWER = "china"

class GuessRequest(BaseModel):
    guess: str

@app.get("/clues")
def get_clues():
    return {"clues": CLUES}

@app.post("/score")
def score_guess(req: GuessRequest):
    # Simple scoring: 1 point per correct character in correct position
    score = sum(1 for a, b in zip(req.guess, ANSWER) if a == b)
    correct = req.guess == ANSWER
    return {"score": score, "correct": correct}