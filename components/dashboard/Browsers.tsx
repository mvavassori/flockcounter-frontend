"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getBrowsers } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";

interface BrowsersData {
  counts: number[];
  browsers: string[];
}

const Browsers: React.FC<CommonDashboardComponentProps> = (props) => {
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

  const [browsers, setBrowsers] = useState<BrowsersData | null>(null);
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
    const fetchBrowsers = async () => {
      try {
        const browsersData = await getBrowsers(
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
        setBrowsers(browsersData);
        console.log(browsersData);
      } catch (err: Error | any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBrowsers();
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

  const handleSelectedBrowserChange = (browser: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("browser", browser);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  if (loading) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Browsers</h2>
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
      <h2 className="font-semibold text-lg mb-2">Browsers</h2>
      {browsers && browsers.browsers && (
        <ul>
          {browsers.browsers.map((browser, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handleSelectedBrowserChange(browser)}
            >
              <span className="font-semibold text-gray-800">{browser}</span>
              <span className="ml-2 text-blue-500 font-bold">
                {browsers.counts[index]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Browsers;
