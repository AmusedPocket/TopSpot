from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired("Must submit a rating.")])

    body = StringField('body', validators=[DataRequired("Must submit a review description."), Length(1, 1000)])

    spot_id = IntegerField ('spot_id', validators=[DataRequired("Review must have an associated spot id.")])

    