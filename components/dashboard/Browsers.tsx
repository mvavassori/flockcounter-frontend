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
  const [counts, setCounts] = useState<number[]>(data.counts || []);
  const [browsers, setBrowsers] = useState<string[]>(data.browsers || []);
  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Browsers</h2>
      <ul>
        {data.browsers.map((browser, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{browser}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Browsers;
