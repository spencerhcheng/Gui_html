#!/usr/bin/python3

bing_key = "bNV4gwzuDF0BY7hRBr2D~SwYlwf_NvSxlbZ36oGsTdA~AthfnABkus6e2oSBb4W9Q9_7yHrFh1cHbreVFmsPad2apAgjYqLYZi8E2iSyiJk-"

from geopy import geocoders
import sys

b = geocoders.Bing(bing_key)

my_addr = sys.argv[1]

for place in  b.geocode(my_addr, exactly_one=False):
    print(place.latitude, place.longitude)
