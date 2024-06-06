"use client";

import { useState } from "react";

interface ReferrersProps {
  data: {
    counts: number[];
    referrers: string[];
  };
}

const Referrers: React.FC<ReferrersProps> = (props) => {
  const { data } = props;
  const [counts, setCounts] = useState<number[]>(data.counts || []);
  const [referrers, serefferrers] = useState<string[]>(data.referrers || []);
  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Top Referrers</h2>
      <ul>
        {data.referrers.map((referrer, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{referrer}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Referrers;
