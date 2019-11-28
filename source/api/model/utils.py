"""Utility functions."""
from api.model import db, tables

def update_row(row, col_names, answers):
    for i, answer in enumerate(answers):
        setattr(row, col_names[i+2], answer)

def drop_table_if_exists(tb_name):
    dropped = tables.get(tb_name)
    if dropped is not None:
        dropped.__table__.drop(db.get_engine())
        data = db.metadata
        data.tables = data.tables.copy()
        data.tables.pop(tb_name)
        db.session.commit()
        del tables[tb_name]