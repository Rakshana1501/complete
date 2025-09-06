import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import CreateUser from "./day2";
import ReadUsers from "./read";
import UpdateUser from "./update";
import DeleteUser from "./delete";

const App = () => {
  return (
    <>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/create">Create</Link> |{" "}
        <Link to="/read">Read</Link> |{" "}
        <Link to="/update">Update</Link> |{" "}
        <Link to="/delete">Delete</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/read" element={<ReadUsers />} />
        <Route path="/update" element={<UpdateUser />} />
        <Route path="/delete" element={<DeleteUser />} />
      </Routes>
    </>
  );
};

export default App;
