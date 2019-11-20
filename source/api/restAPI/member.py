# import flask
# import api
# from pprint import pprint
# from api.model import db, tables

# event_id = '0'

# @api.app.route('/api/v1/member/', methods=['GET', 'POST', 'PATCH'])
# def get_member_answers():
#     """Get Member Survey."""
#     form = flask.request.get_json()

#     if flask.request.method == 'GET':
#         person = db.session.query(tables['members_0']).filter_by(id=form['hash']).first().__dict__
#         answers = []
#         columns = []
#         for column in tables['members_{}'.format(event_id)].__table__.columns:
#             columns.append(column.name)
#         del columns[0]
#         del columns[0]
#         for column in columns:
#             answer = person[column]
#             answers.append(answer)
#         context = { 'name': person.name,
#                     'answers': answers }
#         return flask.jsonify(**context)

#     if flask.request.method == 'POST':
#         member = tables['members_{}'.format(event_id)](id=form['name'],name=form['name'])
#         db.session.add(member)
#         db.session.commit()
#         name = form['name']
#         return flask.redirect('/member/{}/'.format(name))
        
#     if flask.request.method == 'PATCH':
#         context = {}
#         return flask.jsonify(**context)

