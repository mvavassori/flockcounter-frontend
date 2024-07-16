interface EventsProps {
  domain: string;
  accessToken: string;
  startDate: string;
  endDate: string;
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

export default async function Events({
  domain,
  accessToken,
  startDate,
  endDate,
}: EventsProps) {
  const { data } = await getEvents(domain, startDate, endDate, accessToken);

  console.log(data);

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Events</h2>
      {data.eventNames && (
        <ul>
          {/* {data.eventNames.map((event, index) => (
            <li
              key={index}
              className="flex items-center justify-between"
            >
              <span className="font-semibold text-gray-800">{event}</span>
              <span className="ml-2 text-blue-500 font-bold">
                {data.counts[index]}
              </span>
            </li>
          ))} */}
        </ul>
      )}
    </div>
  );
}
