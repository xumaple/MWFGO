import flask
from api import app, model

app.route('/api/organizer/traits/<int:traid_id>/choices/<int:choice_id>/',
                    methods=['GET'])
def get_choice():
    """Get Choice."""

    # GET request response.

    context = {
        'name': trait_id + trait_id
    }
    return flask.jsonify(**context)