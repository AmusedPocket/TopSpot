from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ReviewImage(db.Model):
    __tablename__ = 'review images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    url = db.Column(db.String(255))
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("spots.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="images")
    spot = db.relationship("Spot", back_populates="images")
    review = db.relationship("Review", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'review_id': self.review_id,
            'url': self.url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }