import { notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Pages from "@/components/dashboard/Pages";
import Referrers from "@/components/dashboard/Referrers";
import DeviceTypes from "@/components/dashboard/DeviceTypes";
import OSes from "@/components/dashboard/OSes";
import Browsers from "@/components/dashboard/Browsers";
import Languages from "@/components/dashboard/Languages";
import Countries from "@/components/dashboard/Countries";
import States from "@/components/dashboard/States";

async function getTopStats(domain: string, startDate: string, endDate: string, token: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/dashboard/top-stats/${domain}?${params}`, { headers });
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if(response.status === 404){
          errorMessage = "Invalid domain";
      } else if(response.status === 401){
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



async function getPages(domain: string, startDate: string, endDate: string, token: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/dashboard/pages/${domain}?${params}`, { headers });
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if(response.status === 404){
          errorMessage = "Invalid domain";
      } else if(response.status === 401){
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
async function getReferrers(domain: string, startDate: string, endDate: string, token: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/dashboard/referrers/${domain}?${params}`, { headers });
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if(response.status === 404){
          errorMessage = "Invalid domain";
      } else if(response.status === 401){
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

async function getDeviceTypes(domain: string, startDate: string, endDate: string, token: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/dashboard/device-types/${domain}?${params}`, { headers });
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if(response.status === 404){
          errorMessage = "Invalid domain";
      } else if(response.status === 401){
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
async function getOSes(domain: string, startDate: string, endDate: string, token: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/dashboard/oses/${domain}?${params}`, { headers });
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if(response.status === 404){
          errorMessage = "Invalid domain";
      } else if(response.status === 401){
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

async function getBrowsers(domain: string, startDate: string, endDate: string, token: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/dashboard/browsers/${domain}?${params}`, { headers });
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if(response.status === 404){
          errorMessage = "Invalid domain";
      } else if(response.status === 401){
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

async function getLanguages(domain: string, startDate: string, endDate: string, token: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/dashboard/languages/${domain}?${params}`, { headers });
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if(response.status === 404){
          errorMessage = "Invalid domain";
      } else if(response.status === 401){
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

async function getCountries(domain: string, startDate: string, endDate: string, token: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/dashboard/countries/${domain}?${params}`, { headers });
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if(response.status === 404){
          errorMessage = "Invalid domain";
      } else if(response.status === 401){
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

async function getStates(domain: string, startDate: string, endDate: string, token: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/dashboard/states/${domain}?${params}`, { headers });
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if(response.status === 404){
          errorMessage = "Invalid domain";
      } else if(response.status === 401){
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


export default async function Dashboard({ params }: { params: { domain: string } }) {
  const session = await getServerSession(authOptions);
    //todo create state variables for the start and end date
    const topStatsData = await getTopStats(params.domain, "2024-02-27 23:59:59.999", "2024-02-28 23:59:59.999", session?.backendTokens.accessToken || "");
    console.log(topStatsData)
    const pagesData = await getPages(params.domain, "2024-02-04 23:59:59.999", "2024-03-06 23:59:59.999", session?.backendTokens.accessToken || "");
    console.log(pagesData)
    const referrersData = await getReferrers(params.domain, "2024-02-04 23:59:59.999", "2024-03-06 23:59:59.999", session?.backendTokens.accessToken || "");
    console.log(referrersData)
    const deviceTypesData = await getDeviceTypes(params.domain, "2024-02-04 23:59:59.999", "2024-03-06 23:59:59.999", session?.backendTokens.accessToken || "");
    console.log(deviceTypesData)
    const osesData = await getOSes(params.domain, "2024-02-04 23:59:59.999", "2024-03-06 23:59:59.999", session?.backendTokens.accessToken || "");
    console.log(osesData)
    const browsersData = await getBrowsers(params.domain, "2024-02-04 23:59:59.999", "2024-03-06 23:59:59.999", session?.backendTokens.accessToken || "");
    console.log(browsersData)
    const languagesData = await getLanguages(params.domain, "2024-02-04 23:59:59.999", "2024-03-06 23:59:59.999", session?.backendTokens.accessToken || "");
    console.log(languagesData)
    const countriesData = await getCountries(params.domain, "2024-02-04 23:59:59.999", "2024-03-06 23:59:59.999", session?.backendTokens.accessToken || "");
    console.log(countriesData)
    const statesData = await getStates(params.domain, "2024-02-04 23:59:59.999", "2024-03-06 23:59:59.999", session?.backendTokens.accessToken || "");
    console.log(statesData)

  return (
    <>
    <div>All visits: {topStatsData}</div>
    <Pages data={pagesData}/>
    <Referrers data={referrersData}/>
    <DeviceTypes data={deviceTypesData}/>
    <OSes data={osesData}/>
    <Browsers data={browsersData}/>
    <Languages data={languagesData}/>
    <Countries data={countriesData}/>
    <States data={statesData}/>
    </>
  )
}