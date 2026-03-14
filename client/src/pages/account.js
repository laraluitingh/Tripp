import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { Button, Avatar, Box, Divider, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import "../css/Account.css";
import { useNavigate } from 'react-router-dom';

//template from https://mui.com

function Account(props) {
  const [userInformation, setUserInformation] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = props;


  useEffect(() => {
    axios.get(`/user/information`).then((res) => {
      setUserInformation(res.data.information[0])
    });
  }, []);

  function logOut(){
    axios.delete('/user').then(()=>{
      
      return axios('/user/session')

    }).then( ()=>{
      setIsLoggedIn(true)
      navigate('/')

    }
    ).catch((err)=>{
      setIsLoggedIn(false)
      navigate('/')

    })

  }

  function editAccount(){
    navigate('/updateAccount')

  }

  return (
    <div className="backgound-account">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', pt: 10, px: 2 }}>
        <Paper elevation={4} sx={{ width: '100%', maxWidth: 480, borderRadius: 4, overflow: 'hidden' }}>
          {/* Cover / Banner */}
          <Box sx={{ height: 120, background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)' }} />

          {/* Avatar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: -7, mb: 1 }}>
            <Avatar
              src={
                userInformation.img && userInformation.img !== ""
                  ? userInformation.img
                  : "https://www.pngkey.com/png/detail/282-2820067_taste-testing-at-baskin-robbins-empty-profile-picture.png"
              }
              alt={userInformation.name}
              sx={{ width: 100, height: 100, border: '4px solid white', boxShadow: 3 }}
            />
          </Box>

          {/* Info */}
          <Box sx={{ textAlign: 'center', px: 4, pb: 1 }}>
            <Typography variant="h5" fontWeight={700}>{userInformation.name}</Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>{userInformation.email}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="text.secondary" sx={{ minHeight: 48 }}>
              {userInformation.bio && userInformation.bio !== ""
                ? userInformation.bio
                : "Edit your profile to write something about yourself"}
            </Typography>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 2, px: 4, pb: 4, pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<EditIcon />}
              onClick={editAccount}
              sx={{ borderRadius: 2 }}
            >
              Edit Profile
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={logOut}
              sx={{ borderRadius: 2 }}
            >
              Log Out
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Account;
