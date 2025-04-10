"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getCities } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";
import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";
import { getDateRange } from "@/utils/helper";

interface CitiesData {
  counts: number[];
  cities: string[];
  totalCount: number;
}

const Cities: React.FC<CommonDashboardComponentProps> = (props) => {
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

  const [cities, setCities] = useState<CitiesData | null>(null);
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
    const fetchCities = async () => {
      let limit = 10;
      let offset = (pageNumber - 1) * limit;
      try {
        const citiesData = await getCities(
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
        setCities(citiesData);
        setTotalPages(Math.ceil(citiesData.totalCount / limit));
      } catch (err: Error | any) {
        if (err.message === "Unauthorized") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchCities();
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

  const handleSelectedCityChange = (city: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("city", city);
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
        <h2 className="font-semibold mb-2 text-lg">Cities</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Cities</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Cities</h2>
      {cities && cities.cities && (
        <ul>
          {cities.cities.map((city, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handleSelectedCityChange(city)}
            >
              <span className="font-semibold text-gray-800">{city}</span>
              <span className="ml-2 text-blue-500 font-bold">
                {cities.counts[index]}
              </span>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination */}
      {cities && cities.totalCount > 10 && (
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

export default Cities;
