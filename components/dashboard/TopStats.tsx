"use client"

import { useState } from "react";
import "chart.js/auto";
import {Line } from "react-chartjs-2"

  const TopStats = () => {
    
  return (
    <div>
      <h2>Top Stats</h2>

<Line
  datasetIdKey='id'
  data={{
    labels: ['Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: '',
        data: [5, 6, 7],
      },
      {
        label: '',
        data: [3, 2, 1],
      },
    ],
  }}
/>
    </div>
  );
}

export default TopStats