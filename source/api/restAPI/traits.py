import flask
import api

@api.app.route('/restAPI/organizer/traits/',
                    methods=['GET'])
def get_traits():
    """Get Traits."""

    # GET request response.

    context = {
        'traits': [{id: 1}, {id: 2}, {id: 3}]
    }
    return flask.jsonify(**context)