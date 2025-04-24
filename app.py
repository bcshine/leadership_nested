from flask import Flask, render_template, request, redirect, flash
import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # flash 메시지를 위한 시크릿 키 설정
DB_PATH = 'users.db'

# 최초 실행 시 테이블 생성
def init_db():
    if not os.path.exists(DB_PATH):
        with sqlite3.connect(DB_PATH) as conn:
            c = conn.cursor()
            c.execute('''
                CREATE TABLE users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    phone TEXT,
                    password TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()

@app.route('/')
def home():
    return redirect('/signup')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        password = request.form['password']
        
        # 패스워드 해싱
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        
        try:
            with sqlite3.connect(DB_PATH) as conn:
                c = conn.cursor()
                c.execute('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
                          (name, email, phone, hashed_password))
                conn.commit()
            
            # 성공 메시지
            flash(f"{name}님, 가입이 완료되었습니다!", "success")
            return redirect('/')
        
        except sqlite3.IntegrityError:
            # 오류 메시지
            flash("이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요.", "error")
            return render_template('signup.html')
    
    return render_template('signup.html')

# 사용자 목록을 볼 수 있는 페이지 추가 (관리자용)
@app.route('/users')
def user_list():
    with sqlite3.connect(DB_PATH) as conn:
        c = conn.cursor()
        c.execute('SELECT id, name, email, phone, created_at FROM users')
        users = c.fetchall()
    
    return render_template('users.html', users=users)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)