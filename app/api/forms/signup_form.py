from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    user_name = field.data
    user = User.query.filter(User.user_name == user_name).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    user_name = StringField(
        'user_name', validators=[DataRequired("Must submit a username."), username_exists])
    first_name = StringField("first_name", validators=[DataRequired("Must submit a firstname.")])
    last_name = StringField('last_name', validators=[DataRequired("Must submit a lastname.")])
    email = StringField('email', validators=[DataRequired("Must submit an email."), user_exists])
    password = StringField('password', validators=[DataRequired()])
