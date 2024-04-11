from flask import Flask, request, render_template, flash, redirect, url_for, jsonify,session
from db_models.User import User
from database import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://avnadmin:AVNS_2fB5J-vfOPukfXKeSSp@mysql-1bf5496c-bee-keeping.a.aivencloud.com:27137/defaultdb'
app.secret_key = 'milan'

db.init_app(app)
with app.app_context():
    db.create_all()

@app.before_request
def request_login():
    allowed_routes = ['static','login']
    if request.endpoint not in allowed_routes and 'username' not in session:
        return redirect(url_for('login'))


@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return render_template('show_users.html', users=users)


@app.route('/users', methods=['POST','GET'])
def create_user():
    if request.method == 'POST':
        data = request.form
        existing_user = User.query.filter_by(username=data['username']).first()
        print(existing_user)
        if existing_user:
            return jsonify({'status':'error','message':'User already exists'}),404
        new_user = User(username=data['username'], email=data['email'], password=data['password'])
        print(new_user)
        db.session.add(new_user)
        db.session.commit()
        created_username = data['username']
        success_message = f"Korisnik {created_username} kreiran"
        return jsonify({'status':'success'}),200
    else:
        return jsonify({'status':'error'}),404

@app.route('/user_created',methods=['GET'])
def user_created():
    success_message = request.args.get('success_message')
    created_username = request.args.get('created_username')
    return render_template('create_user.html', success_message=success_message, created_username=created_username)

@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get(id)
    user.username = data['username']
    user.email = data['email']
    db.session.commit()
    return render_template('user_updated.html', user=user)


@app.route('/delete-user/<id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'result':'success'}),200


@app.route('/create_user', methods=['GET'])
def show_create_user_form():
    return render_template('create_user.html')


@app.route('/logout', methods=['GET'])
def logout():
    session.pop('username',None)
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if (request.method == 'GET'):
        print("login page")
        return render_template('login.html')
    else:
        print("login post")
        data = request.form
        print(data)
        user = User.query.filter_by(username=data['username']).first()
        if user and user.password == data['password']:
            session['username'] = user.username
            return render_template('home.html', user=user)
        return render_template('login_failed.html')


@app.route('/home', methods=['GET'])
def homepage():
    return render_template('home.html')


@app.route('/')
def home():
    return render_template('login.html')


if __name__ == '__main__':
    app.run(debug=True)
