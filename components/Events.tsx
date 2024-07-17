"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface EventsProps {
  domain: string;
  startDate: string;
  endDate: string;
}

interface EventData {
  eventNames: string[];
  counts: number[];
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

const Events = ({ domain, startDate, endDate }: EventsProps) => {
  const { data } = useSession();

  const [events, setEvents] = useState<EventData | null>(null);
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
    const fetchEventsAsync = async () => {
      try {
        const eventsData = await getEvents(
          domain,
          startDate,
          endDate,
          accessToken
        );
        setEvents(eventsData);

        console.log(eventsData);
      } catch (err: Error | any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsAsync();
  }, [domain, startDate, endDate, accessToken]);

  // console.log(domain);
  // console.log(accessToken);
  // console.log(startDate);
  // console.log(endDate);

  // console.log(events);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Events</h2>
      {events && events.eventNames && (
        <ul>
          {events.eventNames.map((event: string, index: number) => (
            <li key={index} className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">{event}</span>
              <span className="ml-2 text-blue-500 font-bold">
                {events.counts[index]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
