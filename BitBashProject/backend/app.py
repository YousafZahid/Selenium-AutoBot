from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate  
from dotenv import load_dotenv
import os
from models import db
from routes import job_routes

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db) 

app.register_blueprint(job_routes)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
