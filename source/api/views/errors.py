from api import app
import flask
from api.views.accounts import check_username

@app.errorhandler(404)
def page_not_found(e):
    valid, username = check_username()
    if not valid:
        return username
    return flask.redirect(flask.url_for('show_organizer_home', username=username))