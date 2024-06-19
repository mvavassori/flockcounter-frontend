import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface DeviceTypesProps {
  data: {
    counts: number[];
    deviceTypes: string[];
  };
}

const DeviceTypes: React.FC<DeviceTypesProps> = (props) => {
  const { data } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectedDeviceTypeChange = (deviceType: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("device", deviceType);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Devices</h2>
      <ul>
        {data.deviceTypes.map((deviceType, index) => (
          <li
            key={index}
            className="flex items-center justify-between cursor-pointer hover:underline"
            onClick={() => handleSelectedDeviceTypeChange(deviceType)}
          >
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
