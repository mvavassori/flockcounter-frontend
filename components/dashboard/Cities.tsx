"use client";

import { useState } from "react";

interface CitiesProps {
  data: {
    counts: number[];
    cities: string[];
  };
}

const Cities: React.FC<CitiesProps> = (props) => {
  const { data } = props;
  const [counts, setCounts] = useState<number[]>(data.counts || []);
  const [cities, setCities] = useState<string[]>(data.cities || []);
  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Cities</h2>
      <ul>
        {data.cities.map((city, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{city}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}{" "}
      </ul>
    </div>
  );
};

export default Cities;
