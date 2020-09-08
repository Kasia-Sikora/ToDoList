from flask import Flask, render_template, request, session, redirect, url_for, json

import data_handler
import utils

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
def index():
    user_login = utils.check_session_usr()['username']
    user_id = utils.check_session_usr()['id']
    return render_template('index.html', user_name=user_login, id = user_id)


@app.route('/registration', methods=['POST', 'GET'])
def registration():
    if request.method == 'POST':
        username = request.form.get('username')
        if data_handler.check_if_user_exist_in_database(username) is False:
            user_password = request.form.get('password')
            hashed_password = utils.hash_password(user_password)
            user_login = data_handler.save_user(username, hashed_password)
            session['username'] = user_login
            return render_template("index.html", username=session['username'])
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
                return render_template('index.html', username=session['username'])
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
    boards = data_handler.getBoards()
    print(boards)
    return json.dumps(boards)


@app.route('/get_cards')
def get_cards():
    cards = data_handler.getCards()
    return json.dumps(cards)


@app.route('/get_statuses')
def get_statuses():
    statuses = data_handler.getStatuses()
    print(statuses)
    return json.dumps(statuses)


@app.route('/save-boards', methods=['POST'])
def save_boards_from_JS():
    new_board = request.get_json()
    print(new_board)
    data_handler.save_new_board(new_board)
    return ''

if __name__ == '__main__':
    app.run()