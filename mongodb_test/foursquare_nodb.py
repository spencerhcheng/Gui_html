#!/usr/bin/python3

import json, requests

if __name__ == "__main__":
    url = 'https://api.foursquare.com/v2/venues/explore'
    params = dict(
        client_id='ODAOUA2ZUGYKSAQMGSED4HVLAGQJZF4LU1FNEESGR2KY20CL',
        client_secret='TBGFJYKBYEUHORFJH3MCBB2DKP1SFBJ4ZUK2T3TVHGKBIHYD',
        v='20171110',
        near = 'San Francisco, CA',
        section = 'food',
        limit = 20,
        price = 1
)

    r = requests.get(url=url, params=params).json()
    print(r)
