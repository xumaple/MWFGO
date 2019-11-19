from api import app
import flask
# from api.model import hello_world

@app.route("/")
def show_index():
    # mysql_result = False
    # query_string = text("SELECT 1")
    # # TODO REMOVE FOLLOWING LINE AFTER TESTING COMPLETE.
    # db.session.query("1").from_statement(query_string).all()
    # try:
    #     if db.session.query("1").from_statement(query_string).all():
    #         mysql_result = True
    # except:
    #     pass


    # Return the page with the result.
    # context = {'greeting': 'hello world'}
    # return 'hello world'#render_template(**context)
    # frank = hello_world()
    context = {'greeting': 'hello'}
    return flask.render_template("index.html", **context)



@app.route("/leader/")
def show_driver():
    context = {'greeting': 'hello'}
    return flask.render_template("leader.html", **context)

@app.route("/organizer/")
def show_organizer():
    context = {'greeting': 'hello'}
    return flask.render_template("organizer.html", **context)
    
@app.route("/member/")
def show_member():
    context = {'jsfile': 'member_intro_bundle.js'}
    return flask.render_template("member.html", **context)

@app.route("/member/<member_id>/")
def show_member_survey(member_id):
    context = {'jsfile': 'member_bundle.js', 'hash': member_id}
    return flask.render_template("member.html", **context)

