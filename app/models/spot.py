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
    category = db.Column(db.Enum(Category), nullable=False)
    address = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    
    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'address': self.address,
            'phone': self.phone,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


