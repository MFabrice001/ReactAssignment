import React, { useState } from "react";
import api from "../../services/api";

const CrimeForm = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/crimes", formData);
      alert("Crime report submitted successfully!");
    } catch (err) {
      alert("Failed to submit the report.");
    }
  };

  return (
    <div>
      <h1>Report a Crime</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CrimeForm;
