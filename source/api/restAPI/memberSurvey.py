import flask
import api
import os, sys
from api.model import db, tables
from api.model.utils import HASH_LENGTH, update_row, generate_salted_hash

@api.app.route('/api/v1/member/<event_id>/', methods = ['GET', 'POST'])
def post_member_form(event_id):
    # Create an entry in the members table for this member with all the data
    if flask.request.method == 'GET':
        return flask.jsonify(**{
            'open': tables.get('members_{}'.format(event_id)) is not None
        })
    req_data = flask.request.get_json()
    members_tb = tables['members_{}'.format(event_id)]
    # Add a new member 
    name = req_data['name']
    hashed_name = generate_salted_hash(name, include_salt=False)[0:HASH_LENGTH]
    new_mem = members_tb(id=hashed_name, name=name)
    db.session.add(new_mem)
    db.session.commit()
    # Redirect to new member's url
    
    return flask.redirect(flask.url_for('show_member_survey', event_id=event_id, member_id=hashed_name))

@api.app.route('/api/v1/member/<event_id>/<member_id>/', methods = ['GET', 'PATCH'])
def get_member_form(event_id, member_id):
    if flask.request.method == 'GET':
        # Hit the members table for the list of traits
        person =  db.session.query(tables["members_{}".format(event_id)]).filter_by(id=member_id).one().__dict__
        name = person['name']
        columns = [column.name for column in tables['members_{}'.format(event_id)].__table__.columns][2:]
        context = { 
            'name': name,
            'answers': [person[column] for column in columns] 
        }
    else:
        # PATCH
        # Find current entry and update it
        req_data = flask.request.get_json()
        # Get the member id
        member = db.session.query(tables["members_{}".format(event_id)]).filter_by(id=member_id).one()

        col_names = tables["members_{}".format(event_id)].__table__.columns._data.keys()
        # Using data from req_data, update the values of member
        update_row(member, col_names, req_data['answers'])
        db.session.commit()

        context = { 'url': flask.url_for('show_member', event_id=event_id)}

    # Return the answers for each trait
    return flask.jsonify(**context)

