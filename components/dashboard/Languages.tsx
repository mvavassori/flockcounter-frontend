"use client";

import { useState } from "react";

interface LanguagesProps {
  data: {
    counts: number[];
    languages: string[];
  };
}

const Languages: React.FC<LanguagesProps> = (props) => {
  const { data } = props;
  const [counts, setCounts] = useState<number[]>(data.counts);
  const [languages, setLanguages] = useState<string[]>(data.languages);
  return (
    <div className="flex-grow w-min-200 bg-white rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Languages</h2>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>
            {language}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
