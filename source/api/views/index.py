from api import app
import flask
from api.views.accounts import check_username

@app.route("/")
def show_index():
    valid, username = check_username()
    if not valid:
        return username
    context = {'jsfile': 'member_intro_bundle.js', 'username': 'username'}
    return flask.render_template("index.html")


@app.route("/leader/")
def show_driver():
    context = {'greeting': 'hello'}
    return flask.render_template("leader.html")

@app.route("/organizer/")
def show_organizer():
    valid, username = check_username()
    if not valid:
        return username
    context = {'greeting': 'hello'}
    return flask.render_template("organizer.html")
    
@app.route("/member/")
def show_member():
    context = {'jsfile': 'member_intro_bundle.js', 'username': 'mapleee'}
    return flask.render_template("member.html", **context)

@app.route("/member/<member_id>/")
def show_member_survey(member_id):
    context = {'jsfile': 'member_bundle.js', 'hash': member_id}
    return flask.render_template("member.html", **context)

@app.route("/thanks:)/")
def show_thankyou():
    context = {}
    return flask.render_template("thanks.html", **context)
