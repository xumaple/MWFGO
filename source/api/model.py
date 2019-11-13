

"""Database API."""

from api import app
from flask_sqlalchemy import SQLAlchemy
# Configure MySQL connection to Flask app
db = SQLAlchemy(app)

event_id = ''
trait_id = ''

class Organizers(db.Model):
    __tablename__ = 'organizers'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    full_name = db.Column(db.String(256))
    events = db.relationship('Event', backref='organizers', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"organizers('{self.id}', '{self.username}', '{self.password}', '{self.full_name}')"

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('organizers.id'), nullable=False) # TODO: foreign key here

    def __repr__(self):
        return f"Event('{self.id}', '{self.name}', '{self.organizer_id}')"

class Traits(db.Model):
    __tablename__ = event_id + '_traits'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    question = db.Column(db.String(256), nullable=False)
    is_constraint = db.Column(db.Boolean, nullable=False)
    form_type = db.Column(db.Integer, nullable=False)
    num_choices = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Traits('{self.id}', '{self.name}', '{self.question}', '{self.is_constraint}', '{self.form_type}', '{self.num_choices}')"

class Choices(db.Model):
    __tablename__ = event_id + '_choices'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return f"Choices('{self.id}', '{self.name}')"

class Members(db.Model):
    __tablename__ = event_id + '_members'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return f"Members('{self.id}', '{self.name}')"

class Leaders(db.Model):
    __tablename__ = event_id + '_leaders'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return f"Choices('{self.id}', '{self.name}')"

db.create_all()
db.session.commit()
