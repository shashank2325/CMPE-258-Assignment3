
# NLP Models Hosting Application

## Overview
This repository contains a web application that hosts Hugging Face models to perform three NLP sequence tasks: translation, summarization, and question answering (QA). The application is structured into a frontend developed with React and a backend utilizing Flask.

## Project Structure
- `app3.py`: This is the Flask server that handles API requests for performing NLP tasks.
- `/frontend`: This directory contains the React application that provides the user interface.

## Setup and Running the Application

### Backend
1. Navigate to the project directory.
2. Install the required Python packages:
   ```bash
   pip install flask transformers flask_cors
   ```
3. Run the Flask application:
   ```bash
   python3 app3.py
   ```

### Frontend
1. Change to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary Node.js packages:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```

## Usage
The application supports three main NLP tasks:
- **Translation**: Translates input text from English to French, Spanish, or German.
- **Summarization**: Generates a concise summary of the provided text.
- **Question Answering**: Answers questions based on the provided context and question pair.

Select the desired task in the frontend, input the required text, and submit it to see the results.

