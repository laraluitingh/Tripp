import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from 'axios';

import Homepage from './pages/hompeage';
import SignUp from './pages/signup'
import SignIn from './pages/signin';
import Calender from './pages/calender';
import Account from './pages/account';
import Dashboard from "./pages/dashboard";
import NavBar from './components/navBar';

import './css/App.css';


function App() {

  // isLoggedIn will be updated when the user is logged in as well in SignIn page
  // isLoggedIn will be updated when the user logs out
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // this function will only be run once
  useEffect(() => {
    // make an axios call to determine if the user is logged in
    // this function will only be called once
    // once you get a response, setIsLoggedIn(response.???)
    axios('/user/session').then( ()=>{
      setIsLoggedIn(true)

    }
    ).catch((err)=>{
      setIsLoggedIn(false)

    })
  }, []);

  return (
    <>
   <Router>
   <NavBar isLoggedIn={isLoggedIn}/>
     <Routes>
       <Route path="/" element={<Homepage/>} />
       <Route path="signup" element={<SignUp/>}/>
       <Route path="signIn" element={<SignIn loggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
       <Route path="account" element={<Account/>}/>
       <Route path="calender" element={<Calender/>}/>
       <Route path="dashboard" element={<Dashboard/>}/>
     </Routes>
   </Router>
   </>
  );
}

export default App;
