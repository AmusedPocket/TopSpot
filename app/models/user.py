from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .review_lightbulb import review_lbulbs
from .review_heart import review_hearts
from .review_thumbs import review_thumbs
from .review_sads import review_sads
from .spot_like import spot_likes
from .following import follows

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

    #Many to many relationship
    user_liked_spots = db.relationship(
        "Spot",
        secondary = spot_likes,
        back_populates = "likes"
    )


    user_lbulb_reviews = db.relationship(
    "Review",
    secondary=review_lbulbs,
    back_populates="lbulbs"
    )

    user_heart_reviews = db.relationship(
        "Review",
        secondary=review_hearts,
        back_populates = "hearts"
    )

    user_thumb_reviews = db.relationship(
        "Review",
        secondary = review_thumbs,
        back_populates = "thumbs"
    )

    user_sad_reviews = db.relationship(
        "Review",
        secondary = review_sads,
        back_populates = "sads"
    )

    following = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.user_id == id),  # Changed primaryjoin condition
        secondaryjoin=(follows.c.follower_id == id),  # Changed secondaryjoin condition
        backref=db.backref("following_users", lazy="dynamic")  # Changed back reference name
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        follows_ids = [follower.id for follower in self.followers]
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
            'user_liked_spots': [spot.to_obj() for spot in self.user_liked_spots],
            'follows': follows_ids
        }
    
    def to_obj(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'user_name': self.user_name,
            'email': self.email
        }
