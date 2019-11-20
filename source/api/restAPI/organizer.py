import flask
import api
from api.model.model import db, tables, Organizers, Event, Members
# Connect c++ modules to python
# from algorithm import GroupOrganizer

@api.app.route('/api/v1/organizer/', methods = ['GET'])
def get_groups():
    # Get Traits

    # Get members

    # Pass traits and members to algorithm
    pass