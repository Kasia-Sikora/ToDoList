import bcrypt
from flask import session


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


def check_session_usr():
    try:
        return [session['id'], session['username']]
    except KeyError:
        return None


def save_user_session(user):
    session['id'] = user[0]
    session['username'] = user[1]


def remove_user_from_session():
    session.pop('username', None)
    session.pop('id', None)
