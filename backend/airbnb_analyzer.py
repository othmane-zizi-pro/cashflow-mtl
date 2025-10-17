"""
Airbnb data analyzer for revenue forecasting.
Uses Inside Airbnb dataset for Montreal.
"""

import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import requests
from datetime import datetime
import pickle


class AirbnbAnalyzer:
    def __init__(self, data_dir='../data'):
        """Initialize the Airbnb analyzer."""
        self.data_dir = data_dir
        self.model = None
        self.scaler = None
        self.avg_price_per_bedroom = {}
        self.dataset_loaded = False

    def download_airbnb_data(self):
        """
        Download Inside Airbnb dataset for Montreal.
        Dataset URL: http://data.insideairbnb.com/canada/qc/montreal/
        """
        print("Downloading Inside Airbnb data for Montreal...")

        # Inside Airbnb Montreal dataset URL (latest)
        # Note: Update the date to the latest available
        base_url = "http://data.insideairbnb.com/canada/qc/montreal/2024-06-23/data/"
        listings_file = "listings.csv.gz"

        url = base_url + listings_file
        output_path = os.path.join(self.data_dir, "montreal_airbnb_listings.csv.gz")

        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()

            with open(output_path, 'wb') as f:
                f.write(response.content)

            print(f"Downloaded data to {output_path}")
            return output_path
        except Exception as e:
            print(f"Error downloading data: {str(e)}")
            print("Will use sample data for demonstration")
            return None

    def load_data(self, filepath=None):
        """Load and preprocess Airbnb data."""
        if filepath is None:
            # Try multiple file name variations
            possible_files = [
                os.path.join(self.data_dir, "montreal_airbnb_listings.csv.gz"),
                os.path.join(self.data_dir, "listings.csv.gz"),
                os.path.join(self.data_dir, "listings.csv")
            ]
            filepath = None
            for f in possible_files:
                if os.path.exists(f):
                    filepath = f
                    break

        try:
            if filepath and os.path.exists(filepath):
                print(f"Loading Airbnb data from {filepath}...")
                if filepath.endswith('.gz'):
                    df = pd.read_csv(filepath, compression='gzip')
                else:
                    df = pd.read_csv(filepath)
            else:
                print("Data file not found, creating sample dataset...")
                df = self._create_sample_data()

            # Clean and preprocess
            df = self._preprocess_data(df)
            self.dataset_loaded = True
            print(f"Loaded {len(df)} Airbnb listings")
            return df

        except Exception as e:
            print(f"Error loading data: {str(e)}")
            print("Using sample data...")
            df = self._create_sample_data()
            self.dataset_loaded = True
            return df

    def _create_sample_data(self):
        """Create sample Airbnb data for testing."""
        np.random.seed(42)

        data = {
            'bedrooms': np.random.choice([1, 2, 3], 100),
            'bathrooms': np.random.choice([1, 2], 100),
            'accommodates': np.random.randint(2, 8, 100),
            'price': np.random.randint(80, 250, 100),
            'availability_365': np.random.randint(100, 365, 100),
            'number_of_reviews': np.random.randint(5, 100, 100),
            'review_scores_rating': np.random.uniform(4.0, 5.0, 100),
            'latitude': np.random.uniform(45.49, 45.53, 100),
            'longitude': np.random.uniform(-73.62, -73.55, 100),
        }

        df = pd.DataFrame(data)
        return df

    def _preprocess_data(self, df):
        """Clean and preprocess the Airbnb dataset."""
        # Extract relevant columns
        relevant_cols = [
            'bedrooms', 'bathrooms_text', 'accommodates', 'price',
            'availability_365', 'number_of_reviews', 'review_scores_rating',
            'latitude', 'longitude'
        ]

        # Handle different column names in different dataset versions
        available_cols = [col for col in relevant_cols if col in df.columns]

        # Alternative column names
        if 'bathrooms_text' not in df.columns and 'bathrooms' in df.columns:
            df['bathrooms_text'] = df['bathrooms']

        df = df[available_cols].copy()

        # Clean price column (remove $ and commas)
        if 'price' in df.columns and df['price'].dtype == 'object':
            df['price'] = df['price'].replace(r'[\$,]', '', regex=True).astype(float)

        # Clean bathrooms
        if 'bathrooms_text' in df.columns:
            df['bathrooms'] = df['bathrooms_text'].str.extract(r'(\d+\.?\d*)').astype(float)
            df = df.drop('bathrooms_text', axis=1)

        # Fill missing values
        df['bedrooms'] = df['bedrooms'].fillna(1)
        df['bathrooms'] = df['bathrooms'].fillna(1)
        df['review_scores_rating'] = df['review_scores_rating'].fillna(df['review_scores_rating'].mean())

        # Remove outliers (prices too high or too low)
        df = df[(df['price'] > 20) & (df['price'] < 1000)]

        # Remove listings with no availability
        df = df[df['availability_365'] > 0]

        return df.dropna()

    def train_revenue_model(self, df):
        """Train a model to predict nightly price based on property features."""
        features = ['bedrooms', 'bathrooms', 'accommodates', 'latitude', 'longitude']
        X = df[features]
        y = df['price']

        # Scale features
        self.scaler = StandardScaler()
        X_scaled = self.scaler.fit_transform(X)

        # Train Random Forest model
        self.model = RandomForestRegressor(n_estimators=100, random_state=42, max_depth=10)
        self.model.fit(X_scaled, y)

        print("Model trained successfully")

        # Calculate average price per bedroom for simple estimation
        self.avg_price_per_bedroom = df.groupby('bedrooms')['price'].mean().to_dict()

    def predict_nightly_rate(self, bedrooms, bathrooms=1, sqft=None, latitude=45.5017, longitude=-73.5673):
        """
        Predict nightly Airbnb rate for a property.

        Args:
            bedrooms: Number of bedrooms
            bathrooms: Number of bathrooms
            sqft: Square footage (not used in prediction, but kept for API compatibility)
            latitude: Property latitude
            longitude: Property longitude

        Returns:
            Predicted nightly rate
        """
        # Estimate accommodates based on bedrooms
        accommodates = bedrooms * 2 + 1

        if self.model and self.scaler:
            # Use trained model
            features = np.array([[bedrooms, bathrooms, accommodates, latitude, longitude]])
            features_scaled = self.scaler.transform(features)
            predicted_price = self.model.predict(features_scaled)[0]
        else:
            # Fallback to simple estimation
            base_price = self.avg_price_per_bedroom.get(bedrooms, 150)
            predicted_price = base_price

        return max(50, predicted_price)  # Minimum $50/night

    def forecast_annual_revenue(self, nightly_rate, occupancy_rate=0.65):
        """
        Forecast annual Airbnb revenue.

        Args:
            nightly_rate: Nightly rate
            occupancy_rate: Expected occupancy rate (default 65%)

        Returns:
            Forecasted annual revenue
        """
        nights_per_year = 365
        occupied_nights = nights_per_year * occupancy_rate

        # Account for Airbnb fees (host keeps ~97% after service fees)
        host_percentage = 0.97

        annual_gross = nightly_rate * occupied_nights
        annual_net = annual_gross * host_percentage

        return annual_net

    def analyze_property(self, bedrooms, bathrooms, sqft=None, price=None,
                         latitude=45.5017, longitude=-73.5673):
        """
        Complete property analysis for Airbnb potential.

        Returns:
            Dictionary with nightly rate, monthly revenue, annual revenue
        """
        nightly_rate = self.predict_nightly_rate(bedrooms, bathrooms, sqft, latitude, longitude)
        annual_revenue = self.forecast_annual_revenue(nightly_rate)
        monthly_revenue = annual_revenue / 12

        return {
            'nightly_rate': round(nightly_rate, 2),
            'monthly_revenue': round(monthly_revenue, 2),
            'annual_revenue': round(annual_revenue, 2),
            'occupancy_rate': 0.65,
            'estimated_occupied_nights': round(365 * 0.65)
        }


def initialize_analyzer():
    """Initialize and prepare the Airbnb analyzer."""
    analyzer = AirbnbAnalyzer(data_dir='../data')

    # Try to load existing data
    df = analyzer.load_data()

    # Train the model
    analyzer.train_revenue_model(df)

    return analyzer


if __name__ == '__main__':
    # Test the analyzer
    print("Initializing Airbnb Analyzer...")
    analyzer = initialize_analyzer()

    # Test property
    test_property = {
        'bedrooms': 2,
        'bathrooms': 1,
        'sqft': 850,
        'price': 450000
    }

    print(f"\nAnalyzing property: {test_property}")
    analysis = analyzer.analyze_property(**test_property)

    print("\nAirbnb Revenue Forecast:")
    print(f"  Nightly Rate: ${analysis['nightly_rate']:.2f}")
    print(f"  Occupancy Rate: {analysis['occupancy_rate']*100:.0f}%")
    print(f"  Estimated Occupied Nights: {analysis['estimated_occupied_nights']}")
    print(f"  Monthly Revenue: ${analysis['monthly_revenue']:,.2f}")
    print(f"  Annual Revenue: ${analysis['annual_revenue']:,.2f}")
