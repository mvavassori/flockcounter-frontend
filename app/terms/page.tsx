import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>

      <p className="mb-4">Last Updated: March 06, 2025</p>

      <p className="mb-4">
        Please read these Terms of Service (&quot;Terms&quot;) carefully before
        using the FlockCounter web analytics platform (the &quot;Service&quot;)
        operated by FlockCounter (&quot;us&quot;, &quot;we&quot;, or
        &quot;our&quot;).
      </p>

      <h2 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h2>

      <p className="mb-4">
        By accessing or using the Service, you agree to be bound by these Terms.
        If you disagree with any part of the Terms, then you may not access the
        Service.
      </p>

      <h2 className="text-2xl font-bold mb-2">2. Use of the Service</h2>

      <p className="mb-4">
        You agree to use the Service only for lawful purposes and in a way that
        does not infringe the rights of, restrict, or inhibit anyone else&apos;s
        use and enjoyment of the Service. Prohibited behavior includes harassing
        or causing distress or inconvenience to any other user, transmitting
        obscene or offensive content, or disrupting the normal flow of dialogue
        within the Service.
      </p>

      <h2 className="text-2xl font-bold mb-2">3. Account Registration</h2>
      <p className="mb-4">
        If account registration is required to use the service, you must provide
        accurate and complete information. You are responsible for maintaining
        the confidentiality of your account and password.
      </p>

      <h2 className="text-2xl font-bold mb-2">4. Intellectual Property</h2>

      <p className="mb-4">
        The Service and its original content, features, and functionality are
        and will remain the exclusive property of FlockCounter and its
        licensors. The Service is protected by copyright, trademark, and other
        laws of both the [Your Country/Region] and foreign countries. Our
        trademarks and trade dress may not be used in connection with any
        product or service without the prior written consent of FlockCounter.
      </p>

      <h2 className="text-2xl font-bold mb-2">5. Termination</h2>

      <p className="mb-4">
        We may terminate or suspend access to our Service immediately, without
        prior notice or liability, for any reason whatsoever, including, without
        limitation, if you breach the Terms.
      </p>

      <h2 className="text-2xl font-bold mb-2">6. Disclaimer</h2>

      <p className="mb-4">
        Your use of the Service is at your sole risk. The Service is provided on
        an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The Service is
        provided without warranties of any kind, whether express or implied,
        including, but not limited to, implied warranties of merchantability,
        fitness for a particular purpose, non-infringement, or course of
        performance.
      </p>

      <h2 className="text-2xl font-bold mb-2">7. Limitation of Liability</h2>

      <p className="mb-4">
        In no event shall FlockCounter, nor its directors, employees, partners,
        agents, suppliers, or affiliates, be liable for any indirect,
        incidental, special, consequential, or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from (i) your access to or use of or
        inability to access or use the Service; (ii) any conduct or content of
        any third party on the Service; (iii) any content obtained from the
        Service; and (iv) unauthorized access, use, or alteration of your
        transmissions or content, whether based on warranty, contract, tort
        (including negligence), or any other legal theory, whether or not we
        have been informed of the possibility of such damage, and even if a
        remedy set forth herein is found to have failed of its essential
        purpose.
      </p>

      <h2 className="text-2xl font-bold mb-2">8. Governing Law</h2>

      <p className="mb-4">
        These Terms shall be governed and construed in accordance with the laws
        of [Your Country/Region], without regard to its conflict of law
        provisions.
      </p>

      <h2 className="text-2xl font-bold mb-2">9. Changes to Terms</h2>

      <p className="mb-4">
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. If a revision is material, we will try to provide at
        least 30 days&apos; notice prior to any new terms taking effect. What
        constitutes a material change will be determined at our sole discretion.
      </p>

      <h2 className="text-2xl font-bold mb-2">10. Contact Us</h2>

      <p className="mb-4">
        If you have any questions about these Terms, please contact us via our{" "}
        <Link className="text-blue-500 hover:underline" href="/contact">
          contact page
        </Link>
        .
      </p>
    </div>
  );
}
