"""
Flask API for Montreal Real Estate Investment Analyzer.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

from centris_apify import CentrisApify
from mortgage_calculator import MortgageCalculator, InvestmentAnalyzer
from airbnb_analyzer import AirbnbAnalyzer, initialize_analyzer
from property_storage import PropertyStorage

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize components
mortgage_calc = MortgageCalculator()
investment_analyzer = InvestmentAnalyzer()
airbnb_analyzer = None
property_storage = PropertyStorage()

# Cache for analyzed properties
analyzed_properties = []


def initialize_app():
    """Initialize the application components."""
    global airbnb_analyzer
    print("Initializing Airbnb Analyzer...")
    airbnb_analyzer = initialize_analyzer()
    print("Application initialized successfully")


# Initialize components when module is imported (for gunicorn)
print("Initializing application components...")
initialize_app()


def analyze_listing(listing):
    """
    Analyze a single property listing for investment potential.

    Args:
        listing: Dictionary with property details from Centris

    Returns:
        Dictionary with complete investment analysis
    """
    price = listing.get('price')
    bedrooms = listing.get('bedrooms', 2)
    bathrooms = listing.get('bathrooms', 1)
    sqft = listing.get('sqft')
    latitude = listing.get('latitude', 45.5017)  # Default Montreal coords
    longitude = listing.get('longitude', -73.5673)

    # Calculate mortgage and costs
    down_payment = mortgage_calc.calculate_down_payment(price)
    monthly_costs = mortgage_calc.calculate_total_monthly_costs(price)

    # Forecast Airbnb revenue with location data
    airbnb_forecast = airbnb_analyzer.analyze_property(
        bedrooms=bedrooms,
        bathrooms=bathrooms,
        sqft=sqft,
        price=price,
        latitude=latitude,
        longitude=longitude
    )

    monthly_revenue = airbnb_forecast['monthly_revenue']

    # Calculate investment metrics
    investment_metrics = investment_analyzer.analyze_investment(
        price=price,
        monthly_revenue=monthly_revenue,
        monthly_costs_breakdown=monthly_costs
    )

    # Combine all data
    result = {
        'listing': listing,
        'airbnb_forecast': airbnb_forecast,
        'investment_analysis': investment_metrics,
        'summary': {
            'address': listing.get('address'),
            'price': price,
            'centris_url': listing.get('url'),
            'image_url': listing.get('image_url'),
            'down_payment': investment_metrics['down_payment'],
            'monthly_mortgage': investment_metrics['monthly_costs']['mortgage'],
            'monthly_revenue': monthly_revenue,
            'monthly_cashflow': investment_metrics['monthly_cashflow'],
            'cash_on_cash_return': investment_metrics['cash_on_cash_return'],
            'cap_rate': investment_metrics['cap_rate'],
            'bedrooms': bedrooms,
            'bathrooms': bathrooms,
            'sqft': sqft
        }
    }

    return result


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'airbnb_analyzer_ready': airbnb_analyzer is not None
    })


@app.route('/api/analyze', methods=['POST'])
def analyze_properties():
    """
    Analyze properties from Centris and return investment opportunities.
    Optionally accepts a list of properties to analyze.
    """
    global analyzed_properties

    data = request.get_json() or {}
    use_sample = data.get('use_sample', True)
    use_stored = data.get('use_stored', True)  # Use stored properties by default
    max_listings = data.get('max_listings', 10)

    listings = []

    # First, try to get stored properties
    if use_stored:
        stored_properties = property_storage.get_all_properties()
        if stored_properties:
            print(f"Loaded {len(stored_properties)} properties from storage")
            listings.extend(stored_properties)

    # Only use sample/scraping if explicitly requested AND no stored properties
    if not listings and not use_stored:
        centris_scraper = CentrisApify()

        if use_sample:
            print("Using sample Centris listings...")
            listings = centris_scraper.get_sample_listings()
        else:
            print(f"Fetching real Centris listings for Montreal (max {max_listings})...")
            listings = centris_scraper.search_properties(max_results=max_listings)

            if not listings:
                print("Scraping failed")
                listings = []

    # Analyze each listing (avoid duplicates)
    analyzed_properties = []
    seen_ids = set()

    for listing in listings:
        try:
            centris_id = str(listing.get('centris_id'))
            if centris_id in seen_ids:
                continue  # Skip duplicates

            seen_ids.add(centris_id)
            analysis = analyze_listing(listing)
            analyzed_properties.append(analysis)
        except Exception as e:
            print(f"Error analyzing listing {listing.get('address')}: {str(e)}")
            continue

    # Sort by cash-on-cash return (best opportunities first)
    analyzed_properties.sort(
        key=lambda x: x['investment_analysis']['cash_on_cash_return'],
        reverse=True
    )

    return jsonify({
        'success': True,
        'count': len(analyzed_properties),
        'properties': analyzed_properties,
        'source': 'stored' if use_stored and property_storage.get_property_count() > 0 else 'sample'
    })


@app.route('/api/properties', methods=['GET'])
def get_properties():
    """Get all analyzed properties."""
    sort_by = request.args.get('sort_by', 'cash_on_cash_return')
    order = request.args.get('order', 'desc')

    # Sort properties
    sorted_properties = sorted(
        analyzed_properties,
        key=lambda x: x['investment_analysis'].get(sort_by, 0),
        reverse=(order == 'desc')
    )

    return jsonify({
        'success': True,
        'count': len(sorted_properties),
        'properties': sorted_properties
    })


@app.route('/api/property/<centris_id>', methods=['GET'])
def get_property(centris_id):
    """Get a single property by Centris ID."""
    # First check the cache
    for prop in analyzed_properties:
        if str(prop['listing'].get('centris_id')) == str(centris_id):
            return jsonify({
                'success': True,
                'property': prop
            })

    # If not in cache, try to fetch from storage and analyze it
    stored_properties = property_storage.get_all_properties()
    for listing in stored_properties:
        if str(listing.get('centris_id')) == str(centris_id):
            try:
                analysis = analyze_listing(listing)
                return jsonify({
                    'success': True,
                    'property': analysis
                })
            except Exception as e:
                return jsonify({
                    'success': False,
                    'error': f'Error analyzing property: {str(e)}'
                }), 500

    return jsonify({
        'success': False,
        'error': 'Property not found'
    }), 404


@app.route('/api/scrape', methods=['POST'])
def scrape_centris():
    """Fetch fresh listings from Centris API."""
    data = request.get_json() or {}
    max_listings = data.get('max_listings', 10)

    print(f"Fetching Centris listings via Apify (max {max_listings})...")
    centris_scraper = CentrisApify()
    listings = centris_scraper.search_properties(max_results=max_listings)

    if not listings:
        return jsonify({
            'success': False,
            'error': 'Failed to fetch listings from Centris API'
        }), 500

    return jsonify({
        'success': True,
        'count': len(listings),
        'listings': listings
    })


@app.route('/api/forecast', methods=['POST'])
def forecast_property():
    """
    Forecast revenue for a custom property.
    Expects: bedrooms, bathrooms, price, sqft (optional)
    """
    data = request.get_json()

    required_fields = ['bedrooms', 'price']
    for field in required_fields:
        if field not in data:
            return jsonify({
                'success': False,
                'error': f'Missing required field: {field}'
            }), 400

    # Create a listing object
    listing = {
        'price': data['price'],
        'bedrooms': data['bedrooms'],
        'bathrooms': data.get('bathrooms', 1),
        'sqft': data.get('sqft'),
        'address': data.get('address', 'Custom Property'),
        'url': '#'
    }

    try:
        analysis = analyze_listing(listing)
        return jsonify({
            'success': True,
            'analysis': analysis
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/admin/properties', methods=['GET'])
def get_stored_properties():
    """Get all stored properties from JSON storage."""
    properties = property_storage.get_all_properties()
    return jsonify({
        'success': True,
        'count': len(properties),
        'properties': properties,
        'last_updated': property_storage.get_last_updated()
    })


@app.route('/api/admin/properties', methods=['POST'])
def add_property():
    """Add or update a property in storage."""
    data = request.get_json()

    if not data:
        return jsonify({
            'success': False,
            'error': 'No data provided'
        }), 400

    result = property_storage.add_property(data)

    if result['success']:
        return jsonify(result), 201
    else:
        return jsonify(result), 400


@app.route('/api/admin/properties/<centris_id>', methods=['DELETE'])
def delete_property(centris_id):
    """Delete a property from storage."""
    result = property_storage.delete_property(centris_id)

    if result['success']:
        return jsonify(result)
    else:
        return jsonify(result), 404


@app.route('/api/admin/properties/clear', methods=['POST'])
def clear_properties():
    """Clear all properties from storage."""
    result = property_storage.clear_all_properties()
    return jsonify(result)


@app.route('/api/admin/stats', methods=['GET'])
def get_storage_stats():
    """Get statistics about stored properties."""
    return jsonify({
        'success': True,
        'property_count': property_storage.get_property_count(),
        'last_updated': property_storage.get_last_updated()
    })


if __name__ == '__main__':
    print("\nStarting Flask server on http://localhost:5001")
    print("API endpoints:")
    print("  GET  /api/health - Health check")
    print("  POST /api/analyze - Analyze properties from Centris")
    print("  GET  /api/properties - Get all analyzed properties")
    print("  GET  /api/property/<id> - Get specific property")
    print("  POST /api/scrape - Scrape fresh Centris listings")
    print("  POST /api/forecast - Forecast custom property")
    print("\nAdmin endpoints:")
    print("  GET    /api/admin/properties - Get stored properties")
    print("  POST   /api/admin/properties - Add/update property")
    print("  DELETE /api/admin/properties/<id> - Delete property")
    print("  POST   /api/admin/properties/clear - Clear all properties")
    print("  GET    /api/admin/stats - Get storage statistics")
    print("\n")

    app.run(debug=True, host='0.0.0.0', port=5001)
