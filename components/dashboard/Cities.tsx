import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface CitiesProps {
  data: {
    counts: number[];
    cities: string[];
  };
}

const Cities: React.FC<CitiesProps> = (props) => {
  const { data } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectedCityChange = (city: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("city", city);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Cities</h2>
      <ul>
        {data.cities.map((city, index) => (
          <li
            key={index}
            className="flex items-center justify-between cursor-pointer hover:underline"
            onClick={() => handleSelectedCityChange(city)}
          >
            <span className="font-semibold text-gray-800">{city}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cities;
