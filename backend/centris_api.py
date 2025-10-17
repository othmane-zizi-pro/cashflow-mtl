"""
Centris API scraper to fetch real Montreal property listings.
Uses the Centris.ca API directly.
"""

import requests
import json
from datetime import datetime


class CentrisAPI:
    def __init__(self):
        """Initialize the Centris API client."""
        self.base_url = "https://www.centris.ca"
        self.api_url = "https://www.centris.ca/property/UpdateQuery"
        self.session = requests.Session()

        # Set headers to mimic browser
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'https://www.centris.ca',
            'Referer': 'https://www.centris.ca/en/properties~for-sale~montreal-island'
        })

    def search_properties(self, max_results=20):
        """
        Search for properties in Montreal using Centris API.

        Args:
            max_results: Maximum number of properties to return

        Returns:
            List of property dictionaries
        """
        # Centris API query payload
        query = {
            "query": {
                "UseGeographyShapes": 0,
                "Longitude": -73.5673,
                "Latitude": 45.5017,
                "LongitudeMin": -73.9,
                "LongitudeMax": -73.4,
                "LatitudeMin": 45.4,
                "LatitudeMax": 45.7,
                "Sort": "1",  # Sort by relevance
                "CurrentPage": 0,
                "MaximumResults": max_results,
                "ResultsPerPage": max_results,
                "CultureId": 2,  # English
                "ApplicationId": 1,
                "RecaptchaToken": "",
                "BuyOrRent": 1,  # Buy
                "PriceMin": 200000,
                "PriceMax": 1000000,
                "LandArea": "",
                "Categories": "",
                "Tenancy": "",
                "Rooms": "",
                "SellerType": "",
                "BuildingType": "",
                "Keywords": "",
                "Filters": []
            }
        }

        try:
            print(f"Querying Centris API for Montreal properties...")
            response = self.session.post(self.api_url, json=query, timeout=30)

            if response.status_code == 200:
                data = response.json()
                properties = self._parse_response(data)
                print(f"Found {len(properties)} properties from Centris API")
                return properties
            else:
                print(f"API request failed with status {response.status_code}")
                return []

        except Exception as e:
            print(f"Error querying Centris API: {str(e)}")
            return []

    def _parse_response(self, data):
        """Parse Centris API response into property listings."""
        properties = []

        if not data or 'Result' not in data or 'Listings' not in data['Result']:
            return properties

        listings = data['Result']['Listings']

        for listing in listings:
            try:
                property_data = {
                    'centris_id': listing.get('Id', ''),
                    'address': self._format_address(listing.get('Property', {})),
                    'price': listing.get('Price', 0),
                    'bedrooms': listing.get('Property', {}).get('BedroomTotal', 0),
                    'bathrooms': listing.get('Property', {}).get('BathroomTotal', 0),
                    'sqft': listing.get('Property', {}).get('LivingArea', 0),
                    'property_type': listing.get('Property', {}).get('Type', 'Unknown'),
                    'url': f"{self.base_url}/en/property~{listing.get('Id', '')}"
                }

                # Only add if we have essential data
                if property_data['price'] > 0 and property_data['address']:
                    properties.append(property_data)

            except Exception as e:
                print(f"Error parsing listing: {str(e)}")
                continue

        return properties

    def _format_address(self, property_info):
        """Format property address from API response."""
        try:
            address_parts = []

            if property_info.get('StreetNumber'):
                address_parts.append(str(property_info['StreetNumber']))
            if property_info.get('Street'):
                address_parts.append(property_info['Street'])
            if property_info.get('City'):
                address_parts.append(property_info['City'])
            if property_info.get('Province'):
                address_parts.append(property_info['Province'])
            if property_info.get('PostalCode'):
                address_parts.append(property_info['PostalCode'])

            return ', '.join(address_parts)
        except:
            return 'Unknown Address'

    def get_sample_listings(self):
        """Return sample listings for testing."""
        return [
            {
                'centris_id': '12345678',
                'address': '1234 Rue Saint-Denis, Montreal, QC H2X 3J4',
                'price': 450000,
                'bedrooms': 2,
                'bathrooms': 1,
                'sqft': 850,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal/12345678'
            },
            {
                'centris_id': '23456789',
                'address': '5678 Avenue du Parc, Montreal, QC H2V 4H1',
                'price': 650000,
                'bedrooms': 3,
                'bathrooms': 2,
                'sqft': 1200,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal/23456789'
            },
            {
                'centris_id': '34567890',
                'address': '789 Rue Sherbrooke O, Montreal, QC H3A 1G1',
                'price': 350000,
                'bedrooms': 1,
                'bathrooms': 1,
                'sqft': 650,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal/34567890'
            },
            {
                'centris_id': '45678901',
                'address': '2345 Rue Ontario E, Montreal, QC H2K 1W3',
                'price': 525000,
                'bedrooms': 2,
                'bathrooms': 2,
                'sqft': 950,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal/45678901'
            },
            {
                'centris_id': '56789012',
                'address': '3456 Boulevard Saint-Laurent, Montreal, QC H2X 2T6',
                'price': 725000,
                'bedrooms': 3,
                'bathrooms': 2,
                'sqft': 1400,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal/56789012'
            }
        ]


if __name__ == '__main__':
    # Test the API
    api = CentrisAPI()

    print("Testing Centris API...")
    properties = api.search_properties(max_results=10)

    if properties:
        print(f"\nSuccessfully retrieved {len(properties)} properties:")
        for prop in properties[:3]:  # Show first 3
            print(f"\n{prop['address']}")
            print(f"  Price: ${prop['price']:,}")
            print(f"  Bedrooms: {prop['bedrooms']}, Bathrooms: {prop['bathrooms']}")
            print(f"  URL: {prop['url']}")
    else:
        print("\nNo properties found, using sample data")
        sample = api.get_sample_listings()
        print(f"Sample data: {len(sample)} properties")
