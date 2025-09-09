import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Create from "./Create";
import Read from "./Read";
import Update from "./Update";
import DeleteUser from "./Delete";

const App = () => {
  const [users, setUsers] = useState([]);

  // load initial dummy users from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
  <div style={{ padding: "20px" }}>
    <h1>CRUD with Dummy API</h1>

    {/* Navigation */}
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/create" style={styles.link}>Create</Link>
      <Link to="/read" style={styles.link}>Read</Link>
      <Link to="/update" style={styles.link}>Update</Link>
      <Link to="/delete" style={styles.link}>Delete</Link>
    </nav>

    {/* Routes */}
    <Routes>
      <Route path="/" element={<Create users={users} setUsers={setUsers} />} />
      <Route path="/create" element={<Create users={users} setUsers={setUsers} />} />
      <Route path="/read" element={<Read users={users} />} />
      <Route path="/update" element={<Update users={users} setUsers={setUsers} />} />
      <Route path="/delete" element={<DeleteUser users={users} setUsers={setUsers} />} />
    </Routes>
  </div>
);
};

const styles = {
  link: {
    marginRight: "15px",
    textDecoration: "none",
    color: "blue",
    fontWeight: "bold"
  }
};

export default App;
