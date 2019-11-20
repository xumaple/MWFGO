import flask
import api
from api.model import db, tables
from flask_sqlalchemy import SQLAlchemy

# Connect c++ modules to python
# from algorithm import GroupOrganizer

event_id = '0'

def delete_table(tb_name):
    tables = db.metadata.tables.copy()
    tables.pop(tb_name)
    db.metadata.tables = tables

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
    print('0')
    print(db.get_engine())
    # print(db.engine)
    tb_name = 'members_{}'.format(event_id)
    dropped = tables.get(tb_name)
    if dropped is not None:
        dropped.__table__.drop(db.get_engine())
        db.session.commit()
        # dropped.drop_table()
        print('dropped')
        from pprint import pprint
        # db.metadata.tables = db.metadata.tables.popitem(tb_name)
        # delete_table(tb_name)
        pprint(db.metadata.tables.get(tb_name))
    table = type("Members_" + event_id, 
          (db.Model,),
          members)
    db.create_all()
    db.session.commit()
    tables[tb_name] = table

    return flask.jsonify("", 200)