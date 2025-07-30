import React, { useState } from "react";
import axios from "axios";
import "./AppTourForm.css";

function AppTourForm() {
  // States
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    standard: "",
    phone: "",
    interest: [],
    message: ""
  });

  // Static Array
  const interests = ["NATA", "NIFT", "NID", "CEED", "UCEED"];

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const toggleInterest = (item) => {
    setFormData((prev) => {
      const updated = prev.interest.includes(item)
        ? prev.interest.filter((i) => i !== item)
        : [...prev.interest, item];
      return { ...prev, interest: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users", formData);
      alert("User submitted successfully!");
      console.log(response.data);
      setFormData({
        firstName: "",
        lastName: "",
        location: "",
        email: "",
        standard: "",
        phone: "",
        interest: [],
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit user.");
    }
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Take a Quick App Tour – Free!!!</h2>
      <div className="form-grid">
        <div className="form-left">
          <label>First name</label>
          <input name="firstName" placeholder="Enter your firstName" value={formData.firstName} onChange={handleChange} required />

          <label>Location</label>
          <input name="location" placeholder="Enter your location" value={formData.location} onChange={handleChange} required />

          <label>Select standard</label>
          <select name="standard" value={formData.standard} onChange={handleChange} required>
            <option value="">Standard</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>

          <label>Phone number</label>
          <div className="phone-input">
            <span>🇮🇳 +91</span>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-right">
          <label>Last name</label>
          <input name="lastName" placeholder="Enter your lastName" value={formData.lastName} onChange={handleChange} required />

          <label>E-mail</label>
          <input type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Field of interest!!</label>
          <div className="interest-buttons">
            {interests.map((item) => (
              <button
                key={item}
                type="button"
                className={formData.interest.includes(item) ? "selected" : ""}
                onClick={() => toggleInterest(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <textarea
            name="message"
            placeholder="Write a message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>

      <button className="submit-button" type="submit">Submit</button>
    </form>
  );
}

export default AppTourForm;
