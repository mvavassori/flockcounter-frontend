import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface CountriesProps {
  data: {
    counts: number[];
    countries: string[];
  };
}

const Countries: React.FC<CountriesProps> = (props) => {
  const { data } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectedCountryChange = (country: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("country", country);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Countries</h2>
      {data.countries && (
        <ul>
          {data.countries.map((country, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handleSelectedCountryChange(country)}
            >
              <span className="font-semibold text-gray-800">{country}</span>
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

export default Countries;
