import { notFound } from "next/navigation";

async function getTopStats(id: number, startDate: string, endDate: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const response = await fetch(`${process.env.BACKEND_URL}/dashboard/top-stats/${id}?${params}`);
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, body: ${text}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPages(id: number , startDate: string, endDate: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const response = await fetch(`${process.env.BACKEND_URL}/dashboard/pages/${id}?${params}`);
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, body: ${text}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getReferrers(id: number, startDate: string, endDate: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const response = await fetch(`${process.env.BACKEND_URL}/dashboard/referrers/${id}?${params}`);
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, body: ${text}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getDeviceTypes(id: number, startDate: string, endDate: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const response = await fetch(`${process.env.BACKEND_URL}/dashboard/device-types/${id}?${params}`);
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, body: ${text}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOSes(id: number, startDate: string, endDate: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const response = await fetch(`${process.env.BACKEND_URL}/dashboard/oses/${id}?${params}`);
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, body: ${text}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getBrowsers(id: number, startDate: string, endDate: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const response = await fetch(`${process.env.BACKEND_URL}/dashboard/browsers/${id}?${params}`);
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, body: ${text}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getLanguages(id: number, startDate: string, endDate: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const response = await fetch(`${process.env.BACKEND_URL}/dashboard/languages/${id}?${params}`);
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, body: ${text}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCountries(id: number, startDate: string, endDate: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const response = await fetch(`${process.env.BACKEND_URL}/dashboard/countries/${id}?${params}`);
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, body: ${text}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getStates(id: number, startDate: string, endDate: string) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  const response = await fetch(`${process.env.BACKEND_URL}/dashboard/states/${id}?${params}`);
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}, body: ${text}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export default async function Dashboard({ params }: { params: { id: number } }) {
    //todo create state variables for the start and end date
    const topStatsData = await getTopStats(params.id, "2024-02-04 23:59:59.999", "2024-02-06 23:59:59.999");
    console.log(topStatsData)
    const pagesData = await getPages(params.id, "2024-02-04 23:59:59.999", "2024-02-06 23:59:59.999");
    console.log(pagesData)
    const referrersData = await getReferrers(params.id, "2024-02-04 23:59:59.999", "2024-02-06 23:59:59.999");
    console.log(referrersData)
    const deviceTypesData = await getDeviceTypes(params.id, "2024-02-04 23:59:59.999", "2024-02-06 23:59:59.999");
    console.log(deviceTypesData)
    const osesData = await getOSes(params.id, "2024-02-04 23:59:59.999", "2024-02-06 23:59:59.999");
    console.log(osesData)
    const browsersData = await getBrowsers(params.id, "2024-02-04 23:59:59.999", "2024-02-06 23:59:59.999");
    console.log(browsersData)
    const languagesData = await getLanguages(params.id, "2024-02-04 23:59:59.999", "2024-02-06 23:59:59.999");
    console.log(languagesData)
    const countriesData = await getCountries(params.id, "2024-02-04 23:59:59.999", "2024-02-06 23:59:59.999");
    console.log(countriesData)
    const statesData = await getStates(params.id, "2024-02-04 23:59:59.999", "2024-02-06 23:59:59.999");
    console.log(statesData)

  return (
    <main>Dashbaord</main>
  )
}