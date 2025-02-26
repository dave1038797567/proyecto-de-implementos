from flask import Flask, redirect, url_for, session, render_template
from authlib.integrations.flask_client import OAuth
import os

app = Flask(__name__)
app.secret_key = "supersecreto"  # Clave segura

# Configuración de Google OAuth
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='83711085831-jj3v6f2ku7iuf9ja9g56mgm7ha4do56r.apps.googleusercontent.com',
    client_secret='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',
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    api_base_url='https://www.googleapis.com/oauth2/v2/',
    userinfo_endpoint='https://www.googleapis.com/oauth2/v2/userinfo',
    client_kwargs={'scope': 'openid email profile'},
)

# Página de inicio con botón de login
@app.route('/')
def home():
    return render_template('index.html')

# Ruta para iniciar sesión
@app.route('/login')
def login():
    return google.authorize_redirect(url_for('authorize', _external=True))

# Ruta de autorización (cuando Google responde)
@app.route('/authorize')
def authorize():
    token = google.authorize_access_token()
    user_info = google.get('userinfo').json()

    email = user_info['email']
    if email.endswith("@amigo.edu.co"):
        session['user'] = user_info
        return redirect(url_for('dashboard'))  # Redirige si es válido
    else:
        return "⛔ Acceso denegado, solo correos @amigo.edu.co permitidos."

# Ruta del Dashboard
@app.route('/dashboard')
def dashboard():
    if 'user' in session:
        return f"✅ Acceso aprobado, bienvenido {session['user']['email']}!"
    return redirect(url_for('home'))

# Ruta para cerrar sesión
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
