"use client"

import { useState } from "react";

interface PagesProps {
    data: {
      counts: number[];
      paths: string[];
    };
  }

  const Pages: React.FC<PagesProps> = (props) => {
    const { data } = props
    const [counts, setCounts] = useState<number[]>(data.counts);
  const [paths, setPaths] = useState<string[]>(data.paths);
  return (
    <div>
      <h2>Top Pages</h2>
      <ul>
        {paths.map((path, index) => (
          <li key={index}>
            {path}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pages