#!/usr/bin/python3

from flask_wtf import FlaskForm
from wtforms import TextField, SelectField

class zipForm(FlaskForm):
    post = TextField('ZIP CODE')

class dropDown(FlaskForm):
    price = SelectField(
        'Select a price',
        choices=[('1', '$'), ('2', '$$'), ('3', '$$$'), ('4', '$$$$')]
    )
