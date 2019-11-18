import flask
import api
import os, sys

@api.app.route('/api/v1/member/', methods=['POST'])
def add_member():
    # Get the string for the name

    # Hash the name
    hashed_name = None

    # Return the url
    res = {
        'newUrl': '/api/v1/member/' + hashed_name
    }

    return flask.jsonify(**res)

@api.app.route('/api/v1/member/<string:hashed_name>', methods = ['GET'])
def get_member_form(hashed_name):
    # Get the list of traits

    # Return the Question and choices for each trait

@api.app.route('/api/v1/member/<string:hashed_name>', methods = ['POST'])
def post_member_form(hashed_name):
    # Create an entry in the members table for this member with all the data
    return flask.make_response("", 201)

@api.app.route('/api/v1/member/<string:hashed_name>', methods = ['PATCH'])
def patch_member_form(hashed_name):
    # Depending on what the user changed, change the according value in the table
    return flask.make_response("", 200)