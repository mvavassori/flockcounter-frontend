"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getRegions } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";

interface RegionsData {
  counts: number[];
  regions: string[];
}

// todo: add pagination
const Regions: React.FC<CommonDashboardComponentProps> = (props) => {
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
  } = props;

  const { data } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [regions, setRegions] = useState<RegionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (data?.backendTokens.accessToken) {
      setAccessToken(data.backendTokens.accessToken);
    }
  }, [data?.backendTokens.accessToken]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setLoading(true);
    const fetchRegions = async () => {
      try {
        const regionsData = await getRegions(
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
        setRegions(regionsData);
        console.log(regionsData);
      } catch (err: Error | any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
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

  const handleSelectedRegionChange = (region: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("region", region);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  if (loading) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Regions</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Regions</h2>
      {regions && regions.regions && (
        <ul>
          {regions.regions.map((region, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handleSelectedRegionChange(region)}
            >
              <span className="font-semibold text-gray-800">{region}</span>
              <span className="ml-2 text-blue-500 font-bold">
                {regions.counts[index]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Regions;
