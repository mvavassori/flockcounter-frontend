"use client";

import { useState } from "react";

interface OSesProps {
  data: {
    counts: number[];
    oses: string[];
  };
}

const OSes: React.FC<OSesProps> = (props) => {
  const { data } = props;
  const [counts, setCounts] = useState<number[]>(data.counts || []);
  const [oses, setOses] = useState<string[]>(data.oses || []);
  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Operating Systems</h2>
      <ul>
        {data.oses.map((os, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{os}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OSes;
