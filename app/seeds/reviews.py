import json
from app.models import db, Review, environment, SCHEMA, review_hearts, review_lbulbs, review_sads, review_thumbs, User
from sqlalchemy.sql import text
from random import randint, random, sample


def seed_reviews():
    data = open('app/seeds/data/reviews.json')
    reviews = json.load(data)

    print("\nSeeding reviews...")
    for review_data in reviews:
        new_review = Review(
            rating=review_data['rating'],
            body=review_data['body'],
            user_id=review_data['user_id'],
            spot_id=review_data['spot_id']
        )

        db.session.add(new_review)
        db.session.flush()  # Ensure that the review gets an ID before adding associations

        add_association(new_review, review_lbulbs, 'lbulbs')
        add_association(new_review, review_hearts, 'hearts')
        add_association(new_review, review_thumbs, 'thumbs')
        add_association(new_review, review_sads, 'sads')

    db.session.commit()
    print("Completed seeding reviews")

def add_association(review, association_table, attribute_name):
    num_associations = randint(1, 40)  # Random number of associations between 1 and 40
    user_ids = list(range(1, 41))  # List of all user IDs

    # Randomly select unique user IDs for associations
    association_user_ids = sample(user_ids, num_associations)

    # Create association instances
    association_instances = [{'review_id': review.id, 'user_id': user_id} for user_id in association_user_ids]

    # Insert unique associations
    db.session.execute(association_table.insert(), association_instances)
    db.session.commit()

    # Retrieve the ORM objects corresponding to the inserted associations
    associations = (
        db.session.query(User)
        .join(association_table)
        .filter_by(review_id=review.id)
        .all()
    )

    setattr(review, attribute_name, associations)


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_hearts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_lbulbs RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_sads RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_thumbs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review_thumbs;"))
        db.session.execute(text("DELETE FROM review_sads;"))
        db.session.execute(text("DELETE FROM review_lbulbs;"))
        db.session.execute(text("DELETE FROM review_hearts;"))
        db.session.execute(text("DELETE FROM reviews;"))
        
    db.session.commit()