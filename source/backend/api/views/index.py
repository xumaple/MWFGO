from api import app

@app.route("/")
def show_index():
    # mysql_result = False
    # query_string = text("SELECT 1")
    # # TODO REMOVE FOLLOWING LINE AFTER TESTING COMPLETE.
    # db.session.query("1").from_statement(query_string).all()
    # try:
    #     if db.session.query("1").from_statement(query_string).all():
    #         mysql_result = True
    # except:
    #     pass


    # Return the page with the result.
    # context = {'greeting': 'hello world'}
    return 'hello world'#render_template(**context)