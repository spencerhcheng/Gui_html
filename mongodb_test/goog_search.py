#!/usr/bin/python3

from geopy.geocoders import GoogleV3
import sys

geolocator = GoogleV3()

my_addr = sys.argv[1]

address = geolocator.geocode(my_addr)
print(address)
