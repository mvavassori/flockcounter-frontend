"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getReferrers } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";
import { useRefetch } from "@/context/RefetchContext";
import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";
import { getDateRange } from "@/app/websites/[domain]/page";

interface ReferrersData {
  counts: number[];
  referrers: string[];
  totalCount: number;
}

const Referrers: React.FC<CommonDashboardComponentProps> = (props) => {
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
    // accessToken,
  } = props;

  const { data: session, update } = useSession();

  const { shouldRefetch, triggerRefetch } = useRefetch();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [referrers, setReferrers] = useState<ReferrersData | null>(null);
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
    const fetchReferrers = async () => {
      let limit = 10;
      let offset = (pageNumber - 1) * limit;
      try {
        const referrersData = await getReferrers(
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
          limit,
          offset
        );
        setReferrers(referrersData);
        setTotalPages(Math.ceil(referrersData.totalCount / limit));
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
      fetchReferrers();
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
    pageNumber,
    shouldRefetch,
  ]);

  const handleSelectedReferrerChange = (referrer: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("referrer", referrer);
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
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Top Referrers</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Top Referrers</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4 w-full">
      <h2 className="font-semibold text-lg mb-2">Top Referrers</h2>
      {referrers && referrers.referrers && (
        <ul>
          {referrers.referrers.map((referrer, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handleSelectedReferrerChange(referrer)}
            >
              <span
                className="font-semibold text-gray-800 truncate"
                title={referrer}
              >
                {referrer}
              </span>
              <span className="ml-2 text-blue-500 font-bold">
                {referrers.counts[index]}
              </span>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination */}
      {referrers && referrers.totalCount > 10 && (
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

export default Referrers;
