"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getOSes } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";

interface OSesData {
  counts: number[];
  oses: string[];
}

const OSes: React.FC<CommonDashboardComponentProps> = (props) => {
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

  const { data } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [oses, setOSes] = useState<OSesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setLoading(true);
    const fetchPages = async () => {
      try {
        const OSesData = await getOSes(
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
        setOSes(OSesData);
      } catch (err: Error | any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
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

  const handleSelectedOsChange = (os: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("os", os);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  if (loading) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Operating Systems</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Operating Systems</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Operating Systems</h2>
      {oses && oses.oses && (
        <ul>
          {oses.oses.map((os, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handleSelectedOsChange(os)}
            >
              <span className="font-semibold text-gray-800">{os}</span>
              <span className="ml-2 text-blue-500 font-bold">
                {oses.counts[index]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OSes;
