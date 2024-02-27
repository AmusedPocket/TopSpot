from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    body = db.Column(db.String(255), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
    
    user = db.relationship("User", back_populates="reviews")
    spot = db.relationship("Spot", back_populates="reviews")
    images = db.relationship('ReviewImage', back_populates="reviews")
    
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'body': self.body,
            'user_id': self.user_id,
            'user': self.user.to_obj(),
            'spot_id': self.spot_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    def to_obj(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'body': self.body,
            'user': self.user.to_obj(),
            'spot': self.spot.to_obj() if self.spot else None
        }
    