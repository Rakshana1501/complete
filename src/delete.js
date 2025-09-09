import React, { useState } from "react";
import axios from "axios";

const DeleteUser = ({ users, setUsers }) => {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    if (!id) {
      alert("Please enter a valid User ID");
      return;
    }

    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      
      // Update local state after delete
      setUsers(users.filter((u) => u.id !== parseInt(id)));

      alert("User Deleted with ID: " + id);
      setId(""); // clear input
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <input
        placeholder="User ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteUser;
