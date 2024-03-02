
from sqlalchemy.sql import text
from app.models import ReviewImage, db, environment, SCHEMA
from random import sample, randint, random
from datetime import datetime
import json



def seed_review_images():

    data = open('app/seeds/data/review_images.json')

    images = json.load(data)

    current_spot_id = 1

    print("\nSeeding images table...")
    for idx, image in enumerate(images):
        new_image = ReviewImage(
            review_id=idx + 1,
            user_id=(idx % 40) + 1,
            url = image['url'],
            spot_id = current_spot_id
        )
        db.session.add(new_image)

        if(idx + 1) % 3 == 0:
            current_spot_id += 1

    db.session.commit()
    print("Images table seeded.")

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review_images;"))
        
    db.session.commit()
