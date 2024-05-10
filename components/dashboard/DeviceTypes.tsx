"use client";

import { useState } from "react";

interface DeviceTypesProps {
  data: {
    counts: number[];
    deviceTypes: string[];
  };
}

const DeviceTypes: React.FC<DeviceTypesProps> = (props) => {
  const { data } = props;
  const [counts, setCounts] = useState<number[]>(data.counts);
  const [deviceTypes, setDeviceTypes] = useState<string[]>(data.deviceTypes);
  return (
    <div className="flex-grow w-min-200 bg-white rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Devices</h2>
      <ul>
        {deviceTypes.map((deviceType, index) => (
          <li key={index}>
            {deviceType}: {counts[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceTypes;
