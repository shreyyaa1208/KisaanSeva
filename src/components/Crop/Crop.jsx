import React, { useState } from "react";
import "./styles.css";
import Image2 from "../../assets/image2.jpg";
import Image3 from "../../assets/image3.jpg";
import Image4 from "../../assets/image4.jpg";

const Crop = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [cropPrediction, setCropPrediction] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const API_BASE = "https://kisaan-seva-backend.vercel.app";

  const handleSubmit = async () => {
    const data = {
      temp: formData.temperature,
      humidity: formData.humidity,
      ph: formData.ph,
      rainfall: formData.rainfall,
      N: formData.nitrogen,
      P: formData.phosphorus,
      K: formData.potassium,
    };

    try {
      const response = await fetch(`${API_BASE}/api/predict-crop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setCropPrediction(result.recommendedCrop); // 🟢 Store prediction
    } catch (error) {
      alert("Something went wrong. Try again.");
      console.error("API error:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">About Crop Recommendation Model</h2>
      <h3 className="subheading">
        Empowering Farmers with AI-Driven Crop Insights
      </h3>
      <p className="description">
        🌾 The Crop Recommendation System revolutionizes how farmers choose
        crops. It takes into account the mineral composition of the soil,
        including potassium, nitrogen and phosphorous, as well as factors like
        humidity, temperature and rainfall. By analyzing these factors, farmers
        can ensure optimal crop selection, leading to higher yields and
        sustainable farming practices.
      </p>

      <div className="how-it-works">
        <h4 className="how-it-works-title">😊 How it Works!</h4>
        <div className="feature">
          <span className="icon">🔵</span>
          <span>Analyze soil and environmental parameters.</span>
        </div>
        <div className="feature">
          <span className="icon">📊</span>
          <span>Get precise crop recommendations based on data.</span>
        </div>
        <div className="feature">
          <span className="icon">🌾</span>
          <span>Make informed decisions on crop management.</span>
        </div>
      </div>

      <div className="right-section">
        <h2 className="form-heading">Crop Recommendation</h2>

        <div className="circle-images">
          <div className="circle-wrapper">
            <img src={Image2} alt="Plant Growth" className="circle-img" />
          </div>
          <div className="circle-wrapper larger offset">
            <img src={Image3} alt="Watering Plant" className="circle-img" />
          </div>
          <div className="circle-wrapper">
            <img src={Image4} alt="Crop Field" className="circle-img" />
          </div>
        </div>
        <div className="form-container">
          <h3 className="form-title">Crop Recommendation</h3>
          <div className="form-grid">
            {[
              "nitrogen",
              "phosphorus",
              "potassium",
              "temperature",
              "humidity",
              "ph",
            ].map((field, index) => (
              <div key={index}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  name={field}
                  placeholder={field === "ph" ? "1 to 14" : ""}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <div className="full-width">
              <label>Rainfall</label>
              <input
                type="text"
                name="rainfall"
                placeholder="1 to 300 mm"
                value={formData.rainfall}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
          >
            Predict Crop that is suitable
          </button>

          {cropPrediction && (
            <div className="prediction-result">
              <h4>🌾 Recommended Crop:</h4>
              <p>{cropPrediction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Crop;
