"use client";
import { notFound, redirect } from "next/navigation";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import TopStats from "@/components/dashboard/TopStats";
import Pages from "@/components/dashboard/Pages";
import Referrers from "@/components/dashboard/Referrers";
import DeviceTypes from "@/components/dashboard/DeviceTypes";
import OSes from "@/components/dashboard/OSes";
import Browsers from "@/components/dashboard/Browsers";
import Languages from "@/components/dashboard/Languages";
import Countries from "@/components/dashboard/Countries";
import Regions from "@/components/dashboard/Regions";
import Cities from "@/components/dashboard/Cities";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

async function getTopStats(
  domain: string,
  startDate: string,
  endDate: string,
  token: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dashboard/top-stats/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid domain";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
        // todo - test redirect to login
        redirect("/signin");
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}

async function getPages(
  domain: string,
  startDate: string,
  endDate: string,
  token: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dashboard/pages/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid domain";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}
async function getReferrers(
  domain: string,
  startDate: string,
  endDate: string,
  token: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dashboard/referrers/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid domain";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}

async function getDeviceTypes(
  domain: string,
  startDate: string,
  endDate: string,
  token: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dashboard/device-types/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid domain";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}
async function getOSes(
  domain: string,
  startDate: string,
  endDate: string,
  token: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dashboard/oses/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid domain";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}

async function getBrowsers(
  domain: string,
  startDate: string,
  endDate: string,
  token: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dashboard/browsers/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid domain";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}

async function getLanguages(
  domain: string,
  startDate: string,
  endDate: string,
  token: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dashboard/languages/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid domain";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}

async function getCountries(
  domain: string,
  startDate: string,
  endDate: string,
  token: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dashboard/countries/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid domain";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}

async function getRegions(
  domain: string,
  startDate: string,
  endDate: string,
  token: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dashboard/regions/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid domain";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}

async function getCities(
  domain: string,
  startDate: string,
  endDate: string,
  token: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dashboard/cities/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid domain";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}

const getDateRange = (period: string) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let startDate;
  let endDate = now;

  switch (period) {
    case "today":
      startDate = today;
      break;
    case "yesterday":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 1);
      endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);
      break;
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "month-to-date":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case "last-month":
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endDate = new Date(today.getFullYear(), today.getMonth(), 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case "year-to-date":
      startDate = new Date(today.getFullYear(), 0, 1);
      break;
    case "last-12-months":
      startDate = new Date(now);
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    case "all-time":
      startDate = new Date(1970, 0, 1);
      break;
    default:
      startDate = today;
  }

  return {
    startDateString: startDate.toISOString(),
    endDateString: endDate.toISOString(),
  };
};

const fetchData = async (
  domain: string,
  startDateString: string,
  endDateString: string,
  token: string
) => {
  const topStatsData = await getTopStats(
    domain,
    startDateString,
    endDateString,
    token || ""
  );
  const pagesData = await getPages(
    domain,
    startDateString,
    endDateString,
    token || ""
  );
  const referrersData = await getReferrers(
    domain,
    startDateString,
    endDateString,
    token || ""
  );
  const deviceTypesData = await getDeviceTypes(
    domain,
    startDateString,
    endDateString,
    token || ""
  );
  const osesData = await getOSes(
    domain,
    startDateString,
    endDateString,
    token || ""
  );
  const browsersData = await getBrowsers(
    domain,
    startDateString,
    endDateString,
    token || ""
  );
  const languagesData = await getLanguages(
    domain,
    startDateString,
    endDateString,
    token || ""
  );
  const countriesData = await getCountries(
    domain,
    startDateString,
    endDateString,
    token || ""
  );
  const regionsData = await getRegions(
    domain,
    startDateString,
    endDateString,
    token || ""
  );
  const citiesData = await getCities(
    domain,
    startDateString,
    endDateString,
    token || ""
  );

  return {
    topStatsData,
    pagesData,
    referrersData,
    deviceTypesData,
    osesData,
    browsersData,
    languagesData,
    countriesData,
    regionsData,
    citiesData,
  };
};

export default function Dashboard({ params }: { params: { domain: string } }) {
  // const session = await getServerSession(authOptions);

  const { data } = useSession();

  console.log(data?.backendTokens.accessToken);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let period = searchParams.get("period");

  const [selectedPeriod, setSelectedPeriod] = useState(period || "today");
  const [startDateString, setStartDateString] = useState("");
  const [endDateString, setEndDateString] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState({
    topStatsData: null,
    pagesData: null,
    referrersData: null,
    deviceTypesData: null,
    osesData: null,
    browsersData: null,
    languagesData: null,
    countriesData: null,
    regionsData: null,
    citiesData: null,
  });

  useEffect(() => {
    const { startDateString, endDateString } = getDateRange(selectedPeriod);
    setStartDateString(startDateString);
    setEndDateString(endDateString);

    const fetchDataAsync = async () => {
      setLoading(true);
      const token = data?.backendTokens.accessToken || "";
      const fetchedData = await fetchData(
        params.domain,
        startDateString,
        endDateString,
        token
      );
      setApiData(fetchedData);
      setLoading(false);
    };

    fetchDataAsync();
  }, [selectedPeriod, params.domain]);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    router.replace(`${pathname}?period=${selected}`, { scroll: false });
    setSelectedPeriod(selected);
  };

  // console.log(topStatsData);
  // console.log(pagesData);
  // console.log(referrersData);
  // console.log(deviceTypesData);
  // console.log(osesData);
  // console.log(languagesData);
  // console.log(browsersData);
  // console.log(countriesData);
  // console.log(regionsData);
  // console.log(citiesData);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-4">
      <h1 className="pt-8 text-3xl font-semibold">{params.domain}</h1>
      <select
        value={selectedPeriod}
        onChange={handlePeriodChange}
        className="p-2 border rounded"
      >
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="week">Last 7 Days</option>
        <option value="month">Last 30 Days</option>
        <option value="month-to-date">Month to Date</option>
        <option value="last-month">Last Month</option>
        <option value="year-to-date">Year to Date</option>
        <option value="last-12-months">Last 12 Months</option>
        <option value="all-time">All time</option>
      </select>
      {apiData.topStatsData && <TopStats data={apiData.topStatsData} />}
      <div className="flex flex-wrap gap-4 min-w-full my-12">
        {apiData.pagesData && <Pages data={apiData.pagesData} />}
        {apiData.referrersData && <Referrers data={apiData.referrersData} />}
        {apiData.deviceTypesData && (
          <DeviceTypes data={apiData.deviceTypesData} />
        )}
        {apiData.osesData && <OSes data={apiData.osesData} />}
        {apiData.browsersData && <Browsers data={apiData.browsersData} />}
        {apiData.languagesData && <Languages data={apiData.languagesData} />}
        {apiData.countriesData && <Countries data={apiData.countriesData} />}
        {apiData.regionsData && <Regions data={apiData.regionsData} />}
        {apiData.citiesData && <Cities data={apiData.citiesData} />}
      </div>
    </div>
  );
}
