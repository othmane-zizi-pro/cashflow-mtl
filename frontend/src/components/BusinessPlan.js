import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BusinessPlan.css';
import Logo from './Logo';

const BusinessPlan = () => {
  const { centrisId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:5001';

  const fetchProperty = React.useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/property/${centrisId}`);
      const data = await response.json();
      if (data.success) {
        setProperty(data.property);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  }, [centrisId, API_URL]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="business-plan-loading">
        <div className="spinner"></div>
        <p>Generating Business Plan...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="business-plan-error">
        <h2>Property Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    );
  }

  const { listing, summary, airbnb_forecast, investment_analysis } = property;
  const today = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="business-plan-container">
      <div className="no-print actions-bar">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Dashboard
        </button>
        <button onClick={handlePrint} className="print-btn">
          🖨️ Print / Save as PDF
        </button>
      </div>

      <div className="business-plan-document">
        {/* Cover Page */}
        <div className="bp-section cover-page">
          <div className="cover-content">
            <div className="cover-logo">
              <Logo size="large" />
            </div>
            <h1 className="bp-title">Real Estate Investment</h1>
            <h2 className="bp-subtitle">Business Plan & Financial Analysis</h2>

            <div className="property-showcase">
              {listing?.image_url && (
                <img src={listing.image_url} alt="Property" className="cover-image" />
              )}
              <h3 className="cover-address">{summary.address}</h3>
              <p className="cover-price">{formatCurrency(summary.price)}</p>
            </div>

            <div className="cover-footer">
              <p>Prepared: {today}</p>
              <p>Property ID: {listing.centris_id}</p>
              <p className="powered-by">Powered by CashFlow MTL AI Analytics</p>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bp-section">
          <h2 className="section-title">Executive Summary</h2>

          <p className="executive-text">
            This business plan outlines the investment opportunity for a residential property
            located at {summary.address}, Montreal, Quebec. The property will be operated as
            a short-term rental (Airbnb) to generate monthly revenue and build long-term equity.
          </p>

          <div className="highlight-box">
            <h3>Investment Highlights</h3>
            <div className="highlights-grid">
              <div className="highlight-item">
                <span className="highlight-label">Purchase Price</span>
                <span className="highlight-value">{formatCurrency(summary.price)}</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Down Payment Required</span>
                <span className="highlight-value">{formatCurrency(summary.down_payment)}</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Projected Monthly Revenue</span>
                <span className="highlight-value revenue">{formatCurrency(summary.monthly_revenue)}</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Monthly Cashflow</span>
                <span className={`highlight-value ${summary.monthly_cashflow > 0 ? 'positive' : 'negative'}`}>
                  {formatCurrency(summary.monthly_cashflow)}
                </span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Cash-on-Cash Return</span>
                <span className="highlight-value">{formatPercent(summary.cash_on_cash_return)}</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Cap Rate</span>
                <span className="highlight-value">{formatPercent(summary.cap_rate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bp-section">
          <h2 className="section-title">Property Details</h2>

          <div className="details-grid">
            <div className="detail-item">
              <strong>Address:</strong>
              <span>{summary.address}</span>
            </div>
            <div className="detail-item">
              <strong>Property Type:</strong>
              <span>{listing.property_type || 'Condo'}</span>
            </div>
            <div className="detail-item">
              <strong>Bedrooms:</strong>
              <span>{summary.bedrooms}</span>
            </div>
            <div className="detail-item">
              <strong>Bathrooms:</strong>
              <span>{summary.bathrooms}</span>
            </div>
            {summary.sqft && (
              <div className="detail-item">
                <strong>Square Footage:</strong>
                <span>{summary.sqft} sqft</span>
              </div>
            )}
            <div className="detail-item">
              <strong>Listing URL:</strong>
              <a href={summary.centris_url} target="_blank" rel="noopener noreferrer">
                View on Centris
              </a>
            </div>
          </div>
        </div>

        {/* Investment Structure */}
        <div className="bp-section">
          <h2 className="section-title">Investment Structure</h2>

          <table className="bp-table">
            <tbody>
              <tr>
                <td className="table-label">Purchase Price</td>
                <td className="table-value">{formatCurrency(summary.price)}</td>
              </tr>
              <tr>
                <td className="table-label">Down Payment (20%)</td>
                <td className="table-value">{formatCurrency(summary.down_payment)}</td>
              </tr>
              <tr>
                <td className="table-label">Mortgage Amount</td>
                <td className="table-value">{formatCurrency(summary.price - summary.down_payment)}</td>
              </tr>
              <tr>
                <td className="table-label">Estimated Closing Costs (3%)</td>
                <td className="table-value">{formatCurrency(summary.price * 0.03)}</td>
              </tr>
              <tr className="table-total">
                <td className="table-label"><strong>Total Initial Investment</strong></td>
                <td className="table-value"><strong>{formatCurrency(summary.down_payment + (summary.price * 0.03))}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Revenue Projections */}
        <div className="bp-section">
          <h2 className="section-title">Revenue Projections</h2>

          <p className="section-description">
            Revenue projections are based on comparable Airbnb listings in Montreal using
            machine learning analysis of {8518} active listings. The model considers property
            characteristics including location, size, and amenities.
          </p>

          <table className="bp-table">
            <tbody>
              <tr>
                <td className="table-label">Projected Nightly Rate</td>
                <td className="table-value">{formatCurrency(airbnb_forecast.nightly_rate)}</td>
              </tr>
              <tr>
                <td className="table-label">Expected Occupancy Rate</td>
                <td className="table-value">{(airbnb_forecast.occupancy_rate * 100).toFixed(0)}%</td>
              </tr>
              <tr>
                <td className="table-label">Occupied Nights per Year</td>
                <td className="table-value">{airbnb_forecast.estimated_occupied_nights} nights</td>
              </tr>
              <tr>
                <td className="table-label">Gross Annual Revenue</td>
                <td className="table-value">{formatCurrency(airbnb_forecast.nightly_rate * airbnb_forecast.estimated_occupied_nights)}</td>
              </tr>
              <tr>
                <td className="table-label">Platform Fees (3%)</td>
                <td className="table-value">-{formatCurrency(airbnb_forecast.nightly_rate * airbnb_forecast.estimated_occupied_nights * 0.03)}</td>
              </tr>
              <tr className="table-total">
                <td className="table-label"><strong>Net Annual Revenue</strong></td>
                <td className="table-value revenue"><strong>{formatCurrency(airbnb_forecast.annual_revenue)}</strong></td>
              </tr>
              <tr className="table-total">
                <td className="table-label"><strong>Average Monthly Revenue</strong></td>
                <td className="table-value revenue"><strong>{formatCurrency(summary.monthly_revenue)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Operating Expenses */}
        <div className="bp-section">
          <h2 className="section-title">Monthly Operating Expenses</h2>

          <table className="bp-table">
            <tbody>
              <tr>
                <td className="table-label">Mortgage Payment (Principal & Interest)</td>
                <td className="table-value">{formatCurrency(investment_analysis.monthly_costs.mortgage)}</td>
              </tr>
              <tr>
                <td className="table-label">Property Tax</td>
                <td className="table-value">{formatCurrency(investment_analysis.monthly_costs.property_tax)}</td>
              </tr>
              <tr>
                <td className="table-label">Insurance</td>
                <td className="table-value">{formatCurrency(investment_analysis.monthly_costs.insurance)}</td>
              </tr>
              <tr>
                <td className="table-label">Maintenance & Repairs</td>
                <td className="table-value">{formatCurrency(investment_analysis.monthly_costs.maintenance)}</td>
              </tr>
              <tr className="table-total">
                <td className="table-label"><strong>Total Monthly Expenses</strong></td>
                <td className="table-value"><strong>{formatCurrency(investment_analysis.monthly_costs.total)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financial Analysis */}
        <div className="bp-section">
          <h2 className="section-title">Financial Analysis</h2>

          <table className="bp-table">
            <tbody>
              <tr>
                <td className="table-label">Monthly Revenue</td>
                <td className="table-value revenue">{formatCurrency(summary.monthly_revenue)}</td>
              </tr>
              <tr>
                <td className="table-label">Monthly Expenses</td>
                <td className="table-value">-{formatCurrency(investment_analysis.monthly_costs.total)}</td>
              </tr>
              <tr className="table-total">
                <td className="table-label"><strong>Monthly Cashflow</strong></td>
                <td className={`table-value ${summary.monthly_cashflow > 0 ? 'positive' : 'negative'}`}>
                  <strong>{formatCurrency(summary.monthly_cashflow)}</strong>
                </td>
              </tr>
              <tr className="table-total">
                <td className="table-label"><strong>Annual Cashflow</strong></td>
                <td className={`table-value ${summary.monthly_cashflow > 0 ? 'positive' : 'negative'}`}>
                  <strong>{formatCurrency(summary.monthly_cashflow * 12)}</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="metrics-row">
            <div className="metric-card">
              <h4>Cash-on-Cash Return</h4>
              <p className="metric-value-large">{formatPercent(summary.cash_on_cash_return)}</p>
              <small>Annual cashflow / Initial investment</small>
            </div>
            <div className="metric-card">
              <h4>Cap Rate</h4>
              <p className="metric-value-large">{formatPercent(summary.cap_rate)}</p>
              <small>Net operating income / Property value</small>
            </div>
          </div>
        </div>

        {/* 5-Year Projection */}
        <div className="bp-section">
          <h2 className="section-title">5-Year Financial Projection</h2>

          <table className="bp-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Annual Revenue</th>
                <th>Annual Expenses</th>
                <th>Net Cashflow</th>
                <th>Cumulative Cashflow</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map(year => {
                const annualRevenue = airbnb_forecast.annual_revenue * Math.pow(1.03, year - 1); // 3% growth
                const annualExpenses = investment_analysis.monthly_costs.total * 12 * Math.pow(1.02, year - 1); // 2% growth
                const netCashflow = annualRevenue - annualExpenses;
                const cumulative = Array.from({length: year}, (_, i) => {
                  const rev = airbnb_forecast.annual_revenue * Math.pow(1.03, i);
                  const exp = investment_analysis.monthly_costs.total * 12 * Math.pow(1.02, i);
                  return rev - exp;
                }).reduce((a, b) => a + b, 0);

                return (
                  <tr key={year}>
                    <td className="table-label">Year {year}</td>
                    <td className="table-value">{formatCurrency(annualRevenue)}</td>
                    <td className="table-value">{formatCurrency(annualExpenses)}</td>
                    <td className={`table-value ${netCashflow > 0 ? 'positive' : 'negative'}`}>
                      {formatCurrency(netCashflow)}
                    </td>
                    <td className={`table-value ${cumulative > 0 ? 'positive' : 'negative'}`}>
                      {formatCurrency(cumulative)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <p className="table-note">
            * Projections assume 3% annual revenue growth and 2% annual expense growth
          </p>
        </div>

        {/* Risk Analysis */}
        <div className="bp-section">
          <h2 className="section-title">Risk Analysis & Mitigation</h2>

          <div className="risk-section">
            <h3>Key Risks</h3>
            <ul className="risk-list">
              <li>
                <strong>Occupancy Rate Fluctuation:</strong> Seasonal variations and market conditions
                may affect occupancy. Mitigation: Price optimization and professional property management.
              </li>
              <li>
                <strong>Regulatory Changes:</strong> Short-term rental regulations may change.
                Mitigation: Stay informed of local regulations and maintain option for long-term rental.
              </li>
              <li>
                <strong>Property Maintenance:</strong> Unexpected repairs may impact cashflow.
                Mitigation: Monthly maintenance reserve and comprehensive insurance.
              </li>
              <li>
                <strong>Market Competition:</strong> Increased Airbnb supply may affect rates.
                Mitigation: Premium amenities and excellent guest service.
              </li>
            </ul>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bp-section">
          <h2 className="section-title">Conclusion</h2>

          <p className="conclusion-text">
            This investment presents a compelling opportunity with strong projected returns.
            The property's location, characteristics, and market analysis support a
            cash-on-cash return of {formatPercent(summary.cash_on_cash_return)} and a cap rate
            of {formatPercent(summary.cap_rate)}.
          </p>

          <p className="conclusion-text">
            With projected monthly cashflow of {formatCurrency(summary.monthly_cashflow)} and
            strong fundamentals in the Montreal short-term rental market, this property represents
            an attractive investment opportunity for building both passive income and long-term equity.
          </p>
        </div>

        {/* Footer */}
        <div className="bp-footer">
          <div className="footer-logo">
            <Logo size="small" />
          </div>
          <p className="footer-main">This business plan was generated using AI-powered market data and financial analysis tools.</p>
          <p className="footer-sources">Property data sourced from Centris.ca • Revenue analysis based on 8,518+ Inside Airbnb Montreal listings</p>
          <p className="disclaimer">
            Disclaimer: This business plan is for informational purposes only and does not constitute
            financial advice. Actual results may vary. Please consult with financial and legal professionals
            before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlan;
