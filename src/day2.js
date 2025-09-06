import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "", zipcode: "" },
    geo: { lat: "", lng: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["street", "suite", "city", "zipcode"].includes(name)) {
      setForm({
        ...form,
        address: { ...form.address, [name]: value },
      });
    } else if (["lat", "lng"].includes(name)) {
      setForm({
        ...form,
        geo: { ...form.geo, [name]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/users", form)
      .then((res) => {
        console.log("User created:", res.data); // ✅ just log it for now
        setForm({
          name: "",
          username: "",
          email: "",
          address: { street: "", suite: "", city: "", zipcode: "" },
          geo: { lat: "", lng: "" },
        });
      });
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="street" placeholder="Street" value={form.address.street} onChange={handleChange} />
        <input name="suite" placeholder="Suite" value={form.address.suite} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.address.city} onChange={handleChange} />
        <input name="zipcode" placeholder="Zipcode" value={form.address.zipcode} onChange={handleChange} />
        <input name="lat" placeholder="Latitude" value={form.geo.lat} onChange={handleChange} />
        <input name="lng" placeholder="Longitude" value={form.geo.lng} onChange={handleChange} />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default CreateUser;
