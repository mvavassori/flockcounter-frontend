"use client";

import { useState } from "react";

interface CountriesProps {
  data: {
    counts: number[];
    countries: string[];
  };
}

const Countries: React.FC<CountriesProps> = (props) => {
  const { data } = props;
  const [counts, setCounts] = useState<number[]>(data.counts || []);
  const [countries, setCountries] = useState<string[]>(data.countries || []);
  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Countries</h2>
      <ul>
        {data.countries.map((country, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{country}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
