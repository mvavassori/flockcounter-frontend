import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface EventsProps {
  data: {
    counts: number[];
    eventNames: string[];
  };
}

const Events: React.FC<EventsProps> = (props) => {
  const { data } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectedEventChange = (event: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("event", event);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Events</h2>
      {data.eventNames && (
        <ul>
          {data.eventNames.map((event, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handleSelectedEventChange(event)}
            >
              <span className="font-semibold text-gray-800">{event}</span>
              <span className="ml-2 text-blue-500 font-bold">
                {data.counts[index]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
