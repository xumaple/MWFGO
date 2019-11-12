import flask
import api
from pprint import pprint

@api.app.route('/api/v1/member/memberSurvey/', methods=['GET'])
def get_memberSurvey():
    """Get Member Survey."""

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

@api.app.route('/api/v1/member/', methods=['POST'])
def get_member_url():
    """Get Member Survey."""
    form = flask.request.get_json()
    name = form['name']
    
    print(form)


    return flask.redirect('/member/{}/'.format(name))

