"""Rest API."""
import flask
# application is not defined as of now!
import app 

@app.route('/api/result/', methods=["GET"])
def get_result():
    # Get the limiters
    limiters = getQuery("SELECT * FROM limiters", ())

    # Get the leaders and constraints
    leaders = getQuery("SELECT * FROM leaders", ())
    l_constraints = []
    for l in leaders:
        l_constraints.append(getQuery("SELECT * FROM constrains WHERE person=?", (l['name'],)))

    # Get the list of people to be organized and constraints
    people = getQuery("SELECT * FROM people", ())
    p_constraints = []
    for p in people:
        p_constraints.append(getQuery("SELECT * FROM constrains WHERE person=?", (p['name'],)))

    context = {
            'limiters': limiters,
            'leaders': leaders,
            'leader_constraints': l_constraints,
            'people': people,
            'people_constraints': p_constraints
            }

    return flask.jsonify(**context)

