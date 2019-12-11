import flask
from api import app
from api.model import db, tables, EventPhase, create_all, add_groups_table, add_members_table, add_choices_table, add_traits_table, drop_table_if_exists
from api.views.accounts import check_username

# Connect c++ modules to python
from algorithm import GroupOrganizer


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
            drop_table_if_exists('groups_{}'.format(event_id))
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
    valid, username = check_username(username)
    if not valid:
        return username

    event = db.session.query(tables['events']).filter_by(id=event_id).one()
    event.phase = EventPhase.review

    add_members_table(event_id)
    create_all()    
    return flask.redirect(flask.url_for('show_organizer_event', username=username, event_id=event_id, stage='review'))

@app.route('/api/v1/organizer/<username>/events/<event_id>/review/', methods = ['GET'])
def get_event_review(username, event_id):
    valid, username = check_username(username)
    if not valid:
        return username

    method = flask.request.method
    event = db.session.query(tables['events']).filter_by(id=event_id).one()
    if method == 'GET':
        return flask.jsonify(**{'name': event.name})
    elif method == 'PATCH':
        return editEventName(event)

@app.route('/api/v1/organizer/<username>/events/<event_id>/review/results/', methods = ['GET'])
def get_event_results(username, event_id):
    print('hello there')
    valid, username = check_username(username)
    if not valid:
        return username

    method = flask.request.method
    event = db.session.query(tables['events']).filter_by(id=event_id).one()
    if method == 'GET':
        return flask.jsonify(**{'name': event.name})
    elif method == 'PATCH':
        return editEventName(event)

@app.route('/api/v1/organizer/<username>/events/<event_id>/review/submit/', methods=['GET'])
def get_groups(username, event_id):
    go = GroupOrganizer()
    # Get all the traits and add them
    trait_list = db.session.query(tables['traits_{}'.format(event_id)]).all()
    trait_ids = []
    for trait in trait_list:
        if not trait.is_constraint:
            continue
        trait_ids.append(trait.id)
        go.addTrait(trait.name, trait.form_type)

    # Get all the leaders and add them
    # currently no leader table - might need to hardcode leaders
    
    # Get all the members and add them
    member_list = db.session.query(tables['members_{}'.format(event_id)]).all()
    counter = 0
    for member in member_list:
        # Construct list of responses
        responses = []
        for id in trait_ids:
            # member.trait_2
            responses.append(getattr(member, 'trait_{}'.format(id)))
        if counter < 3:
            go.addLeader(member.name, responses)
            counter += 1
        else:
            go.addPerson(member.name, responses)

    # Currently hardcoding leaders LOL
    go.printDebug()

    # run the algorithm
    go.runAlgorithm()

    # return all of the groups
    result = go.printGroups()

    # Split the string to return a list of groups
    # First element in each group is the leader
    result = result.split('\n\n')
    dictionary = {}
    list_of_groups = []
    for r in result:
        secondary_dict = {}
        r = r.split('\n')
        leader = r.pop(0)
        if leader == '':
            continue

        secondary_dict['leader'] = leader
        secondary_dict['members'] = r
        list_of_groups.append(secondary_dict)
    dictionary['groups'] = list_of_groups


    # Edit database to drop existing groups table
    # drop_table_if_exists('groups_{}'.format(event_id))
    # add_groups_table(event_id, result)
    # create_all()

    # Add the result to the table
    # groups_table = tables['groups_{}'.event_id]()

    # dictionary maps each leader's name to a list of members
    print(dictionary)
    return flask.jsonify(**dictionary)