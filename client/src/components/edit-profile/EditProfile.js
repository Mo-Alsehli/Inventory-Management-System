import React, { useState, useEffect } from "react";
import styles from "./edit-profile.module.css";
import { FaRegSun, FaLongArrowAltLeft } from "react-icons/fa";
import jwt from "jwt-decode";
import UserApi from "../../apis/UserApi";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  let token = localStorage.getItem("token");
  let user = jwt(token);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await UserApi.patch(`update/${user.userId}`, {
        name,
        email,
      });
      localStorage.setItem("token", response.data.token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.settings}>
        <span>
          <FaRegSun />
        </span>
        <h2>Settings</h2>
      </div>
      <div className={styles.underline}></div>
      <form className={styles.formWrapper}>
        <label>User Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.formInput}
          placeholder="please enter your new name"
          type="text"
        />
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.formInput}
          placeholder="please enter your new email"
          type="text"
        />
        <button
          type="submit"
          className={styles.submitBtn}
          onClick={(e) => submitForm(e)}
        >
          Submit
        </button>
      </form>
      <button className={styles.backBtn} onClick={() => navigate("/dashboard")}>
        <span>
          <FaLongArrowAltLeft />
        </span>{" "}
        Back
      </button>
    </div>
  );
};

export default EditProfile;
