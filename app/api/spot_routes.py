from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Spot
from app.forms import SpotForm

spot_routes = Blueprint("spots", __name__)

def errors_message(validation_errors):
    errorMessages = []

    for item in validation_errors:
        for error in validation_errors[item]:
            errorMessages.append(f'{item} : {error}')
    
    return errorMessages

@spot_routes.route('', methods=['GET'])
def get_all_spots():
    print('hi')
    category = request.args.get('category')

    if category:
        spots = Spot.query.where(Spot.category == category).all()
    else:
        spots = Spot.query.all()
    
    if not spots:
        return {'errors': ['Error trying to load spots.']}, 404
    
    return {'spots': [spot.to_dict() for spot in spots]}

@spot_routes.route('', methods=['POST'])
def create_spot():
    print("in post")
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': errors_message(form.errors)}
    
    new_spot = Spot(
        title=form.data['title'],
        description=form.data['description'],
        category=form.data['category'],
        phone=form.data['phone']
    )

    db.session.add(new_spot)
    db.session.commit()

    return {'spot': new_spot.to_dict()}, 201

@spot_routes.route('/<int:id>', methods=['GET'])
def get_spot(id):
    spot = Spot.query.get(id)

    if not spot:
        return {'errors': ["Spot couldn't be found."]}, 404
    
    return {'spot': spot.to_dict()}

@spot_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_spot(id):
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': errors_message(form.errors)}, 401
    
    spot = Spot.query.get(id)

    if not spot:
        return {'errors': ["Spot couldn't be found."]}, 404
    
    def owner():
        if form.data['owner_id']:
            return form.data['owner_id']
        else:
            try:
                return spot.owner_id
            except:
                return None
            
    spot.title = form.data['title']
    spot.description = form.data['description']
    spot.category = form.data['category']
    spot.address = form.data['address']
    spot.owner_id = owner()

    db.session.commit()

    return {'spot': spot.to_dict()}

@spot_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_spot(id):
    print('in delete area')
    spot = Spot.query.get(id)

    if not spot:
        return {'errors': ['Spot could not be found']}, 404
    
    db.session.delete(spot)
    db.session.commit()

    return {'message': "Successfully deleted spot."}