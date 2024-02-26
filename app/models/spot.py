from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum
from datetime import datetime

class Category(Enum):
    Restaurants = "Restaurants"
    Shopping = "Shopping"
    Active_Life = "Active Life"
    Health = "Health"

class Spot(db.Model):
    __tablename__ = "spots"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    
    title = db.Column(db.String(255), nullable=False)
    profilePicture = db.Column(db.String(255))
    category = db.Column(db.Enum(Category), nullable=False)
    address = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    owner = db.relationship('User', backref=db.backref('spots', lazy='dynamic'), cascade="all, delete-orphan")


