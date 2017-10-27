#!/usr/bin/python3

from geopy.geocoders import Nominatim
import sys

my_addr = sys.argv[1]

geolocator = Nominatim()
location = geolocator.geocode(my_addr)
print(location.address)
print((location.latitude, location.longitude))
