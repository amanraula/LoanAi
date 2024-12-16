from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd  # Import pandas for DataFrame creation

app = Flask(__name__)
CORS(app)

# Load the model
model_path = "model.pkl"
with open(model_path, "rb") as file:
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
            
            'So prediction ': prediction.tolist()  # Convert numpy array to list if necessary
        }
        return jsonify(response)
    except Exception as e:
        # Return the error as a JSON response
        return jsonify({'error Check datas': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
