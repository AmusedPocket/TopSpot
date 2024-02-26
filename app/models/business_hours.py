from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class BusinessHour(db.Model):
    __tablename__ = 'business_hours'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
    mondayHours = db.Column(db.DateTime)
    tuesdayHours = db.Column(db.DateTime)
    wednesdayHours = db.Column(db.DateTime)
    thursdayHours = db.Column(db.DateTime)
    fridayHours = db.Column(db.DateTime)
    saturdayHours = db.Column(db.DateTime)
    sundayHours = db.Column(db.DateTime)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    spot = db.relationship('Spot', backref=db.backref('business_hours', uselist=False))

    def to_dict(self):
        return {
            'id': self.id,
            'spot_id': self.spot_id,
            'mondayHours': self.mondayHours,
            'tuesdayHours': self.tuesdayHours,
            'wednesdayHours': self.wednesdayHours,
            'thursdayHours': self.thursdayHours,
            'fridayHours': self.fridayHours,
            'saturdayHours': self.saturdayHours,
            'sundayHours': self.sundayHours,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

