from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import UserForm

user_routes = Blueprint('users', __name__)

def errors_message(validation_errors):
    errorMessages = []

    for item in validation_errors:
        for error in validation_errors[item]:
            errorMessages.append(f'{item} : {error}')
    
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/curr', methods=['PUT'])
@login_required
def update_user():
    form = UserForm()
    form['csrf_token'].date = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': errors_message(form.errors)}, 401
    
    user = User.query.get(current_user.id)

    if not user:
        return {'errors': ['User could not be found']}, 404
    
    user.first_name = form.data['first_name']
    user.last_name = form.data['last_name']
    user.user_name = form.data['user_name']
    user.email = form.data['email']

    db.session.commit()

    return user.to_dict()

@user_routes.route('/curr', methods=['DELETE'])
@login_required
def delete_user():
    user_id = current_user.id
    user = User.query.get(current_user.id)

    if not user:
        return {'errors': ['User could not be found']}, 404
    
    db.session.delete(user)
    db.session.commit()

    return {'message': f'User #{user_id} successfully deleted'}