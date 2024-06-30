import os
import logging
import PyPDF2
import requests
from flask import Flask, request, jsonify, Blueprint, current_app
from dotenv import load_dotenv
import json

load_dotenv()

# Define the Blueprint
main = Blueprint('main', __name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Function to validate API key existence
def validate_api_key():
    api_key = current_app.config.get('OPENAI_API_KEY')
    if not api_key:
        logging.error("API key is not set in the environment variables.")
        raise ValueError("API key is not set. Please configure the OPENAI_API_KEY environment variable.")
    return api_key


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

    try:
        pdf_reader = PyPDF2.PdfReader(file)
        text = "".join(page.extract_text() for page in pdf_reader.pages if page.extract_text())
        if not text:
            raise ValueError("No text extracted from PDF.")
        logging.info("PDF text extracted successfully.")

        response = process_text_with_openai(text)
        extracted_data = parse_extracted_data(response['choices'][0]['text'])
        
    except Exception as e:
        logging.error(f"Error during PDF processing or API call: {e}", exc_info=True)
        return jsonify({'error': str(e)}), 500  # Return the exception message to the client for debugging

    return jsonify(extracted_data), 200


@main.route('/add_resume', methods=['POST'])
def add_resume_to_item():
    # Extract metadata from headers or form-fields
    api_key = request.headers.get('Client-Token')  # Ensure this is the correct header name
    item_id = request.form['item_id']  # Ensure that item_id is passed as part of the form data

    # Check if the resume file is in the request
    if 'resume' not in request.files:
        return jsonify({'error': 'No resume file part'}), 400
    file = request.files['resume']

    # Ensure the API key is present
    if not api_key:
        return jsonify({'error': 'API key is missing from the headers'}), 401

    # Prepare the API request to Monday.com
    url = "https://api.monday.com/v2/file"
    headers = {
        "Authorization": f"{api_key}",
        "API-Version": "2024-04"
    }
    query = f"""
    mutation add_file($file: File!) {{
        add_file_to_column(item_id: {item_id}, column_id: "files__1", file: $file) {{
            id
        }}
    }}
    """
    payload = {
        'query': query,
        'map': '{"file":"variables.file"}'  # Ensuring proper mapping
    }
    files = [
        ('file', (file.filename, file.stream, 'application/octet-stream'))
    ]

    # Sending the request to Monday.com
    response = requests.post(url, headers=headers, data=payload, files=files)
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({'error': 'Failed to upload file', 'details': response.text}), response.status_code



def process_text_with_openai(text):
    api_key = validate_api_key()  # Validate and get the API key
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
    "model": "gpt-3.5-turbo-instruct",
    "prompt": f"Extract the person's Name, Email, Phone, and the name of the highest educational institution from the provided text, dont show the degree or any other filed. Only include the primary name of the highest educational institution without details or multiple entries. For Example- Email: ilan1il1000@gmail.com, University: Ariel University, Name: Ilan Sirisky, Phone: 052-5258688 :  , Here is the text: {text}",
    "max_tokens": 150,
    "temperature": 0.1
    }
    url = "https://api.openai.com/v1/completions"

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        logging.info("OpenAI API call successful, response received.")
        logging.debug(f"API Response: {response.json()}")
        return response.json()
    else:
        raise Exception(f"API request failed with status {response.status_code}: {response.text}")

def parse_extracted_data(data):
    parsed_data = {}
    lines = data.strip().split('\n')  # Strip outer whitespace and split by new lines

    for line in lines:
        if ':' in line:
            key, value = line.split(':', 1)  # Split only on the first colon to handle cases where the value might contain colons
            key = key.strip()
            value = value.strip()
            
            if key == "University":
                # Handle potential multiple entries or additional descriptors
                value = value.split(',')[0].strip()  # Take the first entry if there are multiple, comma-separated values
                value = value.replace('-', ' ').strip()  # Remove hyphens and strip any resulting leading/trailing whitespace
            parsed_data[key] = value
        else:
            logging.debug(f"Skipping line, no key-value pair: {line}")  # Changed to debug for lower importance

    # Validate expected keys are present
    expected_keys = ["Name", "Email", "Phone", "University"]
    for key in expected_keys:
        if key not in parsed_data:
            logging.warning(f"Expected key '{key}' not found in data.")
            parsed_data[key] = "Unknown"  # Provide a default value or handle it according to your error handling policy

    return parsed_data
