import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signUp.module.css";
import UserApi from "../.././apis/UserApi";

const SignUp = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/dashboard");
    } else {
      navigate("/sign-up");
    }
  }, [navigate]);

  const handleSignInPage = (e) => {
    e.stopPropagation();
    navigate("/sign-in");
  };

  const signUp = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await UserApi.post("/register", {
        name,
        email,
        password,
      });
      if (!response) {
        throw new Error(`Please Provide Credintials`);
      }
      console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      throw new Error(`Please Enter Valid Credintials: ${error}`);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.signUpWrapper}>
          <div className={styles.signTraverse}></div>
          <div className={styles.signUpFormWrapper}>
            <h1>Welcome !</h1>
            <span>Please enter your details</span>
            <form className={styles.formInput}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className={styles.inputField}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className={styles.submitBtn}
                onClick={(e) => signUp(e)}
              >
                Sign Up
              </button>
              <button className={styles.googleSignBtn}>
                <i className={styles.googleIcon}></i>
                <span>Sign up with Google </span>
              </button>
              <p className={styles.signInLink}>
                Have an account?{" "}
                <button onClick={(e) => handleSignInPage(e)}>Sign in</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
