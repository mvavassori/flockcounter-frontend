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
  // const [counts, setCounts] = useState<number[]>(data.counts || []);
  // const [paths, setPaths] = useState<string[]>(data.paths || []);
  return (
    <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold mb-2 text-lg">Top Pages</h2>
      <ul>
        {data.paths.map((path, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{path}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pages;
