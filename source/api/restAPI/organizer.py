import flask
from api import app
from api.model import db, tables, create_all, add_members_table, add_choices_table, add_traits_table
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
        return flask.jsonify({'events': events})
    elif method == 'POST':
        new_event = events_tb(name='', organizer_username=username)
        db.session.add(new_event)
        db.session.commit()
        event_id = new_event.id
        # TODO add choices and traits tables
        add_choices_table(event_id)
        add_traits_table(event_id)
        create_all()
        return flask.redirect(flask.url_for('show_organizer_event', username=username, event_id=event_id))
    elif method == 'DELETE':
        event_id = flask.request.get_json().get('id')
        if event_id is not None:
            event = db.session.query(event_tb).filter_by(id=event_id).one()
            db.session.delete(event)
            db.session.commit()

@app.route('/api/v1/organizer/<username>/events/<event_id>/', methods = ['GET', 'PATCH'])
def get_event(username, event_id):
    valid, username = check_username(username)
    if not valid:
        return username

    method = flask.request.method
    events_tb = tables['events']
    query_result = db.session.query(events_tb).filter_by(id=event_id).one()
    if method == 'GET':
        return flask.jsonify(**{'name': query_result.name})
    elif method == 'PATCH':
        form = flask.request.get_json()
        query_result.name = form.get('name')
        db.session.add(query_result)
        db.session.commit()
        return ''

@app.route('/api/v1/organizer/<username>/events/<event_id>/submit/', methods = ['GET'])
def create_member_table(event_id):
    valid, username = check_username(username)
    if not valid:
        return username

    add_members_table(event_id)
    create_all()

    return flask.redirect('/thanks:)/')