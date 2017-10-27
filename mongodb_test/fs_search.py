#!/usr/bin/python3

import requests
import sys
from pymongo import MongoClient

if __name__ == "__main__":
    client = MongoClient('mongodb://localhost:27017/')
    mydb = client['fs_test']

    for post in mydb.four_square.find():
        fs_list =  (post.get('response').get('groups'))
        for x in fs_list:
            places = (x.get('items'))
            for place in places:
                print(place.get('venue').get('name'), end=" ")
                print(place.get('venue').get('rating'))
                print(place.get('venue').get('ratingSignals'))
