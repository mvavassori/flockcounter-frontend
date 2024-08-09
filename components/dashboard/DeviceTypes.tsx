"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getDeviceTypes } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";
import { useRefetch } from "@/context/RefetchContext";

interface DeviceTypesData {
  counts: number[];
  deviceTypes: string[];
}

const DeviceTypes: React.FC<CommonDashboardComponentProps> = (props) => {
  const {
    domain,
    startDate,
    endDate,
    page,
    referrer,
    device,
    os,
    browser,
    language,
    country,
    region,
    city,
    accessToken,
  } = props;

  const { data: session, update } = useSession();

  const { shouldRefetch, triggerRefetch } = useRefetch();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [deviceTypes, setDeviceTypes] = useState<DeviceTypesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setLoading(true);
    const fetchDeviceTypes = async () => {
      try {
        const deviceTypesData = await getDeviceTypes(
          domain,
          startDate,
          endDate,
          accessToken,
          page,
          referrer,
          device,
          os,
          browser,
          language,
          country,
          region,
          city
        );
        setDeviceTypes(deviceTypesData);
        console.log(deviceTypesData);
      } catch (err: Error | any) {
        if (err.message === "Unauthorized") {
          // await update();
          triggerRefetch();
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (accessToken || shouldRefetch) {
      fetchDeviceTypes();
    }
  }, [
    domain,
    startDate,
    endDate,
    accessToken,
    page,
    referrer,
    device,
    os,
    browser,
    language,
    country,
    region,
    city,
  ]);

  const handleSelectedDeviceTypeChange = (deviceType: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("device", deviceType);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  if (loading) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Devices</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Devices</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Devices</h2>
      {deviceTypes && deviceTypes.deviceTypes && (
        <ul>
          {deviceTypes.deviceTypes.map((deviceType, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handleSelectedDeviceTypeChange(deviceType)}
            >
              <span className="font-semibold text-gray-800">{deviceType}</span>
              <span className="ml-2 text-blue-500 font-bold">
                {deviceTypes.counts[index]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeviceTypes;
