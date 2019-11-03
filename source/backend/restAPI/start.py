"""Rest API for resource URLs."""
import flask
import insta485
from insta485.api.error import InvalidUsage


def check_post_id(cursor, postid):
    """Check if postid is valid."""
    com = "SELECT * FROM posts WHERE postid=?"
    post = cursor.execute(com, (postid,)).fetchone()
    if post is None:
        raise InvalidUsage("Not Found",
                           status_code=404)
    return post


@insta485.app.route('/api/v1/', methods=["GET"])
def get_resources():
    """Return resource URLs."""
    # Check if user is logged in
    if 'username' not in flask.session:
        raise InvalidUsage("Forbidden",
                           status_code=403)

    context = {
        "posts": "/api/v1/p/",
        "url": "/api/v1/",
    }

    return flask.jsonify(**context)


@insta485.app.route('/api/v1/p/', methods=["GET"])
def get_posts():
    """Return list of posts."""
    # Check if user is logged in
    if 'username' not in flask.session:
        raise InvalidUsage("Forbidden",
                           status_code=403)

    offset = flask.request.args.get('page', default=0, type=int)
    limit = flask.request.args.get('size', default=10, type=int)
    username = flask.session['username']

    if offset < 0 or limit < 0:
        raise InvalidUsage("Bad Request",
                           status_code=400)

    context = {}
    context['url'] = '/api/v1/p/'
    cursor = insta485.model.get_db().cursor()

    command = "SELECT postid from posts WHERE owner IN (SELECT username2 FROM \
               following WHERE username1=? AND username2=posts.owner) OR \
               owner=? ORDER BY postid DESC LIMIT ? OFFSET ?"
    variables = (username, username, limit, offset * limit)
    cmd = "SELECT COUNT(*) from posts WHERE owner IN (SELECT username2 FROM \
            following WHERE username1=? AND username2=posts.owner) OR \
            owner=?"
    posts = cursor.execute(command, variables).fetchall()
    count = cursor.execute(cmd, (username, username)).fetchone()

    context['results'] = []

    for post in posts:
        context['results'].append({"postid": post['postid'],
                                   "url": "/api/v1/p/%d/" % (post['postid'])})

    if count['COUNT(*)'] <= offset * limit + limit:
        context['next'] = ""
    else:
        context['next'] = "/api/v1/p/?size=%d&page=%d" % (limit, offset + 1)

    return flask.jsonify(**context)


@insta485.app.route('/api/v1/p/<int:post_id_url_slug>/', methods=["GET"])
def get_post_det(post_id_url_slug):
    """Return post data."""
    # Check if user is logged in
    if 'username' not in flask.session:
        raise InvalidUsage("Forbidden",
                           status_code=403)

    cursor = insta485.model.get_db().cursor()
    context = {}
    post = check_post_id(cursor, post_id_url_slug)

    user_command = "SELECT * from users where username=?"
    user = cursor.execute(user_command,
                          (post['owner'],)).fetchone()

    context['age'] = post['created']
    context['img_url'] = "/uploads/%s" % (post['filename'])
    context['owner'] = post['owner']
    context['owner_img_url'] = "/uploads/%s" % (user['filename'])
    context['owner_show_url'] = '/u/%s/' % (post['owner'])
    context['post_show_url'] = '/p/%d/' % (post_id_url_slug)
    context['url'] = "/api/v1/p/%d/" % (post_id_url_slug)

    return flask.jsonify(**context)

@insta485.app.route('/api/v1/p/<int:post_id_url_slug>/comments/',
                    methods=["GET"])
def get_comment_det(post_id_url_slug):
    """Return list of comments."""
    # Check if user is logged in
    if 'username' not in flask.session:
        raise InvalidUsage("Forbidden",
                           status_code=403)

    cursor = insta485.model.get_db().cursor()
    _ = check_post_id(cursor, post_id_url_slug)
    context = {}

    com = 'SELECT * from comments WHERE postid=?;'
    getcoms = cursor.execute(com, (post_id_url_slug, )).fetchall()
    jlist = []

    for comment in getcoms:
        comments = {}
        comments['commentid'] = comment['commentid']
        comments['owner'] = comment['owner']
        comments['owner_show_url'] = '/u/%s/' % (comment['owner'])
        comments['postid'] = comment['postid']
        comments['text'] = comment['text']

        jlist.append(comments)

    context = dict(comments=jlist)
    context["url"] = "/api/v1/p/" + str(post_id_url_slug) + "/comments/"
    return flask.jsonify(**context)

@insta485.app.route('/api/v1/p/<int:postid>/likes/',
                    methods=["GET", "DELETE", "POST"])
def likes_util(postid):
    """Return likes information."""
    if 'username' not in flask.session:
        raise InvalidUsage("Forbidden", status_code=403)

    cursor = insta485.model.get_db().cursor()
    _ = check_post_id(cursor, postid)
    context = {}

    if flask.request.method == 'GET':
        likes = cursor.execute("SELECT * from likes WHERE postid = ?",
                               (postid,)).fetchall()
        context['logname_likes_this'] = 0
        for user in likes:
            if user['owner'] == flask.session['username']:
                context['logname_likes_this'] = 1

        context['likes_count'] = len(likes)
        context['postid'] = postid
        context['url'] = "/api/v1/p/%d/likes/" % (postid)

        return flask.jsonify(**context)

    if flask.request.method == 'DELETE':
        cursor.execute("DELETE from likes WHERE owner=? AND postid=?",
                       (flask.session['username'], postid))
        return flask.make_response("", 204)

    like = cursor.execute("SELECT * from likes WHERE owner=? AND postid=?",
                          (flask.session['username'], postid)).fetchall()

    context['logname'] = flask.session['username']
    if len(like) > 0:
        context['message'] = "Conflict"
        context['postid'] = postid
        context['status_code'] = 409
        return flask.make_response(flask.jsonify(**context), 409)

    com = 'INSERT INTO likes (owner, postid) VALUES (?,?);'
    cursor.execute(com,
                   (flask.session['username'],
                    postid))
    context['postid'] = postid
    return flask.make_response(flask.jsonify(**context), 201)


@insta485.app.route('/api/v1/p/<int:post_id_url_slug>/comments/',
                    methods=['POST'])
def create_comment(post_id_url_slug):
    """Create a comment."""
    # Check if user is logged in
    if 'username' not in flask.session:
        raise InvalidUsage("Forbidden",
                           status_code=403)
    if flask.request.get_json() is None:
        raise InvalidUsage("Bad Request",
                           status_code=400)

    cursor = insta485.model.get_db().cursor()
    _ = check_post_id(cursor, post_id_url_slug)
    context = {}

    com = 'INSERT INTO comments '
    com2 = '(owner, postid, text) VALUES (?,?,?);'
    cursor.execute(com + com2,
                   (flask.session['username'],
                    post_id_url_slug,
                    flask.request.get_json()['text']))
    com = 'SELECT last_insert_rowid()'
    cid = cursor.execute(com).fetchone()['last_insert_rowid()']
    owner_url = "/u/" + flask.session['username'] + "/"
    context = {"commentid": cid, "owner": flask.session['username'],
               "owner_show_url": owner_url, "postid": post_id_url_slug,
               "text": flask.request.get_json()['text']}
    return flask.jsonify(**context), 201
