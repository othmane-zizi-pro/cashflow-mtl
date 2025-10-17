import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPage.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Dashboard
      </button>

      <div className="legal-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to CashFlow MTL ("we," "our," or "us"). We are committed to protecting your privacy
            and ensuring the security of your personal information. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <h3>2.1 Information You Provide</h3>
          <p>We may collect information that you voluntarily provide to us, including:</p>
          <ul>
            <li>Contact information (name, email address, phone number)</li>
            <li>Account credentials</li>
            <li>Property preferences and search criteria</li>
            <li>Communication preferences</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>When you use our services, we automatically collect certain information, including:</p>
          <ul>
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Usage data and analytics</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>Providing and improving our AI-powered investment analysis services</li>
            <li>Personalizing your user experience</li>
            <li>Communicating with you about our services</li>
            <li>Analyzing usage patterns to improve our platform</li>
            <li>Ensuring platform security and preventing fraud</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our platform</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information from
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
            over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2>6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience, analyze usage
            patterns, and deliver personalized content. You can control cookie preferences through your
            browser settings.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
            <li>Restriction of processing</li>
          </ul>
        </section>

        <section>
          <h2>8. Third-Party Links</h2>
          <p>
            Our platform may contain links to third-party websites (e.g., Centris.ca, Airbnb). We are not
            responsible for the privacy practices of these external sites. Please review their privacy
            policies before providing any personal information.
          </p>
        </section>

        <section>
          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section>
          <h2>10. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of
            residence. We ensure appropriate safeguards are in place for such transfers.
          </p>
        </section>

        <section>
          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any significant
            changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h2>12. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p>
            Email: <a href="mailto:privacy@cashflowmtl.com">privacy@cashflowmtl.com</a><br />
            Address: Montreal, Quebec, Canada
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
