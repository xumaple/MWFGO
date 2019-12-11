import flask
import api
import os, sys
from api.model import db, tables
from api.model.utils import HASH_LENGTH, update_row, generate_salted_hash
from api.restAPI.traits import time_frame_helper
from datetime import datetime

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
        answers = []
        for column in columns:
            traitid = column.split("_")[1]
            trait = db.session.query(tables["traits_{}".format(event_id)]).filter_by(id=traitid).one().__dict__
            if trait["form_type"] == 2:
                double_val = person[column]
                if double_val: 
                    answer = time_frame_helper(double_val)
                    answers.append(answer)
                else:
                    answers.append(None)

                
            else:
                answers.append(person[column])
        context = { 
            'name': name,
            'answers': answers 
        }
    else:
        # PATCH
        # Find current entry and update it
        req_data = flask.request.get_json()
        # Get the member id
        member = db.session.query(tables["members_{}".format(event_id)]).filter_by(id=member_id).one()
        # Convert dicts to float
        real_answers = []
        for answer in req_data["answers"]:
            if isinstance(answer, dict):
                context = 0.0
                epoch = datetime.utcfromtimestamp(0)

                if answer:
                    begin_date = answer["begin"]
                    begin_minutes = 0
                    if begin_date:
                        bdt = datetime(begin_date["year"], begin_date["month"], begin_date["day"], begin_date["hour"], begin_date["minute"])
                        begin_minutes = int((bdt - epoch).total_seconds()/60)

                    end_date = answer["end"]
                    end_minutes = 0
                    if end_date:                    
                        edt = datetime(end_date["year"], end_date["month"], end_date["day"], end_date["hour"], end_date["minute"])
                        end_minutes = int((edt - epoch).total_seconds()/60)

                    context = float(str(begin_minutes) + "." + str(end_minutes))
                    real_answers.append(context)
            else:
                real_answers.append(answer)
        col_names = tables["members_{}".format(event_id)].__table__.columns._data.keys()
        # Using data from req_data, update the values of member
        update_row(member, col_names, real_answers)
        db.session.commit()

        context = { 'url': flask.url_for('show_member', event_id=event_id)}

    # Return the answers for each trait
    return flask.jsonify(**context)

