import psycopg2
import connection


@connection.connection_handler
def check_if_user_exist_in_database(cursor, username):
    cursor.execute(
        '''SELECT * FROM users
        WHERE username = %(username)s''', {'username': username}
    )
    user_data = cursor.fetchone()
    if len(user_data) == 0:
        return False
    else:
        return user_data


@connection.connection_handler
def save_user(cursor, username, password):
    cursor.execute(
        '''INSERT INTO users (username, password)
        VALUES (%(username)s, %(password)s);
        SELECT username from USERS 
        WHERE username = %(username)s
        ''', {'username': username, 'password': password}
    )
    registration_login = cursor.fetchone()
    return registration_login['username']


@connection.connection_handler
def getBoards(cursor):
    cursor.execute('''SELECT * FROM boards''')
    return cursor.fetchall()


@connection.connection_handler
def save_new_board(cursor, data):
    cursor.execute(
        '''INSERT INTO boards (id, title, owner)
        VALUES(%(id)s, %(title)s, %(owner)s);''', data)
    return ''