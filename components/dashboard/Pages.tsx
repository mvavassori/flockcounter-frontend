import { useRouter, usePathname, useSearchParams } from "next/navigation";
interface PagesProps {
  data: {
    counts: number[];
    paths: string[];
  };
}

const Pages: React.FC<PagesProps> = (props) => {
  const { data } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageSelectedChange = (selectedPath: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("page", selectedPath);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4 max-w-sm">
      <h2 className="font-semibold mb-2 text-lg">Top Pages</h2>
      {/* todo - if data.paths is null, show a no data for this period message */}
      {data.paths && (
        <ul>
          {data.paths.map((path, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer hover:underline"
              onClick={() => handlePageSelectedChange(path)}
            >
              <span
                className="font-semibold text-gray-800 truncate"
                title={path}
              >
                {path}
              </span>
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

export default Pages;
