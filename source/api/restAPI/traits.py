import flask
import api
import os, sys
from api.model import db, tables, Organizers, Event
#sys.path.insert(0, "/api/model.py")
#from model import db, Traits
#from model import tables

event_id = '0'
organizer_id = '0'

def get_trait_helper(trait_id):
    """Helper to get traits."""
    # Make a query for Traits where id = trait_id
    query_result = db.session.query(tables['traits_{}'.format(event_id)]).filter_by(id=trait_id).one().__dict__

    # If Form is Text Box, we keep value of None
    context = None

    # Form is Multiple Choice
    form_type = query_result.get('formType')
    if form_type == 1:
        # Make a query for Choices with trait_id
        # form_query = []
        context = []
        for choice in db.session.query(tables['choices_{}'.format(event_id)]).filter_by(trait_id=trait_id).all():
            context.append(choice.name)
        # for choice in form_query:
        #     context.append(choice._asdict()['name'])
    # Form is Time Range TODO
    elif form_type == 2:
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

@api.app.route('/api/v1/organizer/traits/<int:trait_id>/',
                    methods=['GET'])
def get_trait(trait_id):
    """Get Traits."""
    # GET request response.
    res = get_trait_helper(trait_id)

    return flask.jsonify(**res)

@api.app.route('/api/v1/organizer/traits/<int:trait_id>/',
                    methods=['DELETE'])
def delete_trait(trait_id):
    """Delete Traits."""
    # DELETE request response.
    tb = tables['traits_{}'.format(event_id)]
    trait = db.session.query(tb).filter(tb.id==trait_id).first()
    db.session.delete(trait)
    db.session.commit()

    return flask.make_response("", 204)


@api.app.route('/api/v1/organizer/traits/<int:trait_id>/',
                    methods=['PATCH'])
def patch_trait(trait_id):
    """Patch Traits."""
    # PATCH request response.
    trait = tables['traits_{}'.format(event_id)].query.filter_by(id=trait_id).first()
    # Make a query to Traits to update the appropriate information
    form = flask.request.get_json()
    trait.name = form["name"]
    trait.question = form["question"]
    trait.is_constraint = form["isConstraint"]
    trait.form_type = form["formType"]
    # If formType == 1, update Choices table
    if form["formType"] == 1:
        choices = db.session.query(tables['choices_{}'.format(event_id)]).filter(tables['choices_{}'.format(event_id)].trait_id==trait_id).all()
        
        # react choices more than or equal to database choices
        if len(form["context"]) >= len(choices):
            for i in range(0, len(choices)):
                choices[i].name = form["context"][i]
            for i in range(len(choices), len(form["context"])):
                choice = tables['choices_{}'.format(event_id)](name=form["context"][i], trait_id=trait_id)
                db.session.add(choice)

        # react choices less than database choices
        else:
            for i in range(0, len(form["context"])):
                choices[i].name = form["context"][i] 
            for i in range(len(form["context"]), len(choices)):
                choice = choices[i]
                db.session.delete(choice)
    db.session.commit()
    # If formType == 2, update MasterTimeRange table

    return flask.make_response("", 200)


@api.app.route('/api/v1/organizer/traits/<int:trait_id>/',
                    methods=['POST'])
def post_trait():
    """Post Traits."""
    # POST request response.
    trait = tables['traits_{}'.format(event_id)]()
    db.session.add(trait)
    db.session.flush()
    db.session.commit()

    res = {
        'id': trait.id
    }

    return flask.make_response(**res)


@api.app.route('/api/v1/member/traits/<int:trait_id>/',
                    methods=['GET'])
def member_get_trait(trait_id):
    """Get Traits."""
    res = get_trait_helper(trait_id)
    del res['isConstraint']

    return flask.jsonify(**res)


@api.app.route('/api/v1/organizer/traits/', methods=['GET'])
@api.app.route('/api/v1/member/traits/', methods=['GET'])
@api.app.route('/api/v1/traits/', methods=['GET'])
def get_trait_id():
    """Get Trait ids."""
    # Make a query to get all the traits
    query_res = db.session.query(tables['traits_{}'.format(event_id)].id).all()
    trait_ids = []
    for trait in query_res:
        trait_ids.append(trait[0])
    trait_ids.sort()
    print(trait_ids)

    res = {
        'traits': trait_ids
    }

    return flask.jsonify(**res) 
