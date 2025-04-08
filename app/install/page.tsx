"use client";

import { useState } from "react";

export default function InstallScript() {
  const [technology, setTechnology] = useState("html");

  return (
    <div className="w-full px-4 pb-4 pt-12">
      <h1 className="text-2xl font-bold mb-4">Install the Script</h1>
      <select
        name="technology"
        id="technology"
        onChange={(e) => setTechnology(e.target.value)}
        value={technology}
        className="rounded-sm p-2"
      >
        <option className="rounded-sm" value="html">
          HTML
        </option>
        <option value="nextjs">NextJS</option>
      </select>

      <div className="mt-4">
        {technology === "html" ? (
          <div>
            <p className="mb-2">
              Add the following code just before the end of the{" "}
              <code>&lt;/body&gt;</code> tag:
            </p>
            <pre className="bg-gray-100 p-4 rounded-sm">
              <code>
                {/*todo change to prod hosted script location*/}
                {`<script defer src="script.js" crossorigin></script>`}
              </code>
            </pre>
          </div>
        ) : (
          <div>
            <p className="mb-2">
              Import the <code>Script</code> function from{" "}
              <code>next/script</code> and add the following code to your{" "}
              <code>layout.tsx</code> or <code>layout.jsx</code> page component:
            </p>
            <pre className="bg-gray-100 p-4 rounded-sm">
              <code>
                {/*todo change to prod hosted script location*/}
                {`<Script crossOrigin="anonymous" src="/static/script.js"></Script>`}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
