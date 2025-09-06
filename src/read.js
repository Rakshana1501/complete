import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateUser from "./update";
import DeleteUser from "./delete";

const ReadUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUserCreated = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditUser(null);
  };

  const handleUserDeleted = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <b>{u.name}</b> ({u.username}, {u.email})  
            <br />
            Address: {u.address.street}, {u.address.city}, {u.address.zipcode}  
            <br />
            Geo: {u.address.geo?.lat}, {u.address.geo?.lng}
            <br />
            <button onClick={() => setEditUser(u)}>✏️ Update</button>
            <DeleteUser id={u.id} onUserDeleted={handleUserDeleted} />
          </li>
        ))}
      </ul>

      {editUser && (
        <UpdateUser user={editUser} onUserUpdated={handleUserUpdated} />
      )}
    </div>
  );
};

export default ReadUsers;
