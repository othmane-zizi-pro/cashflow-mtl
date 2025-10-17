import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import PropertyCard from './components/PropertyCard';
import AdminForm from './components/AdminForm';
import Logo from './components/Logo';
import Footer from './components/Footer';

const API_URL = 'http://localhost:5001';

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('cash_on_cash_return');
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [propertyCount, setPropertyCount] = useState(0);

  useEffect(() => {
    loadProperties();
    loadPropertyCount();
  }, []);

  const loadPropertyCount = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/stats`);
      const data = await response.json();
      setPropertyCount(data.property_count || 0);
    } catch (err) {
      console.error('Error loading property count:', err);
    }
  };

  const loadProperties = async (useSample = true, useStored = true) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          use_sample: useSample,
          use_stored: useStored,
          max_listings: 15
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();

      // Deduplicate properties by centris_id
      const uniqueProperties = [];
      const seenIds = new Set();

      (data.properties || []).forEach(property => {
        const id = property.listing?.centris_id;
        if (id && !seenIds.has(id)) {
          seenIds.add(id);
          uniqueProperties.push(property);
        }
      });

      setProperties(uniqueProperties);
    } catch (err) {
      setError(err.message);
      console.error('Error loading properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    setSortBy(field);
    const sorted = [...properties].sort((a, b) => {
      const aVal = a.investment_analysis[field] || 0;
      const bVal = b.investment_analysis[field] || 0;
      return bVal - aVal;
    });
    setProperties(sorted);
  };

  const handlePropertyAdded = () => {
    // Reload properties and update count
    loadProperties();
    loadPropertyCount();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <Logo size="medium" />
          <div className="header-text">
            <h1>AI-Powered Real Estate Investment Platform</h1>
            <p className="tagline">Discover Montreal's Most Profitable Airbnb Opportunities</p>
            <div className="trust-badges">
              <span className="badge">🤖 AI-Powered Revenue Predictions</span>
              <span className="badge">📊 Trained on 8,500+ Real Listings</span>
              <span className="badge">📄 Bank-Ready Business Plans</span>
            </div>
          </div>
        </div>
      </header>

      <main className="App-main">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing properties...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={loadProperties}>Try Again</button>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <>
            <Dashboard properties={properties} />

            <div className="controls">
              <div className="sort-controls">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
                  <option value="cash_on_cash_return">Cash-on-Cash Return</option>
                  <option value="cap_rate">Cap Rate</option>
                  <option value="monthly_cashflow">Monthly Cashflow</option>
                </select>
              </div>
              <div className="action-buttons">
                <button onClick={() => setShowAdminForm(true)} className="admin-btn">
                  + Add Real Property {propertyCount > 0 && `(${propertyCount})`}
                </button>
              </div>
            </div>

            <div className="properties-grid">
              {properties.map((property, index) => (
                <PropertyCard
                  key={`property-${property.listing.centris_id}-${index}`}
                  property={property}
                  rank={index + 1}
                />
              ))}
            </div>
          </>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="empty-state">
            <h2>No Properties Yet</h2>
            <p>Get started by adding real Centris properties to analyze</p>
            <div className="empty-state-buttons">
              <button onClick={() => setShowAdminForm(true)} className="admin-btn">
                + Add Real Property
              </button>
            </div>
          </div>
        )}
      </main>

      {showAdminForm && (
        <AdminForm
          onPropertyAdded={handlePropertyAdded}
          onClose={() => setShowAdminForm(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
