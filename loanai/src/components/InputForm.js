import React, { useState } from "react";
import "./InputForm.css"; // Import CSS for styling

const InputForm = () => {
  const [formData, setFormData] = useState({
    person_age: "",
    person_income: "",
    person_home_ownership: "",
    person_emp_length: "",
    loan_intent: "",
    loan_grade: "",
    loan_amnt: "",
    loan_int_rate: "",
    loan_percent_income: "",
    cb_person_default_on_file: "",
    cb_person_cred_hist_length: ""
  });

  const [prediction, setPrediction] = useState(null); // State to store prediction result

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://loanai-er14.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction(data.prediction); // Update prediction state

    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("An error occurred while fetching the prediction.\n Model (port 5000) error");
    }
  }

  return (
    <div className="input-form">
      {prediction && <div className="prediction-result">Prediction: {prediction}</div>} {/* Display prediction if available */}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>AGE</label>
          <input
            type="number"
            name="person_age"
            placeholder="Enter Age"
            value={formData.person_age}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>INCOME</label>
          <input
            type="number"
            name="person_income"
            placeholder="Enter Income"
            value={formData.person_income}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>OWNERSHIP</label>
          <select
            name="person_home_ownership"
            value={formData.person_home_ownership}
            onChange={handleChange}
          >
            <option value="RENT">RENT</option>
            <option value="OWN">OWN</option>
            <option value="MORTGAGE">MORTGAGE</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>

        <div className="form-row">
          <label>EMP_LENGTH</label>
          <input
            type="number"
            name="person_emp_length"
            placeholder="Enter Employment Length"
            value={formData.person_emp_length}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>INTENTION</label>
          <select
            name="loan_intent"
            value={formData.loan_intent}
            onChange={handleChange}
          >
            <option value="EDUCATION">EDUCATION</option>
            <option value="MEDICAL">MEDICAL</option>
            <option value="PERSONAL">PERSONAL</option>
            <option value="VENTURE">VENTURE</option>
            <option value="HOMEIMPROVEMENT">HOME IMPROVEMENT</option>
            <option value="DEBTCONSOLIDATION">DEBT CONSOLIDATION</option>
          </select>
        </div>

        <div className="form-row">
          <label>LOAN GRADE</label>
          <select
            name="loan_grade"
            value={formData.loan_grade}
            onChange={handleChange}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
          </select>
        </div>

        <div className="form-row">
          <label>AMOUNT</label>
          <input
            type="number"
            name="loan_amnt"
            placeholder="Enter Amount"
            value={formData.loan_amnt}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>INTEREST RATE</label>
          <input
            type="number"
            step="0.01"
            name="loan_int_rate"
            placeholder="Enter Interest Rate"
            value={formData.loan_int_rate}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>% INCOME PAY</label>
          <input
            type="number"
            step="0.01"
            name="loan_percent_income"
            placeholder="Enter % Income Pay"
            value={formData.loan_percent_income}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>DEFAULT FILE</label>
          <select
            name="cb_person_default_on_file"
            value={formData.cb_person_default_on_file}
            onChange={handleChange}
          >
            <option value="Y">Y</option>
            <option value="N">N</option>
          </select>
        </div>

        <div className="form-row">
          <label>HIST_LENGTH</label>
          <input
            type="number"
            name="cb_person_cred_hist_length"
            placeholder="Enter History Length"
            value={formData.cb_person_cred_hist_length}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="predict-button">PREDICT</button>
      </form>
    </div>
  );
};

export default InputForm;
