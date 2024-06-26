from flask import Flask
from flask_cors import CORS  # Correct import from flask_cors
import os
from dotenv import load_dotenv

# Load environment variables from .env file at the start
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes and origins, crucial for API accessibility from different domains
    
    # Access the OpenAI API key from environment variables
    app.config['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')

    # Check if the API key was successfully loaded
    if not app.config['OPENAI_API_KEY']:
        raise EnvironmentError("Failed to load OPENAI_API_KEY from environment. Check your .env file.")

    # Import routes from the blueprint in the views module
    from .views import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
