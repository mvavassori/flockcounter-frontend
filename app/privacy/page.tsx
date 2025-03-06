import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        At FlockCounter, we are committed to protecting your privacy. This
        Privacy Policy explains how we collect, use, and disclose information
        when you use our web analytics platform.
      </p>

      <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>

      <p className="mb-4">
        We collect minimal information to provide our web analytics service.
        Specifically, we collect:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Page views:</strong> We track the pages visited on your
          website.
        </li>
        <li>
          <strong>Referrers:</strong> We record the website that referred a
          visitor to your site.
        </li>
        <li>
          <strong>Basic device information:</strong> We collect limited,
          anonymized information about the device used to access your site, such
          as screen size, and operating system. This does not include any
          personally identifiable information.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">Information We Do NOT Collect</h2>

      <p className="mb-4">
        We are committed to being a privacy-focused analytics platform. We
        explicitly do NOT collect the following:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Cookies:</strong> We do not use cookies or any other form of
          browser storage.
        </li>
        <li>
          <strong>IP Addresses:</strong> We do not store full IP addresses.
        </li>
        <li>
          <strong>Fingerprinting:</strong> We do not use browser or device
          fingerprinting techniques.
        </li>
        <li>
          <strong>Personal Information:</strong> We do not collect any
          personally identifiable information (PII), such as names, email
          addresses, or phone numbers.
        </li>
        <li>
          <strong>Cross-site Tracking:</strong> We do not track users across
          different websites.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">How We Use Information</h2>

      <p className="mb-4">
        The limited information we collect is used solely to provide aggregated
        website analytics data to website owners. This data helps them
        understand how visitors interact with their website.
      </p>

      <h2 className="text-2xl font-bold mb-2">Data Security</h2>
      <p className="mb-4">
        We take data security seriously and implement appropriate measures to
        protect the information we collect.
      </p>

      <h2 className="text-2xl font-bold mb-2">Data Retention</h2>
      <p className="mb-4">
        We retain the collected data for a period necessary to provide the
        analytics service.
      </p>

      <h2 className="text-2xl font-bold mb-2">Third-Party Disclosure</h2>
      <p className="mb-4">
        We do not sell, trade, or otherwise transfer your data to outside
        parties.
      </p>

      <h2 className="text-2xl font-bold mb-2">Your Rights</h2>
      <p className="mb-4">
        Since we do not collect personally identifiable information, there are
        no specific rights related to data access, modification, or deletion.
      </p>

      <h2 className="text-2xl font-bold mb-2">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page.
      </p>

      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us
        via our{" "}
        <Link className="text-blue-500 hover:underline" href="/contact">
          contact page
        </Link>
        .
      </p>
    </div>
  );
}
