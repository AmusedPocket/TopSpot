from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.Foreignkey(add_prefix_for_prod('users.id')), nullable=False)
    spotId = db.Column(db.Integer, db.Foreignkey(add_prefix_for_prod('spots.id')), nullable=False)
    review = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Float)
    photos = db.Column(db.String(255))
    helpful = db.Column(db.Integer)
    thanks = db.Column(db.Integer)
    loveThis = db.Column(db.Integer)
    ohNo = db.Column(db.Integer)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'spotId': self.spotId,
            'review': self.review,
            'rating': self.rating,
            'photos': self.photos,
            'helpful': self.helpful,
            'thanks': self.thanks,
            'loveThis': self.loveThis,
            'ohNo': self.ohNo,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }