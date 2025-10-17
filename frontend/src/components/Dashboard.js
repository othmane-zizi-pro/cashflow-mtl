import React from 'react';
import './Dashboard.css';

function Dashboard({ properties }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateStats = () => {
    if (!properties || properties.length === 0) {
      return {
        avgCashflow: 0,
        avgCoC: 0,
        avgCapRate: 0,
        positiveCashflow: 0,
        bestReturn: 0,
      };
    }

    const totalCashflow = properties.reduce(
      (sum, p) => sum + p.investment_analysis.monthly_cashflow,
      0
    );
    const totalCoC = properties.reduce(
      (sum, p) => sum + p.investment_analysis.cash_on_cash_return,
      0
    );
    const totalCapRate = properties.reduce(
      (sum, p) => sum + p.investment_analysis.cap_rate,
      0
    );

    const positiveCashflow = properties.filter(
      (p) => p.investment_analysis.monthly_cashflow > 0
    ).length;

    const bestReturn = Math.max(
      ...properties.map((p) => p.investment_analysis.cash_on_cash_return)
    );

    return {
      avgCashflow: totalCashflow / properties.length,
      avgCoC: totalCoC / properties.length,
      avgCapRate: totalCapRate / properties.length,
      positiveCashflow,
      bestReturn,
    };
  };

  const stats = calculateStats();

  return (
    <div className="dashboard">
      <h2>Investment Overview</h2>
      <div className="stats-grid">
        <div className="stat-card highlight" style={{color: 'white'}}>
          <div className="stat-label" style={{color: 'white', fontWeight: 700}}>Properties Analyzed</div>
          <div className="stat-value" style={{color: 'white', fontSize: '2.25rem', fontWeight: 800}}>{properties.length}</div>
        </div>

        <div className="stat-card highlight" style={{color: 'white'}}>
          <div className="stat-label" style={{color: 'white', fontWeight: 700}}>Avg Monthly Cashflow</div>
          <div className="stat-value" style={{color: stats.avgCashflow > 0 ? '#10b981' : '#ef4444', fontSize: '2.25rem', fontWeight: 800, textShadow: stats.avgCashflow > 0 ? '0 2px 8px rgba(16, 185, 129, 0.3)' : '0 2px 8px rgba(239, 68, 68, 0.3)'}}>
            {formatCurrency(stats.avgCashflow)}
          </div>
        </div>

        <div className="stat-card highlight" style={{color: 'white'}}>
          <div className="stat-label" style={{color: 'white', fontWeight: 700}}>Avg Cash-on-Cash Return</div>
          <div className="stat-value" style={{color: 'white', fontSize: '2.25rem', fontWeight: 800}}>{stats.avgCoC.toFixed(2)}%</div>
        </div>

        <div className="stat-card highlight" style={{color: 'white'}}>
          <div className="stat-label" style={{color: 'white', fontWeight: 700}}>Avg Cap Rate</div>
          <div className="stat-value" style={{color: 'white', fontSize: '2.25rem', fontWeight: 800}}>{stats.avgCapRate.toFixed(2)}%</div>
        </div>

        <div className="stat-card highlight" style={{color: 'white'}}>
          <div className="stat-label" style={{color: 'white', fontWeight: 700}}>Positive Cashflow Properties</div>
          <div className="stat-value" style={{color: 'white', fontSize: '2.25rem', fontWeight: 800}}>
            {stats.positiveCashflow} / {properties.length}
          </div>
        </div>

        <div className="stat-card highlight" style={{color: 'white'}}>
          <div className="stat-label" style={{color: 'white', fontWeight: 700}}>Best Return</div>
          <div className="stat-value excellent" style={{color: 'white', fontSize: '2.25rem', fontWeight: 800, position: 'relative'}}>
            {stats.bestReturn.toFixed(2)}% <span style={{position: 'absolute', top: '-10px', right: '-10px', fontSize: '1.5rem'}}>🏆</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
