from flask import Flask
from flask_cors import CORS  # Correct import from flask_cors
import os

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes and origins

    # Import routes from the blueprint
    from .views import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
