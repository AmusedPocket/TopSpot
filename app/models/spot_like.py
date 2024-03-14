from .db import db, environment, SCHEMA, add_prefix_for_prod

spot_likes = db.Table(
    "spot_likes",
    db.Column(
        "spot_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("spots.id")),
        primary_key=True
    ),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    )
)

if environment == "production":
    spot_likes.schema = SCHEMA