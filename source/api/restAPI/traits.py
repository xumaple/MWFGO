import flask
import api

@api.app.route('/api/v1/organizer/traits/', methods=['GET'])
def get_traits_organizer():
    return get_traits()

@api.app.route('/api/v1/member/traits/', methods=['GET'])
def get_traits_member():
    return get_traits()

@api.app.route('/api/v1/traits/', methods=['GET'])
def get_traits():
    """Get Traits."""
    print("hihihihi")
    # GET request response.

    context = {
        'traits': [0, 1, 2, 3, 5, 10]
    }
    return flask.jsonify(**context)

@api.app.route('/api/v1/organizer/traits/<int:traid_id>/',
                    methods=['GET', 'POST', 'DELETE', 'PATCH'])
def get_trait(traid_id):
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

    if traid_id == 0:
        context["name"] = "Random question"
        context["id"] = 0
        context["formType"] = 3
        context["isConstraint"] = True

    if traid_id == 2:
        context["name"] = "Location"
        context["id"] = 2
        context["formType"] = 2
        context["isConstraint"] = True
        
    if traid_id == 3:
        context["name"] = "Gender"
        context["id"] = 3
        context["formType"] = 1
        context["isConstraint"] = True

    return flask.jsonify(**context)

@api.app.route('/api/v1/member/traits/<int:traid_id>/',
                    methods=['GET', 'POST', 'DELETE', 'PATCH'])
def send_trait(traid_id):
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

    if traid_id == 0:
        context["name"] = "Random question"
        context["id"] = 0
        context["formType"] = 3
        context["isConstraint"] = True

    if traid_id == 2:
        context["name"] = "Location"
        context["id"] = 2
        context["formType"] = 2
        context["isConstraint"] = True
        
    if traid_id == 3:
        context["name"] = "Gender"
        context["id"] = 3
        context["formType"] = 1
        context["isConstraint"] = True

    return flask.jsonify(**context)