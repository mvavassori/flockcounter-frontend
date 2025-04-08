"use client";

export default function Playground() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Events Tracking Page</h1>
      {/* download link */}
      <a
        href="/static/example-pdf.pdf"
        download
        className="text-blue-500 underline mb-4 block"
        onClick={() => window.trackCustomEvent("download_example")}
      >
        Download Link
      </a>
      {/* mailto link */}
      <a
        href="mailto:example@example.com"
        className="text-blue-500 underline mb-4 block"
        onClick={() => window.trackCustomEvent("mailto_example")}
      >
        Mail To Link
      </a>
      {/* outbound link */}
      <a
        href="https://www.google.com"
        target="_blank"
        className="text-blue-500 underline mb-4 block"
        onClick={() => window.trackCustomEvent("outbound_google")}
      >
        Outbound Link
      </a>
      {/* form */}
      <form
        action="https://example.com/submit"
        method="post"
        className="bg-white p-4 rounded-sm shadow-md mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          window.trackCustomEvent("form_submit");
        }}
      >
        <input
          type="text"
          name="q"
          placeholder="Search"
          className="border p-2 rounded-sm w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-sm w-full hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {/* button */}
      <button
        className="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600"
        onClick={() => window.trackCustomEvent("button_click")}
      >
        Button
      </button>
    </div>
  );
}
