import React, { useState, useEffect } from "react";
import UserApi from "../../apis/UserApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await UserApi.get("/users", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
      console.log(response);
    }
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
    fetchData();
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ margin: "20px" }}>
        <button
          style={{
            padding: "10px 15px",
            color: "red",
            fontFamily: '"Nunito", sans-serif',
            fontSize: "20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={(e) => logOut(e)}
        >
          Log Out
        </button>
      </div>
      <center>
        <h1>Users: Count {users ? users.length : 0}</h1>
      </center>
      {users ? (
        users.map((user) => {
          return (
            <div
              style={{
                border: "1px solid #CCC",
                borderRadius: "5px",
                padding: "10px",
                backroundColor: "#a4a1b8",
                margin: "15px",
              }}
              key={user.email}
            >
              <h1>Name: {user.name}</h1>
              <h2>Email: {user.email}</h2>
            </div>
          );
        })
      ) : (
        <h1>No Users</h1>
      )}
    </div>
  );
};

export default Dashboard;
