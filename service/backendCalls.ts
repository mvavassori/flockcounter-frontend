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
  getEvents,
};
