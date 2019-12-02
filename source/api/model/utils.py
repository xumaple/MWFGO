"""Utility functions."""
import uuid
import hashlib
from api.model import db, tables

def update_row(row, col_names, answers):
    for i, answer in enumerate(answers):
        setattr(row, col_names[i+2], answer)

def drop_table_if_exists(tb_name):
    dropped = tables.pop(tb_name, None)
    if dropped is not None:
        dropped.__table__.drop(db.get_engine())
        data = db.metadata
        data.tables = data.tables.copy()
        data.tables.pop(tb_name)
        db.session.commit()

def generate_unsalted_hash(text):
    return hashlib.md5(text).hexdigest()

ALGORITHM = 'sha512'
def generate_salted_hash(text, include_salt=True):
    """Account.py docstring."""
    salt = uuid.uuid4().hex
    hashed_text = get_hashed_text(salt, text)
    return "$".join([ALGORITHM, salt, hashed_text]) if include_salt == True else hashed_text

def get_hashed_text(salt, text):
    """Account.py docstring."""
    hash_obj = hashlib.new(ALGORITHM)
    hash_obj.update((salt + text).encode('utf-8'))
    return hash_obj.hexdigest()

def login_check(username, password):
    """Account.py docstring."""
    user_pw = db.session.query(tables['organizers'].password).filter_by(username=username)
    if user_pw.scalar() is None:
        return False
    print(user_pw.one().password)
    split_list = user_pw.one().password.split('$')
    salt = split_list[1]
    password_hashed = split_list[2]
    return get_hashed_text(salt, password) == password_hashed