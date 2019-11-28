import flask
import api
from api.model import db, tables
from sqlalchemy import text
import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from pprint import pprint


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
    # print('0')
    # print(db.get_engine())
    # print(db.engine)
    dropped = tables.get(tb_name)
    if dropped is not None:
        # db.metadata.tables = db.metadata.tables.copy().popitem(tb_name)
        data = db.metadata
        try:
            dropped.__table__.drop(db.get_engine())
            # db.create_all()
            # data.drop_all(bind=db.get_engine(), tables=[dropped.__table__])
        except sqlalchemy.exc.ProgrammingError:
            print('********************error caught')
        # db.orm.instrumentation.unregister_class(dropped)
        # del dropped._decl_class_registry[dropped.__name__]
        # pprint(db.metadata.tables)
        # db.session.delete(dropped)

        # db.metadata.reflect()
        # pprint(db.get_binds())
        # db.get_engine().execute(text('DROP TABLE IF EXISTS members_0;'))
        # data.reflect(db.get_engine())
        # for meta in data.sorted_tables:
        #     print(str(meta) == tb_name)
        #     if str(meta) == tb_name:
        #         db.get_engine().execute(meta.delete())
        data.tables = data.tables.copy()
        data.tables.pop(tb_name)
        #         data.reflect(db.get_engine())
        db.session.commit()
        #         break
        print(data.tables.get(tb_name))
        # db.metadata.drop_all(bind=db.get_engine())
        # dropped.drop_table()
        print('dropped')
        # db.drop_all()#bind=[tb_name])
        # delete_table(tb_name)
        db.session.commit()
    else:
        print('dropped is none')
    table = type(tb_name, 
          (db.Model,),
          members)
    db.create_all()
    db.session.commit()
    pprint(db.metadata.tables)
    tables[tb_name] = table

    return flask.redirect('/thanks:)/')