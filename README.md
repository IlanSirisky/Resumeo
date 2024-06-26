# Resumeo

## Overview
Resumeo is a powerful extension for Monday.com designed to automate the process of handling CVs and resumes. By automating data extraction and entry, Resumeo enhances efficiency for HR departments, enabling them to focus on more strategic tasks rather than manual data entry.

## Features

- **Drag and Drop Interface**: Users can simply drag and drop PDF files into the application. This intuitive interface simplifies the initial interaction with the application.
- **Automated Data Extraction**: Leveraging advanced parsing capabilities, Resumeo extracts critical information such as name, email, phone number, and educational background from uploaded PDFs.
- **Duplicate Check**: Automatically checks if a candidate's information already exists within the Monday.com system, helping to maintain a clean and organized database.
- **Seamless Integration with Monday.com**: Extracted data is neatly populated into designated boards within Monday.com, ensuring smooth data flow and management.

## Technology

### Backend

- **PDF Parsing**: The application utilizes the `PyPDF2` library to read and extract text from PDF files, ensuring accurate retrieval of information from CVs.
- **Data Processing**: We employ the OpenAI API to further process and understand the extracted data, enabling sophisticated operations like summarization and contextual analysis to enhance data quality.

## Using Resumeo

1. **Upload a CV**: Navigate to the Resumeo section within your Monday.com environment and use the drag-and-drop interface to upload a CV.
2. **Review and Edit**: Automatically extracted information will be displayed. Review and make any necessary corrections.
3. **Submit**: Once reviewed, submit the information. It will automatically be added to your Monday.com board, either updating an existing record or creating a new one.

## Conclusion

Resumeo transforms the mundane task of data entry into a streamlined, efficient process. By automating CV handling, HR departments can allocate more time to engage with potential candidates and less on administrative tasks. As Resumeo evolves, we aim to incorporate more sophisticated features to further enhance its utility and user experience.
