from .db import db, environment, SCHEMA, add_prefix_for_prod

userFavorites = db.Table(
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('spot_id', db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), primary_key=True)
)