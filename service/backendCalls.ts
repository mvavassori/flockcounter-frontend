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

    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        // signOut(); // added to sign out the user when on the dashboard component(s)
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
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
  city: string,
  limit: number,
  offset: number
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
    limit: String(limit),
    offset: String(offset),
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/pages/${domain}?${params}`,
      { headers }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
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
  city: string,
  limit: number,
  offset: number
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
    limit: String(limit),
    offset: String(offset),
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/referrers/${domain}?${params}`,
      { headers }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
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
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
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
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
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
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
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
  city: string,
  limit: number,
  offset: number
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
    limit: String(limit),
    offset: String(offset),
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/languages/${domain}?${params}`,
      { headers }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
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
  city: string,
  limit: number,
  offset: number
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
    limit: String(limit),
    offset: String(offset),
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/countries/${domain}?${params}`,
      { headers }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
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
  city: string,
  limit: number,
  offset: number
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
    limit: String(limit),
    offset: String(offset),
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/regions/${domain}?${params}`,
      { headers }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
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
  city: string,
  limit: number,
  offset: number
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
    limit: String(limit),
    offset: String(offset),
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/cities/${domain}?${params}`,
      { headers }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
  }
}

async function getUtmParameters(
  utm_parameter: string,
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
  city: string,
  utm_source: string,
  utm_medium: string,
  utm_campaign: string,
  utm_term: string,
  utm_content: string,
  limit: number,
  offset: number
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
    utm_source: utm_source,
    utm_medium: utm_medium,
    utm_campaign: utm_campaign,
    utm_term: utm_term,
    utm_content: utm_content,
    limit: String(limit),
    offset: String(offset),
  });

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/${utm_parameter}/${domain}?${params}`,
      { headers }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
  }
}

async function getEvents(
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${domain}?${params}`,
      { headers }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        // signOut(); // added to sign out the user when on the events component
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid domain");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error; // Re-throw the error to be caught in the useEffect
  }
}

export {
  getTopStats,
  getPages,
  getReferrers,
  getDeviceTypes,
  getOSes,
  getBrowsers,
  getLanguages,
  getCountries,
  getRegions,
  getCities,
  getUtmParameters,
  getEvents,
};
