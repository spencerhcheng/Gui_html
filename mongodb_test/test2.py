#!/usr/bin/python3

def get_db():
    from pymongo import MongoClient
    client = MongoClient('localhost:27017')
    db = client.myFirstMB
    return db
[(0.30(((9/10) * 10) / 10) + (0.35(((3.5/5) * 20) / 20)) + (0.35((4.5/5) * 20/ 20)))] / 3
def add_country(db):
    db.countries.insert({"name" : "Canada"})
    
def get_country(db):
    return db.countries.find_one()

if __name__ == "__main__":

    db = get_db() 
    add_country(db)
    print (get_country(db))
