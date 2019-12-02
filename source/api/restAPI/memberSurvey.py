import flask
import api
import os, sys
from api.model import db, tables
from api.model.utils import update_row, generate_salted_hash

HASH_LENGTH = 16

event_id = '0'

@api.app.route('/api/v1/member/', methods = ['GET'])
def get_member_form():
    # Set member_id (fix with correct data later) TODO
    hash = flask.request.args.get('hash')
    print(hash)
    import pprint
    pprint.pprint(tables)
    if hash is None:
        result = { 'open': True }
    else:
        # Hit the members table for the list of traits
        person =  db.session.query(tables["members_{}".format(event_id)]).filter_by(id=hash).one().__dict__
        name = person['name']
        columns = [column.name for column in tables['members_{}'.format(event_id)].__table__.columns][2:]
        context = { 'name': name,
                    'answers': [person[column] for column in columns] }
        return flask.jsonify(**context)

    # Return the answers for each trait
    pprint.pprint(result)
    return flask.jsonify(**result)

@api.app.route('/api/v1/member/', methods = ['POST'])
def post_member_form():
    # Create an entry in the members table for this member with all the data
    req_data = flask.request.get_json()

    members_tb = tables['members_{}'.format(event_id)]
    # Add a new member 
    name = req_data['name']
    hashed_name = generate_salted_hash(name, include_salt=False)[0:HASHLENGTH]
    new_mem = members_tb(id=hashed_name, name=name)
    db.session.add(new_mem)
    db.session.commit()
    # Redirect to new member's url
    
    return flask.redirect('/member/' + hashed_name + '/')

@api.app.route('/api/v1/member/', methods = ['PATCH'])
def patch_member_form():
    # Find current entry and update it
    req_data = flask.request.get_json()
    # Get the member id
    member_id = req_data['hash']
    member = db.session.query(tables["members_{}".format(event_id)]).filter_by(id=member_id).one()

    col_names = tables["members_{}".format(event_id)].__table__.columns._data.keys()
    # Using data from req_data, update the values of member
    update_row(member, col_names, req_data['answers'])
    db.session.commit()

    result = { 'url': flask.url_for('show_member')}
    return flask.jsonify(**result)
    # return flask.redirect(flask.url_for('show_thankyou'))