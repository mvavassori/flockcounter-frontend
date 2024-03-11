"use client"

import { useState } from "react";

interface BrowsersProps {
    data: {
      counts: number[];
      browsers: string[];
    };
  }

  const Browsers: React.FC<BrowsersProps> = (props) => {
    const { data } = props
    const [counts, setCounts] = useState<number[]>(data.counts);
  const [browsers, setBrowsers] = useState<string[]>(data.browsers);
  return (
    <div>
      <h2>Top Browsers</h2>
      <ul>
        {browsers.map((browser, index) => (
          <li key={index}>
            {browser}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Browsers