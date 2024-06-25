import logging
from flask import Blueprint, request, jsonify

# Setup logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

main = Blueprint('main', __name__)

@main.route('/upload', methods=['POST'])
def upload_file():
    logging.debug("Accessing the upload endpoint.")
    if 'pdf' not in request.files:
        logging.warning("No file part in the request.")
        return jsonify({'error': 'No file part'}), 400
    file = request.files['pdf']
    if file.filename == '':
        logging.warning("No file selected for upload.")
        return jsonify({'error': 'No selected file'}), 400
    if file:
        logging.info(f"Received file: {file.filename}")
        # Additional processing can be done here
        return jsonify({'message': 'File received', 'filename': file.filename}), 200