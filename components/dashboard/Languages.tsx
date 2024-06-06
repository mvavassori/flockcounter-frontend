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
  const [counts, setCounts] = useState<number[]>(data.counts || []);
  const [languages, setLanguages] = useState<string[]>(data.languages || []);
  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Languages</h2>
      <ul>
        {data.languages.map((language, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{language}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
