"use client";

import { useState } from "react";

interface PagesProps {
  data: {
    counts: number[];
    paths: string[];
  };
}

const Pages: React.FC<PagesProps> = (props) => {
  const { data } = props;
  const [counts, setCounts] = useState<number[]>(data.counts || []);
  const [paths, setPaths] = useState<string[]>(data.paths || []);
  return (
    <div className="flex-grow w-min-200 bg-white rounded-lg p-4">
      <h2 className="font-semibold mb-2 text-lg">Top Pages</h2>
      <ul>
        {paths.map((path, index) => (
          <li key={index}>
            {path}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pages;
