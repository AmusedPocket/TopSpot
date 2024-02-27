from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ReviewImage(db.Model):
    __tablename__ = 'review_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("spots.id")))
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id')))
    
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="images")
    spot = db.relationship("Spot", back_populates="images")
    reviews = db.relationship("Review", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'user_id': self.user_id,
            'user': self.user.to_obj(),
            'spot_id': self.spot_id,
            'spot': self.spot.to_obj() if self.spot else None,
            'review_id': self.review_id,
            'review': self.review.to_obj() if self.review else {},
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    def to_obj(self):
        return {
            'id': self.id,
            'url': self.url
        }