import re
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User

def check_username_duplicates(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != form.data['user_id']:
        raise ValidationError("Username is taken.")
    
def check_email_duplicates(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != form.data['user_id']:
        raise ValidationError("Email is already registered on site.")

def valid_email(form, field):
    email = field.data
    valid = re.match(r'^[\w\d!$-_]+@[\w\d]+.[\w\d]+$', email)
    if not valid:
        raise ValidationError("Must provide a valid email.")

class UserForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired("User ID is required")])
    first_name = StringField("first_name", validators=[DataRequired("Must submit a first name.")])
    last_name = StringField("last_name", validators=[DataRequired("Must submit a last name.")])
    user_name = StringField("user_name", validators=[DataRequired("Must submit a username."), check_username_duplicates])
    email = StringField("email", validators=[DataRequired("Must submit an email."), valid_email, check_email_duplicates])