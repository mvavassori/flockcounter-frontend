"use client"

import { useState } from "react";

interface ReferrersProps {
    data: {
      counts: number[];
      referrers: string[];
    };
  }

const Referrers: React.FC<ReferrersProps> = (props) => {
  const { data } = props
  const [counts, setCounts] = useState<number[]>(data.counts);
  const [referrers, serefferrers] = useState<string[]>(data.referrers);
  return (
    <div>
      <h2>Top Referrers</h2>
      <ul>
        {referrers.map((referrer, index) => (
          <li key={index}>
            {referrer}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Referrers