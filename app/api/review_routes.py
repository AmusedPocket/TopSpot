import random
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Review
from app.forms import ReviewForm

review_routes = Blueprint("reviews", __name__)

def errors_message(validation_errors):
    errorMessages = []

    for item in validation_errors:
        for error in validation_errors[item]:
            errorMessages.append(f'{item} : {error}')
    
    return errorMessages

@review_routes.route('/<int:id>', methods=['GET'])
def single_review(id):
    review = Review.query.get(id)
    if not review:
        return {'errors': ['Unable to find review.']}, 404
    
    return {'review': review.to_dict()}

@review_routes.route('', methods=['GET'])
def all_reviews():
    reviews = Review.query.all()

    if not reviews:
        return {'errors': ['Error finding reviews.']}, 404
    
    return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/random/<int:number>', methods=['GET'])
def get_random_reviews(number):
    reviews = Review.query.all()

    if not reviews:
        return {'errors': ['Error finding reviews.']}, 404
    
    random_reviews = random.sample(reviews, number)

    return {'reviews': [review.to_dict() for review in random_reviews]}

@review_routes.route('', methods=['POST'])
def new_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': errors_message(form.errors)}, 401
    
    review = Review(
        rating=form.data['rating'],
        body=form.data['body'],
        user_id = current_user.id,
        spot_id=form.data['spot_id']
    )

    db.session.add(review)
    db.session.commit()

    return {'review': review.to_dict()}

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if not form.validate_on_submit():
        return {'errors': errors_message(form.errors)}, 401
    
    review = Review.query.get(id)
    
    if not review:
        return {'errors': ['Unable to find review.']}, 404
    
    review.rating = form.data['rating']
    review.body = form.data['body']
    
    db.session.commit()

    return {'review': review.to_dict()}, 200

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if not review:
        return {'errors': ['Unable to find review.']}, 404
    
    db.session.delete(review)
    db.session.commit()

    return {'message': 'Successfully deleted review.'}

@review_routes.route('/user/curr', methods=['GET'])
@login_required
def user_reviews():
    reviews = Review.query.where(Review.user_id == current_user.id).all()
    return {'reviews': [review.to_dict() for review in reviews]}

#Lbulbs
@review_routes.route('/<int:id>/lbulb', methods=['POST'])
@login_required
def lbulb(id):
    print("===============================================> in backend")
    found = False
    review = Review.query.get(id)
    for user in review.lbulbs:
        if user.id == current_user.id:
            review.lbulbs.remove(current_user)
            found = True
            break
    if not found:
        review.lbulbs.append(current_user)
    db.session.add(review)
    db.session.commit()
    return {"message": "deleted lbulb" if found else "added lbulb"}, 202 if found else 200

#Hearts
@review_routes.route('/<int:id>/heart', methods=['POST'])
@login_required
def heart(id):
    found = False
    review = Review.query.get(id)
    for user in review.hearts:
        if user.id == current_user.id:
            review.hearts.remove(current_user)
            found = True
            break
    if not found:
        review.hearts.append(current_user)
    db.session.add(review)
    db.session.commit()
    return {"message": "deleted heart" if found else "added heart"}, 202 if found else 200

#thumbs
@review_routes.route('/<int:id>/thumb', methods=['POST'])
@login_required
def thumb(id):
    found = False
    review = Review.query.get(id)
    for user in review.thumbs:
        if user.id == current_user.id:
            review.thumbs.remove(current_user)
            found = True
            break
    if not found:
        review.thumbs.append(current_user)
    db.session.add(review)
    db.session.commit()
    return {"message": "deleted thumb" if found else "added thumb"}, 202 if found else 200

#sads
@review_routes.route('/<int:id>/sad', methods=['POST'])
@login_required
def sad(id):
    found = False
    review = Review.query.get(id)
    for user in review.sads:
        if user.id == current_user.id:
            review.sads.remove(current_user)
            found = True
            break
    if not found:
        review.sads.append(current_user)
    db.session.add(review)
    db.session.commit()
    return {"message": "deleted sad" if found else "added sad"}, 202 if found else 200