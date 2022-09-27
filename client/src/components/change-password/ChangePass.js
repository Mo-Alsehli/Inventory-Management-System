import React, { useState, useEffect } from "react";
import styles from "./change-pass.module.css";
import { FaRegSun, FaLongArrowAltLeft } from "react-icons/fa";
import jwt from "jwt-decode";
import UserApi from "../../apis/UserApi";
import { useNavigate } from "react-router-dom";

const ChangePass = () => {
  let token = localStorage.getItem("token");
  let user = jwt(token);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await UserApi.patch(`updatePassword/${user.userId}`, {
        oldPassword,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.settings}>
          <span>
            <FaRegSun />
          </span>
          <h2>Settings</h2>
        </div>
        <div className={styles.underline}></div>
        <form className={styles.formWrapper}>
          <label>Old Password</label>
          <input
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={styles.formInput}
            placeholder="please enter old password"
            type="password"
          />
          <label>New Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
            placeholder="please enter new password"
            type="password"
          />
          <button
            type="submit"
            className={styles.submitBtn}
            onClick={(e) => submitForm(e)}
          >
            Submit
          </button>
        </form>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          <span>
            <FaLongArrowAltLeft />
          </span>{" "}
          Back
        </button>
      </div>
    </div>
  );
};

export default ChangePass;
