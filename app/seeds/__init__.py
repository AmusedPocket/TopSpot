from flask.cli import AppGroup
from .users import seed_users, undo_users
from app.models.db import db, environment, SCHEMA
from .spots import seed_spots, undo_spots
from .user_spots import seed_user_spots, undo_user_spots
from .review_images import seed_review_images, undo_review_images
from .reviews import seed_reviews, undo_reviews


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
         # Before seeding, truncate all tables prefixed with schema name
        
        # Add a truncate command here for every table that will be seeded.
        undo_review_images()
        undo_reviews()
        undo_user_spots()
        undo_spots()
        undo_users()
        db.session.commit()
    seed_users()
    seed_spots()
    seed_user_spots()
    seed_reviews()
    seed_review_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_review_images()
    undo_reviews()
    undo_user_spots()
    undo_spots()
    undo_users()
    # Add other undo functions here
