"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getCities } from "@/service/backendCalls";
import { CommonDashboardComponentProps } from "@/types/commonTypes";
import Spinner from "@/components/Spinner";

interface CitiesData {
  counts: number[];
  cities: string[];
}

// todo: add pagination
const Cities: React.FC<CommonDashboardComponentProps> = (props) => {
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

  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cities, setCities] = useState<CitiesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setLoading(true);
    const fetchCities = async () => {
      try {
        const citiesData = await getCities(
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
        setCities(citiesData);
        console.log(citiesData);
      } catch (err: Error | any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
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

  const handleSelectedCityChange = (city: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("city", city);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  if (loading) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Cities</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
        <h2 className="font-semibold mb-2 text-lg">Cities</h2>
        <div className="flex justify-center items-center pb-4 h-[200px]">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
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
    </div>
  );
};

export default Cities;
