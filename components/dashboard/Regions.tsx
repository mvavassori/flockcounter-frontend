"use client"

import { useState } from "react";

interface RegionsProps {
    data: {
      counts: number[];
      regions: string[];
    };
  }

  const Regions: React.FC<RegionsProps> = (props) => {
    const { data } = props
    const [counts, setCounts] = useState<number[]>(data.counts);
  const [regions, setRegions] = useState<string[]>(data.regions);
  return (
    <div>
      <h2>Top regions</h2>
      <ul>
        {regions.map((region, index) => (
          <li key={index}>
            {region}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Regions