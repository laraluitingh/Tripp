import { Link as LinkRouter } from 'react-router-dom';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import logo from '../assets/logo.png'

import '../css/navBar.css';



function NavBar(props) {


  // axios.get('/user/session').then((res)=>{
  //   setbutton=

  // })
  
    return (
      <div>
        <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <img src={logo} className="logo-nav-bar" alt="logo"></img>
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              sx={{ my: 1, mx: 1.5 }}
            >
              <LinkRouter to="/places">Attractions</LinkRouter>
            </Link>
            <Link
              variant="button"
              color="text.primary"
              sx={{ my: 1, mx: 1.5 }}
            >
              <LinkRouter to="/calender">Calender</LinkRouter>
            </Link>
            {
              props.isLoggedIn 
              ?<Link
              variant="button"
              color="text.primary"
              sx={{ my: 1, mx: 1.5 }}
            >
              <LinkRouter to="/account">Account</LinkRouter>
            </Link>
            :<Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          <LinkRouter to="/signIn">Login</LinkRouter>
          </Button>
            }
          
          </nav>

        </Toolbar>
      </AppBar>
      </div>
    );
  }
  export default NavBar;