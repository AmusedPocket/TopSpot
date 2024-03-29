from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum
from datetime import datetime
from .spot_like import spot_likes

# class Category(Enum):
#     Restaurants = "Restaurants"
#     Shopping = "Shopping"
#     Active_Life = "Active Life"
#     Health = "Health"

class Spot(db.Model):
    __tablename__ = "spots"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    images = db.relationship("ReviewImage", back_populates="spot")

    reviews = db.relationship("Review", back_populates="spot", cascade='all, delete-orphan')
    user = db.relationship("UserSpot", back_populates="spot", cascade='all, delete-orphan')
    owner = db.relationship("User", back_populates="owned_spot")

    likes = db.relationship(
        "User",
        secondary=spot_likes,
        back_populates="user_liked_spots"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'address': self.address,
            'phone': self.phone,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'owner_id': self.owner_id,
            'owner': self.owner.to_obj() if self.owner else None,
            'avg_rating': self.avg_rating(),
            'reviews': [review.to_obj() for review in self.reviews] if self.reviews else [],
            'images': [image.to_obj() for image in self.images] if self.images else [],
            'likes': len(self.likes)
        }

    def to_obj(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'avg_rating': self.avg_rating(),
            'likes': len(self.likes),
        }
    
    def avg_rating(self):
        rating_total = sum([r.rating for r in self.reviews])
        number_of_ratings = len(self.reviews)

        if number_of_ratings == 0:
            return 0
        
        return rating_total / number_of_ratings

    def user_liked_spots_with_reviews(self):
        liked_spots_with_reviews = []
        for liked_user in self.likes:
            spot_dict = liked_user.to_obj()
            spot_dict['reviews'] = [review.to_obj() for review in liked_user.reviews]
            liked_spots_with_reviews.append(spot_dict)
        return liked_spots_with_reviews
