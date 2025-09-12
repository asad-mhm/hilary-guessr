// filepath: [App.tsx](http://_vscodecontentref_/1)
import React, { useState, useEffect } from "react";
import { GuessInput } from "./components/GuessInput";

type CharacterClue = {
  character: string;
  translation: string;
};

type GuessRecord = {
  guess: string;
  score: number;
  correct: boolean;
};

const BACKEND_URL = "http://localhost:8000";

function App() {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-3xl font-bold mb-6">Hilary Guessr</h1>
      <div className="mb-6 flex flex-col items-center">
        <div className="flex space-x-4 text-5xl font-semibold mb-2">
          {clues.map((clue, idx) => (
            <span key={idx}>{clue.character}</span>
          ))}
        </div>
        <div className="flex space-x-4 text-lg text-gray-700">
          {clues.map((clue, idx) => (
            <span key={idx}>{clue.translation}</span>
          ))}
        </div>
      </div>
      <div className="w-full max-w-md">
        <ul className="mb-4">
          {guesses.map((g, idx) => (
            <li key={idx} className="flex justify-between items-center py-1">
              <span>{g.guess}</span>
              <span className="ml-2 text-blue-700">Score: {g.score}</span>
            </li>
          ))}
        </ul>
        {!guessed && <GuessInput onGuess={handleGuess} feedback={feedback} />}
        {guessed && (
          <div className="mt-4 text-green-700 text-2xl">
            🎉 Congratulations!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;