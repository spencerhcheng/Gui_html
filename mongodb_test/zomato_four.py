#!/usr/bin/python3

import json, requests
from geopy import geocoders
import sys
from pyzomato import Pyzomato

if __name__ == "__main__":
    bing_key = "bNV4gwzuDF0BY7hRBr2D~SwYlwf_NvSxlbZ36oGsTdA~AthfnABkus6e2oSBb4W9Q9_7yHrFh1cHbreVFmsPad2apAgjYqLYZi8E2iSyiJk-"
    b = geocoders.Bing(bing_key)

    url = 'https://developers.zomato.com/api/geocode'
    params = dict(
        client_id='ODAOUA2ZUGYKSAQMGSED4HVLAGQJZF4LU1FNEESGR2KY20CL',
        client_secret='TBGFJYKBYEUHORFJH3MCBB2DKP1SFBJ4ZUK2T3TVHGKBIHYD',
        v='20171110',
        near = 'San Francisco, CA',
        section = 'food',
        limit = 50
)

    r = requests.get(url=url, params=params).json()
    fs_list = (r.get('response').get('groups'))

    for post in fs_list:
        posts = (post.get('items'))
        for place in posts:
            print(place.get('venue').get('name'))
            print(place.get('venue').get('location')
            street = place.get('venue').get('location').get('address')
            city = (place.get('venue').get('location').get('formattedAddress')[1]).replace(",", "")[:-5]
            address = street + " " +  city
            try:
                for place in b.geocode(address, exactly_one=False):
                    location = ("%s\n" % (place))

                if location is None:
                    print(address)
                else:
                    print(location)
            except Exception as e:
                pass 
