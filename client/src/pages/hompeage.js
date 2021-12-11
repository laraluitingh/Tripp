import * as React from "react";
import Button from "@mui/material/Button";
import "../css/Homepage.css";
import Box from '@mui/material/Box';
import logo from '../assets/logo-white.png'
import { useNavigate } from 'react-router-dom';


function Homepage() {
  const navigate = useNavigate();
  const redirect = () => {
   navigate('/signup')
  }
  return (
    <>
    <div className="App">
    <div className="picture-homepage">
      <div className="homepage-box">
        <div className="inner-homepage">
            <img src={logo} className="title-home" alt="logo"/>
          <div className="homepage-des">
            <p>
              Excited for an upcoming trip but not so sure what you wanna do?
              Use trippo to find popular locations and restaurnts you would like
              to visit. Signup to plan your next trip.
            </p>
          </div>
          <Box className="sign-up-box">
          <Button variant="contained" className="signup" onClick={redirect}>Signup</Button>
          </Box>
          
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
export default Homepage;
