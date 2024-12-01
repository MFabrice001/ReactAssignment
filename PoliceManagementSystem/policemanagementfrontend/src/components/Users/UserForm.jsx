import React, { useState } from "react";
import api from "../../services/api";

const UserForm = ({ user }) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "USER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await api.put(`/users/${user.id}`, formData);
        alert("User updated successfully!");
      } else {
        await api.post("/users", formData);
        alert("User created successfully!");
      }
    } catch (err) {
      alert("Failed to save user.");
    }
  };

  return (
    <div>
      <h1>{user ? "Edit User" : "Create User"}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">{user ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default UserForm;
