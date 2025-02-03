"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { RefetchProvider } from "@/context/RefetchContext";
import { getDateRange } from "@/utils/helper";
import TopStats from "@/components/dashboard/TopStats";
import Pages from "@/components/dashboard/Pages";
import DeviceTypes from "@/components/dashboard/DeviceTypes";
import OSes from "@/components/dashboard/OSes";
import Browsers from "@/components/dashboard/Browsers";
import Languages from "@/components/dashboard/Languages";
import Countries from "@/components/dashboard/Countries";
import Regions from "@/components/dashboard/Regions";
import Cities from "@/components/dashboard/Cities";
import ReferrersAndUtm from "@/components/dashboard/ReferrersAndUtm";
import Events from "@/components/Events";
import CloseIcon from "@/components/icons/CloseIcon";

export default function Dashboard({ params }: { params: { domain: string } }) {
  const { domain } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Detect if we're rendering the demo dashboard.
  const isDemo = domain === process.env.NEXT_PUBLIC_DEMO_DOMAIN;

  // const { data: session } = useSession({ required: true });

  // Only require session if not on the demo domain.
  const { data: session } = useSession({ required: !isDemo });

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
  let interval = searchParams.get("interval");
  let utmSource = searchParams.get("utmSource");
  let utmMedium = searchParams.get("utmMedium");
  let utmCampaign = searchParams.get("utmCampaign");
  let utmTerm = searchParams.get("utmTerm");
  let utmContent = searchParams.get("utmContent");

  const [selectedPeriod, setSelectedPeriod] = useState(period || "week");
  const [selectedInterval, setSelectedInterval] = useState(interval || "day");
  const [selectedPage, setSelectedPage] = useState(page || "");
  const [selectedReferrer, setSelectedReferrer] = useState(referrer || "");
  const [selectedDevice, setSelectedDevice] = useState(device || "");
  const [selectedOs, setSelectedOs] = useState(os || "");
  const [selectedBrowser, setSelectedBrowser] = useState(browser || "");
  const [selectedLanguage, setSelectedLanguage] = useState(language || "");
  const [selectedCountry, setSelectedCountry] = useState(country || "");
  const [selectedRegion, setSelectedRegion] = useState(region || "");
  const [selectedCity, setSelectedCity] = useState(city || "");
  const [selectedUtmSource, setSelectedUtmSource] = useState(utmSource || "");
  const [selectedUtmMedium, setSelectedUtmMedium] = useState(utmMedium || "");
  const [selectedUtmCampaign, setSelectedUtmCampaign] = useState(
    utmCampaign || ""
  );
  const [selectedUtmTerm, setSelectedUtmTerm] = useState(utmTerm || "");
  const [selectedUtmContent, setSelectedUtmContent] = useState(
    utmContent || ""
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session, router]); // check if router is required

  // Set the selected filters from the URL params
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
    setSelectedInterval(interval || "day");
    setSelectedUtmSource(utmSource || "");
    setSelectedUtmMedium(utmMedium || "");
    setSelectedUtmCampaign(utmCampaign || "");
    setSelectedUtmTerm(utmTerm || "");
    setSelectedUtmContent(utmContent || "");
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
    interval,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
  ]);

  useEffect(() => {
    const { startDateString, endDateString } = getDateRange(selectedPeriod);
    setStartDate(startDateString);
    setEndDate(endDateString);
  }, [selectedPeriod]);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const existingParams = new URLSearchParams(searchParams);
    const selected = event.target.value;

    // Remove the existing period paramter
    existingParams.delete("period");

    // existingParams.delete("interval");

    let newInterval;

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
    setSelectedInterval(newInterval);

    // Set the new period paramter
    existingParams.set("period", selected);

    // Set the new interval paramter
    existingParams.set("interval", newInterval);

    router.push(`${pathname}?${existingParams.toString()}`, {
      scroll: false,
    });
  };

  const clearFilter = (filter: string) => {
    const newParams = new URLSearchParams(searchParams);
    // remove the filter from the URL
    newParams.delete(filter);
    router.replace(`${pathname}?${newParams.toString()}`, {
      scroll: false,
    });

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
      case "utmSource":
        setSelectedUtmSource("");
        break;
      case "utmMedium":
        setSelectedUtmMedium("");
        break;
      case "utmCampaign":
        setSelectedUtmCampaign("");
        break;
      case "utmTerm":
        setSelectedUtmTerm("");
        break;
      case "utmContent":
        setSelectedUtmContent("");
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
    { label: "UTM Source", value: selectedUtmSource, key: "utmSource" },
    { label: "UTM Medium", value: selectedUtmMedium, key: "utmMedium" },
    { label: "UTM Campaign", value: selectedUtmCampaign, key: "utmCampaign" },
    { label: "UTM Term", value: selectedUtmTerm, key: "utmTerm" },
    { label: "UTM Content", value: selectedUtmContent, key: "utmContent" },
  ];

  // props to pass to the dashboard components who need the same props
  const sharedProps = {
    domain: domain,
    period: selectedPeriod,
    page: selectedPage,
    referrer: selectedReferrer,
    device: selectedDevice,
    os: selectedOs,
    browser: selectedBrowser,
    language: selectedLanguage,
    country: selectedCountry,
    region: selectedRegion,
    city: selectedCity,
    utmSource: selectedUtmSource,
    utmMedium: selectedUtmMedium,
    utmCampaign: selectedUtmCampaign,
    utmTerm: selectedUtmTerm,
    utmContent: selectedUtmContent,
  };

  return (
    <div className="w-full px-4 pb-4 pt-12">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold">{domain}</h1>
          <Link
            href="/websites"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Back to Websites"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
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

      {/* dashboard components*/}
      <div>
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

        <RefetchProvider>
          <TopStats
            domain={domain}
            period={selectedPeriod}
            interval={selectedInterval} // here i also need to pass the interval (hour,day,month)
            page={selectedPage}
            referrer={selectedReferrer}
            device={selectedDevice}
            os={selectedOs}
            browser={selectedBrowser}
            language={selectedLanguage}
            country={selectedCountry}
            region={selectedRegion}
            city={selectedCity}
            utmSource={selectedUtmSource}
            utmMedium={selectedUtmMedium}
            utmCampaign={selectedUtmCampaign}
            utmTerm={selectedUtmTerm}
            utmContent={selectedUtmContent}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
            <ReferrersAndUtm {...sharedProps} />
            <Pages {...sharedProps} />
            <DeviceTypes {...sharedProps} />
            <OSes {...sharedProps} />
            <Browsers {...sharedProps} />
            <Languages {...sharedProps} />
            <Countries {...sharedProps} />
            <Regions {...sharedProps} />
            <Cities {...sharedProps} />
          </div>
          <Events domain={domain} startDate={startDate} endDate={endDate} />
        </RefetchProvider>
      </div>
    </div>
  );
}
