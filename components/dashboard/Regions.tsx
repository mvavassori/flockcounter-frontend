"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getRegions } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";
import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";
import { getDateRange } from "@/utils/helper";

interface RegionsData {
  counts: number[];
  regions: string[];
  totalCount: number;
}

const Regions: React.FC<CommonDashboardComponentProps> = (props) => {
  const {
    domain,
    period,
    page,
    referrer,
    device,
    os,
    browser,
    language,
    country,
    region,
    city,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
  } = props;

  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [regions, setRegions] = useState<RegionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Check if we are in demo mode based on the domain
  const isDemo = domain === process.env.NEXT_PUBLIC_DEMO_DOMAIN;

  useEffect(() => {
    if (isDemo) {
      // Use a dummy token for the demo (could be any string)
      setAccessToken("demo");
    } else if (session?.backendTokens?.accessToken) {
      setAccessToken(session.backendTokens.accessToken);
    }
  }, [isDemo, session?.backendTokens?.accessToken]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setLoading(true);
    const { startDateString, endDateString } = getDateRange(period);
    const fetchRegions = async () => {
      let limit = 10;
      let offset = (pageNumber - 1) * limit;
      try {
        const regionsData = await getRegions(
          domain,
          startDateString,
          endDateString,
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
          utmSource,
          utmMedium,
          utmCampaign,
          utmTerm,
          utmContent,
          limit,
          offset
        );
        setRegions(regionsData);
        setTotalPages(Math.ceil(regionsData.totalCount / limit));
      } catch (err: Error | any) {
        if (err.message === "Unauthorized") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchRegions();
    }
  }, [
    domain,
    period,
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
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    pageNumber,
  ]);

  const handleSelectedRegionChange = (region: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("region", region);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  if (loading) {
    return (
      <div className="grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Regions</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Regions</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="grow w-min-200 bg-slate-200 rounded-lg p-4">
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
      {/* Pagination */}
      {regions && regions.totalCount > 10 && (
        <div className="flex justify-left items-center gap-2 mt-4">
          <button
            onClick={handlePrevPage}
            className={
              pageNumber > 1
                ? "cursor-pointer hover:text-blue-500"
                : "opacity-50 cursor-default"
            }
          >
            <LeftArrow />
          </button>
          <span className="cursor-default">{pageNumber}</span>
          <button
            onClick={handleNextPage}
            className={
              pageNumber < totalPages
                ? "cursor-pointer hover:text-blue-500"
                : "opacity-50 cursor-default"
            }
          >
            <RightArrow />
          </button>
        </div>
      )}
    </div>
  );
};

export default Regions;
