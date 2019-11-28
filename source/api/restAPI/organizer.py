import flask
from api import app
from api.model import db, tables, drop_table_if_exists


# Connect c++ modules to python
# from algorithm import GroupOrganizer

event_id = '0'

def delete_table(tb_name):
    tables = db.metadata.tables.copy()
    tables.pop(tb_name)
    db.metadata.tables = tables

@app.route('/api/v1/organizer/', methods = ['GET'])
def create_member_table():
    traits = db.session.query(tables['traits_{}'.format(event_id)]).all()
        #create dictionary to input into table creator
    tb_name = 'members_{}'.format(event_id)
    members = {
        "__tablename__": tb_name, 
        "id": db.Column(db.String(256), primary_key=True, nullable=False), 
        "name": db.Column(db.String(256), nullable=False), 
        # "non_constraints": db.relationship(tables['nonconstraints_{}'.format(event_id)], backref='members', lazy=True, cascade="all, delete-orphan"), 
        "__repr__": lambda self: self.id + self.name,
        # "__table_args__": { "__bind_key__": tb_name, },
        # "__table_args__": { "extend_existing": True, }
    }
    #for every trait find the formType and add the trait as a column to the dictionary
    for trait in traits:
        column = db.Column(db.Integer)
        if trait.form_type == 2:
            column = db.Column(db.Float)
        if trait.form_type == 3:
            column = db.Column(db.String(256))
        members["trait_{}".format(str(trait.id))] = column
    #input the dictionary to table creator
    drop_table_if_exists(tb_name)
    table = type(tb_name, 
          (db.Model,),
          members)
    db.create_all()
    db.session.commit()
    tables[tb_name] = table

    return flask.redirect('/thanks:)/')