import React, { useState } from "react";
import axios from "axios";

const Create = ({ users, setUsers }) => {
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

  // submit with axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/users", form, {
        headers: { "Content-Type": "application/json" },
      });
      const newUser = { id: users.length + 1, ...form };
      setUsers([...users, newUser]); 
      alert("User Created: " + JSON.stringify(res.data));
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to create user");
    }
  };

  return (
    <div className="create-container">
      {/* Internal CSS */}
      <style>{`
        .create-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 25px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .create-container h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
          font-size: 22px;
        }

        .create-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .create-form input {
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          transition: all 0.3s ease;
          width: 100%;
        }

        .create-form input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
        }

        .create-form button {
          margin-top: 10px;
          padding: 12px;
          font-size: 15px;
          font-weight: bold;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .create-form button:hover {
          background: #0056b3;
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

      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
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

        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default Create;
