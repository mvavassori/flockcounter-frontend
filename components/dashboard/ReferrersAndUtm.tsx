"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getReferrers, getUtmParameters } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";
import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";
import { getDateRange } from "@/utils/helper";

interface UtmParametersData {
  counts: number[];
  utm_values: string[];
  totalCount: number;
}

interface ReferrersData {
  counts: number[];
  referrers: string[];
  totalCount: number;
}

type Data = UtmParametersData | ReferrersData;

const ReferrersAndUtm: React.FC<CommonDashboardComponentProps> = (props) => {
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

  const [selectedOption, setSelectedOption] = useState("referrers");
  const [data, setData] = useState<Data | null>(null);
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

    const fetchData = async () => {
      const limit = 10;
      const offset = (pageNumber - 1) * limit;
      try {
        let responseData: Data;

        if (selectedOption === "referrers") {
          responseData = await getReferrers(
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
        } else {
          responseData = await getUtmParameters(
            selectedOption,
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
        }

        setData(responseData);
        setTotalPages(Math.ceil(responseData.totalCount / limit));
      } catch (err: any) {
        if (err.message === "Unauthorized") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchData();
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
    selectedOption,
  ]);

  const handleSelectedOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
    setPageNumber(1); // Reset pagination on option change
  };

  const handleValueClick = (value: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);

    if (selectedOption === "referrers") {
      newSearchParams.set("referrer", value);
    } else {
      const mapping: { [key: string]: string } = {
        utm_sources: "utmSource",
        utm_mediums: "utmMedium",
        utm_campaigns: "utmCampaign",
        utm_terms: "utmTerm",
        utm_contents: "utmContent",
      };
      newSearchParams.set(mapping[selectedOption], value);
    }

    setPageNumber(1);

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
        <h2 className="font-semibold mb-2 text-lg">Referrers</h2>
        <div className="flex justify-center items-center pb-4">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Referrers</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="grow w-min-200 bg-slate-200 rounded-lg p-4 w-full">
      <select
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        className="font-semibold text-lg mb-2 rounded-md grow-0 bg-slate-200 border-2 outline-hidden cursor-pointer border-slate-200"
        style={{
          marginLeft: "-0.5rem", // adjust the overall left margin of the standard browser select
        }}
      >
        <option className="bg-slate-200 hover:bg-slate-300" value="referrers">
          Referrers
        </option>
        <option className="bg-slate-200 hover:bg-slate-300" value="utm_sources">
          UTM Sources
        </option>
        <option className="bg-slate-200 hover:bg-slate-300" value="utm_mediums">
          UTM Mediums
        </option>
        <option
          className="bg-slate-200 hover:bg-slate-300"
          value="utm_campaigns"
        >
          UTM Campaigns
        </option>
        <option className="bg-slate-200 hover:bg-slate-300" value="utm_terms">
          UTM Terms
        </option>
        <option
          className="bg-slate-200 hover:bg-slate-300"
          value="utm_contents"
        >
          UTM Contents
        </option>
      </select>

      {data && (
        <ul>
          {"utm_values" in data
            ? data.utm_values?.map((value, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between cursor-pointer hover:underline"
                  onClick={() => handleValueClick(value)}
                >
                  <span className="font-semibold text-gray-800 truncate">
                    {value}
                  </span>
                  <span className="ml-2 text-blue-500 font-bold">
                    {data.counts[index]}
                  </span>
                </li>
              ))
            : data.referrers?.map((value, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between cursor-pointer hover:underline"
                  onClick={() => handleValueClick(value)}
                >
                  <span className="font-semibold text-gray-800 truncate">
                    {value}
                  </span>
                  <span className="ml-2 text-blue-500 font-bold">
                    {data.counts[index]}
                  </span>
                </li>
              ))}
        </ul>
      )}
      {/* Pagination */}
      {data && data.totalCount > 10 && (
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

export default ReferrersAndUtm;
