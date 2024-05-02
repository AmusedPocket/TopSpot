from flask import Blueprint, request, render_template
from flask_login import login_required, current_user
from app.models import db, Spot
from app.forms import SpotForm
from sqlalchemy import or_

spot_routes = Blueprint("spots", __name__)

def errors_message(validation_errors):
    errorMessages = []

    for item in validation_errors:
        for error in validation_errors[item]:
            errorMessages.append(f'{item} : {error}')
    
    return errorMessages

@spot_routes.route('', methods=['GET'])
def get_all_spots():
    
    category = request.args.get('category')

    if category:
        spots = Spot.query.where(Spot.category == category).all()
    else:
        spots = Spot.query.all()
    
    if not spots:
        return {'errors': ['Error trying to load spots.']}, 404
    
    return {'spots': [spot.to_dict() for spot in spots]}

@spot_routes.route('', methods=['POST'])
@login_required
def create_spot():
    
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': errors_message(form.errors)}
    
    new_spot = Spot(
        title=form.data['title'],
        description=form.data['description'],
        category=form.data['category'],
        address=form.data['address'],
        phone=form.data['phone'],
        owner_id=current_user.id
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
    spot.phone = form.data['phone']
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
    
    print("=======================>>>>>>>>>>>>>", spot)
    db.session.delete(spot)
    db.session.commit()

    return {'message': "Successfully deleted spot."}

#add/remove like
@spot_routes.route('<int:id>/like', methods=['POST'])
@login_required
def spot_like(id):
    found = False
    spot = Spot.query.get(id)
    for user in spot.likes:
        if user.id == current_user.id:
            spot.likes.remove(user)
            found = True
            break
        if not found:
            spot.likes.append(current_user)
        db.session.add(spot)
        db.session.commit()
        return {"message": "deleted like" if found else "added like"}, 202 if found else 200
    
#Search
@spot_routes.route('/search')
def search():
    q = request.args.get("q")
    print(q)
    if q:
        results = Spot.query.filter(or_(Spot.title.ilike(f"%{q}%"), Spot.description.ilike(f"%{q}%"))).order_by(Spot.title.asc()).limit(5)
    else:
        results = []
    
    return [spot.to_dict() for spot in results]