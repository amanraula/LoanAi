// app.js
import React from "react";
import Navbar from "./components/Navbar"; // Navbar component
import Footer from "./components/Footer"; // Footer component
import InputForm from "./components/InputForm"; // Form component
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <div className="App">
      {/* Render Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <h1>Loan Approval Prediction</h1>
        {/* Render Input Form */}
        <InputForm />

      </main>
      

      {/* Render Footer */}
      <Footer />
    </div>
  );
}

export default App;
