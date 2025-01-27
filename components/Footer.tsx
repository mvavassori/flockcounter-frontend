import React from "react";
import Link from "next/link";
import GitHubIcon from "@/components/icons/GitHubIcon";

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">FlockCounter</h3>
            <p className="text-sm text-gray-600">
              Simple, privacy-friendly analytics for the modern web.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900"
                >
                  About
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/docs"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Documentation
                </Link>
              </li> */}
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/data"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Data Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/mvavassori/flockcounter"
                  className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  <GitHubIcon />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@flockcounter.com"
                  className="text-gray-600 hover:text-gray-900"
                >
                  contact@flockcounter.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 text-sm text-gray-600">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>
              © {new Date().getFullYear()} FlockCounter. All rights reserved.
            </p>
            <p>Made in Europe 🇪🇺</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
