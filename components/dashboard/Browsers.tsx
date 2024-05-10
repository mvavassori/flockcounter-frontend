"use client";

import { useState } from "react";

interface BrowsersProps {
  data: {
    counts: number[];
    browsers: string[];
  };
}

const Browsers: React.FC<BrowsersProps> = (props) => {
  const { data } = props;
  const [counts, setCounts] = useState<number[]>(data.counts);
  const [browsers, setBrowsers] = useState<string[]>(data.browsers);
  return (
    <div className="flex-grow w-min-200 bg-white rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Browsers</h2>
      <ul>
        {browsers.map((browser, index) => (
          <li key={index}>
            {browser}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Browsers;
