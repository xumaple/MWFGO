import flask
import api

@api.app.route('/api/v1/organizer/traits/',
                    methods=['GET'])
def get_traits():
    """Get Traits."""
    print("hihihihi")
    # GET request response.

    context = {
        'traits': [{'id': 1}, {'id': 2}, {'id': 3}]
    }
    return flask.jsonify(**context)