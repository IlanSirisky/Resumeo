import os
import logging
import PyPDF2
import requests
from flask import Flask, request, jsonify, Blueprint

# Define the Blueprint
main = Blueprint('main', __name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Ensure the API key is set
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")

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
        logging.debug(f"Raw API Response: {response}")  # Log raw API response
        extracted_data = parse_extracted_data(response['choices'][0]['text'])
        logging.debug(f"Extracted Data: {extracted_data}")  # Log extracted data

    except Exception as e:
        logging.error(f"Error during PDF processing or API call: {e}", exc_info=True)
        return jsonify({'error': 'Failed to process PDF file or OpenAI API call'}), 500

    return jsonify(extracted_data), 200

def process_text_with_openai(text):
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "gpt-3.5-turbo-instruct",
        "prompt": f"Extract the name, email, phone number, and highest education campus from the following text: {text}",
        "max_tokens": 150,
        "temperature": 0.5
    }
    url = "https://api.openai.com/v1/completions"

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        logging.info("OpenAI API call successful, response received.")
        return response.json()
    else:
        raise Exception(f"API request failed with status {response.status_code}: {response.text}")

def parse_extracted_data(text):
    data = {}
    try:
        for line in text.strip().split('\n'):
            key, value = line.split(':')
            data[key.strip()] = value.strip()
    except Exception as e:
        logging.error(f"Error parsing data: {e}")
        raise
    return data