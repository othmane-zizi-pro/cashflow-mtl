import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPage.css';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Dashboard
      </button>

      <div className="legal-content">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: January 2025</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using CashFlow MTL ("the Platform"), you agree to be bound by these Terms
            of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            CashFlow MTL provides AI-powered real estate investment analysis tools for properties in
            Montreal, Quebec. Our platform uses machine learning algorithms to forecast potential Airbnb
            revenue, calculate investment metrics, and generate business plans.
          </p>
          <p><strong>Our services include:</strong></p>
          <ul>
            <li>Property investment analysis and ROI calculations</li>
            <li>AI-powered Airbnb revenue forecasting</li>
            <li>Investment metric calculations (Cash-on-Cash return, Cap Rate, etc.)</li>
            <li>Business plan generation</li>
            <li>Market data visualization</li>
          </ul>
        </section>

        <section>
          <h2>3. User Eligibility</h2>
          <p>You must be at least 18 years old and legally capable of entering into binding contracts
            to use our services. By using the Platform, you represent and warrant that you meet these
            requirements.
          </p>
        </section>

        <section>
          <h2>4. Important Disclaimers</h2>

          <h3>4.1 Not Financial Advice</h3>
          <p className="warning-box">
            <strong>IMPORTANT:</strong> CashFlow MTL provides analytical tools and information for
            educational and informational purposes only. Our analyses, forecasts, and recommendations
            DO NOT constitute financial, investment, tax, or legal advice. You should consult with
            qualified professionals before making any investment decisions.
          </p>

          <h3>4.2 No Guarantees</h3>
          <p>
            We make no guarantees, warranties, or representations about:
          </p>
          <ul>
            <li>The accuracy, completeness, or reliability of our analyses</li>
            <li>Future investment returns or property performance</li>
            <li>Occupancy rates or rental income</li>
            <li>Property values or market conditions</li>
          </ul>

          <h3>4.3 AI-Powered Forecasts</h3>
          <p>
            Our revenue forecasts are generated using machine learning models based on historical data.
            These forecasts are estimates only and actual results may vary significantly. Past performance
            does not guarantee future results.
          </p>
        </section>

        <section>
          <h2>5. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Conduct your own due diligence before making investment decisions</li>
            <li>Verify all property information independently</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not use the Platform for illegal or unauthorized purposes</li>
            <li>Not attempt to manipulate or reverse-engineer our algorithms</li>
          </ul>
        </section>

        <section>
          <h2>6. Intellectual Property</h2>
          <p>
            All content, features, and functionality of the Platform, including but not limited to text,
            graphics, logos, algorithms, and software, are owned by CashFlow MTL and protected by
            copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2>7. Third-Party Data</h2>
          <p>
            Our Platform aggregates data from third-party sources including:
          </p>
          <ul>
            <li>Centris.ca for property listings</li>
            <li>Inside Airbnb for rental market data</li>
            <li>Public databases and market sources</li>
          </ul>
          <p>
            We are not responsible for the accuracy or availability of third-party data. Property
            information should be verified directly with the listing source.
          </p>
        </section>

        <section>
          <h2>8. Limitation of Liability</h2>
          <p className="warning-box">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, CASHFLOW MTL SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS
            OF PROFITS, DATA, OR INVESTMENT LOSSES, ARISING FROM YOUR USE OF THE PLATFORM.
          </p>
        </section>

        <section>
          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless CashFlow MTL, its officers, directors, employees,
            and agents from any claims, damages, losses, liabilities, and expenses arising from your
            use of the Platform or violation of these Terms.
          </p>
        </section>

        <section>
          <h2>10. Service Modifications and Termination</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of the Platform at any
            time without notice. We may also terminate or suspend your access to the Platform for
            any reason, including violation of these Terms.
          </p>
        </section>

        <section>
          <h2>11. Privacy</h2>
          <p>
            Your use of the Platform is also governed by our Privacy Policy. Please review our Privacy
            Policy to understand our data collection and usage practices.
          </p>
        </section>

        <section>
          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Province
            of Quebec and the federal laws of Canada applicable therein, without regard to conflict of
            law principles.
          </p>
        </section>

        <section>
          <h2>13. Dispute Resolution</h2>
          <p>
            Any disputes arising from these Terms or your use of the Platform shall be resolved through
            binding arbitration in Montreal, Quebec, in accordance with the rules of the Quebec Arbitration
            Association.
          </p>
        </section>

        <section>
          <h2>14. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Platform after changes
            constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2>15. Contact Information</h2>
          <p>For questions about these Terms, please contact us at:</p>
          <p>
            Email: <a href="mailto:legal@cashflowmtl.com">legal@cashflowmtl.com</a><br />
            Address: Montreal, Quebec, Canada
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
