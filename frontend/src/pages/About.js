import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPage.css';
import Logo from '../components/Logo';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Dashboard
      </button>

      <div className="legal-content">
        <div className="about-header">
          <Logo size="large" />
          <h1>About CashFlow MTL</h1>
          <p className="about-tagline">
            Empowering Real Estate Investors with AI-Powered Analytics
          </p>
        </div>

        <section>
          <h2>Our Mission</h2>
          <p>
            CashFlow MTL was created to democratize real estate investment analysis in Montreal.
            We believe that powerful investment analytics shouldn't be limited to institutional
            investors with expensive tools. Our mission is to provide individual investors with
            the same level of data-driven insights using cutting-edge artificial intelligence.
          </p>
        </section>

        <section>
          <h2>What We Do</h2>
          <p>
            We combine multiple data sources to provide comprehensive investment analysis:
          </p>
          <ul>
            <li><strong>Real Property Data:</strong> Live listings from Centris.ca</li>
            <li><strong>Airbnb Market Intelligence:</strong> Analysis of 8,518+ active Montreal listings</li>
            <li><strong>Machine Learning Forecasts:</strong> AI-powered revenue predictions</li>
            <li><strong>Financial Modeling:</strong> Comprehensive ROI and cashflow analysis</li>
          </ul>
        </section>

        <section>
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Data Collection</h3>
              <p>
                We aggregate property listings from Centris and analyze real Airbnb rental data
                from Montreal's short-term rental market.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>AI Analysis</h3>
              <p>
                Our machine learning model processes property characteristics (bedrooms, location,
                size) to forecast potential Airbnb revenue.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Financial Modeling</h3>
              <p>
                We calculate all costs (mortgage, taxes, insurance, maintenance) and compare them
                to projected revenue to determine profitability.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Investment Insights</h3>
              <p>
                Get instant metrics including Cash-on-Cash return, Cap Rate, monthly cashflow,
                and professional business plans for bank presentations.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Our Technology</h2>
          <p>
            CashFlow MTL is built on modern, reliable technology:
          </p>
          <ul>
            <li><strong>Random Forest Machine Learning:</strong> Trained on thousands of real listings</li>
            <li><strong>Real-Time Data Integration:</strong> Live property listings and market data</li>
            <li><strong>Comprehensive Financial Models:</strong> Industry-standard calculations</li>
            <li><strong>Secure & Private:</strong> Your data is protected with enterprise-grade security</li>
          </ul>
        </section>

        <section id="pricing">
          <h2>Pricing</h2>
          <div className="pricing-box">
            <h3>Currently Free</h3>
            <p>
              CashFlow MTL is currently free to use as we continue developing and refining our
              platform. Enjoy unlimited access to all features while we're in beta.
            </p>
          </div>
        </section>

        <section id="faq">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <h3>Is this financial advice?</h3>
            <p>
              No. CashFlow MTL provides analytical tools and information for educational purposes
              only. Always consult with qualified financial, legal, and tax professionals before
              making investment decisions.
            </p>
          </div>

          <div className="faq-item">
            <h3>How accurate are the revenue forecasts?</h3>
            <p>
              Our AI model is trained on 8,518+ real Airbnb listings in Montreal and provides
              data-driven estimates. However, actual results will vary based on many factors including
              property management, seasonality, market conditions, and local regulations.
            </p>
          </div>

          <div className="faq-item">
            <h3>Where does the property data come from?</h3>
            <p>
              Property listings come from Centris.ca, Quebec's official real estate listing service.
              Airbnb market data comes from Inside Airbnb, a publicly available dataset of rental listings.
            </p>
          </div>

          <div className="faq-item">
            <h3>Can I add my own properties to analyze?</h3>
            <p>
              Yes! Use the "Add Real Property" button on the dashboard to input specific Centris
              listings you're interested in. Our system will analyze them using the same AI models.
            </p>
          </div>

          <div className="faq-item">
            <h3>What investment metrics do you calculate?</h3>
            <p>
              We calculate Cash-on-Cash Return, Cap Rate, monthly cashflow, down payment requirements,
              mortgage payments, operating expenses, and provide 5-year financial projections.
            </p>
          </div>

          <div className="faq-item">
            <h3>Is short-term rental legal in Montreal?</h3>
            <p>
              Montreal has specific regulations for short-term rentals. You must comply with local
              laws, obtain proper permits, and register with the appropriate authorities. We recommend
              consulting with a local real estate lawyer.
            </p>
          </div>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>Have questions or feedback? We'd love to hear from you:</p>
          <p>
            Email: <a href="mailto:hello@cashflowmtl.com">hello@cashflowmtl.com</a><br />
            Support: <a href="mailto:support@cashflowmtl.com">support@cashflowmtl.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
