from .db import db, environment, SCHEMA, add_prefix_for_prod

review_sads = db.Table(
    "review_sads",
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
    review_sads.schema = SCHEMA