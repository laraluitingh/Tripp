import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import {
  Button, Avatar, Box, Divider, Paper,
  Dialog, DialogTitle, DialogContent, List, ListItem, ListItemAvatar, ListItemText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import "../css/Account.css";
import { useNavigate } from 'react-router-dom';

//template from https://mui.com

function Account(props) {
  const [userInformation, setUserInformation] = useState("");
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [followList, setFollowList] = useState([]);
  const [followListTitle, setFollowListTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = props;

  useEffect(() => {
    axios.get(`/user/information`).then((res) => {
      const info = res.data.information[0];
      setUserInformation(info);
      if (info?._id) {
        axios.get(`/follow/counts/${info._id}`).then((r) => setCounts(r.data));
      }
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

  const openFollowers = () => {
    axios.get(`/follow/followers/${userInformation._id}`).then((res) => {
      setFollowList(res.data.result.map((r) => r.followerId));
      setFollowListTitle("Followers");
      setDialogOpen(true);
    });
  };

  const openFollowing = () => {
    axios.get(`/follow/following/${userInformation._id}`).then((res) => {
      setFollowList(res.data.result.map((r) => r.followingId));
      setFollowListTitle("Following");
      setDialogOpen(true);
    });
  };

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

            {/* Follower / Following counts */}
            <Box display="flex" justifyContent="center" gap={3} mt={3} mb={1}>
              <Box sx={{ cursor: "pointer", textAlign: "center" }} onClick={openFollowers}>
                <Typography variant="h6" fontWeight={700}>{counts.followers}</Typography>
                <Typography variant="caption" color="text.secondary">Followers</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ cursor: "pointer", textAlign: "center" }} onClick={openFollowing}>
                <Typography variant="h6" fontWeight={700}>{counts.following}</Typography>
                <Typography variant="caption" color="text.secondary">Following</Typography>
              </Box>
            </Box>
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

      {/* Followers / Following Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PeopleIcon /> {followListTitle}
        </DialogTitle>
        <DialogContent dividers>
          {followList.length === 0 ? (
            <Typography color="text.secondary" py={2} textAlign="center">Nobody here yet</Typography>
          ) : (
            <List disablePadding>
              {followList.map((user) => (
                <ListItem
                  key={user._id}
                  sx={{ cursor: "pointer", borderRadius: 2, "&:hover": { bgcolor: "grey.100" } }}
                  onClick={() => { setDialogOpen(false); navigate(`/profile/${user._id}`); }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={user.img || "https://www.pngkey.com/png/detail/282-2820067_taste-testing-at-baskin-robbins-empty-profile-picture.png"}
                      alt={user.name}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Account;
