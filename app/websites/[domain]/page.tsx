"use client";
// import { notFound, redirect } from "next/navigation";
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
import CloseIcon from "@/components/icons/CloseIcon";

async function getTopStats(
  domain: string,
  startDate: string,
  endDate: string,
  interval: string,
  token: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) {
  console.log("topStats params", {
    startDate: startDate,
    endDate: endDate,
    interval: interval,
  });
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    interval: interval,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/top-stats/${domain}?${params}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        // errorMessage = "Invalid domain";
        console.error(text);
      } else if (response.status === 401) {
        errorMessage = "Access denied";
        // todo - redirect to login
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    console.log(data);
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
  token: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) {
  console.log("getPages params", {
    startDate: startDate,
    endDate: endDate,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/pages/${domain}?${params}`,
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
  token: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) {
  console.log("getReferrers params", {
    startDate: startDate,
    endDate: endDate,
    referrer: referrer,
  });

  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/referrers/${domain}?${params}`,
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
  token: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/device-types/${domain}?${params}`,
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
  token: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/oses/${domain}?${params}`,
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
  token: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/browsers/${domain}?${params}`,
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
  token: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/languages/${domain}?${params}`,
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
  token: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/countries/${domain}?${params}`,
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
  token: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/regions/${domain}?${params}`,
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
  token: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    pathname: page,
    referrer: referrer,
    device_type: device,
    os: os,
    browser: browser,
    language: language,
    country: country,
    region: region,
    city: city,
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/cities/${domain}?${params}`,
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

const fetchData = async (
  domain: string,
  startDateString: string,
  endDateString: string,
  token: string,
  interval: string,
  page: string,
  referrer: string,
  device: string,
  os: string,
  browser: string,
  language: string,
  country: string,
  region: string,
  city: string
) => {
  const topStatsData = await getTopStats(
    domain,
    startDateString,
    endDateString,
    interval,
    token,
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
  const pagesData = await getPages(
    domain,
    startDateString,
    endDateString,
    token,
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
  const referrersData = await getReferrers(
    domain,
    startDateString,
    endDateString,
    token,
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
  const deviceTypesData = await getDeviceTypes(
    domain,
    startDateString,
    endDateString,
    token,
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
  const osesData = await getOSes(
    domain,
    startDateString,
    endDateString,
    token,
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
  const browsersData = await getBrowsers(
    domain,
    startDateString,
    endDateString,
    token,
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
  const languagesData = await getLanguages(
    domain,
    startDateString,
    endDateString,
    token,
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
  const countriesData = await getCountries(
    domain,
    startDateString,
    endDateString,
    token,
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
  const regionsData = await getRegions(
    domain,
    startDateString,
    endDateString,
    token,
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
  const citiesData = await getCities(
    domain,
    startDateString,
    endDateString,
    token,
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

// todo check with different timezones
const getDateRange = (period: string) => {
  const now = new Date();
  const today = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  let startDate;
  let endDate = now;

  switch (period) {
    case "today":
      startDate = today;
      endDate = new Date(
        Date.UTC(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
          999
        )
      );
      break;
    case "yesterday":
      startDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 1)
      );
      endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 - 1);
      break;
    case "week":
      startDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 7)
      );
      break;
    case "month":
      startDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 30)
      );
      break;
    case "month-to-date":
      startDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
      break;
    case "last-month":
      startDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth() - 1, 1)
      );
      endDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999)
      );
      break;
    case "year-to-date":
      startDate = new Date(Date.UTC(today.getFullYear(), 0, 1));
      break;
    case "last-12-months":
      startDate = new Date(
        Date.UTC(now.getFullYear() - 1, now.getMonth(), now.getDate())
      );
      break;
    case "last-5-years":
      startDate = new Date(
        Date.UTC(now.getFullYear() - 5, now.getMonth(), now.getDate())
      );
      break;
    default:
      startDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 7)
      ); // Last 7 Days
  }

  // Adjust endDate to the end of the day if needed
  if (period !== "today" && period !== "yesterday" && period !== "last-month") {
    endDate = new Date(
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999
      )
    );
  }

  console.log("locale", startDate.toLocaleString()); // Local time
  console.log("iso", startDate.toISOString()); // UTC time

  return {
    startDateString: startDate.toISOString(), // UTC time string
    endDateString: endDate.toISOString(), // UTC time string
  };
};

export default function Dashboard({ params }: { params: { domain: string } }) {
  const { domain } = params;

  const { data } = useSession();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let period = searchParams.get("period");
  let page = searchParams.get("page");
  let referrer = searchParams.get("referrer");
  let device = searchParams.get("device");
  let os = searchParams.get("os");
  let browser = searchParams.get("browser");
  let language = searchParams.get("language");
  let country = searchParams.get("country");
  let region = searchParams.get("region");
  let city = searchParams.get("city");

  const [selectedPeriod, setSelectedPeriod] = useState(period || "week");
  const [selectedPage, setSelectedPage] = useState(page || "");
  const [selectedReferrer, setSelectedReferrer] = useState(referrer || "");
  const [selectedDevice, setSelectedDevice] = useState(device || "");
  const [selectedOs, setSelectedOs] = useState(os || "");
  const [selectedBrowser, setSelectedBrowser] = useState(browser || "");
  const [selectedLanguage, setSelectedLanguage] = useState(language || "");
  const [selectedCountry, setSelectedCountry] = useState(country || "");
  const [selectedRegion, setSelectedRegion] = useState(region || "");
  const [selectedCity, setSelectedCity] = useState(city || "");

  const [interval, setInterval] = useState("day");
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
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  // Fetch access token when it's available
  useEffect(() => {
    if (data?.backendTokens.accessToken) {
      setAccessToken(data.backendTokens.accessToken);
    }
  }, [data?.backendTokens.accessToken]);

  useEffect(() => {
    setSelectedPage(page || "");
    setSelectedReferrer(referrer || "");
    setSelectedDevice(device || "");
    setSelectedOs(os || "");
    setSelectedBrowser(browser || "");
    setSelectedLanguage(language || "");
    setSelectedCountry(country || "");
    setSelectedRegion(region || "");
    setSelectedCity(city || "");
  }, [
    pathname,
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

  useEffect(() => {
    const { startDateString, endDateString } = getDateRange(selectedPeriod);

    const fetchDataAsync = async () => {
      if (!accessToken) {
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const fetchedData = await fetchData(
          domain,
          startDateString,
          endDateString,
          accessToken,
          interval,
          selectedPage,
          selectedReferrer,
          selectedDevice,
          selectedOs,
          selectedBrowser,
          selectedLanguage,
          selectedCountry,
          selectedRegion,
          selectedCity
        );
        setApiData(fetchedData);
      } catch (err: Error | any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedPeriod,
    domain,
    accessToken,
    searchParams,
    selectedPage,
    selectedReferrer,
    selectedDevice,
    selectedOs,
    selectedBrowser,
    selectedLanguage,
    selectedCountry,
    selectedRegion,
    selectedCity,
  ]);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    router.replace(`${pathname}?period=${selected}`, { scroll: false });
    let newInterval = "day";

    switch (selected) {
      case "today":
        newInterval = "hour";
        break;
      case "yesterday":
        newInterval = "hour";
        break;
      case "week":
        newInterval = "day";
        break;
      case "month":
        newInterval = "day";
        break;
      case "month-to-date":
        newInterval = "day";
        break;
      case "last-month":
        newInterval = "day";
        break;
      case "year-to-date":
        newInterval = "month";
        break;
      case "last-12-months":
        newInterval = "month";
        break;
      case "last-5-years":
        newInterval = "month";
        break;
      default:
        newInterval = "month";
    }
    setSelectedPeriod(selected);
    setInterval(newInterval);
  };

  const clearFilter = (filter: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(filter);
    router.replace(`${pathname}?${newParams.toString()}`);

    // Also clear the state
    switch (filter) {
      case "device":
        setSelectedDevice("");
        break;
      case "os":
        setSelectedOs("");
        break;
      case "browser":
        setSelectedBrowser("");
        break;
      case "language":
        setSelectedLanguage("");
        break;
      case "country":
        setSelectedCountry("");
        break;
      case "region":
        setSelectedRegion("");
        break;
      case "city":
        setSelectedCity("");
        break;
      case "referrer":
        setSelectedReferrer("");
        break;
      case "page":
        setSelectedPage("");
        break;
      case "period":
        setSelectedPeriod("week");
        break;
      default:
        break;
    }
  };

  const filters = [
    { label: "Device", value: selectedDevice, key: "device" },
    { label: "OS", value: selectedOs, key: "os" },
    { label: "Browser", value: selectedBrowser, key: "browser" },
    { label: "Language", value: selectedLanguage, key: "language" },
    { label: "Country", value: selectedCountry, key: "country" },
    { label: "Region", value: selectedRegion, key: "region" },
    { label: "City", value: selectedCity, key: "city" },
    { label: "Referrer", value: selectedReferrer, key: "referrer" },
    { label: "Page", value: selectedPage, key: "page" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full p-4">
      <h1 className="pt-8 text-3xl font-semibold">{params.domain}</h1>
      <div className="flex justify-between mt-8 items-start">
        {/* make a div that renders whether there is a filter active (i.e. if there is a selected value) and a button to clear it */}
        <div className="flex gap-2 flex-wrap">
          {filters.map(
            (filter) =>
              filter.value && (
                <div
                  key={filter.key}
                  className="text-sm bg-slate-100 p-2 rounded flex items-center"
                >
                  <span>
                    {filter.label}: {filter.value}
                  </span>
                  <span
                    className="ml-2 cursor-pointer hover:text-red-500"
                    onClick={() => clearFilter(filter.key)}
                    title={`Clear filter: ${filter.value}`}
                  >
                    <CloseIcon width={16} height={16} />
                  </span>
                </div>
              )
          )}
        </div>

        <select
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="p-2 border rounded flex-grow-0"
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="month-to-date">Month to Date</option>
          <option value="last-month">Last Month</option>
          <option value="year-to-date">Year to Date</option>
          <option value="last-12-months">Last 12 Months</option>
          <option value="last-5-years">Last 5 Years</option>
        </select>
      </div>

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
