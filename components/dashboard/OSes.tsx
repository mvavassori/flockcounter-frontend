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
  const [counts, setCounts] = useState<number[]>(data.counts);
  const [oses, setOses] = useState<string[]>(data.oses);
  return (
    <div className="flex-grow w-min-200 bg-white rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Operating Systems</h2>
      <ul>
        {oses.map((os, index) => (
          <li key={index}>
            {os}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OSes;
