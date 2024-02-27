import json
from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    data = open('app/seeds/data/reviews.json')
    reviews = json.load(data)

    print("\nSeeding reviews...")
    for review in reviews:
        new_review = Review(
            rating=review['rating'],
            body=review['body'],
            user_id=review['user_id'],
            spot_id=review['spot_id']
        )
        db.session.add(new_review)
    
    db.session.commit()
    print("Completed seeding reviews")

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews;"))
        
    db.session.commit()