"""Database API."""

from api import app
from flask_sqlalchemy import SQLAlchemy
# Configure MySQL connection to Flask app
db = SQLAlchemy(app)

event_id = ''
trait_id = ''

tables = {}

class Organizers(db.Model):
    __tablename__ = 'organizers'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    full_name = db.Column(db.String(256))
    events = db.relationship('Event', backref='organizers', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"organizers('{self.id}', '{self.username}', '{self.password}', '{self.full_name}')"
tables["Organizers"] = Organizers

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('organizers.id'), nullable=False) # TODO: foreign key here

    def __repr__(self):
        return f"Event('{self.id}', '{self.name}', '{self.organizer_id}')"
tables["Event"] = Event

#not actually gonna be here once restAPI is done
class Traits(db.Model):
    __tablename__ = 'traits_' + event_id

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    question = db.Column(db.String(256), nullable=False)
    is_constraint = db.Column(db.Boolean, nullable=False)
    form_type = db.Column(db.Integer, nullable=False)
    context = db.Column(db.Float, nullable=False)
    choices = db.relationship('Choice_' + str(event_id), backref='traits', lazy=True, cascade="all, delete-orphan")
    nonConstraints = db.relationship('NonConstraints_' + str(event_id), backref='traits', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"Traits('{self.id}', '{self.name}', '{self.question}', '{self.is_constraint}', '{self.form_type}', '{self.context}')"

#not actually gonna be here once restAPI is done
class Choices(db.Model):
    __tablename__ = 'choices_' + event_id

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    trait_id = db.Column(db.Integer, db.ForeignKey('traits.id'), nullable=False)

    def __repr__(self):
        return f"Choices('{self.id}', '{self.name}', '{self.trait_id}')"

class NonConstraints(db.Model):
    __tablename__ = 'nonConstraints_' + event_id

    answer = db.Column(db.String(256), nullable=False)
    trait_id = db.Column(db.Integer, db.ForeignKey('traits.id'), nullable=False) # traits.id should be Traits_<Events.id>.id
    member_id = db.Column(db.Integer, db.ForeignKey('members.id'), nullable=False) # members.id should be Members.id_<Events.id>.id
    leader_id = db.Column(db.Integer, db.ForeignKey('leaders.id'), nullable=False) # leaders.id should be Leaders.id_<Events.id>.id

    def __repr__(self):
        return f"NonConstraints('{self.name}', '{self.trait_id}', '{self.member_id}', '{self.leader_id}')"

#not actually gonna be here once restAPI is done
class Members(db.Model):
    __tablename__ = 'members_' + event_id

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    trait_ = db.Column(db.Float, nullable=False) # multiple of these; variable is actually called "trait_<Traits_<Events.id>.id>"
    nonConstraints = db.relationship('NonConstraints_' + str(event_id), backref='members', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"Members('{self.id}', '{self.name}', '{self.trait_}')"
tables["Members"] = Members

#not actually gonna be here once restAPI is done
class Leaders(db.Model):
    __tablename__ = 'leaders_' + event_id

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    trait_ = db.Column(db.Float, nullable=False) # multiple of these; variable is actually called "trait_<Traits_<Events.id>.id>"
    nonConstraints = db.relationship('NonConstraints_' + str(event_id), backref='leaders', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"Choices('{self.id}', '{self.name}', '{self.trait_}')"

db.create_all()
db.session.commit()
