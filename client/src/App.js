import React from "react";
import "./app.css";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateComponent from "./components/PrivateComponent";
import EditProfile from "./components/edit-profile/EditProfile";
import ChangePass from "./components/change-password/ChangePass";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route
              exact
              path="/dashbard/editProfile"
              element={<EditProfile />}
            />
            <Route exact path="/dashbard/changePass" element={<ChangePass />} />
          </Route>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
