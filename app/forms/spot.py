from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class SpotForm(FlaskForm):
    title = StringField('title', validators=[DataRequired('must submit title')])
    description = StringField('description', validators=[DataRequired('must submit description')])
    address = StringField('address', validators=[DataRequired('must submit address')])
    phone = StringField('phone', validators=[DataRequired('must submit phone number')])
    owner_id = StringField('owner_id')