from .db import db, environment, SCHEMA, add_prefix_for_prod

review_lbulbs = db.Table(
    "review_lbulbs",
    db.Column(
        "review_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("reviews.id")),
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
    review_lbulbs.schema = SCHEMA