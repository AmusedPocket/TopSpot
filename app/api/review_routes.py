import random
from flask import Blueprint, request
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

    db.session.add(review)
    db.session.commit()

    return {'review:', review.to_dict()}

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