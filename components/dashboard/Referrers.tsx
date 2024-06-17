import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ReferrersProps {
  data: {
    counts: number[];
    referrers: string[];
  };
}

const Referrers: React.FC<ReferrersProps> = (props) => {
  const { data } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectedReferrerChange = (referrer: string) => {
    const existingSearchParams = searchParams.toString();
    const newSearchParams = new URLSearchParams(existingSearchParams);
    newSearchParams.set("referrer", referrer);
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };
  return (
    <div className="flex-grow w-min-200 bg-slate-200 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Top Referrers</h2>
      <ul>
        {data.referrers.map((referrer, index) => (
          <li
            key={index}
            className="flex items-center justify-between cursor-pointer hover:underline"
            onClick={() => handleSelectedReferrerChange(referrer)}
          >
            <span className="font-semibold text-gray-800">{referrer}</span>
            <span className="ml-2 text-blue-500 font-bold">
              {data.counts[index]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Referrers;
