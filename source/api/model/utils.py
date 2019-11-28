"""Utility functions."""

def update_row(row, col_names, answers):
    for i, answer in enumerate(answers):
        setattr(row, col_names[i+2], answer)