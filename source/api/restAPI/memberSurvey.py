import flask
import api
import os, sys
from api.model.model import db, tables, Organizers, Event, Members
from api.model.utils import update_row


@api.app.route('/api/v1/member/', methods = ['GET'])
def get_member_form():
    req_data = flask.request.get_json()
    # Set member_id (fix with correct data later)
    member_id = req_data['hash']
    # Hit the members table for the list of traits
    result =  db.session.query(tables["Members"]).filter_by(id=member_id).one().__dict__
    
    # Return the answers for each trait
    flask.jsonify(**result)

@api.app.route('/api/v1/member/', methods = ['POST'])
def post_member_form():
    # Create an entry in the members table for this member with all the data
    req_data = flask.request.get_json()

    # Add a new member 
    hashed_name = req_data['name'] # As of right now does not hash name
    new_mem = Members(id=hashed_name, name=req_data['name'])
    db.session.add(new_mem)
    db.session.commit()
    # Redirect to new member's url
    flask.redirect('/member/' + hashed_name + '/')

    return flask.make_response("", 201)

@api.app.route('/api/v1/member/', methods = ['PATCH'])
def patch_member_form():
    # Find current entry and update it
    req_data = flask.request.get_json()
    # Get the member id
    member_id = req_data['hash']
    member = db.session.query(tables["Members"]).filter_by(id=member_id).one().__dict__

    col_names = tables["Members"].__table__.columns._data.keys()
    # Using data from req_data, update the values of member
    update_row(member, col_names, req_data['answers'])
    db.session.commit()

    return flask.make_response("", 201)