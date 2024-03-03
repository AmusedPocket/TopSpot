from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms.review_image import ReviewImageForm
from app.models import db, ReviewImage
from app.s3_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

review_image_routes = Blueprint("reviewimages", __name__)

def errors_message(validation_errors):
    errorMessages = []

    for item in validation_errors:
        for error in validation_errors[item]:
            errorMessages.append(f'{item} : {error}')
    
    return errorMessages

@review_image_routes.route("/<int:id>", methods=['GET'])
def get_review_image(id):
    review_image = ReviewImage.query.get(id)

    if not review_image:
        return {"errors": "Cannot load images"}
    
    return {'image': review_image.to_dict()}