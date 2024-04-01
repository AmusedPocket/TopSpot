from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField
from app.s3_helpers import ALLOWED_EXTENSIONS

class ReviewImageForm(FlaskForm):
    image = FileField("image", validators=[
        FileRequired("Must include a valid image file."),
        FileAllowed(list(ALLOWED_EXTENSIONS))
    ])

    spot_id = IntegerField('spot_id')

    review_id = IntegerField('review_id')