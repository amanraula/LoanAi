import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prediction = queryParams.get("prediction");

  return (
    <div className="result-page">
      <h1>Prediction Result</h1>
      <p>{prediction ? `The predicted result is: ${prediction}` : "No prediction data available."}</p>
    </div>
  );
};

export default ResultPage;
