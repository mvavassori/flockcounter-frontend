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
  const { data: session, update } = useSession();

  const [events, setEvents] = useState<EventsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [accessToken, setAccessToken] = useState("");

  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    if (session?.backendTokens.accessToken) {
      setAccessToken(session.backendTokens.accessToken);
      if (shouldRefetch) {
        setShouldRefetch(false);
        setTriggerFetch(true); // Set triggerFetch to true to refetch data
      }
    }
  }, [session?.backendTokens.accessToken, shouldRefetch]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setLoading(true);
    // const { startDateString, endDateString } = getDateRange(period);
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
          await update();
          setShouldRefetch(true); // Set shouldRefetch to true to refetch after updating session
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (accessToken || accessToken) {
      setTriggerFetch(false);
      fetchEvents();
    }
  }, [domain, startDate, endDate, accessToken, triggerFetch, accessToken]);

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
