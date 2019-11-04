import flask
from api import app, model

app.route('/api/organizer/traits/<traid_id>/choices/>',
                    methods=['GET'])
def get_choices():
    """Get Choices."""

    # GET request response.

    context = {
        'traits': [{id: 1}, {id: 2}, {id: 3}]
    }
    return flask.jsonify(**context)