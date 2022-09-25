import React, { useState, useEffect } from "react";
import UserApi from "../../apis/UserApi";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import { FaAngleDoubleDown } from "react-icons/fa";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    /* async function fetchData() {
      const response = await UserApi.get("/users", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
      console.log(response);
    } */
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
    // fetchData();
  }, [navigate, token]);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.navBar}>
        <h1>IMS</h1>
        <div className={styles.user}>
          <p>Mohamed Magdi</p>
          <span>
            <FaAngleDoubleDown />
          </span>
          <div className={styles.options}>
            <p onClick={() => navigate("/dashbard/editProfile")}>
              Edit Profile
            </p>
            <div className={styles.underline}></div>
            <p onClick={() => navigate("/dashbard/changePass")}>
              Change Password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
