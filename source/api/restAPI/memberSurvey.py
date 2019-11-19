import flask
import api
import os, sys


@api.app.route('/api/v1/member/', methods = ['GET'])
def get_member_form():
    req_data = flask.request.get_json()
    # Get the list of traits
    # Set member_id (fix with correct data later)
    member_id = req_data['hash']
    # Hit the members table for the list of traits
    result =  db.session.query(tables["Members_" + event_id]).filter_by(id=member_id).one().__dict__

    # Hit the results table for the questions and choices
    questions = list(db.session.query(tables["Traits_" + event_id]))

    # Find some way to combine the questions with the appropriate answers from the member
    
    # Return the Question and choices for each trait
    flask.jsonify(**result)

@api.app.route('/api/v1/member/', methods = ['POST'])
def post_member_form():
    # Create an entry in the members table for this member with all the data
    req_data = flask.request.get_json()

    # new_mem = Members(add arguments in here )
    # db.session.add(new_mem)
    # db.session.commit()

    return flask.make_response("", 201)
