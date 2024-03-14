from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Spot, db, environment, SCHEMA
from random import sample, randint, random, choice
from datetime import datetime
import json



def seed_spots():
    data = open('app/seeds/data/spots.json')
    spots = json.load(data)
    print("/nSeeding spots data...")
    user_ids = list(range(1, 41))

    for spot in spots:
        if not user_ids:
            user_ids = list(range(1, 41))
        owner_id = choice(user_ids)
        user_ids.remove(owner_id)

        new_spot = Spot(
            title=spot['title'],
            category=spot['category'],
            description=spot['description'],
            address=spot['address'],
            phone=spot['phone'],
            owner_id=owner_id
        )
        num_likes = randint(0, min(40, len(user_ids)))
        for _ in range(num_likes):
            print(f"Length of user_ids: {len(user_ids)}")
            if not user_ids:
                print("User IDs list is empty.")
                break
            liker_id = choice(user_ids)
            print(f"Selected liker ID: {liker_id}")
            user_ids.remove(liker_id)
            liker = User.query.get(liker_id)
            if liker:
                new_spot.likes.append(liker)
            else:
                print(f"User with ID {liker_id} not found.")
        db.session.add(new_spot)
    db.session.commit()
    print("/nSpots finished seeding")

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_spots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.spot_likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spots;"))
        db.session.execute(text("DELETE FROM spot_likes;"))
        
    db.session.commit()
