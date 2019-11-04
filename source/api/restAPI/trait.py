import flask
import api

@api.app.route('/restAPI/organizer/traits/<int:traitid_url_slug>/',
                    methods=['GET', 'POST', 'DELETE', 'PATCH'])
def get_trait(traitid_url_slug):
    """Get Trait."""
    print("hello im here")
    # Get POST request.
    if flask.request.method == 'POST':

        context = {
            "name": "Frank",
            "isConstraint": False,
            "formType": 2,
        }
        return flask.jsonify(**context), 201
    
    # Get DELETE request.
    if flask.request.method == 'DELETE':

        context = {
        }
        return flask.jsonify(**context), 204

    # Get PATCH request.
    if flask.request.method == 'PATCH':

        context = {
            "name": "Frank",
            "isConstraint": False,
            "formType": 2,
        }
        return flask.jsonify(**context), 204

    # GET request response.

    context = {
        "id": 1,
        "name": "Maple Xu",
        "isConstraint": False,
        'formType': 2,
    }
    return flask.jsonify(**context)