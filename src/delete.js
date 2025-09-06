import React from "react";
import axios from "axios";

const DeleteUser = ({ id, onUserDeleted }) => {
  const handleDelete = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => onUserDeleted(id));
  };

  return <button onClick={handleDelete}>❌ Delete</button>;
};

export default DeleteUser;
