import connection


@connection.connection_handler
def check_if_user_exist_in_database(cursor, username):
    cursor.execute(
        '''SELECT * FROM users
        WHERE username = %(username)s''', {'username': username}
    )
    user_data = cursor.fetchone()
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
    return [registration_login['id'], registration_login['username']]


@connection.connection_handler
def get_boards(cursor, user_id):
    cursor.execute('''SELECT * FROM boards WHERE user_id = %(user_id)s''', {'user_id': user_id})
    return cursor.fetchall()


@connection.connection_handler
def save_new_board(cursor, data):
    cursor.execute(
        '''INSERT INTO boards (title, user_id, display_order)
        VALUES(%(title)s, %(user_id)s, %(display_order)s);
        SELECT id FROM boards WHERE title = %(title)s''', data)
    board_id = cursor.fetchone()
    return board_id['id']


@connection.connection_handler
def remove_board(cursor, board_id):
    cursor.execute(
        '''DELETE FROM cards WHERE board_id = %(board_id)s;
        DELETE FROM boards WHERE id = %(board_id)s''', {'board_id': board_id})
    return ''


@connection.connection_handler
def update_title(cursor, form_data):
    cursor.execute(
        '''UPDATE boards  SET title = %(title)s WHERE id = %(id)s;
        SELECT title from boards WHERE id = %(id)s''', form_data)
    return cursor.fetchone() is not None


@connection.connection_handler
def check_highest_order_in_boards(cursor, user_id):
    cursor.execute(
        '''SELECT MAX(display_order) FROM boards WHERE user_id = %s''', user_id)
    return cursor.fetchone()


@connection.connection_handler
def check_highest_order_in_cards(cursor, board_id):
    cursor.execute(
        '''SELECT MAX(display_order) FROM cards WHERE board_id = %(board_id)s''', {'board_id': board_id})
    max_order = cursor.fetchone()
    if max_order['max'] is None:
        return 0
    else:
        return max_order['max']


@connection.connection_handler
def save_new_card(cursor, data):
    cursor.execute(
        '''INSERT INTO cards (title, board_id, display_order, creation_date)
        VALUES(%(title)s, %(board_id)s, %(display_order)s, %(date)s);
        SELECT * FROM cards WHERE title = %(title)s''', data)
    date = cursor.fetchone()
    return date


@connection.connection_handler
def get_user_cards(cursor, user_id):
    cursor.execute(
        '''SELECT c.id, c.title, c.board_id, c.description, c.display_order, c.creation_date FROM cards AS c
    LEFT JOIN boards AS b ON c.board_id = b.id WHERE b.user_id = %s''',
        user_id)
    return cursor.fetchall()


@connection.connection_handler
def remove_card(cursor, card_id):
    cursor.execute(
        '''DELETE FROM cards WHERE id = %(card_id)s''', {'card_id': card_id})
    return ''
