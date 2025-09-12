import React, { useState } from "react";

interface Props {
  onGuess: (guess: string) => void;
  feedback: string;
}

export const GuessInput: React.FC<Props> = ({ onGuess, feedback }) => {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onGuess(value.trim());
        setValue("");
      }}
      className="flex flex-col items-center mb-4"
    >
      <input
        type="text"
        className="border rounded px-4 py-2 text-xl mb-2 w-1/2"
        placeholder="Type the Chinese word here..."
        value={value}
        onChange={e => setValue(e.target.value)}
        autoFocus
      />
      <button
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        type="submit"
      >
        Submit Guess
      </button>
      {feedback && <div className="mt-4 text-red-500 font-semibold">{feedback}</div>}
    </form>
  );
};
