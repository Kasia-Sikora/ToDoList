import connection


@connection.connection_handler
def check_if_user_exist_in_database(cursor, username):
    cursor.execute(
        '''SELECT * FROM users
        WHERE username = %(username)s''', {'username': username}
    )
    user_data = cursor.fetchone()
    print('userData', user_data)
    if user_data is None:
        return False
    else:
        return user_data


@connection.connection_handler
def save_user(cursor, username, password):
    cursor.execute(
        '''INSERT INTO users (username, password)
        VALUES (%(username)s, %(password)s);
        SELECT id, username from USERS 
        WHERE username = %(username)s
        ''', {'username': username, 'password': password}
    )
    registration_login = cursor.fetchone()
    print(registration_login)
    return [registration_login['id'], registration_login['username']]


@connection.connection_handler
def get_boards(cursor, user_id):
    cursor.execute('''SELECT * FROM boards WHERE user_id = %(user_id)s''', {'user_id': user_id})
    return cursor.fetchall()


@connection.connection_handler
def save_new_board(cursor, data):
    cursor.execute(
        '''INSERT INTO boards (id, title, owner)
        VALUES(%(id)s, %(title)s, %(owner)s);''', data)
    return ''
