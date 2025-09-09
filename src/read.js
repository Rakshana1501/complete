import React from "react";

const Read = ({ users }) => {
  return (
    <div>
      <h2>Read Users</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        users.map((u) => (
          <div
            key={u.id}
            style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}
          >
            <p><b>ID:</b> {u.id}</p>
            <p><b>Name:</b> {u.name}</p>
            <p><b>Username:</b> {u.username}</p>
            <p><b>Email:</b> {u.email}</p>
            {u.address && (
              <>
                <p>
                  <b>Address:</b> {u.address.street}, {u.address.suite},{" "}
                  {u.address.city}, {u.address.zipcode}
                </p>
                {u.address.geo && (
                  <p>
                    <b>Geo:</b> Lat: {u.address.geo.lat}, Lng: {u.address.geo.lng}
                  </p>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Read;
