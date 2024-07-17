"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getEvents } from "@/service/backendCalls";

interface EventsProps {
  domain: string;
  startDate: string;
  endDate: string;
}

interface EventData {
  eventNames: string[];
  counts: number[];
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
