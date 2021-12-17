import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Homepage from "./pages/hompeage";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Account from "./pages/account";
import Dashboard from "./pages/dashboard";
import NavBar from "./components/navBar";
import UpdateAccount from "./pages/editProfile";

import "./css/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios("/user/session")
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="signIn"
            element={
              <SignIn loggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="account"
            element={
              <Account loggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="updateAccount" element={<UpdateAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
