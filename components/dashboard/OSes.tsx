"use client"

import { useState } from "react";

interface OSesProps {
    data: {
      counts: number[];
      oses: string[];
    };
  }

  const OSes: React.FC<OSesProps> = (props) => {
    const { data } = props
    const [counts, setCounts] = useState<number[]>(data.counts);
  const [oses, setOses] = useState<string[]>(data.oses);
  return (
    <div>
      <h2>Top Operating Systems</h2>
      <ul>
        {oses.map((os, index) => (
          <li key={index}>
            {os}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OSes