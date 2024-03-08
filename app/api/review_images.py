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
        return {"errors": "Cannot load image."}
    
    return {'image': review_image.to_dict()}

@review_image_routes.route("", methods=['GET'])
def get_all_review_images():
    review_images = ReviewImage.query.all()

    if not review_images:
        return {"errors": "Cannot load images."}
    
    return {'images': [image.to_dict() for image in review_images]}

@review_image_routes.route("/curr", methods=['GET'])
@login_required
def get_user_review_images():
   
    user_images = ReviewImage.query.where(ReviewImage.user_id == current_user.id)
    
    return {'images': [image.to_dict() for image in user_images]}

@review_image_routes.route("", methods=["POST"])
@login_required
def upload_review_image():
    form = ReviewImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return {'errors': errors_message(form.errors)}, 401
    
    image = form.data['image']
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print("upload is ------>>>", upload)

    if "url" not in upload:
        return upload, 404
    
    new_review_image = ReviewImage(
        url=upload["url"],
        user_id = current_user.id,
        spot_id = form.data['spot_id'],
        review_id = form.data['review_id']
    )

    db.session.add(new_review_image)
    db.session.commit()
    print({'image': new_review_image.to_dict()})
    return {'reviewImage': new_review_image.to_dict()}

@review_image_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_review_image(id):
    review_image = ReviewImage.query.get(id)

    if not review_image:
        return {'errors': "Cannot find image."}
    
    remove_image = remove_file_from_s3(review_image.url)

    if remove_image is not True:
        return remove_image
    
    db.session.delete(review_image)
    db.session.commit()

    return {'message': 'Review image successfully deleted.'}
