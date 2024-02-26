from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
    review = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Float)
    photos = db.Column(db.String(255))
    helpful = db.Column(db.Integer)
    thanks = db.Column(db.Integer)
    love_this = db.Column(db.Integer)
    oh_no = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'spot_id': self.spot_id,
            'review': self.review,
            'rating': self.rating,
            'photos': self.photos,
            'helpful': self.helpful,
            'thanks': self.thanks,
            'love_this': self.love_this,
            'oh_no': self.ohNo,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    