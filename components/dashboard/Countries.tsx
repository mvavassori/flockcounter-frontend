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
  const [counts, setCounts] = useState<number[]>(data.counts);
  const [countries, setCountries] = useState<string[]>(data.countries);
  return (
    <div className="flex-grow w-min-200 bg-white rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Countries</h2>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            {country}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
