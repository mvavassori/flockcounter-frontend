"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getPages } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";
import LeftArrow from "@/components/icons/LeftArrow";
import RightArrow from "@/components/icons/RightArrow";

interface PagesData {
  counts: number[];
  paths: string[];
}

// todo: add pagination
const Pages: React.FC<CommonDashboardComponentProps> = (props) => {
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

  const [pages, setPages] = useState<PagesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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
    const fetchPages = async () => {
      let limit = 10;
      let offset = (pageNumber - 1) * limit;
      try {
        const pagesData = await getPages(
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
          limit,
          offset
        );
        setPages(pagesData);
        // Assume totalPages is calculated based on total counts divided by limit
        setTotalPages(Math.ceil(pagesData.totalCount / limit));
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
    pageNumber,
  ]);

  const handlePageSelectedChange = (selectedPath: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("page", selectedPath);
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
        <h2 className="font-semibold mb-2 text-lg">Top Pages</h2>
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
    <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
      <h2 className="font-semibold mb-2 text-lg">Top Pages</h2>
      {pages && pages.paths && (
        <ul>
          {pages.paths.map((path, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handlePageSelectedChange(path)}
            >
              <span
                className="font-semibold text-gray-800 truncate"
                title={path}
              >
                {path}
              </span>
              <span className="ml-2 text-blue-500 font-bold">
                {pages.counts[index]}
              </span>
            </li>
          ))}
        </ul>
      )}
      {/* TODO: Pagination */}
      <div className="flex justify-left items-center gap-2 mt-4">
        <button
          onClick={handlePrevPage}
          className={pageNumber > 1 ? "cursor-pointer" : "opacity-50"}
        >
          <LeftArrow />
        </button>
        <span>{pageNumber}</span>
        <button
          onClick={handleNextPage}
          className={pageNumber < totalPages ? "cursor-pointer" : "opacity-50"}
        >
          <RightArrow />
        </button>
      </div>
    </div>
  );
};

export default Pages;
