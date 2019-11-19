"""Utility functions."""

def update_row(row, col_names, answers):
    for i in range(len(answers)):
        row[col_names[i+2]] = answers[i]