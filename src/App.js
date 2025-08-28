import React from "react";
import { router, Route, NavLink, Routes } from "react-router-dom";


const App = () => {
  return (
    <>
      {/* <nav style={{ margin: "10px" }}>
        <NavLink to="/" style={{ marginRight: "10px" }}>Patients</NavLink>
      </nav> */}

      <Routes>
        <Route path="/" element={<Patient />} />
        
      </Routes>
    </>
  );
};

export default App;