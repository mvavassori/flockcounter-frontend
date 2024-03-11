"use client"

import { useState } from "react";

interface CountriesProps {
    data: {
      counts: number[];
      countries: string[];
    };
  }

  const Countries: React.FC<CountriesProps> = (props) => {
    const { data } = props
    const [counts, setCounts] = useState<number[]>(data.counts);
  const [countries, setCountries] = useState<string[]>(data.countries);
  return (
    <div>
      <h2>Top Countries</h2>
      <ul>
        {countries.map((countries, index) => (
          <li key={index}>
            {countries}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Countries