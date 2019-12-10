import flask
from api import app
from api.model import db, tables, EventPhase, create_all, add_members_table, add_choices_table, add_traits_table, drop_table_if_exists
from api.views.accounts import check_username

# Connect c++ modules to python
# from algorithm import GroupOrganizer

@app.route('/api/v1/organizer/<username>/', methods= ['GET', 'POST', 'DELETE'])
def get_events(username):
    valid, username = check_username(username)
    if not valid:
        return username

    events_tb = tables['events']
    method = flask.request.method
    if method == 'GET':
        events = db.session.query(events_tb.id).filter_by(organizer_username=username).all()
        events.sort()
        return flask.jsonify({'events': [e[0] for e in events]})
    elif method == 'POST':
        new_event = events_tb(name='', phase=EventPhase.configure, organizer_username=username)
        db.session.add(new_event)
        db.session.commit()
        event_id = new_event.id
        # TODO add choices and traits tables
        add_choices_table(event_id)
        add_traits_table(event_id)
        create_all()
        return flask.redirect(flask.url_for('show_organizer_event', username=username, event_id=event_id, stage='configure'))
    elif method == 'DELETE':
        event_id = flask.request.get_json().get('id')
        print(flask.request.get_json())
        print(event_id)
        if event_id is not None:
            event = db.session.query(events_tb).filter_by(id=event_id).one()
            db.session.delete(event)
            db.session.commit()
            drop_table_if_exists('choices_{}'.format(event_id))
            drop_table_if_exists('traits_{}'.format(event_id))
        return flask.jsonify('')

@app.route('/api/v1/organizer/<username>/events/<event_id>/', methods = ['GET', 'PATCH'])
def get_event_stage(username, event_id):
    valid, username = check_username(username)
    if not valid:
        return username

    method = flask.request.method
    event = db.session.query(tables['events']).filter_by(id=event_id).one()
    if method == 'GET':
        return flask.jsonify(**{ 'stage': event.phase.name, 'name': event.name })
    elif method == 'PATCH':
        return editEventName(event)

@app.route('/api/v1/organizer/<username>/events/<event_id>/configure/', methods = ['GET', 'PATCH'])
def get_event_configure(username, event_id):
    valid, username = check_username(username)
    if not valid:
        return username

    method = flask.request.method
    event = db.session.query(tables['events']).filter_by(id=event_id).one()
    if method == 'GET':
        return flask.jsonify(**{'name': event.name})
    elif method == 'PATCH':
        return editEventName(event)
        
def editEventName(event):
    form = flask.request.get_json()
    event.name = form.get('name')
    db.session.add(event)
    db.session.commit()
    return ''

@app.route('/api/v1/organizer/<username>/events/<event_id>/configure/submit/', methods = ['GET'])
def create_member_table(username, event_id):
    print('submittingggggg')
    valid, username = check_username(username)
    if not valid:
        return username

    event = db.session.query(tables['events']).filter_by(id=event_id).one()
    event.phase = EventPhase.review

    add_members_table(event_id)
    create_all()

    return flask.redirect('/thanks:)/')

@app.route('/api/v1/organizer/<username>/events/<event_id>/review/', methods = ['GET'])
def get_event_review(username, event_id):
    print('asdfffff')
    valid, username = check_username(username)
    if not valid:
        return username

    method = flask.request.method
    event = db.session.query(tables['events']).filter_by(id=event_id).one()
    if method == 'GET':
        return flask.jsonify(**{'name': event.name})
    elif method == 'PATCH':
        return editEventName(event)