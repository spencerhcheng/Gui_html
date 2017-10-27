#!/usr/bin/python3

import requests
import sys
from pymongo import MongoClient

if __name__ == "__main__":
    client = MongoClient('mongodb://localhost:27017/')
    mydb = client['test-db']

    for post in mydb.sw_table.find({"name": "Luke Skywalker"}):
        print (post)
