#!/usr/bin/python3
from app import app
from flask import request, abort, Flask, jsonify, render_template
from forms import zipForm, dropDown
from pymongo import MongoClient

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    code = zipForm()
    form = dropDown(form_name='Select a price')
    price = form.price.data
    zip_code = code.post.data
    client = MongoClient()
    db = client.guiscore
    my_list = []
    if price is None or zip_code is None:
        pass
    print(price)
    print(zip_code)
    try:
        for listing in db.restaurants.find({'zip_code':'{}'.format(zip_code), 'price_range':int('{}'.format(price))}):
            listing['_id'] = str(listing.get('_id'))
            my_list.append(listing)
    except:
        pass
    print(my_list)
    return render_template('index.html', code=code, my_list=my_list, form=form)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
