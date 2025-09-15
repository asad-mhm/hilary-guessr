// filepath: [App.tsx](http://_vscodecontentref_/1)
import React, { useState, useEffect } from "react";

import { GuessInput } from "./components/GuessInput";
import { WordClues, CharacterClue } from "./components/WordClues";

interface GuessRecord {
  guess: string;
  score: number;
  correct: boolean;
}

const BACKEND_URL = "http://localhost:8000"; // Adjust as needed

export default function App() {
  const [clues, setClues] = useState<CharacterClue[]>([]);
  const [guesses, setGuesses] = useState<GuessRecord[]>([]);
  const [feedback, setFeedback] = useState("");
  const [guessed, setGuessed] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_URL}/clues`)
      .then((res) => res.json())
      .then((data) => setClues(data.clues));
  }, []);

  const handleGuess = async (guess: string) => {
    const res = await fetch(`${BACKEND_URL}/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess }),
    });
    const data = await res.json();
    setGuesses((prev) => [...prev, { guess, score: data.score, correct: data.correct }]);
    if (data.correct) {
      setFeedback("✅ Correct! Well done.");
      setGuessed(true);
    } else {
      setFeedback("❌ Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-yellow-100 transition-colors duration-700">
      <div className="w-full max-w-md mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 text-center drop-shadow mb-2 select-none font-[Inter]">Hilary Guessr</h1>
        <WordClues clues={clues} />
        <div className="w-full flex flex-col gap-4">
          <ul className="mb-2">
            {guesses.map((g, idx) => (
              <li key={idx} className="flex justify-between items-center py-1 text-lg">
                <span className={g.correct ? "text-green-700 font-bold" : ""}>{g.guess}</span>
                <span className="ml-2 text-blue-700">Score: {g.score}</span>
              </li>
            ))}
          </ul>
          {!guessed && <GuessInput onGuess={handleGuess} feedback={feedback} />}
          {guessed && (
            <div className="mt-4 text-green-700 text-2xl animate-bounce">
              🎉 Congratulations!
            </div>
          )}
        </div>
        <footer className="mt-6 text-xs text-gray-400 text-center select-none">Inspired by Wordle</footer>
      </div>
    </div>
  );
}