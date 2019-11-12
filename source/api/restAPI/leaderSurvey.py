import flask
import api

@api.app.route('/api/v1/leader/leaderSurvey/', methods=['GET'])
def get_leaderSurvey():
    """Get leader Survey."""

    context = {
       "traits": [
            {
                "type": 2,
                "name": "Timespan",
                "timeFrame": {
                    "min": -1,
                    "max": -1
                }
            }
        ] 
    }

    return flask.jsonify(**context)
