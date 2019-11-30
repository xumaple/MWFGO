from api import app
import flask
from api.model.utils import generate_salted_hash, login_check
from api.model import db, tables

def check_username():
    """
    Checks that given session is valid.

    If session is valid, returns True and username.
    Else, returns False and flask redirect.
    """
    username = flask.session.get('username')
    if username is None:
        return False, flask.redirect(flask.url_for('show_login'))
    return True, username

@app.route('/accounts/login/', methods=['GET', 'POST'])
def show_login():
    """index.py show function docstring."""
    request = flask.request
    if 'username' in flask.session:
        return flask.redirect('/')

    password_incorrect = False
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if login_check(username, password):
            flask.session['username'] = username
            return flask.redirect('/')
        password_incorrect = True
    context = { 'signup': flask.url_for('show_signup'), 'incorrect': password_incorrect }
    return flask.render_template("login.html", **context)

@app.route("/accounts/signup/", methods=['GET', 'POST'])
def show_signup():
    request = flask.request
    if 'username' in flask.session:
        return flask.redirect('/')
    if request.method == 'POST':

        username = request.form.get('email')
        password = request.form.get('password')
        password_db = generate_salted_hash(password)
        db.session.add(tables['organizers'](username=username, password=password_db))
        db.session.commit()
        # flask.session['username'] = username

        return flask.redirect('/')

    context = { 'login': flask.url_for('show_login') }
    return flask.render_template("signup.html", **context)