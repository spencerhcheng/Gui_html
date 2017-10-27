#!/usr/bin/python3

import json, requests
from pymongo import MongoClient
from pyzomato import Pyzomato
import sys
from geopy.geocoders import GoogleV3

if __name__ == "__main__":
    url = 'https://api.foursquare.com/v2/venues/explore'
    geolocator = GoogleV3()
    params = dict(
        client_id='ODAOUA2ZUGYKSAQMGSED4HVLAGQJZF4LU1FNEESGR2KY20CL',
        client_secret='TBGFJYKBYEUHORFJH3MCBB2DKP1SFBJ4ZUK2T3TVHGKBIHYD',
        v='20171110',
        ll = '37.792085, -122.399368',
        section = 'food',
        limit = 50
)

    r = requests.get(url=url, params=params).json()
    fs_list = (r.get('response').get('groups')) 
    for post in fs_list:
        posts = (post.get('items'))
        for place in posts:
            print(place.get('venue').get('name'))
            simple_addr = place.get('venue').get('location').get('formattedAddress')
#            postal_code = place.get('venue').get('location').get('postalCode')
#            print(truck_addr, postal_code)
            street = place.get('venue').get('location').get('address')
            city = (place.get('venue').get('location').get('formattedAddress')[1]).replace(",", "")[:-5]
            try:
                address = street + " " +  city
            except:
                address = simple_addr[0]
            try:
                print("--------------------------------")
                print(address)
                for place in geolocator.geocode(address):
                    location = ("%s\n" % (place))
                    print(location)
                if location is None:
                    print(address)
                else:
                    print(location)
            except Exception as e:
                print(e)
