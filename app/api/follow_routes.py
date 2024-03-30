from flask import Blueprint, request, session, jsonify
from flask_login import login_required, current_user
from app.models import User, db

follow_routes = Blueprint("follows", __name__)

def errors_message(validation_errors):
    errorMessages = []

    for item in validation_errors:
        for error in validation_errors[item]:
            errorMessages.append(f'{item} : {error}')
    
    return errorMessages

@follow_routes.route('', methods=['GET'])
@login_required
def get_all_followers():
    user = User.query.get(current_user.id)
    print("==============++++=====>>>> current user", user)
    

    # Check if the user exists
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Get the list of followers
    followers = [follower.to_obj() for follower in current_user.followers]

    return jsonify({'followers': followers}), 200

#add/remove follow
@follow_routes.route('<int:id>', methods=['POST'])
@login_required
def follow_user(id):
   
    user_to_follow = User.query.get(id)

    if not user_to_follow:
        return jsonify({'error': 'User not found'}), 404

    if user_to_follow == current_user:
        return {"error": "Cannot follow self."}, 400
    # Check if the current user is already following the user_to_follow
    if current_user in user_to_follow.followers:
        user_to_follow.followers.remove(current_user)
        db.session.commit()
        return {"message": "Unfollowed user"}, 200

    else:
    # Add the current user to the followers of user_to_follow
        user_to_follow.followers.append(current_user)
        db.session.commit()
        return {"message": "Followed user"}, 200

@follow_routes.errorhandler(400)
def validation_error(e):
    return jsonify({'error': errors_message(e.validation_errors)}), 400