from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserSpot(db.Model):
    __tablename__ = "user_spots"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("spots.id")), nullable=False)

    user = db.relationship("User", back_populates="spots")

    spot = db.relationship("Spot", back_populates="user")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_obj(),
            'spot_id': self.spot_id,
            'spot': self.spot.to_obj()
        }
    
    def to_obj(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'spot_id': self.spot_id
        }