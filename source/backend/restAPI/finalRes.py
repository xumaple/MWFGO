"""Rest API."""
import flask
# application is not defined as of now!
import app 

@app.route('/api/result/', methods=["GET"])
def get_result():
    # Get the limiters
    limiters = getQuery("SELECT * FROM limiters")

    # Get the leaders
    leaders = getQuery("SELECT * FROM leaders")

    # Get the list of people to be organized
    people = getQuery("SELECT * FROM people")

    # Get the list of constraints
    constraints = getQuery("SELECT * FROM constraints")

    context = {
            'limiters': limiters,
            'leaders': leaders,
            'people': people,
            'constraints': constraints
            }

    return flask.jsonify(**context)

