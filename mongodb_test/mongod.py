#!/usr/bin/python3

from pymongo import MongoClient

client = MongoClient()
db = client.test_2

from datetime import datetime
result = db.restaurants.insert_one(
    {"_id":2,
        "address": {
            "street": "238 Molly St",
            "zipcode": "10321",
            "building": "38",
            "coord": [-73.9557413, 40.7720266]
        },
        "borough": "Brooklyn",
        "cuisine": "Japanese",
        "grades": [
            {
                "date": datetime.strptime("2014-10-01", "%Y-%m-%d"),
                "grade": "B",
                "score": 12
            },
            {
                "date": datetime.strptime("2014-01-16", "%Y-%m-%d"),
                "grade": "A",
                "score": 31
            }
        ],
        "name": "Zukamas",
        "restaurant_id": "41704620"
    }
)
