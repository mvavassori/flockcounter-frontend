"use client"

import { useState } from "react";

interface CitiesProps {
    data: {
      counts: number[];
      cities: string[];
    };
  }

  const Cities: React.FC<CitiesProps> = (props) => {
    const { data } = props
    const [counts, setCounts] = useState<number[]>(data.counts);
  const [cities, setCities] = useState<string[]>(data.cities);
  return (
    <div>
      <h2>Top cities</h2>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            {city}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cities