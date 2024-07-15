import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface BrowsersProps {
  data: {
    counts: number[];
    browsers: string[];
  };
}

const Browsers: React.FC<BrowsersProps> = (props) => {
  const { data } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectedBrowserChange = (browser: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("browser", browser);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Browsers</h2>
      {data.browsers && (
        <ul>
          {data.browsers.map((browser, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handleSelectedBrowserChange(browser)}
            >
              <span className="font-semibold text-gray-800">{browser}</span>
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

export default Browsers;
