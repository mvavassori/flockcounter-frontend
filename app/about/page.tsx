export default function About() {
  return (
    <div className="w-full px-4 pb-4 pt-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About FlockCounter</h1>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            FlockCounter was born from a simple belief: website analytics
            shouldn&apos;t come at the cost of user privacy. In an era where
            data collection has become increasingly invasive, we&apos;re taking
            a stand by providing a simple, privacy-focused alternative to
            traditional analytics tools.
          </p>
          <p className="text-gray-600 mb-4">
            Built and hosted in Europe, we&apos;re committed to upholding the
            highest standards of data privacy and protection. Our approach is
            simple: collect only what&apos;s necessary, store nothing that could
            identify individuals, and keep everything transparent.
          </p>
        </section>

        {/* Technical Philosophy */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Technical Philosophy</h2>
          <p className="text-gray-600 mb-4">
            We believe in building software that&apos;s both powerful and
            minimalist. Written in Go for maximum performance and reliability,
            FlockCounter is designed to be:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>
              Lightweight and fast - minimal impact on your website&apos;s
              performance
            </li>
            <li>Simple to integrate - just one line of code</li>
            <li>
              Easy to understand - no complex metrics or confusing dashboards
            </li>
            <li>
              Transparent - open source code that anyone can inspect or
              contribute to
            </li>
          </ul>
        </section>

        {/* GDPR & Privacy */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Privacy & Compliance</h2>
          <p className="text-gray-600 mb-4">
            Unlike traditional analytics tools, FlockCounter:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>Doesn&apos;t use any cookies or local storage</li>
            <li>Doesn&apos;t collect or store IP addresses</li>
            <li>Doesn&apos;t track users across websites</li>
            <li>Doesn&apos;t store any personally identifiable information</li>
          </ul>
          <p className="text-gray-600">
            This approach means you can use FlockCounter without cookie consent
            banners while remaining fully GDPR compliant.
          </p>
        </section>
      </div>
    </div>
  );
}
