import flask
import api
import os, sys
#sys.path.insert(0, "/api/model.py")
#from model import db, Traits
#from model import tables

def get_traits_helper(trait_id):
    """Helper to get traits."""
    # Make a query for Traits where id = trait_id
    query_result = {} # TODO: db.session.query(tables["Traits_" + event_id]).filter_by(id=trait_id).one().__dict__

    # If Form is Text Box, we keep value of None
    context = None

    # Form is Multiple Choice
    if query_result['formType'] == 1:
        # Make a query for Choices with trait_id
        form_query = []
        context = []
        # TODO:
        # for choice in db.session.query(tables["Choices_" + trait_id].name):
        #     context.append(choice['name'])
        for choice in form_query:
            context.append(choice['name'])
    # Form is Time Range
    elif query_result['formType'] == 2:
        # Make a query for MasterTimeRange with trait_id
        p, q = repr(query_result["context"]).split('.')
        begin = int(p)
        end = int(q)
        context = {
            'begin': begin,
            'end': end
        }

    # Set id, name, isConstraint, formType, and context object
    res = {
        'id': query_result['id'],
        'name': query_result['name'],
        'question': query_result['question'],
        'isConstraint': query_result['isConstraint'],
        'formType': query_result['formType'],
        'context': context
    }
    
    return res

@api.app.route('/api/v1/organizer/traits/<int:trait_id>',
                    methods=['GET'])
def get_traits(trait_id):
    """Get Traits."""
    # GET request response.
    res = get_traits_helper(trait_id)

    return flask.jsonify(**res)

@api.app.route('/api/v1/organizer/traits/<int:trait_id>',
                    methods=['DELETE'])
def delete_traits():
    """Delete Traits."""
    # DELETE request response.

    # Make a query to Traits to delete trait_id

    return flask.make_response("", 204)


@api.app.route('/api/v1/organizer/traits/<int:trait_id>',
                    methods=['PATCH'])
def patch_traits():
    """Patch Traits."""
    # PATCH request response.

    # Make a query to Traits to update the appropriate information

    # If formType == 1, update Choices table

    # If formType == 2, update MasterTimeRange table

    return flask.make_response("", 200)


@api.app.route('/api/v1/organizer/traits/<int:trait_id>',
                    methods=['POST'])
def post_traits():
    """Post Traits."""
    # POST request response.

    # Make a query to add a new entry to Traits (default values)

    return flask.make_response("", 201)


@api.app.route('/api/v1/member/traits/<int:trait_id>',
                    methods=['GET'])
def member_get_traits(trait_id):
    """Get Traits."""
    res = get_traits_helper(trait_id)
    del res['isConstraint']

    return flask.jsonify(**res)


@api.app.route('/api/v1/organizer/traits/', methods=['GET'])
@api.app.route('/api/v1/member/traits/', methods=['GET'])
@api.app.route('/api/v1/traits/', methods=['GET'])
def get_trait_id():
    """Get Trait ids."""
    # Make a query to get all the traits
    query_res = []
    trait_ids = []
    for trait in query_res:
        trait_ids.append(trait['id'])

    res = {
        'traits': trait_ids
    }

    return flask.jsonify(**res) 
