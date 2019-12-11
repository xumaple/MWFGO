import flask
from api import app
from api.model import db, tables
from api.views.accounts import check_username
from api.restAPI.traits import member_get_trait
from api.restAPI.memberSurvey import get_member_form


@app.route('/api/v1/organizer/<username>/events/<event_id>/review/results/', methods= ['GET'])
def get_results(username, event_id):
    valid, username = check_username(username)
    if not valid:
        return username

    members = db.session.query(tables['members_{}'.format(event_id)].id).all()
    traits = db.session.query(tables['traits_{}'.format(event_id)].id).all()

    context = { 
        'members': [m[0] for m in members],
        'traits': [t[0] for t in traits],
    }
    print(context)
    return flask.jsonify(**context)

@app.route('/api/v1/organizer/<username>/events/<event_id>/review/results/<member_id>/', methods= ['GET', 'DELETE'])
def get_results_member(username, event_id, member_id):
    valid, username = check_username(username)
    if not valid:
        return username
    return get_member_form(event_id, member_id)
    # member = db.session.query(tables['members_{}'.format(event_id)]).filter_by(id=member_id).one()
    # return flask.jsonify(**{'answers': getattr(member, 'trait_'.format(trait_id)) })

@app.route('/api/v1/organizer/<username>/events/<event_id>/review/results/label/<trait_id>/', methods= ['GET'])
def get_trait_label(username, event_id, trait_id):
    valid, username = check_username(username)
    if not valid:
        return username
    name = db.session.query(tables['traits_{}'.format(event_id)].name).filter_by(id=trait_id).one()[0]
    print(name)
    return flask.jsonify(**{'label': name})

@app.route('/api/v1/organizer/<username>/events/<event_id>/review/results/<member_id>/<trait_id>/', methods= ['GET'])
def get_trait_results_member(username, event_id, member_id, trait_id):
    valid, username = check_username(username)
    if not valid:
        return username

    return member_get_trait(event_id, member_id, trait_id)