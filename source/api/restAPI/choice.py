import flask
from api import app, model

app.route('/api/organizer/traits/<traid_id>/choices/<choice_id>/',
                    methods=['GET'])
def get_choice():
    """Get Choice."""

    # GET request response.

    context = {
        'traits': [{id: 1}, {id: 2}, {id: 3}]
    }
    return flask.jsonify(**context)