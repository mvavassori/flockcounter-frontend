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
    <div className="flex-grow w-min-200 bg-white rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Cities</h2>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            {city}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cities;
