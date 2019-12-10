import flask
import api
import os, sys
from api.model import db, tables
from api.views.accounts import check_username
from datetime import datetime

#sys.path.insert(0, "/api/model.py")
#from model import db, Traits
#from model import tables

def get_trait_helper(event_id, trait_id):
    """Helper to get traits."""
    # Make a query for Traits where id = trait_id
    query_result = db.session.query(tables['traits_{}'.format(event_id)]).filter_by(id=trait_id).one().__dict__

    # If Form is Text Box, we keep value of None
    context = None
    # Form is Multiple Choice
    form_type = query_result['form_type']
    if form_type == 1:
        context = []
        for choice in db.session.query(tables['choices_{}'.format(event_id)]).filter_by(trait_id=trait_id).all():
            context.append(choice.name)
    # Form is Time Range TODO
    elif form_type == 2:
        context = {}
        # Make a query for MasterTimeRange with trait_id
        trait = db.session.query(tables['traits_{}'.format(event_id)]).filter_by(id=trait_id).first()
        if trait.context != None and trait.context >= 0:
            time_range = str(trait.context).split('.')
            begin_date_time = int(time_range[0])

            tmp_str = time_range[1]
            if len(tmp_str) < 8:
                for i in range(0, 8 - len(tmp_str)):
                    tmp_str = tmp_str + "0"

            end_date_time = int(tmp_str)
            begin_dt = datetime.fromtimestamp(begin_date_time*60)
            end_dt = datetime.fromtimestamp(end_date_time*60)

            begin = {}
            begin["year"] = begin_dt.year
            begin["month"] = begin_dt.month
            begin["day"] = begin_dt.day
            begin["hour"] = begin_dt.hour
            begin["minute"] = begin_dt.minute

            end = {}
            end["year"] = end_dt.year
            end["month"] = end_dt.month
            end["day"] = end_dt.day
            end["hour"] = end_dt.hour
            end["minute"] = end_dt.minute

            context["begin"] = begin
            context["end"] = end
        # context["begin"] = {
        #     "year": 2019,
        #     "month": 11,
        #     "day": 20,
        #     "hour": 12,
        #     "minute": 23
        # }
        # context["end"] = {
        #     "year": 2020,
        #     "month": 11,
        #     "day": 20,
        #     "hour": 12,
        #     "minute": 23
        # }       

    # Set id, name, isConstraint, formType, and context object
    return {
        'id': query_result['id'],
        'name': query_result['name'],
        'question': query_result['question'],
        'isConstraint': query_result['is_constraint'],
        'formType': query_result['form_type'],
        'context': context # TODO
    }

@api.app.route('/api/v1/organizer/<username>/events/<event_id>/configure/traits/<trait_id>/',
                    methods=['GET', 'PATCH', 'DELETE'])
def get_trait(username, event_id, trait_id):
    """Work with traits."""

    valid, username = check_username(username)
    if not valid:
        return username
    method = flask.request.method
    if method == 'GET':
        # GET request response.
        return flask.jsonify(**get_trait_helper(event_id, trait_id))
        
    elif method == 'PATCH':
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

        # If formType == 2, update MasterTimeRange table
        if form["formType"] == 2:
            epoch = datetime.utcfromtimestamp(0)

            begin_date = form["context"]["begin"]
            bdt = datetime(begin_date["year"], begin_date["month"], begin_date["day"], begin_date["hour"], begin_date["minute"])
            begin_minutes = int((bdt - epoch).total_seconds()/60)

            end_date = form["context"]["end"]
            edt = datetime(end_date["year"], end_date["month"], end_date["day"], end_date["hour"], end_date["minute"])
            end_minutes = int((edt - epoch).total_seconds()/60)
            context = float(str(begin_minutes) + "." + str(end_minutes))
            trait.context = context
        db.session.commit()

        return flask.jsonify("", 200)

    elif method == 'DELETE':
        tb = tables['traits_{}'.format(event_id)]
        trait = db.session.query(tb).filter(tb.id==trait_id).first()
        db.session.delete(trait)
        db.session.commit()

        return flask.jsonify("", 204)


@api.app.route('/api/v1/organizer/<username>/events/<event_id>/configure/traits/', methods=['GET', 'POST'])
def get_traits(username, event_id):
    valid, username = check_username(username)
    if not valid:
        return username
    method = flask.request.method
    if method == 'GET':
        return get_trait_ids(event_id)
    elif method == 'POST':
        trait = tables['traits_{}'.format(event_id)]()
        db.session.add(trait)
        db.session.commit()
        return flask.jsonify(**{'id': trait.id})


@api.app.route('/api/v1/member/<event_id>/<member_id>/traits/<trait_id>/',
                    methods=['GET'])
def member_get_trait(event_id, member_id, trait_id):
    """Get Traits."""
    res = get_trait_helper(event_id, trait_id)
    del res['isConstraint']

    return flask.jsonify(**res)


# @api.app.route('/api/v1/organizer/<event_id>/configure/traits/', methods=['GET'])
@api.app.route('/api/v1/member/<event_id>/<member_id>/traits/', methods=['GET'])
# @api.app.route('/api/v1/<event_id>/traits/', methods=['GET'])
def get_trait_ids(event_id, member_id=None):
    """Get Trait ids."""
    # Make a query to get all the traits
    query_res = db.session.query(tables['traits_{}'.format(event_id)].id).all()
    trait_ids = [trait[0] for trait in query_res]
    trait_ids.sort()

    res = {
        'traits': trait_ids
    }

    return flask.jsonify(**res) 
