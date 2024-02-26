from .db import db, environment, SCHEMA, add_prefix_for_prod

user_favorites = db.Table(
    "user_favorites",
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('spot_id', db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), primary_key=True)
)

if environment == "production":
    user_favorites.schema = SCHEMA