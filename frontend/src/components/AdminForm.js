import React, { useState } from 'react';
import './AdminForm.css';

const AdminForm = ({ onPropertyAdded, onClose }) => {
  const API_URL = process.env.REACT_APP_API_URL || 'https://web-production-5c82b.up.railway.app';

  const [formData, setFormData] = useState({
    centris_id: '',
    address: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    property_type: 'Condo',
    url: '',
    image_url: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Convert numeric fields
      const propertyData = {
        ...formData,
        price: parseInt(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        sqft: formData.sqft ? parseInt(formData.sqft) : 0
      };

      const response = await fetch(`${API_URL}/api/admin/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Property added successfully!'
        });

        // Reset form
        setFormData({
          centris_id: '',
          address: '',
          price: '',
          bedrooms: '',
          bathrooms: '',
          sqft: '',
          property_type: 'Condo',
          url: '',
          image_url: ''
        });

        // Notify parent component
        if (onPropertyAdded) {
          onPropertyAdded();
        }

        // Auto-close after 2 seconds
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to add property'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Error: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-overlay">
      <div className="admin-form-container">
        <div className="admin-form-header">
          <h2>Add Real Centris Property</h2>
          {onClose && (
            <button className="close-button" onClick={onClose}>×</button>
          )}
        </div>

        <div className="admin-form-instructions">
          <p>To add a real property from Centris.ca:</p>
          <ol>
            <li>Visit <a href="https://www.centris.ca/en/properties~for-sale~montreal-island" target="_blank" rel="noopener noreferrer">Centris.ca</a></li>
            <li>Find a property you want to analyze</li>
            <li>Copy the details below and paste them here</li>
          </ol>
        </div>

        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="centris_id">
                Centris ID <span className="required">*</span>
              </label>
              <input
                type="text"
                id="centris_id"
                name="centris_id"
                value={formData.centris_id}
                onChange={handleChange}
                placeholder="e.g., 28730393"
                required
              />
              <small>Found in the Centris URL</small>
            </div>

            <div className="form-group">
              <label htmlFor="property_type">
                Property Type
              </label>
              <select
                id="property_type"
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
              >
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Duplex">Duplex</option>
                <option value="Triplex">Triplex</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">
              Address <span className="required">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 3440 Rue Simpson, Montreal, QC H3G 2J7"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">
                Price ($) <span className="required">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 389000"
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sqft">
                Square Feet
              </label>
              <input
                type="number"
                id="sqft"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                placeholder="e.g., 750"
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bedrooms">
                Bedrooms <span className="required">*</span>
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="e.g., 2"
                required
                min="0"
                max="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">
                Bathrooms <span className="required">*</span>
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="e.g., 1"
                required
                min="0"
                max="10"
                step="0.5"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="url">
              Centris URL <span className="required">*</span>
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="e.g., https://www.centris.ca/en/condo~for-sale~montreal/28730393"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image_url">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="e.g., https://media.centris.ca/..."
            />
            <small>Right-click on the property image on Centris and copy image address</small>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Adding Property...' : 'Add Property'}
            </button>
            {onClose && (
              <button
                type="button"
                className="cancel-button"
                onClick={onClose}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
