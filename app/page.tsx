import Link from "next/link";
import ShieldIcon from "@/components/icons/ShieldIcon";
import CookieIcon from "@/components/icons/CookieIcon";
import GlobeIcon from "@/components/icons/GlobeIcon";
import CodeIcon from "@/components/icons/CodeIcon";

export default function Home() {
  return (
    <div className="w-full px-4 pb-4 pt-12">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">
          Simple, Privacy-First Web Analytics
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Track your website visitors without compromising their privacy. No
          cookies, no personal data, just clean analytics.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            href="/websites/flockcounter.com"
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
          >
            View Demo
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        <div className="flex items-start gap-4">
          <div className="shrink-0 pt-1">
            <ShieldIcon />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Privacy-Friendly</h3>
            <p className="text-gray-600">
              We don&apos;t store any personal information or tracking data.
              Your visitors remain completely anonymous.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="shrink-0 pt-1">
            <CookieIcon />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Cookie-Free</h3>
            <p className="text-gray-600">
              No cookies, no tracking scripts, no consent banners needed. Just
              clean and simple analytics.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="shrink-0 pt-1">
            <GlobeIcon />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              EU-Hosted & GDPR Compliant
            </h3>
            <p className="text-gray-600">
              Built and hosted in Europe, fully compliant with GDPR regulations.
              Your data stays in the EU.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="shrink-0 pt-1">
            <CodeIcon />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Open Source</h3>
            <p className="text-gray-600">
              Built with Go and completely open source. Inspect the code,
              contribute, or self-host.
            </p>
          </div>
        </div>
      </div>

      {/* Simple Integration Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Integration as Simple as Analytics Should Be
        </h2>
        <div className="bg-gray-800 text-gray-100 p-6 rounded-lg">
          <code className="text-sm">
            {`<script defer src="https://flockcounter.com/static/script.js"></script>`}
          </code>
        </div>
      </div>
    </div>
  );
}
