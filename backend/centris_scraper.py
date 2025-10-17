"""
Centris scraper to fetch Montreal property listings.
Note: Centris uses dynamic content, so we'll use Selenium for scraping.
"""

import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import re


class CentrisScraper:
    def __init__(self, headless=True, lazy_init=False):
        """Initialize the Centris scraper with Selenium."""
        self.headless = headless
        self.driver = None
        self.base_url = "https://www.centris.ca"

        if not lazy_init:
            self._init_driver()

    def _init_driver(self):
        """Initialize the Selenium driver."""
        if self.driver is not None:
            return

        chrome_options = Options()
        if self.headless:
            chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        chrome_options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')

        self.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=chrome_options
        )

    def scrape_listings(self, max_listings=20):
        """
        Scrape property listings from Centris for Montreal.

        Args:
            max_listings: Maximum number of listings to scrape

        Returns:
            List of dictionaries containing listing data
        """
        self._init_driver()  # Ensure driver is initialized
        listings = []

        try:
            # Navigate to Centris Montreal search page
            search_url = f"{self.base_url}/en/properties~for-sale~montreal-island"
            print(f"Navigating to: {search_url}")
            self.driver.get(search_url)

            # Wait for listings to load
            time.sleep(5)

            # Try to get listings
            wait = WebDriverWait(self.driver, 10)

            # Parse the page source
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')

            # Find property cards (structure may vary, this is a common pattern)
            property_cards = soup.find_all('div', class_=re.compile('property-thumbnail-item|property-card'))

            if not property_cards:
                # Try alternative selectors
                property_cards = soup.find_all('article')

            print(f"Found {len(property_cards)} property cards")

            for idx, card in enumerate(property_cards[:max_listings]):
                try:
                    listing = self._parse_listing_card(card)
                    if listing:
                        listings.append(listing)
                        print(f"Scraped listing {idx + 1}: {listing.get('address', 'Unknown')}")
                except Exception as e:
                    print(f"Error parsing card {idx + 1}: {str(e)}")
                    continue

        except Exception as e:
            print(f"Error scraping Centris: {str(e)}")
        finally:
            self.driver.quit()

        return listings

    def _parse_listing_card(self, card):
        """Parse a single listing card to extract property details."""
        listing = {}

        try:
            # Extract price
            price_elem = card.find(class_=re.compile('price|Price'))
            if price_elem:
                price_text = price_elem.get_text(strip=True)
                # Remove currency symbols and commas
                price_clean = re.sub(r'[^\d]', '', price_text)
                listing['price'] = int(price_clean) if price_clean else None

            # Extract address
            address_elem = card.find(class_=re.compile('address|Address'))
            if address_elem:
                listing['address'] = address_elem.get_text(strip=True)
            else:
                # Try to find it in a link
                link_elem = card.find('a', class_=re.compile('property-link|item-link'))
                if link_elem:
                    listing['address'] = link_elem.get('title', 'Unknown Address')

            # Extract listing URL
            link_elem = card.find('a', href=True)
            if link_elem:
                href = link_elem['href']
                listing['url'] = href if href.startswith('http') else f"{self.base_url}{href}"
                # Extract listing ID from URL
                id_match = re.search(r'/(\d+)/?$', href)
                if id_match:
                    listing['centris_id'] = id_match.group(1)

            # Extract bedrooms
            bed_elem = card.find(class_=re.compile('bed|bedroom'), text=re.compile(r'\d+'))
            if bed_elem:
                bed_match = re.search(r'(\d+)', bed_elem.get_text())
                if bed_match:
                    listing['bedrooms'] = int(bed_match.group(1))

            # Extract bathrooms
            bath_elem = card.find(class_=re.compile('bath'), text=re.compile(r'\d+'))
            if bath_elem:
                bath_match = re.search(r'(\d+)', bath_elem.get_text())
                if bath_match:
                    listing['bathrooms'] = int(bath_match.group(1))

            # Extract square footage
            sqft_elem = card.find(text=re.compile(r'sq\.?\s*ft|pi²|ft²', re.I))
            if sqft_elem:
                sqft_match = re.search(r'([\d,]+)', sqft_elem)
                if sqft_match:
                    sqft_clean = sqft_match.group(1).replace(',', '')
                    listing['sqft'] = int(sqft_clean)

            # Extract property type
            type_elem = card.find(class_=re.compile('category|type|property-type'))
            if type_elem:
                listing['property_type'] = type_elem.get_text(strip=True)

            # Only return if we have at least price and address
            if listing.get('price') and listing.get('address'):
                return listing

        except Exception as e:
            print(f"Error extracting listing details: {str(e)}")

        return None

    def get_sample_listings(self):
        """Return sample listings for testing without scraping."""
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
    # Test the scraper
    scraper = CentrisScraper(headless=False)
    listings = scraper.scrape_listings(max_listings=5)

    if listings:
        print(f"\nSuccessfully scraped {len(listings)} listings")
        for listing in listings:
            print(json.dumps(listing, indent=2))
    else:
        print("\nNo listings found, using sample data")
        sample = scraper.get_sample_listings()
        print(json.dumps(sample, indent=2))
