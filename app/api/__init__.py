from flask import Blueprint
from .auth_routes import auth_routes
from .spot_routes import spot_routes



api = Blueprint("api", __name__)

api.register_blueprint(auth_routes, url_prefix='/auth')
api.register_blueprint(spot_routes, url_prefix='/spots')
