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
    <div className="flex-grow w-min-100 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold mb-2 text-lg">Top Pages</h2>
      <ul>
        {data.paths.map((path, index) => (
          <li
            key={index}
            className="flex items-center justify-between cursor-pointer hover:underline"
            onClick={() => handlePageSelectedChange(path)}
          >
            <span className="font-semibold text-gray-800">{path}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pages;
