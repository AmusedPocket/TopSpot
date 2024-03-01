from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    user_name = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    spots = db.relationship("UserSpot", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")
    images = db.relationship('ReviewImage', back_populates="user")
    owned_spot = db.relationship("Spot", back_populates="owner")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'user_name': self.user_name,
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'spots': [spot.to_obj() for spot in self.spots],
            'reviews': [review.to_obj() for review in self.reviews],
            'images': [image.to_obj() for image in self.images],
            'owned_spot': [spot.to_obj() for spot in self.owned_spot],
        }
    
    def to_obj(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'user_name': self.user_name,
            'email': self.email
        }
