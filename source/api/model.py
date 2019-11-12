# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:supersecure@db/information_schema'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)
# db.init_app(app)


# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)

#     def __init__(self, username, email):
#         self.username = username
#         self.email = email

#     def __repr__(self):
#         return '<User %r>' % self.username

# db.create_all()

"""Database API."""
from flask import Flask
#from api import app
from flask_sqlalchemy import SQLAlchemy

# Configure MySQL connection to Flask app
app = Flask(__name__)
db_uri = 'mysql://root:supersecure@db/information_schema'
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
# meta = MetaData(engine)
# db.init_app(app)

event_id = ''

class Organizers(db.Model):
    __tablename__ = 'Organizers'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    full_name = db.Column(db.String(256))
    events = db.relationship('Event', backref='organizer', lazy=True, cascade="delete")

    def __repr__(self):
        return '<Username %r>' % self.username

class Event(db.Model):
    __tablename__ = 'Events'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('organizers.id'), nullable=False) # TODO: foreign key here

    def __repr__(self):
        return '<Name %r>' % self.name

class Traits(db.Model):
    __tablename__ = event_id + '_Traits'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    question = db.Column(db.String(256), nullable=False)
    is_constraint = db.Column(db.Boolean, nullable=False)
    form_type = db.Column(db.Integer, nullable=False)
    num_choices = db.Column(db.Integer, nullable=False)

class Choices(db.Model):
    __tablename__ = event_id + '_Choices'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    trait_id = db.Column(db.Integer, nullable=False) # TODO: foreign key here
    name = db.Column(db.String(256), nullable=False)

class Members(db.Model):
    __tablename__ = event_id + '_Members'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    trait_id = db.Column(db.Float, nullable=False) # TODO: foreign key here; should be dynamic
    name = db.Column(db.String(256), nullable=False)

class Leaders(db.Model):
    __tablename__ = event_id + '_Leaders'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    trait_id = db.Column(db.Float, nullable=False) # TODO: foreign key here; should be dynamic
    name = db.Column(db.String(256), nullable=False)

db.create_all()

