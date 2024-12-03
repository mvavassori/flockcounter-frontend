"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getUtmParameters } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";
import { useRefetch } from "@/context/RefetchContext";
import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";
import { getDateRange } from "@/utils/helper";

interface UTMParametersData {
  counts: number[];
  utm_values: string[];
  totalCount: number;
}

const UTMParameters: React.FC<CommonDashboardComponentProps> = (props) => {
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

  const { data: session, update } = useSession();

  const { shouldRefetch, triggerRefetch } = useRefetch();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedUtmParameter, setSelectedUtmParameter] =
    useState("utm_sources");
  const [utmParameters, setUtmParameters] = useState<UTMParametersData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (session?.backendTokens.accessToken) {
      setAccessToken(session.backendTokens.accessToken);
    }
  }, [session?.backendTokens.accessToken, shouldRefetch]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setLoading(true);
    const { startDateString, endDateString } = getDateRange(period);
    const fetchUtmParameters = async () => {
      let limit = 10;
      let offset = (pageNumber - 1) * limit;
      try {
        const UtmParametersData = await getUtmParameters(
          selectedUtmParameter,
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
        setUtmParameters(UtmParametersData);
        setTotalPages(Math.ceil(UtmParametersData.totalCount / limit));
      } catch (err: Error | any) {
        if (err.message === "Unauthorized") {
          await update();
          triggerRefetch();
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (accessToken || shouldRefetch) {
      fetchUtmParameters();
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
    shouldRefetch,
    selectedUtmParameter,
  ]);

  const handleSelectedUtmValueChange = (
    utm_value: string,
    selectedUtmParameter: string
  ) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    // To avoid triggering a new visit with utm parameters on filtering e.g. if the user adds utm_source=somesource on filtering to the url, the visit will be registered from the utm_source
    const mapping: { [key: string]: string } = {
      utm_sources: "utmSource",
      utm_mediums: "utmMedium",
      utm_campaigns: "utmCampaign",
      utm_terms: "utmTerm",
      utm_contents: "utmContent",
    };
    newSearchParams.set(mapping[selectedUtmParameter], utm_value);
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

  const handleSelectedUtmParameterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = event.target.value;
    console.log(selected);
    setSelectedUtmParameter(selected);
  };

  if (loading) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">UTM Sources</h2>
        <div className="flex justify-center items-center pb-4">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">UTM Sources</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4 w-full">
      <select
        value={selectedUtmParameter}
        onChange={handleSelectedUtmParameterChange}
        className="font-semibold text-lg mb-2 rounded-md flex-grow-0 bg-slate-200 border-2 outline-none cursor-pointer border-slate-200"
        style={{
          marginLeft: "-0.5rem", // adjust the overall left margin of the standard browser select
        }}
      >
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

      {utmParameters && utmParameters.utm_values && (
        <ul>
          {utmParameters.utm_values.map((utm_value, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() =>
                handleSelectedUtmValueChange(utm_value, selectedUtmParameter)
              }
            >
              <span
                className="font-semibold text-gray-800 truncate"
                title={utm_value}
              >
                {utm_value}
              </span>
              <span className="ml-2 text-blue-500 font-bold">
                {utmParameters.counts[index]}
              </span>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination */}
      {utmParameters && utmParameters.totalCount > 10 && (
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

export default UTMParameters;
