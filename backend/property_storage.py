"""
Property storage manager using JSON file for persistence.
Allows real Centris property data to be stored and retrieved.
"""

import json
import os
from datetime import datetime
from threading import Lock
import re


class PropertyStorage:
    def __init__(self, storage_file='data/properties.json'):
        """Initialize property storage with JSON file."""
        self.storage_file = storage_file
        self.lock = Lock()  # Thread-safe file operations
        self._ensure_file_exists()

    def _ensure_file_exists(self):
        """Ensure the storage file exists with proper structure."""
        if not os.path.exists(self.storage_file):
            os.makedirs(os.path.dirname(self.storage_file), exist_ok=True)
            self._write_data({
                'properties': [],
                'last_updated': None
            })

    def _read_data(self):
        """Read data from JSON file."""
        try:
            with open(self.storage_file, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return {'properties': [], 'last_updated': None}

    def _write_data(self, data):
        """Write data to JSON file atomically."""
        # Write to temporary file first, then rename (atomic operation)
        temp_file = f"{self.storage_file}.tmp"
        with open(temp_file, 'w') as f:
            json.dump(data, f, indent=2)
        os.replace(temp_file, self.storage_file)

    def get_all_properties(self):
        """Get all stored properties."""
        with self.lock:
            data = self._read_data()
            return data.get('properties', [])

    def _geocode_address(self, address):
        """
        Extract or estimate coordinates from Montreal address.
        Uses a simple mapping of Montreal neighborhoods to approximate coordinates.
        """
        # Default Montreal coordinates
        default_coords = {'latitude': 45.5017, 'longitude': -73.5673}

        # Neighborhood coordinate mappings (approximate centers)
        neighborhoods = {
            'downtown': {'latitude': 45.5017, 'longitude': -73.5673},
            'ville-marie': {'latitude': 45.5017, 'longitude': -73.5673},
            'plateau': {'latitude': 45.5200, 'longitude': -73.5800},
            'mile-end': {'latitude': 45.5233, 'longitude': -73.6000},
            'rosemont': {'latitude': 45.5400, 'longitude': -73.5800},
            'verdun': {'latitude': 45.4583, 'longitude': -73.5700},
            'griffintown': {'latitude': 45.4933, 'longitude': -73.5583},
            'old montreal': {'latitude': 45.5050, 'longitude': -73.5540},
            'westmount': {'latitude': 45.4833, 'longitude': -73.5967},
            'outremont': {'latitude': 45.5200, 'longitude': -73.6083},
        }

        # Try to match neighborhood from address
        address_lower = address.lower()
        for neighborhood, coords in neighborhoods.items():
            if neighborhood in address_lower:
                return coords

        # If no match, return default Montreal coordinates
        return default_coords

    def add_property(self, property_data):
        """
        Add a new property to storage.

        Args:
            property_data: Dictionary with property information
                Required fields: centris_id, address, price, bedrooms, bathrooms, url
                Optional fields: sqft, property_type, latitude, longitude, image_url

        Returns:
            dict: Success status and message
        """
        with self.lock:
            # Validate required fields
            required_fields = ['centris_id', 'address', 'price', 'bedrooms', 'bathrooms', 'url']
            for field in required_fields:
                if field not in property_data or not property_data[field]:
                    return {
                        'success': False,
                        'error': f"Missing required field: {field}"
                    }

            # Set default image if not provided
            if 'image_url' not in property_data or not property_data['image_url']:
                property_data['image_url'] = None

            # Validate data types
            try:
                property_data['price'] = int(property_data['price'])
                property_data['bedrooms'] = int(property_data['bedrooms'])
                property_data['bathrooms'] = int(property_data['bathrooms'])
                if 'sqft' in property_data and property_data['sqft']:
                    property_data['sqft'] = int(property_data['sqft'])

                # Add coordinates if not provided
                if 'latitude' not in property_data or 'longitude' not in property_data:
                    coords = self._geocode_address(property_data['address'])
                    property_data['latitude'] = coords['latitude']
                    property_data['longitude'] = coords['longitude']
                else:
                    property_data['latitude'] = float(property_data['latitude'])
                    property_data['longitude'] = float(property_data['longitude'])

            except (ValueError, TypeError) as e:
                return {
                    'success': False,
                    'error': f"Invalid data type: {str(e)}"
                }

            # Read current data
            data = self._read_data()
            properties = data.get('properties', [])

            # Check if property already exists
            centris_id = str(property_data['centris_id'])
            existing_index = None
            for i, prop in enumerate(properties):
                if str(prop.get('centris_id')) == centris_id:
                    existing_index = i
                    break

            if existing_index is not None:
                # Update existing property
                properties[existing_index] = property_data
                message = f"Updated property {centris_id}"
            else:
                # Add new property
                properties.append(property_data)
                message = f"Added property {centris_id}"

            # Update timestamp
            data['properties'] = properties
            data['last_updated'] = datetime.now().isoformat()

            # Write back to file
            self._write_data(data)

            return {
                'success': True,
                'message': message,
                'property': property_data
            }

    def delete_property(self, centris_id):
        """Delete a property by centris_id."""
        with self.lock:
            data = self._read_data()
            properties = data.get('properties', [])

            # Find and remove property
            centris_id = str(centris_id)
            new_properties = [p for p in properties if str(p.get('centris_id')) != centris_id]

            if len(new_properties) == len(properties):
                return {
                    'success': False,
                    'error': f"Property {centris_id} not found"
                }

            data['properties'] = new_properties
            data['last_updated'] = datetime.now().isoformat()
            self._write_data(data)

            return {
                'success': True,
                'message': f"Deleted property {centris_id}"
            }

    def clear_all_properties(self):
        """Clear all properties from storage."""
        with self.lock:
            data = {
                'properties': [],
                'last_updated': datetime.now().isoformat()
            }
            self._write_data(data)
            return {
                'success': True,
                'message': 'All properties cleared'
            }

    def get_property_count(self):
        """Get the number of stored properties."""
        properties = self.get_all_properties()
        return len(properties)

    def get_last_updated(self):
        """Get the last update timestamp."""
        with self.lock:
            data = self._read_data()
            return data.get('last_updated')
