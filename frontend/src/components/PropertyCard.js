import React from 'react';
import './PropertyCard.css';

function PropertyCard({ property, rank }) {
  const { summary, airbnb_forecast, listing } = property;

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

  const getCashflowClass = (cashflow) => {
    if (cashflow > 500) return 'positive';
    if (cashflow > 0) return 'neutral';
    return 'negative';
  };

  const getReturnClass = (returnValue) => {
    if (returnValue > 10) return 'excellent';
    if (returnValue > 5) return 'good';
    if (returnValue > 0) return 'fair';
    return 'poor';
  };

  return (
    <div className="property-card">
      <div className="rank-badge">#{rank}</div>

      {listing?.image_url && (
        <div className="property-image">
          <img src={listing.image_url} alt={summary.address} />
        </div>
      )}

      <div className="property-header">
        <h3>{summary.address}</h3>
        <p className="property-price">{formatCurrency(summary.price)}</p>
        <p className="property-details">
          {summary.bedrooms} bed • {summary.bathrooms} bath
          {summary.sqft && ` • ${summary.sqft} sqft`}
        </p>
      </div>

      <div className="property-metrics">
        <div className="metric-row">
          <span className="metric-label">Down Payment</span>
          <span className="metric-value">{formatCurrency(summary.down_payment)}</span>
        </div>

        <div className="metric-row">
          <span className="metric-label">Monthly Mortgage</span>
          <span className="metric-value">{formatCurrency(summary.monthly_mortgage)}</span>
        </div>

        <div className="metric-row">
          <span className="metric-label">Monthly Revenue</span>
          <span className="metric-value revenue">{formatCurrency(summary.monthly_revenue)}</span>
        </div>

        <div className="metric-row highlight">
          <span className="metric-label">Monthly Cashflow</span>
          <span className={`metric-value ${getCashflowClass(summary.monthly_cashflow)}`}>
            {formatCurrency(summary.monthly_cashflow)}
          </span>
        </div>

        <div className="divider"></div>

        <div className="metric-row">
          <span className="metric-label">Cash-on-Cash Return</span>
          <span className={`metric-value ${getReturnClass(summary.cash_on_cash_return)}`}>
            {formatPercent(summary.cash_on_cash_return)}
          </span>
        </div>

        <div className="metric-row">
          <span className="metric-label">Cap Rate</span>
          <span className={`metric-value ${getReturnClass(summary.cap_rate)}`}>
            {formatPercent(summary.cap_rate)}
          </span>
        </div>
      </div>

      <div className="property-details-section">
        <h4>Airbnb Forecast</h4>
        <div className="forecast-details">
          <p>Nightly Rate: {formatCurrency(airbnb_forecast.nightly_rate)}</p>
          <p>Occupancy: {(airbnb_forecast.occupancy_rate * 100).toFixed(0)}% ({airbnb_forecast.estimated_occupied_nights} nights/year)</p>
          <p>Annual Revenue: {formatCurrency(airbnb_forecast.annual_revenue)}</p>
        </div>
      </div>

      <div className="property-actions">
        <a
          href={`/business-plan/${listing.centris_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="view-business-plan-btn"
        >
          📊 View Business Plan
        </a>
        <a
          href={summary.centris_url}
          target="_blank"
          rel="noopener noreferrer"
          className="view-listing-btn"
        >
          View on Centris
        </a>
      </div>
    </div>
  );
}

export default PropertyCard;
