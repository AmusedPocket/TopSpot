from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Spot, db, environment, SCHEMA
from random import sample, randint, random
from datetime import datetime
import json



def seed_spots():
    data = open('app/seeds/data/spots.json')
    spots = json.load(data)
    print("/nSeeding spots data...")
    user_arr = list(range(1, 40))

    for spot in spots:
        user = random.choice(user_arr)
        user_arr.remove(user)

        new_spot = Spot(
            title=spot['title'],
            category=spot['category'],
            address=spot['address'],
            phone=spot['phone'],
            owner_id=user
        )
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
    else:
        db.session.execute("DELETE FROM spots")
        
    db.session.commit()
