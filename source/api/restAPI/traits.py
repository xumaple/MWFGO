import flask
import api
import os, sys
from api.model import db, tables, Organizers, Event
#sys.path.insert(0, "/api/model.py")
#from model import db, Traits
#from model import tables

event_id = 0
organizer_id = 0

def get_traits_helper(trait_id):
    """Helper to get traits."""
    # Make a query for Traits where id = trait_id
    query_result = db.session.query(tables["Traits_" + str(event_id)]).filter_by(id=trait_id).one().__dict__

    # If Form is Text Box, we keep value of None
    context = None

    # Form is Multiple Choice
    if query_result['formType'] == 1:
        # Make a query for Choices with trait_id
        form_query = []
        context = []
        for choice in db.session.query(tables["Choices_" + trait_id].name):
            context.append(choice['name'])
        for choice in form_query:
            context.append(choice._asdict()['name'])
    # Form is Time Range TODO
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
        'isConstraint': query_result['is_constraint'],
        'formType': query_result['form_type'],
        'context': context # TODO
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
def delete_traits(trait_id):
    """Delete Traits."""
    # DELETE request response.
    trait = db.session.query(tables["Traits_" + event_id]).filter(tables["Traits_" + event_id].id==trait_id).first()
    db.session.delete(trait)
    db.session.commit()

    return flask.make_response("", 204)


@api.app.route('/api/v1/organizer/traits/<int:trait_id>',
                    methods=['PATCH'])
def patch_traits(trait_id):
    """Patch Traits."""
    # PATCH request response.
    trait = tables["Traits_" + event_id].query.filter_by(id=trait_id).first()
    # Make a query to Traits to update the appropriate information
    trait.name = flask.request.form["name"]
    trait.is_constraint = flask.request.form["isConstraint"]
    trait.form_type = flask.request.form["formType"]
    # If formType == 1, update Choices table
    if flask.request.form["formType"] == 1:
        choices = db.session.query(tables["Choices_" + event_id]).filter(tables["Choices_" + event_id].trait_id==trait_id).all()
        
        # react choices more than or equal to database choices
        if len(flask.request.form["context"]) >= len(choices):
            for i in range(0, len(choices)):
                choices[i].name = flask.request.form["context"][i]
            for i in range(len(choices), len(flask.request.form["context"])):
                choice = tables["Choices_" + event_id](name=flask.request.form["context"][i], trait_id=trait_id)
                db.session.add(choice)
                db.session.commit()

        # react choices less than database choices
        else:
            for i in range(0, len(flask.request.form["context"])):
                choices[i].name = flask.request.form["context"][i] 
            for i in range(len(flask.request.form["context"]), len(choices)):
                choice = choices[i]
                db.session.delete(choice)
                db.session.commit()

    # If formType == 2, update MasterTimeRange table

    return flask.make_response("", 200)


@api.app.route('/api/v1/organizer/traits/<int:trait_id>',
                    methods=['POST'])
def post_traits(trait_id):
    """Post Traits."""
    # POST request response.
    trait = tables["Traits_" + event_id](id=trait_id)
    db.session.add(trait)
    db.session.commit()

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
