"""Database API."""

from api import app, db_uri
from flask_sqlalchemy import SQLAlchemy
# Configure MySQL connection to Flask app
db = SQLAlchemy(app)
# engine = SQLAlchemy.create_engine(db_uri)

event_id = "0"
trait_id = "0"

tables = {}

# class Table(db.Model):
#     def __init__(self):
#         self.deleted = False

#     def drop_table(self):
#         if not self.deleted:
#             self.__table__.drop(db.get_engine())
#             self.deleted = True

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    organizer_username = db.Column(db.String(256), db.ForeignKey('organizers.username'), nullable=False) # TODO: foreign key here

    def __repr__(self):
        return f"event('{self.id}', '{self.name}', '{self.organizer_id}')"
tables["events"] = Event

class Organizers(db.Model):
    __tablename__ = 'organizers'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    full_name = db.Column(db.String(256))
    events = db.relationship(Event, backref='organizers', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"organizers('{self.id}', '{self.username}', '{self.password}', '{self.full_name}')"
tables["organizers"] = Organizers

#not actually gonna be here once restAPI is done
class Choices(db.Model):
    __tablename__ = 'choices_' + event_id

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    trait_id = db.Column(db.Integer, db.ForeignKey('traits_{}.id'.format(event_id)), nullable=False)

    def __repr__(self):
        return f"choices('{self.id}', '{self.name}', '{self.trait_id}')"
tables["choices_" + event_id] = Choices

class Nonconstraints(db.Model):
    __tablename__ = 'nonconstraints_' + event_id

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    answer = db.Column(db.String(256), nullable=False)
    trait_id = db.Column(db.Integer, db.ForeignKey('traits_{}.id'.format(event_id)), primary_key=True, nullable=False) # traits.id should be Traits_<Events.id>.id
    member_id = db.Column(db.String(256), db.ForeignKey('members_{}.id'.format(event_id))) # members.id should be Members.id_<Events.id>.id
    leader_id = db.Column(db.Integer, db.ForeignKey('leaders_{}.id'.format(event_id))) # leaders.id should be Leaders.id_<Events.id>.id

    def __repr__(self):
        return f"nonconstraints('{self.name}', '{self.trait_id}', '{self.member_id}', '{self.leader_id}')"
tables["nonconstraints_0"] = Nonconstraints

#not actually gonna be here once restAPI is done
# class Members(db.Model):
#     __tablename__ = 'members_' + event_id

#     id = db.Column(db.String(16), primary_key=True, nullable=False)
#     name = db.Column(db.String(256), nullable=False)
#     non_constraints = db.relationship(Nonconstraints, backref='members', lazy=True, cascade="all, delete-orphan")

#     def __repr__(self):
#         return f"members('{self.id}', '{self.name}', '{self.trait_}')"
# tables["members_" + event_id] = Members

# #not actually gonna be here once restAPI is done
# class Leaders(db.Model):
#     __tablename__ = 'leaders_' + event_id

#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     name = db.Column(db.String(256), nullable=False)
#     non_constraints = db.relationship(Nonconstraints, backref='leaders', lazy=True, cascade="all, delete-orphan")

#     def __repr__(self):
#         return f"choices('{self.id}', '{self.name}', '{self.trait_}')"
# tables["leaders_" + event_id] = Leaders

#not actually gonna be here once restAPI is done
class Traits(db.Model):
    __tablename__ = 'traits_' + event_id

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256))
    question = db.Column(db.String(256))
    is_constraint = db.Column(db.Boolean)
    form_type = db.Column(db.Integer)
    context = db.Column(db.Float)
    choices = db.relationship(Choices, backref='traits_{}.id'.format(event_id), lazy=True, cascade="all, delete-orphan")
    nonConstraints = db.relationship(Nonconstraints, backref='traits_{}.id'.format(event_id), lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"traits('{self.id}', '{self.name}', '{self.question}', '{self.is_constraint}', '{self.form_type}', '{self.context}')"
tables["traits_" + event_id] = Traits

db.metadata.bind = db.get_engine()
db.create_all()
db.session.commit()
