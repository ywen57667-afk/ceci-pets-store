import hashlib
import hmac
import json
import os
import secrets
import sqlite3
from http import cookies
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

DB_PATH = Path(__file__).with_name('auth.db')
SECRET = os.environ.get('SWEET_PET_SECRET', 'sweet-pet-shop-dev-secret')


def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, salt TEXT NOT NULL)'
    )
    conn.commit()
    conn.close()


def json_response(handler, status, data):
    body = json.dumps(data).encode('utf-8')
    handler.send_response(status)
    handler.send_header('Content-Type', 'application/json; charset=utf-8')
    handler.send_header('Content-Length', str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def parse_json(handler):
    length = int(handler.headers.get('Content-Length', '0'))
    raw = handler.rfile.read(length) if length > 0 else b'{}'
    try:
        return json.loads(raw.decode('utf-8'))
    except json.JSONDecodeError:
        return None


def hash_password(password, salt):
    return hashlib.sha256((salt + password).encode('utf-8')).hexdigest()


def make_token(email):
    sig = hmac.new(SECRET.encode('utf-8'), email.encode('utf-8'), hashlib.sha256).hexdigest()
    return f'{email}|{sig}'


def verify_token(token):
    if not token or '|' not in token:
        return None
    email, sig = token.split('|', 1)
    expected = hmac.new(SECRET.encode('utf-8'), email.encode('utf-8'), hashlib.sha256).hexdigest()
    if hmac.compare_digest(sig, expected):
        return email
    return None


class AppHandler(SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/me':
            token = self.get_auth_cookie()
            email = verify_token(token)
            if not email:
                return json_response(self, 401, {'ok': False, 'message': 'Not logged in'})
            return json_response(self, 200, {'ok': True, 'user': {'email': email}})
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/register':
            payload = parse_json(self)
            if payload is None:
                return json_response(self, 400, {'ok': False, 'message': 'Invalid JSON'})
            email = str(payload.get('email', '')).strip().lower()
            password = str(payload.get('password', ''))
            if '@' not in email or len(password) < 6:
                return json_response(self, 400, {'ok': False, 'message': 'Invalid email or password too short'})
            salt = secrets.token_hex(8)
            hashed = hash_password(password, salt)
            try:
                conn = sqlite3.connect(DB_PATH)
                conn.execute('INSERT INTO users (email, password_hash, salt) VALUES (?, ?, ?)', (email, hashed, salt))
                conn.commit()
            except sqlite3.IntegrityError:
                return json_response(self, 409, {'ok': False, 'message': 'Email already exists'})
            finally:
                conn.close()
            return json_response(self, 201, {'ok': True, 'message': 'Registered'})

        if parsed.path == '/api/login':
            payload = parse_json(self)
            if payload is None:
                return json_response(self, 400, {'ok': False, 'message': 'Invalid JSON'})
            email = str(payload.get('email', '')).strip().lower()
            password = str(payload.get('password', ''))
            conn = sqlite3.connect(DB_PATH)
            row = conn.execute('SELECT password_hash, salt FROM users WHERE email = ?', (email,)).fetchone()
            conn.close()
            if not row:
                return json_response(self, 401, {'ok': False, 'message': 'Invalid credentials'})
            stored_hash, salt = row
            if hash_password(password, salt) != stored_hash:
                return json_response(self, 401, {'ok': False, 'message': 'Invalid credentials'})

            token = make_token(email)
            c = cookies.SimpleCookie()
            c['session'] = token
            c['session']['path'] = '/'
            c['session']['httponly'] = True
            self.send_response(200)
            self.send_header('Set-Cookie', c.output(header='').strip())
            body = json.dumps({'ok': True, 'user': {'email': email}}).encode('utf-8')
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        if parsed.path == '/api/logout':
            c = cookies.SimpleCookie()
            c['session'] = ''
            c['session']['path'] = '/'
            c['session']['expires'] = 'Thu, 01 Jan 1970 00:00:00 GMT'
            self.send_response(200)
            self.send_header('Set-Cookie', c.output(header='').strip())
            body = json.dumps({'ok': True}).encode('utf-8')
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        return json_response(self, 404, {'ok': False, 'message': 'Not found'})

    def get_auth_cookie(self):
        raw = self.headers.get('Cookie', '')
        c = cookies.SimpleCookie()
        c.load(raw)
        if 'session' in c:
            return c['session'].value
        return None


if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', '4179'))
    server = ThreadingHTTPServer(('0.0.0.0', port), AppHandler)
    print(f'Serving sweet-pet-shop on http://0.0.0.0:{port}')
    server.serve_forever()
