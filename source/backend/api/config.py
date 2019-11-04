"""Insta485 development configuration."""

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

DEBUG = False

# Secret key for encrypting cookies
SECRET_KEY = b"\xc2\xe4'\x9f@\xe9cC\x81O\x18\x82Y\xd2\x04+\x9c'I\xb7L/\x80\xfa"
SESSION_COOKIE_NAME = 'login'

# Database file is source/backend/database/mwfgo.sqlite3
# DATABASE_FILENAME = os.path.join(
#     os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
#     'source', 'backend', 'database', 'mwfgo.sqlite3'
# )