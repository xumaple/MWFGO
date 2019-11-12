import flask
import api

@api.app.route('/api/organizer/traits/<int:trait_id>',
                    methods=['GET'])
def get_traits(trait_id):
    """Get Traits."""
    # GET request response.

    # Make a query for Traits where id = trait_id
    query_result = {}

    # If Form is Text Box, we keep value of None
    context = None

    # Form is Multiple Choice
    if query_result['formType'] == 1:
        # Make a query for Choices with trait_id
        form_query = []
        context = []
        for choice in form_query:
            context.append(choice['name'])
    # Form is Time Range
    elif query_result['formType'] == 2:
        # Make a query for MasterTimeRange with trait_id
        form_query = {}
        context = {
            'begin': form_query['begin'],
            'end': form_query['end']
        }

    # Set id, name, isConstraint, formType, and context object
    res = {
        'id': query_result['id'],
        'name': query_result['name'],
        'question': query_result['question'],
        'isConstraint': query_result['isConstraint'],
        'formType': query_result['formType'],
        'context': context
    }
    
    return flask.jsonify(**res)


@api.app.route('/api/organizer/traits/<int:trait_id>',
                    methods=['DELETE'])
def delete_traits():
    """Delete Traits."""
    # DELETE request response.

    # Make a query to Traits to delete trait_id

    return flask.make_response("", 204)


@api.app.route('/api/organizer/traits/<int:trait_id>',
                    methods=['PATCH'])
def patch_traits():
    """Patch Traits."""
    # PATCH request response.

    context = {
        'traits': [{id: 1}, {id: 2}, {id: 3}]
    }
    return flask.jsonify(**context)


@api.app.route('/api/organizer/traits/<int:trait_id>',
                    methods=['POST'])
def post_traits():
    """Post Traits."""
    # POST request response.

    # Make a query to add a new entry to Traits (default values)

    return flask.make_response("", 201)
