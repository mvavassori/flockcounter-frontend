export default function Pricing() {
  return (
    <div className="w-full px-4 pb-4 pt-12">
      <h1 className="text-2xl font-bold mb-4">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded p-4 border-2 border-black hover:border-blue-500">
          <h2 className="text-lg font-bold">Free</h2>
          <p className="text-sm">
            Get started with bare-analytics for free. No credit card required.
          </p>
          <p className="text-sm">
            <span className="font-bold">$0</span> per month
          </p>
          <p className="text-sm">
            <span className="font-bold">Unlimited</span> websites
          </p>
          <p className="text-sm">
            Unlimited <span className="font-bold">events</span>
          </p>
        </div>
        <div className="bg-white shadow-md rounded p-4 border-2 border-black hover:border-blue-500">
          <h2 className="text-lg font-bold">Pro</h2>
          <p className="text-sm">
            Get started with bare-analytics for free. No credit card required.
          </p>
          <p className="text-sm">
            <span className="font-bold">$0</span> per month
          </p>
          <p className="text-sm">
            <span className="font-bold">Unlimited</span> websites
          </p>
          <p className="text-sm">
            Unlimited <span className="font-bold">events</span>
          </p>
        </div>
      </div>
    </div>
  );
}
