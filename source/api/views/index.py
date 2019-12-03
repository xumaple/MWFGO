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
    print('hi')
    return flask.render_template("base.html", **context)

# @app.route("/leader/")
# def show_driver():
#     context = {'greeting': 'hello'}
#     return flask.render_template("leader.html", **context)

@app.route("/organizer/<username>/events/<event_id>/")
def show_organizer_event(username, event_id):
    valid, username = check_username(username)
    if not valid:
        return username
    context = {
        'jsfile': 'event_bundle.js',
        'title': 'Organizer',
        'event_id': event_id,
        'username': username,
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
def show_thankyou():
    context = {}
    return flask.render_template("thanks.html", **context)
