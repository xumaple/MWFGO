import flask
import api
import os, sys


@api.app.route('/api/v1/member/', methods = ['GET'])
def get_member_form():
    # Get the list of traits
    # Set member_id
    member_id = None
    # Hit the members table for the list of traits
    # db.session.query(tables["Members_" + event_id]).filter_by(id=member_id).one().__dict__

    # Return the Question and choices for each trait

@api.app.route('/api/v1/member/', methods = ['POST'])
def post_member_form():
    # Create an entry in the members table for this member with all the data
    req_data = flask.request.get_json()
    return flask.make_response("", 201)
