from api import app
import flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text

# Configure MySQL connection to Flask app
# db = SQLAlchemy()
# db_uri = 'mysql://root:supersecure@db/information_schema'
# app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db.init_app(app)

@app.route("/")
def show_index():
#     mysql_result = False
#     query_string = text("SELECT 1")
#     # TODO REMOVE FOLLOWING LINE AFTER TESTING COMPLETE.
#     db.session.query("1").from_statement(query_string).all()
#     try:
#         if db.session.query("1").from_statement(query_string).all():
#             mysql_result = True
#     except:
#         pass


#     # Return the page with the result.
#     context = {'greeting': 'hello world'}
#     return 'hello world'#render_template(**context)
    #frank = hello_world()
    context = {'greeting': 'hello'}
    return flask.render_template("index.html", **context)


@app.route("/templates/member/")
def show_member():
    context = {'greeting': 'hello'}
    return flask.render_template("member/index.html", **context)

@app.route("/templates/driver/")
def show_driver():
    context = {'greeting': 'hello'}
    return flask.render_template("driver/index.html", **context)

@app.route("/templates/organizer/")
def show_organizer():
    context = {'greeting': 'hello'}
    return flask.render_template("organizer/index.html", **context)

@app.route("/templates/test/")
def show_test():
    context = {'greeting': 'hello'}
    return flask.render_template("test/index.html", **context)
