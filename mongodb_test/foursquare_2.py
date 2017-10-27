#!/usr/bin/python3

import json, requests
from pymongo import MongoClient
from pyzomato import Pyzomato
import sys
from geopy import geocoders


if __name__ == "__main__":
    url = 'https://api.foursquare.com/v2/venues/explore'
    bing_key = "bNV4gwzuDF0BY7hRBr2D~SwYlwf_NvSxlbZ36oGsTdA~AthfnABkus6e2oSBb4W9Q9_7yHrFh1cHbreVFmsPad2apAgjYqLYZi8E2iSyiJk-"
    bing = geocoders.Bing(bing_key)
    params = dict(
        client_id='ODAOUA2ZUGYKSAQMGSED4HVLAGQJZF4LU1FNEESGR2KY20CL',
        client_secret='TBGFJYKBYEUHORFJH3MCBB2DKP1SFBJ4ZUK2T3TVHGKBIHYD',
        v='20171110',
        ll = '37.792085, -122.399368',
        section = 'food',
        limit = 15
)

    r = requests.get(url=url, params=params).json()
    fs_list = (r.get('response').get('groups')) 
    for post in fs_list:
        posts = (post.get('items'))
        for place in posts:
            print(place.get('venue').get('name'))
            truck_addr = place.get('venue').get('location').get('formattedAddress')
            postal_code = place.get('venue').get('location').get('postalCode')
            street = place.get('venue').get('location').get('address')
            city = (place.get('venue').get('location').get('formattedAddress')[1]).replace(",", "")[:-5]
            try:
                address = street + " " +  city
            except:
                address = truck_addr[0] + " " + postal_code
            try:
                location =  bing.geocode(address, exactly_one=True)
                if location is None:
                    print(address)
                else:
                    print(location)
            except Exception as e:
                pass
