export default function Contact() {
  return (
    <div className="w-full px-4 pb-4 pt-12">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4">
        For enterprise users interested in our services, please include the
        following information in your email:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Your website name</li>
        <li>Expected monthly pageviews</li>
        <li>Any specific requirements or questions</li>
      </ul>
      <p className="mb-4">
        Email:{" "}
        <a
          href="mailto:enterprise@example.com"
          className="text-blue-500 hover:underline"
        >
          contact@flockcounter.com
        </a>
      </p>
    </div>
  );
}
