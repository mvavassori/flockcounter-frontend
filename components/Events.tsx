"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getEvents } from "@/service/backendCalls";

interface EventsProps {
  domain: string;
  startDate: string;
  endDate: string;
}

interface EventsData {
  eventNames: string[];
  counts: number[];
}

const Events: React.FC<EventsProps> = (props) => {
  const { domain, startDate, endDate } = props;
  const { data: session } = useSession();

  const [events, setEvents] = useState<EventsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [accessToken, setAccessToken] = useState("");

  // Check if we are in demo mode based on the domain
  const isDemo = domain === process.env.NEXT_PUBLIC_DEMO_DOMAIN;

  useEffect(() => {
    if (isDemo) {
      // Use a dummy token for the demo (could be any string)
      setAccessToken("demo");
    } else if (session?.backendTokens?.accessToken) {
      setAccessToken(session.backendTokens.accessToken);
    }
  }, [isDemo, session?.backendTokens?.accessToken]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setLoading(true);
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents(
          domain,
          startDate,
          endDate,
          accessToken
        );
        setEvents(eventsData);
      } catch (err: Error | any) {
        if (err.message === "Unauthorized") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchEvents();
    }
  }, [domain, startDate, endDate, accessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Events</h2>
      {events && events.eventNames && events.eventNames.length > 0 ? (
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
      ) : (
        <p className="text-gray-600">No events found for this period.</p>
      )}
    </div>
  );
};

export default Events;
