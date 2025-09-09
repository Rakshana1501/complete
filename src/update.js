import React, { useState } from "react";
import axios from "axios";

const Update = ({ users, setUsers }) => {
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "", zipcode: "", geo: { lat: "", lng: "" } }
  });

  // handle nested values
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child, subchild] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: subchild ? { ...prev[parent][child], [subchild]: value } : value,
        },
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // submit update with axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, form, {
        headers: { "Content-Type": "application/json" },
      });

      // Update local state
      setUsers(users.map((u) => (u.id === parseInt(id) ? { ...u, ...form } : u)));

      alert("User Updated!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  return (
    <div className="update-container">
      {/* Internal CSS */}
      <style>{`
        .update-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 25px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .update-container h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
          font-size: 22px;
        }

        .update-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .update-form input {
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          transition: all 0.3s ease;
          width: 100%;
        }

        .update-form input:focus {
          border-color: #28a745;
          outline: none;
          box-shadow: 0 0 5px rgba(40, 167, 69, 0.3);
        }

        .update-form button {
          margin-top: 10px;
          padding: 12px;
          font-size: 15px;
          font-weight: bold;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .update-form button:hover {
          background: #1e7e34;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <h2>Update User</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <input
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="address.street" placeholder="Street" onChange={handleChange} />
        <input name="address.suite" placeholder="Suite" onChange={handleChange} />

        {/* City + Zipcode in one row */}
        <div className="form-row">
          <input name="address.city" placeholder="City" onChange={handleChange} />
          <input name="address.zipcode" placeholder="Zipcode" onChange={handleChange} />
        </div>

        {/* Latitude + Longitude in one row */}
        <div className="form-row">
          <input name="address.geo.lat" placeholder="Latitude" onChange={handleChange} />
          <input name="address.geo.lng" placeholder="Longitude" onChange={handleChange} />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;
