from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
# from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import relationship

Base = declarative_base()

class Organizers(Base):
    __tablename__ = 'Organizers'

    id = Column(Integer, primary_key=True)
    username = Column(String(255), unique=True)
    password = Column(String(255))
    full_name = Column(String(255))

class Events(Base):
    __tablename__ = 'Events'

    id = Column(Integer, primary_key=True)
    username = Column(String(255), unique=True)
    password = Column(String(255))
    full_name = Column(String(255))

if __name__ == "__main__":
    engine = create_engine('mysql://scott:tiger@localhost/foo')
    Base.metadata.create_all(bind=engine)
