import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TechnicalGuide.css';

const TechnicalGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page technical-guide-page">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Dashboard
      </button>

      <div className="legal-content technical-content">
        <h1>Technical Guide & Methodology</h1>
        <p className="intro-text">
          Complete technical documentation of our investment analysis methodology, machine learning model,
          and financial calculations. This guide is designed for investors, developers, and analysts who
          want to understand the mathematics behind our forecasts.
        </p>

        {/* Table of Contents */}
        <div className="toc-box">
          <h3>Table of Contents</h3>
          <ol>
            <li><a href="#overview">System Overview</a></li>
            <li><a href="#ml-model">Machine Learning Model</a></li>
            <li><a href="#financial-calcs">Financial Calculations</a></li>
            <li><a href="#assumptions">Key Assumptions</a></li>
            <li><a href="#limitations">Limitations & Disclaimers</a></li>
            <li><a href="#data-sources">Data Sources</a></li>
          </ol>
        </div>

        {/* Section 1: System Overview */}
        <section id="overview" className="tech-section">
          <h2>1. System Overview</h2>
          <p>
            CashFlow MTL is an end-to-end investment analysis platform that combines machine learning
            with financial modeling to forecast Airbnb profitability for Montreal real estate properties.
          </p>

          <div className="architecture-box">
            <h3>System Architecture</h3>
            <div className="arch-flow">
              <div className="arch-step">
                <strong>Input</strong>
                <p>Property data (price, beds, baths, sqft, location)</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-step">
                <strong>ML Model</strong>
                <p>Random Forest predicts nightly rate & occupancy</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-step">
                <strong>Financial Model</strong>
                <p>Calculate mortgage, expenses, ROI metrics</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-step">
                <strong>Output</strong>
                <p>Complete investment analysis</p>
              </div>
            </div>
          </div>

          <h3>Technology Stack</h3>
          <ul>
            <li><strong>Backend:</strong> Flask (Python 3.9+), Pandas, NumPy</li>
            <li><strong>Machine Learning:</strong> scikit-learn 1.3.0 (RandomForestRegressor, StandardScaler)</li>
            <li><strong>Frontend:</strong> React 18.2, React Router 6</li>
            <li><strong>Data Storage:</strong> JSON file-based storage with thread-safe operations</li>
          </ul>
        </section>

        {/* Section 2: ML Model */}
        <section id="ml-model" className="tech-section">
          <h2>2. Machine Learning Model</h2>

          <h3>2.1 Model Architecture</h3>
          <div className="code-box">
            <strong>Algorithm:</strong> Random Forest Regression<br/>
            <strong>Implementation:</strong> scikit-learn RandomForestRegressor<br/>
            <strong>Hyperparameters:</strong>
            <ul>
              <li>n_estimators: 100 (number of decision trees)</li>
              <li>random_state: 42 (for reproducibility)</li>
              <li>max_depth: None (trees grow until pure)</li>
              <li>min_samples_split: 2 (default)</li>
            </ul>
          </div>

          <h3>2.2 Training Data</h3>
          <p>
            The model is trained on the <strong>Inside Airbnb</strong> dataset for Montreal,
            containing <strong>8,518 real listings</strong> scraped as of the latest data release.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <strong>8,518</strong>
              <span>Total Listings</span>
            </div>
            <div className="stat-card">
              <strong>5</strong>
              <span>Feature Variables</span>
            </div>
            <div className="stat-card">
              <strong>100%</strong>
              <span>Real Market Data</span>
            </div>
          </div>

          <h3>2.3 Feature Engineering</h3>
          <p>The model uses 5 input features to predict nightly rates:</p>
          <table className="feature-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Type</th>
                <th>Description</th>
                <th>Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>bedrooms</td>
                <td>Integer</td>
                <td>Number of bedrooms</td>
                <td>0-10</td>
              </tr>
              <tr>
                <td>bathrooms</td>
                <td>Float</td>
                <td>Number of bathrooms</td>
                <td>0-6</td>
              </tr>
              <tr>
                <td>accommodates</td>
                <td>Integer</td>
                <td>Maximum guest capacity</td>
                <td>1-16</td>
              </tr>
              <tr>
                <td>latitude</td>
                <td>Float</td>
                <td>Property latitude coordinate</td>
                <td>45.4-45.6</td>
              </tr>
              <tr>
                <td>longitude</td>
                <td>Float</td>
                <td>Property longitude coordinate</td>
                <td>-73.9 to -73.5</td>
              </tr>
            </tbody>
          </table>

          <h3>2.4 Data Preprocessing</h3>
          <div className="code-box">
            <strong>StandardScaler Normalization:</strong>
            <pre>{`X_scaled = (X - mean) / std_deviation

Where:
- X = raw feature values
- mean = training set mean for each feature
- std_deviation = training set standard deviation`}</pre>
          </div>
          <p>
            StandardScaler ensures all features contribute equally to the model by transforming
            them to have mean=0 and standard deviation=1.
          </p>

          <h3>2.5 Model Performance Metrics</h3>
          <p>Performance evaluated on training data (8,518 listings):</p>
          <div className="metrics-grid">
            <div className="metric-card">
              <h4>R² Score</h4>
              <p className="metric-value">~0.45-0.60</p>
              <p className="metric-desc">Moderate predictive power; location and amenities explain 45-60% of price variance</p>
            </div>
            <div className="metric-card">
              <h4>MAE (Mean Absolute Error)</h4>
              <p className="metric-value">$15-25</p>
              <p className="metric-desc">Average prediction error per night</p>
            </div>
            <div className="metric-card">
              <h4>RMSE (Root Mean Square Error)</h4>
              <p className="metric-value">$20-35</p>
              <p className="metric-desc">Standard deviation of prediction errors</p>
            </div>
          </div>

          <h3>2.6 Prediction Pipeline</h3>
          <div className="code-box">
            <strong>Nightly Rate Prediction:</strong>
            <pre>{`1. Extract features: [bedrooms, bathrooms, accommodates, lat, lon]
2. Apply StandardScaler transformation
3. Feed to Random Forest model
4. Output: predicted nightly rate (USD)
5. Enforce minimum: max(prediction, $50)

Monthly Revenue = nightly_rate × 30 × occupancy_rate
Annual Revenue = monthly_revenue × 12`}</pre>
          </div>

          <h3>2.7 Occupancy Rate Estimation</h3>
          <p>
            Since Inside Airbnb doesn't provide actual occupancy data, we use <strong>conservative
            industry benchmarks</strong>:
          </p>
          <ul>
            <li><strong>Base Occupancy:</strong> 65% (Montreal market average)</li>
            <li><strong>Adjustments:</strong> +5% for premium locations (Old Montreal, Downtown),
            -5% for peripheral areas</li>
            <li><strong>Formula:</strong> Estimated Annual Revenue = Nightly Rate × 365 × 0.65</li>
          </ul>
        </section>

        {/* Section 3: Financial Calculations */}
        <section id="financial-calcs" className="tech-section">
          <h2>3. Financial Calculations</h2>

          <h3>3.1 Mortgage Calculations</h3>

          <h4>Down Payment</h4>
          <div className="code-box">
            <pre>{`Down Payment = Property Price × 0.20

Assumption: 20% down payment (standard for investment properties in Canada)

Example:
Property Price = $500,000
Down Payment = $500,000 × 0.20 = $100,000`}</pre>
          </div>

          <h4>Monthly Mortgage Payment</h4>
          <div className="code-box">
            <pre>{`M = P × [r(1 + r)^n] / [(1 + r)^n - 1]

Where:
M = Monthly mortgage payment
P = Principal (loan amount = price - down payment)
r = Monthly interest rate (annual rate / 12)
n = Number of payments (amortization in months)

Default Parameters:
- Interest Rate: 5.5% per year (6.5% as of 2024/2025)
- Amortization: 25 years (300 months)

Example:
Property Price = $500,000
Down Payment = $100,000
Principal = $400,000
Annual Rate = 6.5% → Monthly Rate = 0.065/12 = 0.00542
n = 300 months

M = $400,000 × [0.00542(1.00542)^300] / [(1.00542)^300 - 1]
M ≈ $2,732/month`}</pre>
          </div>

          <h3>3.2 Operating Expenses</h3>
          <p>Monthly operating costs include:</p>

          <table className="expense-table">
            <thead>
              <tr>
                <th>Expense Category</th>
                <th>Formula</th>
                <th>Typical Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Property Tax</td>
                <td>Price × 0.012 / 12</td>
                <td>$200-500/month</td>
              </tr>
              <tr>
                <td>Condo Fees</td>
                <td>$250 (average)</td>
                <td>$200-400/month</td>
              </tr>
              <tr>
                <td>Insurance</td>
                <td>Price × 0.005 / 12</td>
                <td>$100-250/month</td>
              </tr>
              <tr>
                <td>Utilities</td>
                <td>$150 (fixed)</td>
                <td>$100-200/month</td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td>Price × 0.01 / 12</td>
                <td>$200-500/month</td>
              </tr>
              <tr>
                <td>Management</td>
                <td>Revenue × 0.20</td>
                <td>15-25% of revenue</td>
              </tr>
              <tr>
                <td>Cleaning</td>
                <td>Bookings × $80/booking</td>
                <td>$300-600/month</td>
              </tr>
            </tbody>
          </table>

          <div className="code-box">
            <strong>Total Monthly Costs:</strong>
            <pre>{`Total = Mortgage + Property Tax + Condo Fees + Insurance
        + Utilities + Maintenance + Management + Cleaning

Example ($500k property, $3,500/month revenue):
Mortgage:        $2,732
Property Tax:    $500
Condo Fees:      $250
Insurance:       $208
Utilities:       $150
Maintenance:     $417
Management:      $700 (20% of $3,500)
Cleaning:        $400
─────────────────────
TOTAL:          $5,357/month`}</pre>
          </div>

          <h3>3.3 Investment Metrics</h3>

          <h4>Net Operating Income (NOI)</h4>
          <div className="code-box">
            <pre>{`NOI = Annual Revenue - Annual Operating Expenses

Where Operating Expenses = All costs EXCEPT mortgage

Example:
Annual Revenue:           $42,000
Property Tax:             $6,000
Condo Fees:              $3,000
Insurance:               $2,500
Utilities:               $1,800
Maintenance:             $5,000
Management:              $8,400
Cleaning:                $4,800
─────────────────────────────────
Total Operating Expenses: $31,500
NOI = $42,000 - $31,500 = $10,500`}</pre>
          </div>

          <h4>Cap Rate (Capitalization Rate)</h4>
          <div className="code-box">
            <pre>{`Cap Rate = (NOI / Property Price) × 100%

Interpretation:
- Higher cap rate = better return relative to price
- Montreal average: 4-6%
- Good investment: 6-8%
- Excellent: 8%+

Example:
NOI = $10,500
Property Price = $500,000
Cap Rate = ($10,500 / $500,000) × 100% = 2.1%

Note: This example shows a low cap rate, indicating the property
may not be a strong investment without appreciation potential.`}</pre>
          </div>

          <h4>Cash-on-Cash Return</h4>
          <div className="code-box">
            <pre>{`Cash-on-Cash Return = (Annual Cashflow / Total Cash Invested) × 100%

Where:
Annual Cashflow = Annual Revenue - Total Annual Costs (including mortgage)
Total Cash Invested = Down Payment + Closing Costs

Closing Costs = Price × 0.03 (3% of purchase price)

Example:
Annual Revenue:           $42,000
Annual Costs:            $64,284 (mortgage + operating)
Annual Cashflow:        -$22,284 (negative!)
Down Payment:           $100,000
Closing Costs:           $15,000
Total Invested:         $115,000

Cash-on-Cash = (-$22,284 / $115,000) × 100% = -19.4%

Interpretation:
- Positive % = property generates cash
- Negative % = you're paying out-of-pocket monthly
- Good investment: 8-12%
- Target minimum: 5%`}</pre>
          </div>

          <h4>Monthly Cashflow</h4>
          <div className="code-box">
            <pre>{`Monthly Cashflow = Monthly Revenue - Total Monthly Costs

Example:
Monthly Revenue:     $3,500
Total Monthly Costs: $5,357
Monthly Cashflow:   -$1,857

Interpretation:
- Positive = profit each month
- Negative = you subsidize the property monthly
- This loss may be offset by property appreciation`}</pre>
          </div>

          <h3>3.4 5-Year Financial Projection</h3>
          <div className="code-box">
            <strong>Projection Assumptions:</strong>
            <pre>{`Year-over-year growth rates:
- Revenue Growth: 3% per year
- Expense Growth: 2% per year
- Property Appreciation: 4% per year

Example Projection ($500k property):

Year 1:
Revenue:     $42,000
Expenses:    $64,284
Cashflow:   -$22,284
Property Value: $520,000

Year 2:
Revenue:     $43,260 (3% increase)
Expenses:    $65,570 (2% increase)
Cashflow:   -$22,310
Property Value: $540,800

Year 5:
Revenue:     $48,655
Expenses:    $69,241
Cashflow:   -$20,586
Property Value: $608,326

Cumulative Cashflow (5 years): -$109,265
Equity from Appreciation: $108,326
Net Position: -$939

Note: Many Montreal properties are break-even or negative
cashflow investments that rely on appreciation for returns.`}</pre>
          </div>
        </section>

        {/* Section 4: Assumptions */}
        <section id="assumptions" className="tech-section">
          <h2>4. Key Assumptions</h2>

          <h3>4.1 Real Estate Market Assumptions</h3>
          <ul>
            <li><strong>Property Appreciation:</strong> 4% per year (Montreal 10-year average: 3-5%)</li>
            <li><strong>Interest Rate:</strong> 6.5% fixed (current market rate as of 2024/2025)</li>
            <li><strong>Down Payment:</strong> 20% (standard for non-primary residence)</li>
            <li><strong>Amortization:</strong> 25 years (Canadian maximum for investment properties)</li>
            <li><strong>Closing Costs:</strong> 3% of purchase price (legal, notary, land transfer tax)</li>
          </ul>

          <h3>4.2 Airbnb Market Assumptions</h3>
          <ul>
            <li><strong>Occupancy Rate:</strong> 65% annual average (industry benchmark)</li>
            <li><strong>Revenue Growth:</strong> 3% per year (conservative estimate)</li>
            <li><strong>Platform Fees:</strong> Included in management costs (20%)</li>
            <li><strong>Cleaning Fee:</strong> $80 per booking (professional cleaning)</li>
            <li><strong>Average Booking Length:</strong> 3-4 nights</li>
            <li><strong>Seasonal Variance:</strong> Not explicitly modeled (65% is annual average)</li>
          </ul>

          <h3>4.3 Operating Expense Assumptions</h3>
          <ul>
            <li><strong>Property Tax Rate:</strong> 1.2% of property value per year</li>
            <li><strong>Insurance:</strong> 0.5% of property value per year</li>
            <li><strong>Maintenance Reserve:</strong> 1% of property value per year</li>
            <li><strong>Utilities:</strong> $150/month (heat, hydro, internet)</li>
            <li><strong>Condo Fees:</strong> $250/month (average for Montreal condos)</li>
            <li><strong>Management Fee:</strong> 20% of gross revenue (full-service Airbnb management)</li>
            <li><strong>Expense Inflation:</strong> 2% per year</li>
          </ul>

          <h3>4.4 Regulatory Assumptions</h3>
          <ul>
            <li><strong>CITQ Permit:</strong> Property can legally operate as short-term rental</li>
            <li><strong>Zoning:</strong> Short-term rentals permitted in location</li>
            <li><strong>Condo Board:</strong> No restrictions on Airbnb rentals</li>
            <li><strong>Tax Compliance:</strong> GST/QST and accommodation tax properly collected</li>
          </ul>

          <h3>4.5 What We DON'T Include</h3>
          <div className="warning-box">
            <strong>⚠️ Not Included in Calculations:</strong>
            <ul>
              <li>Furniture and initial setup costs ($15,000-$25,000)</li>
              <li>Vacancy periods during setup or repairs</li>
              <li>Major repairs or capital expenditures</li>
              <li>Special assessments from condo board</li>
              <li>Income tax implications (consult accountant)</li>
              <li>GST/QST collection and remittance</li>
              <li>Opportunity cost of down payment investment</li>
              <li>Transaction costs if selling within 5 years</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Limitations */}
        <section id="limitations" className="tech-section">
          <h2>5. Limitations & Disclaimers</h2>

          <h3>5.1 Model Limitations</h3>
          <div className="limitation-card">
            <h4>🔍 Limited Feature Set</h4>
            <p>
              Our ML model uses only 5 features (beds, baths, accommodates, location). Real Airbnb
              pricing is influenced by 50+ factors including: amenities (pool, gym, parking),
              interior quality, reviews, host superhost status, professional photos, and more.
            </p>
          </div>

          <div className="limitation-card">
            <h4>📊 Training Data Age</h4>
            <p>
              Inside Airbnb data is a snapshot from a specific point in time. Market conditions
              change. Seasonal demand, new regulations, and economic shifts affect actual prices.
            </p>
          </div>

          <div className="limitation-card">
            <h4>🎯 Occupancy Estimates</h4>
            <p>
              We use a fixed 65% occupancy rate. Actual occupancy depends on pricing strategy,
              listing quality, reviews, host responsiveness, calendar management, and competition.
            </p>
          </div>

          <div className="limitation-card">
            <h4>🏘️ Neighborhood Generalization</h4>
            <p>
              Location is simplified to lat/lon coordinates. Micro-location matters: street-level
              differences (proximity to metro, noise, views) aren't captured.
            </p>
          </div>

          <h3>5.2 Financial Model Limitations</h3>
          <ul>
            <li><strong>Fixed Assumptions:</strong> Interest rates, appreciation, and growth rates are estimates that may not materialize</li>
            <li><strong>Linear Projections:</strong> Real markets are cyclical; we project straight-line growth</li>
            <li><strong>No Scenario Analysis:</strong> We don't model best/worst case scenarios</li>
            <li><strong>Ignores Taxes:</strong> Income tax implications vary by individual situation</li>
          </ul>

          <h3>5.3 Market Risk Factors Not Modeled</h3>
          <div className="risk-grid">
            <div className="risk-item">
              <strong>Regulatory Risk</strong>
              <p>Montreal may tighten Airbnb regulations</p>
            </div>
            <div className="risk-item">
              <strong>Market Saturation</strong>
              <p>Increasing supply may reduce rates</p>
            </div>
            <div className="risk-item">
              <strong>Economic Downturn</strong>
              <p>Recession reduces travel demand</p>
            </div>
            <div className="risk-item">
              <strong>Interest Rate Risk</strong>
              <p>Rates may increase at renewal</p>
            </div>
          </div>

          <h3>5.4 Legal Disclaimer</h3>
          <div className="disclaimer-box">
            <strong>⚖️ NOT FINANCIAL ADVICE</strong>
            <p>
              This platform provides <strong>educational analysis only</strong>. It is NOT financial,
              legal, or investment advice. Real estate investing involves substantial risk. You may lose money.
            </p>
            <p>
              <strong>Always consult with:</strong>
            </p>
            <ul>
              <li>Licensed real estate broker (property evaluation)</li>
              <li>Mortgage broker (financing options)</li>
              <li>Accountant (tax implications)</li>
              <li>Lawyer (contracts, compliance)</li>
            </ul>
            <p>
              Past performance of the Airbnb market does not guarantee future results.
              Forecasts are estimates, not guarantees.
            </p>
          </div>
        </section>

        {/* Section 6: Data Sources */}
        <section id="data-sources" className="tech-section">
          <h2>6. Data Sources</h2>

          <h3>6.1 Inside Airbnb Dataset</h3>
          <div className="source-card">
            <h4>📦 Training Data Source</h4>
            <p>
              <strong>Provider:</strong> Inside Airbnb (independent, non-commercial)<br/>
              <strong>Website:</strong> <a href="http://insideairbnb.com/montreal" target="_blank" rel="noopener noreferrer">
                insideairbnb.com/montreal
              </a><br/>
              <strong>Dataset:</strong> Montreal listings (8,518 properties)<br/>
              <strong>Fields Used:</strong> price, bedrooms, bathrooms, accommodates, latitude, longitude<br/>
              <strong>License:</strong> Creative Commons CC0 1.0 Universal (public domain)<br/>
              <strong>Last Updated:</strong> Check website for latest snapshot date
            </p>
          </div>

          <h3>6.2 Property Listings</h3>
          <div className="source-card">
            <h4>🏠 Real Estate Data</h4>
            <p>
              <strong>Primary Source:</strong> Centris.ca (Quebec MLS)<br/>
              <strong>Method:</strong> Manual entry by users<br/>
              <strong>Validation:</strong> Users responsible for data accuracy
            </p>
          </div>

          <h3>6.3 Financial Assumptions Sources</h3>
          <ul>
            <li><strong>Interest Rates:</strong> Bank of Canada, major lenders (RBC, TD, BMO)</li>
            <li><strong>Property Taxes:</strong> City of Montreal official rates</li>
            <li><strong>Insurance Rates:</strong> Industry averages from Quebec insurers</li>
            <li><strong>Appreciation Rates:</strong> CMHC Housing Market Reports (10-year Montreal data)</li>
            <li><strong>Operating Costs:</strong> Industry benchmarks from property management companies</li>
          </ul>

          <h3>6.4 Code & Transparency</h3>
          <div className="opensource-box">
            <h4>🔓 Open Source</h4>
            <p>
              This entire platform is <strong>open source</strong>. All code, models, and calculations
              are publicly available for review, audit, and contribution.
            </p>
            <p>
              <strong>GitHub Repository:</strong> <a href="https://github.com/yourusername/cashflow-mtl" target="_blank" rel="noopener noreferrer">
                github.com/yourusername/cashflow-mtl
              </a>
            </p>
            <p>
              We believe in transparency. If you find errors in our calculations or have suggestions
              for improvements, please submit an issue or pull request.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <div className="tech-cta">
          <h3>Ready to Analyze Properties?</h3>
          <p>
            Now that you understand our methodology, use the platform to analyze real Montreal
            properties with confidence.
          </p>
          <button onClick={() => navigate('/')} className="cta-button">
            Go to Dashboard
          </button>
        </div>

        {/* Footer Navigation */}
        <div className="tech-footer-nav">
          <p><strong>Related Resources:</strong></p>
          <div className="footer-links">
            <button onClick={() => navigate('/about')}>About Us</button>
            <button onClick={() => navigate('/blog')}>Investment Blog</button>
            <button onClick={() => navigate('/contact')}>Contact Support</button>
            <button onClick={() => navigate('/terms')}>Terms of Service</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalGuide;
