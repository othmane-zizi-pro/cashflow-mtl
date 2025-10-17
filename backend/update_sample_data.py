"""
Script to manually update sample data with real Centris listings.

Since automated scraping isn't working, this script provides a structured way
to manually input real property data from Centris.ca

Usage:
1. Go to https://www.centris.ca/en/properties~for-sale~montreal-island
2. Find 5-10 interesting properties
3. For each property, copy the details into this script
4. Run: python update_sample_data.py
"""

import json


# Manual data entry - Replace with real properties from Centris.ca
REAL_PROPERTIES = [
    {
        'centris_id': '28730393',  # Get from Centris URL
        'address': '3440 Rue Simpson, Montreal, QC H3G 2J7',
        'price': 389000,
        'bedrooms': 2,
        'bathrooms': 1,
        'sqft': 750,
        'property_type': 'Condo',
        'url': 'https://www.centris.ca/en/condo~for-sale~montreal/28730393'
    },
    {
        'centris_id': '27891234',
        'address': '1200 Avenue Atwater, Montreal, QC H3Z 1X4',
        'price': 525000,
        'bedrooms': 2,
        'bathrooms': 2,
        'sqft': 950,
        'property_type': 'Condo',
        'url': 'https://www.centris.ca/en/condo~for-sale~montreal/27891234'
    },
    {
        'centris_id': '26543210',
        'address': '1500 Rue Saint-Jacques, Montreal, QC H3C 0B1',
        'price': 675000,
        'bedrooms': 3,
        'bathrooms': 2,
        'sqft': 1250,
        'property_type': 'Condo',
        'url': 'https://www.centris.ca/en/condo~for-sale~montreal/26543210'
    },
    {
        'centris_id': '25789456',
        'address': '3800 Rue Saint-Urbain, Montreal, QC H2W 1V3',
        'price': 425000,
        'bedrooms': 1,
        'bathrooms': 1,
        'sqft': 650,
        'property_type': 'Condo',
        'url': 'https://www.centris.ca/en/condo~for-sale~montreal/25789456'
    },
    {
        'centris_id': '24567890',
        'address': '2020 Rue University, Montreal, QC H3A 2A5',
        'price': 799000,
        'bedrooms': 3,
        'bathrooms': 2,
        'sqft': 1500,
        'property_type': 'Condo',
        'url': 'https://www.centris.ca/en/condo~for-sale~montreal/24567890'
    },
]


def update_centris_apify():
    """Update the get_sample_listings method in centris_apify.py"""

    print("=" * 70)
    print("UPDATING SAMPLE DATA IN centris_apify.py")
    print("=" * 70)

    # Read the current file
    with open('centris_apify.py', 'r') as f:
        content = f.read()

    # Find and replace the sample data
    start_marker = "    def get_sample_listings(self):"
    end_marker = "if __name__ == '__main__':"

    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    if start_idx == -1 or end_idx == -1:
        print("❌ Could not find sample data section in centris_apify.py")
        return False

    # Generate new sample data code
    new_sample_code = f"""    def get_sample_listings(self):
        \"\"\"Return real sample listings from Centris (manually curated).\"\"\"
        return {json.dumps(REAL_PROPERTIES, indent=12)[12:-4]}
    ]


"""

    # Replace the section
    new_content = content[:start_idx] + new_sample_code + content[end_idx:]

    # Write back
    with open('centris_apify.py', 'w') as f:
        f.write(new_content)

    print("✅ Updated centris_apify.py with new sample data")
    return True


def display_instructions():
    """Display instructions for manually gathering data."""
    print("\n" + "=" * 70)
    print("HOW TO UPDATE WITH REAL CENTRIS DATA")
    print("=" * 70)
    print("""
1. Visit: https://www.centris.ca/en/properties~for-sale~montreal-island

2. For each property you want to add, collect:
   - Centris ID (from URL, e.g., /28730393)
   - Full address
   - Price
   - Number of bedrooms
   - Number of bathrooms
   - Square footage (sqft)
   - Property type (Condo, House, etc.)
   - Full Centris URL

3. Edit this file (update_sample_data.py) and add properties to REAL_PROPERTIES list

4. Run: python update_sample_data.py

5. Restart the backend server to load new data

EXAMPLE PROPERTY ENTRY:
{
    'centris_id': '28730393',
    'address': '3440 Rue Simpson, Montreal, QC H3G 2J7',
    'price': 389000,
    'bedrooms': 2,
    'bathrooms': 1,
    'sqft': 750,
    'property_type': 'Condo',
    'url': 'https://www.centris.ca/en/condo~for-sale~montreal/28730393'
}
    """)


def validate_properties():
    """Validate the property data."""
    print("\n" + "=" * 70)
    print("VALIDATING PROPERTY DATA")
    print("=" * 70)

    errors = []

    for i, prop in enumerate(REAL_PROPERTIES, 1):
        required_fields = ['centris_id', 'address', 'price', 'bedrooms', 'bathrooms', 'url']

        for field in required_fields:
            if field not in prop or not prop[field]:
                errors.append(f"Property {i}: Missing '{field}'")

        # Validate types
        if 'price' in prop and not isinstance(prop['price'], (int, float)):
            errors.append(f"Property {i}: Price must be a number")

        if 'bedrooms' in prop and not isinstance(prop['bedrooms'], int):
            errors.append(f"Property {i}: Bedrooms must be an integer")

    if errors:
        print("❌ VALIDATION ERRORS:")
        for error in errors:
            print(f"   - {error}")
        return False

    print(f"✅ All {len(REAL_PROPERTIES)} properties validated successfully")
    return True


def main():
    """Main execution."""
    print("\n" + "=" * 70)
    print("CENTRIS SAMPLE DATA UPDATER")
    print("=" * 70)

    # Display current data
    print(f"\nCurrent sample data has {len(REAL_PROPERTIES)} properties:")
    for i, prop in enumerate(REAL_PROPERTIES, 1):
        print(f"  {i}. {prop['address']} - ${prop['price']:,}")

    # Validate
    if not validate_properties():
        print("\n❌ Please fix validation errors before updating")
        return

    # Ask for confirmation
    response = input("\nUpdate centris_apify.py with this data? (yes/no): ").strip().lower()

    if response == 'yes':
        if update_centris_apify():
            print("\n" + "=" * 70)
            print("✅ SUCCESS!")
            print("=" * 70)
            print("\nNext steps:")
            print("1. Restart the backend server")
            print("2. Refresh the frontend")
            print("3. Click 'Load Sample Data' to see the new properties")
        else:
            print("\n❌ Update failed")
    else:
        print("\n⏸️  Update cancelled")
        display_instructions()


if __name__ == '__main__':
    main()
