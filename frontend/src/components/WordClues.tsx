import React from "react";

export interface CharacterClue {
  character: string;        // Chinese character, e.g., "中国"
  translation: string;      // English meaning, e.g., "China"
}

interface Props {
  clues: CharacterClue[];
}

export const WordClues: React.FC<Props> = ({ clues }) => (
  <div className="flex space-x-4 mb-6">
    {clues.map(({ character, translation }, idx) => (
      <div
        key={idx}
        className="bg-white rounded-lg shadow p-4 text-center border-2 border-blue-300"
      >
        <div className="text-4xl font-bold mb-2">
          {character}
        </div>
        <div className="text-md text-gray-700">{translation}</div>
      </div>
    ))}
  </div>
);
