import flask
import api

@api.app.route('/restAPI/member/memberSurvey/', methods=['GET'])
def get_memberSurvey():
    """Get Member Survey."""

    context = {
       "traits": [
            {
                "type": 2,
                "name": "Timespan",
                "timeFrame": {
                    "min": 2,
                    "max": 4
                }
            }
        ] 
    }

    return flask.jsonify(**context)
