import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import { FaCaretDown } from "react-icons/fa";
import Products from "../product/Products";
import jwtDecode from "jwt-decode";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/sign-in");
    }
    // fetchData();
  }, [navigate, token]);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.navBar}>
        <h1>I M S</h1>
        <div className={styles.user}>
          <p>{user.name}</p>
          <span>
            <FaCaretDown />
          </span>
          <div className={styles.options}>
            <p onClick={() => navigate("/dashbard/editProfile")}>
              Edit Profile
            </p>
            <div className={styles.underline}></div>
            <p onClick={() => navigate("/dashbard/changePass")}>
              Change Password
            </p>
            <div className={styles.underline}></div>
            <p onClick={(e) => logOut(e)} className={styles.logOutBtn}>
              LogOut
            </p>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default Dashboard;
