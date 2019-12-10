from api import app
import flask
from api.views.accounts import check_username

@app.route("/organizer/<username>")
def show_organizer_home(username):
    valid, username = check_username(username)
    if not valid:
        return username
    context = {
        'jsfile': 'organizer_bundle.js',
        'title': 'Organizer',
        'username': username,
    }
    return flask.render_template("organizer_index.html", **context)

# @app.route("/leader/")
# def show_driver():
#     context = {'greeting': 'hello'}
#     return flask.render_template("leader.html", **context)

@app.route("/organizer/<username>/events/<event_id>/<stage>/")
def show_organizer_event(username, event_id, stage):
    print('hiiii', stage)
    VALID_STAGES = [
        'configure', 'review',
    ]
    valid, username = check_username(username)
    if not valid:
        return username
    if stage not in VALID_STAGES:
        return flask.abort(404)
    context = {
        'jsfile': 'event_{}_bundle.js'.format(stage),
        'title': 'Organizer',
        'event_id': event_id,
        'username': username
    }
    return flask.render_template("base.html", **context)
    
@app.route("/member/<event_id>/")
def show_member(event_id):
    context = {'jsfile': 'member_intro_bundle.js', 'username': 'mapleee', 'event_id': event_id}
    return flask.render_template("base.html", **context)

@app.route("/member/<event_id>/<member_id>/")
def show_member_survey(event_id, member_id):
    context = {'jsfile': 'member_bundle.js', 'event_id': event_id, 'hash': member_id}
    return flask.render_template("member.html", **context)

@app.route("/thanks:)/")
def show_thank_you():
    return flask.render_template("thanks.html")
