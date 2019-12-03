from api import app
import flask
from api.model.utils import generate_salted_hash, get_hashed_text
from api.model import db, tables

def check_username(given_user=None):
    """
    Checks that given session is valid.

    If session is valid, returns True and username.
    Else, returns False and flask redirect.
    """
    username = flask.session.get('username')
    if given_user is not None and username != given_user:
        flask.session['username'] = None
        username = None
    if username is None:
        return False, flask.redirect(flask.url_for('show_login'))
    return True, username

def login_check(username, password):
    """Checks that login username and password are correct."""
    user_pw = db.session.query(tables['organizers'].password).filter_by(username=username)
    if user_pw.scalar() is None:
        return False
    split_list = user_pw.one().password.split('$')
    salt = split_list[1]
    password_hashed = split_list[2]
    return get_hashed_text(salt, password) == password_hashed

@app.route('/accounts/login/', methods=['GET', 'POST'])
def show_login():
    """index.py show function docstring."""
    request = flask.request
    username = flask.session.get('username')
    if username is not None:
        return flask.redirect(flask.url_for('show_organizer_home', username=username))

    password_incorrect = False
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if login_check(username, password):
            flask.session['username'] = username
            return flask.redirect(flask.url_for('show_organizer_home', username=username))
        password_incorrect = True
    context = { 'signup': flask.url_for('show_signup'), 'incorrect': password_incorrect }
    return flask.render_template("login.html", **context)

@app.route("/accounts/signup/", methods=['GET', 'POST'])
def show_signup():
    request = flask.request
    username = flask.session.get('username')
    if username is not None:
        return flask.redirect(flask.url_for('show_organizer_home', username=username))
    if request.method == 'POST':

        username = request.form.get('email')
        password = request.form.get('password')
        password_db = generate_salted_hash(password)
        db.session.add(tables['organizers'](username=username, password=password_db))
        db.session.commit()
        # flask.session['username'] = username

        return flask.redirect(flask.url_for('show_organizer_home', username=username))

    context = { 'login': flask.url_for('show_login') }
    return flask.render_template("signup.html", **context)