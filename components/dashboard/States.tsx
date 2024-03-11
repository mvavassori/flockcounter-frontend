"use client"

import { useState } from "react";

interface StatesProps {
    data: {
      counts: number[];
      states: string[];
    };
  }

  const States: React.FC<StatesProps> = (props) => {
    const { data } = props
    const [counts, setCounts] = useState<number[]>(data.counts);
  const [states, setStates] = useState<string[]>(data.states);
  return (
    <div>
      <h2>Top States</h2>
      <ul>
        {states.map((state, index) => (
          <li key={index}>
            {state}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default States