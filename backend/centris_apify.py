"""
Centris scraper using Apify API.
Requires an Apify account and API token.
Sign up at: https://apify.com/
Get your token from: https://console.apify.com/account/integrations
"""

import requests
import time
import os
from dotenv import load_dotenv

load_dotenv()


class CentrisApify:
    def __init__(self):
        """Initialize the Apify Centris scraper."""
        self.apify_token = os.getenv('APIFY_API_TOKEN')
        self.actor_id = "aitorsm~centris-scraper"  # Apify uses ~ separator
        self.base_url = "https://api.apify.com/v2"

    def search_properties(self, max_results=20):
        """
        Search for properties using Apify Centris scraper.

        Args:
            max_results: Maximum number of properties to return

        Returns:
            List of property dictionaries
        """
        if not self.apify_token:
            print("⚠️  APIFY_API_TOKEN not found in .env file")
            print("To use real Centris scraping:")
            print("1. Sign up at https://apify.com/")
            print("2. Get your API token from https://console.apify.com/account/integrations")
            print("3. Add APIFY_API_TOKEN=your_token_here to backend/.env")
            print("\nUsing sample data for now...")
            return []

        # Apify actor input configuration for Centris scraper
        # Simplified input - let the actor use defaults
        actor_input = {
            "searchUrl": "https://www.centris.ca/en/properties~for-sale~montreal-island",
            "maxItems": max_results
        }

        try:
            print(f"🔄 Starting Apify Centris scraper (max {max_results} properties)...")

            # Start the actor run
            run_url = f"{self.base_url}/acts/{self.actor_id}/runs"
            headers = {"Authorization": f"Bearer {self.apify_token}"}

            response = requests.post(
                run_url,
                json=actor_input,
                headers=headers,
                params={"token": self.apify_token}
            )

            if response.status_code != 201:
                print(f"❌ Failed to start scraper: {response.status_code}")
                print(f"Response: {response.text}")
                return []

            run_data = response.json()
            run_id = run_data['data']['id']

            print(f"✅ Scraper started (Run ID: {run_id})")
            print("⏳ Waiting for scraper to complete (this may take 30-60 seconds)...")

            # Poll for completion
            properties = self._wait_for_results(run_id)

            if properties:
                print(f"✅ Successfully scraped {len(properties)} properties from Centris")
                return properties
            else:
                print("⚠️  No properties found")
                return []

        except Exception as e:
            print(f"❌ Error using Apify scraper: {str(e)}")
            return []

    def _wait_for_results(self, run_id, max_wait=120):
        """Wait for Apify run to complete and return results."""
        headers = {"Authorization": f"Bearer {self.apify_token}"}
        run_url = f"{self.base_url}/actor-runs/{run_id}"

        start_time = time.time()

        while time.time() - start_time < max_wait:
            # Check run status
            response = requests.get(
                run_url,
                headers=headers,
                params={"token": self.apify_token}
            )

            if response.status_code != 200:
                print(f"Error checking run status: {response.status_code}")
                return []

            run_info = response.json()
            status = run_info['data']['status']

            if status == 'SUCCEEDED':
                print("✅ Scraper completed successfully!")
                return self._get_dataset_items(run_info['data']['defaultDatasetId'])
            elif status in ['FAILED', 'ABORTED', 'TIMED-OUT']:
                print(f"❌ Scraper {status.lower()}")
                # Print error details if available
                if 'buildId' in run_info['data']:
                    print(f"Build ID: {run_info['data']['buildId']}")
                if 'statusMessage' in run_info['data']:
                    print(f"Status Message: {run_info['data']['statusMessage']}")
                # Try to get stats
                if 'stats' in run_info['data']:
                    print(f"Stats: {run_info['data']['stats']}")
                return []

            # Still running, wait a bit
            time.sleep(3)
            print("⏳ Still scraping...")

        print("⏱️  Timeout waiting for scraper")
        return []

    def _get_dataset_items(self, dataset_id):
        """Retrieve items from Apify dataset."""
        dataset_url = f"{self.base_url}/datasets/{dataset_id}/items"
        headers = {"Authorization": f"Bearer {self.apify_token}"}

        try:
            response = requests.get(
                dataset_url,
                headers=headers,
                params={"token": self.apify_token}
            )

            if response.status_code != 200:
                print(f"Error fetching dataset: {response.status_code}")
                return []

            items = response.json()
            return self._parse_apify_results(items)

        except Exception as e:
            print(f"Error getting dataset: {str(e)}")
            return []

    def _parse_apify_results(self, items):
        """Parse Apify results into our property format."""
        properties = []

        for item in items:
            try:
                property_data = {
                    'centris_id': item.get('id', ''),
                    'address': item.get('address', ''),
                    'price': self._parse_price(item.get('price', '')),
                    'bedrooms': int(item.get('bedrooms', 0)) if item.get('bedrooms') else 0,
                    'bathrooms': int(item.get('bathrooms', 0)) if item.get('bathrooms') else 0,
                    'sqft': self._parse_sqft(item.get('livingArea', '')),
                    'property_type': item.get('propertyType', 'Unknown'),
                    'url': item.get('url', '')
                }

                # Only add if we have essential data
                if property_data['price'] > 0 and property_data['address']:
                    properties.append(property_data)

            except Exception as e:
                print(f"Error parsing property: {str(e)}")
                continue

        return properties

    def _parse_price(self, price_str):
        """Parse price string to integer."""
        try:
            if isinstance(price_str, (int, float)):
                return int(price_str)
            # Remove $, commas, and spaces
            cleaned = str(price_str).replace('$', '').replace(',', '').replace(' ', '')
            return int(cleaned)
        except:
            return 0

    def _parse_sqft(self, sqft_str):
        """Parse square footage string to integer."""
        try:
            if isinstance(sqft_str, (int, float)):
                return int(sqft_str)
            # Remove 'sq ft', commas, and spaces
            cleaned = str(sqft_str).replace('sq ft', '').replace(',', '').replace(' ', '').strip()
            return int(cleaned) if cleaned else 0
        except:
            return 0

    def get_sample_listings(self):
        """
        Return realistic sample listings based on Montreal market conditions (Jan 2025).

        Note: These are representative examples reflecting actual Montreal condo prices
        and neighborhoods. Update periodically by manually checking Centris.ca or using
        the update_sample_data.py script.

        Last updated: January 2025
        """
        return [
            {
                'centris_id': '28901234',
                'address': '1200 Rue Crescent, Montreal, QC H3G 2B1',
                'price': 389000,
                'bedrooms': 1,
                'bathrooms': 1,
                'sqft': 625,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal-ville-marie/28901234',
                'notes': 'Downtown location, Ville-Marie - entry-level condo'
            },
            {
                'centris_id': '29012345',
                'address': '3850 Rue Saint-Urbain, Montreal, QC H2W 1V3',
                'price': 485000,
                'bedrooms': 2,
                'bathrooms': 1,
                'sqft': 825,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal-plateau-mont-royal/29012345',
                'notes': 'Plateau Mont-Royal - trendy neighborhood'
            },
            {
                'centris_id': '29123456',
                'address': '1500 Rue Saint-Jacques, Montreal, QC H3C 0B1',
                'price': 625000,
                'bedrooms': 2,
                'bathrooms': 2,
                'sqft': 1050,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal-ville-marie/29123456',
                'notes': 'Old Montreal - luxury building with amenities'
            },
            {
                'centris_id': '29234567',
                'address': '4200 Avenue de l\'Hôtel-de-Ville, Montreal, QC H2W 2H2',
                'price': 545000,
                'bedrooms': 3,
                'bathrooms': 1,
                'sqft': 1150,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal-plateau-mont-royal/29234567',
                'notes': 'Plateau - family-sized unit, needs minor updates'
            },
            {
                'centris_id': '29345678',
                'address': '1250 Rue Guy, Montreal, QC H3H 2K7',
                'price': 425000,
                'bedrooms': 2,
                'bathrooms': 1,
                'sqft': 750,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal-ville-marie/29345678',
                'notes': 'Shaughnessy Village - near Concordia'
            },
            {
                'centris_id': '29456789',
                'address': '3440 Rue Simpson, Montreal, QC H3G 2J7',
                'price': 365000,
                'bedrooms': 1,
                'bathrooms': 1,
                'sqft': 550,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal-ville-marie/29456789',
                'notes': 'Downtown - compact studio, good for investment'
            },
            {
                'centris_id': '29567890',
                'address': '2020 Rue University, Montreal, QC H3A 2A5',
                'price': 795000,
                'bedrooms': 3,
                'bathrooms': 2,
                'sqft': 1450,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal-ville-marie/29567890',
                'notes': 'Downtown McGill area - premium location'
            },
            {
                'centris_id': '29678901',
                'address': '5600 Avenue de Gaspé, Montreal, QC H2T 2A7',
                'price': 515000,
                'bedrooms': 2,
                'bathrooms': 2,
                'sqft': 925,
                'property_type': 'Condo',
                'url': 'https://www.centris.ca/en/condo~for-sale~montreal-rosemont-la-petite-patrie/29678901',
                'notes': 'Mile-Ex - modern building, rooftop terrace'
            }
        ]


if __name__ == '__main__':
    # Test the Apify scraper
    scraper = CentrisApify()

    print("Testing Apify Centris Scraper...")
    print("=" * 60)

    properties = scraper.search_properties(max_results=5)

    if properties:
        print(f"\n✅ Retrieved {len(properties)} properties:\n")
        for prop in properties:
            print(f"📍 {prop['address']}")
            print(f"   💰 Price: ${prop['price']:,}")
            print(f"   🛏️  Bedrooms: {prop['bedrooms']}, Bathrooms: {prop['bathrooms']}")
            print(f"   📐 {prop['sqft']} sqft")
            print(f"   🔗 {prop['url']}\n")
    else:
        print("\n⚠️  Using sample data")
        sample = scraper.get_sample_listings()
        print(f"Sample: {len(sample)} properties available")
