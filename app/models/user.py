from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .user_follower import follows
from .user_favorite import user_favorites


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    userName = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    followers = db.relationship(
        "User",
        secondary="follows",
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.user_id == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )

    favorites = db.relationship(
        "Spot",
        secondary=user_favorites,
        backref=db.backref("users", lazy="dynamic")
    )

    reviews = db.relationship(
        "Review",
        back_populates="user"
    )

    likes = db.relationship(
        'Spots',
        back_populates='user'
    )

    images = db.relationship(
        'ReviewImage',
        back_populates="user"
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
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'username': self.username,
            'email': self.email,
            'favorites': [favorite.to_dict() for favorite in self.favorites],
            'images': self.images
        }
