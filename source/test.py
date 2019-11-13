from api.model import db, Organizers, Event, Traits, Choices, Members, Leaders

# un = 'wow' # username
# myobject = Organizers(username=un, password='wee', full_name='yipee')
# db.session.add(myobject)
# db.session.commit()

# e = db.session.query(Organizers).filter_by(username=un).one()
# print(e)

event_id = '5'

# class Members_5(db.Model):
#     __tablename__ = event_id + '_members'

#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     trait_id = db.Column(db.Float, nullable=False) # TODO: foreign key here; should be dynamic
#     name = db.Column(db.String(256), nullable=False)

# db.create_all()
# name="hi there"
# myobject = Members_5(trait_id = 123, name=name)
# db.session.add(myobject)
# db.session.commit()

# e = db.session.query(Members_5).filter_by(name=name).one()
# print(e)



temp = {
    "id": db.Column(db.Integer, primary_key=True, nullable=False), \
    "name": db.Column(db.String(256), nullable=False), \
    "__repr__": lambda self: self.id + self.name
}
tmp = type("Members_" + event_id, 
              (db.Model,), # db.Model
              temp)

member=Members(name="hi maple teehee XD")
db.session.add(member)
member=Members(name="hi frank teehee XD")
db.session.add(member)
for row in db.session.query(Members.name):
    print(row._asdict())
