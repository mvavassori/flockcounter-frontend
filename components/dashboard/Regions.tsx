"use client";

import { useState } from "react";

interface RegionsProps {
  data: {
    counts: number[];
    regions: string[];
  };
}

const Regions: React.FC<RegionsProps> = (props) => {
  const { data } = props;
  const [counts, setCounts] = useState<number[]>(data.counts || []);
  const [regions, setRegions] = useState<string[]>(data.regions || []);
  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Regions</h2>
      <ul>
        {data.regions.map((region, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{region}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Regions;
