  import React, { useState } from "react";
  import axios from "axios";

  const UpdateUser = ({ user, onUserUpdated }) => {
    const [form, setForm] = useState(user);

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
          address: {
            ...form.address,
            geo: { ...form.address.geo, [name]: value },
          },
        });
      } else {
        setForm({ ...form, [name]: value });
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${form.id}`, form)
        .then((res) => onUserUpdated(res.data));
    };

    return (
      <div>
        <h3>Update User</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="username" value={form.username} onChange={handleChange} />
          <input name="email" value={form.email} onChange={handleChange} />
          <input name="street" value={form.address.street} onChange={handleChange} />
          <input name="city" value={form.address.city} onChange={handleChange} />
          <input name="zipcode" value={form.address.zipcode} onChange={handleChange} />
          <input name="lat" value={form.address.geo.lat} onChange={handleChange} />
          <input name="lng" value={form.address.geo.lng} onChange={handleChange} />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  };

  export default UpdateUser;
