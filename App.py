from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os  # For checking if the file exists

app = Flask(__name__)
CORS(app)

# Function to download the model file
def download_model(url, local_path):
    import requests
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(local_path, "wb") as file:
                file.write(response.content)
            print("Model downloaded successfully!")
        else:
            raise Exception(f"Failed to download the model. HTTP Status Code: {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")
        raise

# File paths and URLs
model_url = "https://drive.google.com/uc?id=1U8tbl2bmV0oJ7dRMW7XCKmYgb5PqcZgh"  # Updated Google Drive link
local_model_path = "model.pkl"  # Local file path to save the model

# Check if the model file already exists
if not os.path.exists(local_model_path):
    print("Model file not found locally. Downloading...")
    download_model(model_url, local_model_path)
else:
    print("Model file found locally. Skipping download.")

# Load the model
with open(local_model_path, "rb") as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input JSON data
        input_data = request.get_json()

        # Convert the input JSON into a DataFrame
        input_df = pd.DataFrame([input_data])  # Wrap input_data in a list for a single-row DataFrame

        # Make the prediction
        prediction = model.predict(input_df)

        # Return the prediction as a JSON response
        response = {
            'prediction': prediction.tolist()  # Convert numpy array to list if necessary
        }
        return jsonify(response)
    except Exception as e:
        # Return the error as a JSON response
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
