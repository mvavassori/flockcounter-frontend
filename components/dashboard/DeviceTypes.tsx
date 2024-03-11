"use client"

import { useState } from "react";

interface DeviceTypesProps {
    data: {
      counts: number[];
      deviceTypes: string[];
    };
  }

  const DeviceTypes: React.FC<DeviceTypesProps> = (props) => {
    const { data } = props
    const [counts, setCounts] = useState<number[]>(data.counts);
  const [deviceTypes, setDeviceTypes] = useState<string[]>(data.deviceTypes);
  return (
    <div>
      <h2>Top DeviceTypes</h2>
      <ul>
        {deviceTypes.map((deviceType, index) => (
          <li key={index}>
            {deviceType}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeviceTypes