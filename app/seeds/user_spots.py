import random
from app.models import db, UserSpot, environment, SCHEMA
from sqlalchemy.sql import text

def seed_user_spots():
    print("\nSeeding user_spots table...")
    for user_id in list(range(1, 41)):
        for _ in list(range(3)):
            spot_id = random.choice(list(range(1, 41)))

            new_user_spot = UserSpot(
                user_id=user_id,
                spot_id=spot_id
            )

            db.session.add(new_user_spot)
    
    db.session.commit()
    print("Done seeding user_spots.")

def undo_user_spots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_spots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_spots;"))
        
    db.session.commit()