from flask import Flask
import os

def create_app():
    app = Flask(__name__)

    # Import routes from the blueprint
    from .views import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # Handle missing API key gracefully
    if not os.getenv("OPENAI_API_KEY"):
        app.logger.error("OPENAI_API_KEY environment variable not set")
        # Optionally, disable certain features or routes depending on the API key
    else:
        app.config['OPENAI_API_KEY'] = os.getenv("OPENAI_API_KEY")

    return app