"use client"

import { useState } from "react";

interface LanguagesProps {
    data: {
      counts: number[];
      languages: string[];
    };
  }

  const Languages: React.FC<LanguagesProps> = (props) => {
    const { data } = props
    const [counts, setCounts] = useState<number[]>(data.counts);
  const [languages, setLanguages] = useState<string[]>(data.languages);
  return (
    <div>
      <h2>Top Languages</h2>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>
            {language}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Languages