import flask
import api

@api.app.route('/api/v1/organizer/traits/<int:traitid_url_slug>/',
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
        "name": "Time",
        "isConstraint": False,
        'formType': 2,
    }

    if traitid_url_slug == 2:
        context["name"] = "Location"
        context["id"] = 2
        context["formType"] = 2
        
    if traitid_url_slug == 3:
        context["name"] = "Gender"
        context["id"] = 3
        context["formType"] = 1

    if traitid_url_slug == 1000000000:
        context["name"] = ""
        context["id"] = -1
        context["formType"] = 0

    return flask.jsonify(**context)