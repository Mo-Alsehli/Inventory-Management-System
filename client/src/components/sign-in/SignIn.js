import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signIn.module.css";
import UserApi from "../.././apis/UserApi";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSignUpPage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate("/sign-up");
  };

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/dashboard");
    } else {
      navigate("/sign-in");
    }
  }, [navigate]);

  const signIn = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await UserApi.post("/login", {
        email: email,
        password: password,
      });
      if (!response) {
        console.log("faild");
      }
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.signInWrapper}>
          <div className={styles.signInFormWrapper}>
            <h1>Welcome Back</h1>
            <span>Welcome back! Please enter your details</span>
            <form className={styles.formInput}>
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
              <div className={styles.rememberCredientials}>
                <div>
                  <input type="checkbox" value="Remember For 30 Days" />
                  <span>Remember For 30 Days</span>
                </div>
                <a href="#" target="_blank">
                  Forgot Passoword
                </a>
              </div>
              <button
                type="submit"
                className={styles.submitBtn}
                onClick={(e) => signIn(e)}
              >
                Sign In
              </button>
              <button className={styles.googleSignBtn}>
                <i className={styles.googleIcon}></i>
                <span>Sign in with Google </span>
              </button>
              <p className={styles.signUpLink}>
                Don't have an account?{" "}
                <button onClick={(e) => handleSignUpPage(e)}>Sign up</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
