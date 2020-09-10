import datetime

from flask import Flask, render_template, request, session, redirect, url_for, json

import data_handler
import utils

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
def index():
    if utils.check_session_usr() is not None:
        user_login = utils.check_session_usr()[1]
        return render_template('index.html', user_name=user_login)
    else:
        return render_template('index.html', user_name=None)


@app.route('/get_user_id')
def get_user_id():
    if len(session) > 0:
        user_id = session['id']
        return json.dumps(user_id)
    else:
        return json.dumps(None)


@app.route('/registration', methods=['POST', 'GET'])
def registration():
    if request.method == 'POST':
        username = request.form.get('username')
        if data_handler.check_if_user_exist_in_database(username) is False:
            user_password = request.form.get('password')
            hashed_password = utils.hash_password(user_password)
            user = data_handler.save_user(username, hashed_password)
            session['id'] = user[0]
            session['username'] = user[1]
            return render_template("index.html", user_name=session['username'])
        else:
            error_message = "There's already user with this login"
            return render_template('index.html', message=error_message)
    else:
        return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_data = request.form.to_dict()
        if data_handler.check_if_user_exist_in_database(user_data['username']):
            password = data_handler.check_if_user_exist_in_database(user_data['username'])['password']
            user_id = data_handler.check_if_user_exist_in_database(user_data['username'])['id']
            if utils.verify_password(user_data['password'], password):
                session['username'] = request.form['username']
                session['id'] = user_id
                return render_template('index.html', user_name=session['username'])
            else:
                message = "Invalid data"
                return render_template('index.html', message=message)
        else:
            message = "Invalid data"
            return render_template('index.html', message=message)
    else:
        return render_template('index.html')


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    session.pop('id', None)
    return redirect(url_for('index'))


def main():
    app.run(debug=True)

    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


@app.route('/get_data')
def get_data():
    data = data_handler.getData()
    return json.dumps(data)


@app.route('/get_boards')
def get_boards():
    if len(session) > 0:
        boards = data_handler.get_boards(session['id'])
        return json.dumps(boards)
    else:
        return json.dumps(None)

#
# @app.route('/get_cards')
# def get_cards():
#     cards = data_handler.getCards()
#     return json.dumps(cards)


@app.route('/get_statuses')
def get_statuses():
    statuses = data_handler.getStatuses()
    return json.dumps(statuses)


@app.route('/save-boards', methods=['POST'])
def save_boards_from_JS():
    new_board = request.get_json()
    data_handler.save_new_board(new_board)
    return ''


@app.route('/remove_board/<board_id>', methods=['DELETE'])
def remove_board(board_id):
    data_handler.remove_board(board_id)
    return json.dumps(0)


@app.route('/change_title', methods=['POST'])
def change_title():
    if request.method == 'POST':
        form_data = json.loads(request.data)
        if form_data['id'] != '0':
            return json.dumps(data_handler.update_title(form_data))
        else:
            order = data_handler.check_highest_order_in_boards(str(session['id']))['max'] + 1
            data = {'title': form_data['title'], 'user_id': int(session['id']), 'board_order': order}
            return json.dumps(data_handler.save_new_board(data))


@app.route('/new_card', methods=['POST'])
def new_card():
    if request.method == 'POST':
        form_data = json.loads(request.data)
        order = data_handler.check_highest_order_in_cards(str(form_data['id'])) + 1
        date = datetime.datetime.now().strftime("%a %d %b %Y %X")
        data = {'title': form_data['title'], 'board_id': form_data['id'], 'card_order': order,
                'date': date}
        return json.dumps(data_handler.save_new_card(data))


@app.route('/get_cards')
def get_cards():
    return json.dumps(data_handler.get_user_cards(str(session['id'])))


@app.route('/remove_card/<card_id>', methods=['DELETE'])
def remove_card(card_id):
    data_handler.remove_card(card_id)
    return json.dumps(0)

if __name__ == '__main__':
    app.run()
