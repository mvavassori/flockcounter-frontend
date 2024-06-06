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
  const [counts, setCounts] = useState<number[]>(data.counts || []);
  const [deviceTypes, setDeviceTypes] = useState<string[]>(
    data.deviceTypes || []
  );
  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Devices</h2>
      <ul>
        {data.deviceTypes.map((deviceType, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{deviceType}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceTypes;
