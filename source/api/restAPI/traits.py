import flask
import api

@api.app.route('/api/v1/organizer/traits/',
                    methods=['GET'])
def get_traits():
    """Get Traits."""
    print("hihihihi")
    # GET request response.

    context = {
        'traits': [{'id': 0}]
    }
    return flask.jsonify(**context)