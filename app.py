from flask import Flask, request, redirect, url_for
import pandas as pd
import os

app = Flask(__name__)

@app.route('/')
def index():
    return redirect(url_for('static', filename='index.html'))

@app.route('/submit-email', methods=['POST'])
def submit_email():
    email = request.form['email']
    if not os.path.exists('user-data'):
        os.makedirs('user-data')
    file_path = os.path.join('user-data', 'emails.csv')
    if os.path.exists(file_path):
        df = pd.read_csv(file_path)
    else:
        df = pd.DataFrame(columns=['email'])
    df = df.append({'email': email}, ignore_index=True)
    df.to_csv(file_path, index=False)
    return redirect(url_for('static', filename='dashboard.html'))

if __name__ == '__main__':
    app.run(debug=True)
