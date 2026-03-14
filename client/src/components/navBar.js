import { Link as LinkRouter } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
            {
              props.isLoggedIn
              ? <LinkRouter to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', margin: '0 12px' }}>Dashboard</LinkRouter>
              : <p></p>
            }

            {
              props.isLoggedIn 
              ? <LinkRouter to="/account" style={{ textDecoration: 'none', color: 'inherit', margin: '0 12px' }}>Account</LinkRouter>
              : <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                  <LinkRouter to="/signIn" style={{ textDecoration: 'none', color: 'inherit' }}>Login</LinkRouter>
                </Button>
            }
          
          </nav>

        </Toolbar>
      </AppBar>
      </div>
    );
  }
  export default NavBar;