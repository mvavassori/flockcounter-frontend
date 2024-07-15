import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface LanguagesProps {
  data: {
    counts: number[];
    languages: string[];
  };
}

const Languages: React.FC<LanguagesProps> = (props) => {
  const { data } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectedLanguageChange = (language: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("language", language);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Languages</h2>
      {data.languages && (
        <ul>
          {data.languages.map((language, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handleSelectedLanguageChange(language)}
            >
              <span className="font-semibold text-gray-800">{language}</span>
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

export default Languages;
