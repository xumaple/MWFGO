"""Database API."""
import flask
from api import app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text

# Configure MySQL connection to Flask app
db = SQLAlchemy()
db_uri = 'mysql://root:supersecure@db/information_schema'
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

def hello_world():
    return 'hello frank'

def dict_factory(cursor, row):
    """Convert database row objects to a dictionary.

    This is useful for
    building dictionaries which are then used to render a template.  Note that
    this would be inefficient for large queries.
    """
    output = {}
    for idx, col in enumerate(cursor.description):
        output[col[0]] = row[idx]
    return output


def get_db():
    """Open a new database connection."""
    if not hasattr(flask.g, 'sqlite_db'):
        flask.g.sqlite_db = sqlite3.connect(
            app.config['DATABASE_FILENAME'])
        flask.g.sqlite_db.row_factory = dict_factory

        # Foreign keys have to be enabled per-connection.  This is an sqlite3
        # backwards compatibility thing.
        flask.g.sqlite_db.execute("PRAGMA foreign_keys = ON")

    return flask.g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    """Close the database at the end of a request."""
    # Assertion needed to avoid style error
    assert error or not error
    if hasattr(flask.g, 'sqlite_db'):
        flask.g.sqlite_db.commit()
        flask.g.sqlite_db.close()


# import sys
# from sqlalchemy import create_engine, Column, ForeignKey, Integer, String
# from sqlalchemy.ext.declarative import declarative_base
# Base = declarative_base()
# from sqlalchemy.orm import relationship

# class traits()
# class choices(Base):




# engine = create_engine('sqlite:///books-collection.db')
# from sqlalchemy import create_engine; Base.metadata.create_all(engine)

