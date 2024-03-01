from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)

def errors_message(validation_errors):
    errorMessages = []

    for item in validation_errors:
        for error in validation_errors[item]:
            errorMessages.append(f'{item} : {error}')
    
    return errorMessages

@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}
    return current_user.to_dict()


@auth_routes.route('/login', methods=['POST'])
def login():
    
    """
    Logs a user in
    """
   
    form = LoginForm()
    
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
   
    
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if not form.validate_on_submit():
        return {"errors": errors_message(form.errors)}, 401
        # Add the user to the session, we are logged in!
    
    user = User.query.filter(
        (User.email == form.data['credential']) |
        (User.user_name == form.data['credential'])
    ).first()
    login_user(user)

    return user.to_dict()
    
    


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data["last_name"],
            user_name=form.data["user_name"],
            email=form.data["email"],
            password=form.data["password"]
        )
        print(user)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {"errors": errors_message(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401