import flask
import api
from api.model import db, tables, Organizers, Event, Members
# Connect c++ modules to python
# from algorithm import GroupOrganizer

event_id = '0'

@api.app.route('/api/v1/organizer/', methods = ['GET'])
def create_member_table():
    traits = db.session.query(tables['traits_{}'.format(event_id)]).all()
        #create dictionary to input into table creator
    members = {
        "id": db.Column(db.Integer, primary_key=True, nullable=False), \
        "name": db.Column(db.String(256), nullable=False), \
        "non_constraints": db.relationship(tables['nonconstraints_{}'.format(event_id)], backref='members', lazy=True, cascade="all, delete-orphan"), \
        "__repr__": lambda self: self.id + self.name
    }
    #for every trait find the formType and add the trait as a column to the dictionary
    for trait in traits:
        column = db.Column(db.Integer, nullable=False)
        if trait.form_type == 2:
            column = db.Column(db.Float, nullable=False)
        if trait.form_type == 3:
            column = db.Column(db.String(256), nullable=False)
        members["trait_{}".format(str(trait.id))] = column
    #input the dictionary to table creator
    table = type("Members_" + event_id, 
          (db.Model,),
          members)
    tables['members_{}'.format(event_id)] = table
    db.create_all(tables=[table.__table__,])
    db.session.commit()

    return flask.jsonify("", 200)