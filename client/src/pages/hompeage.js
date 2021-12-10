import * as React from "react";
import Button from "@mui/material/Button";
import "../css/Homepage.css";
import Box from '@mui/material/Box';
import logo from '../assets/logo-white.png'

function Homepage() {
  return (
    <div className="App">
    <div className="picture-homepage">
      <div className="homepage-box">
        <div className="inner-homepage">
            <img src={logo} className="title-home"/>
          <div className="homepage-des">
            <p>
              Excited for an upcoming trip but not so sure what you wanna do?
              Use trippo to find popular locations and restaurnts you would like
              to visit. Signup to plan your next trip.
            </p>
          </div>
          <Box className="sign-up-box">
          <Button variant="contained" className="signup" to="/signup">Signup</Button>
          </Box>
          
        </div>
      </div>
    </div>
    </div>
  );
}
export default Homepage;