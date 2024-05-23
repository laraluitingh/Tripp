import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "../css/Account.css";
import { useNavigate } from 'react-router-dom';

//template from https://mui.com

function Account(props) {
  const [userInformation, setUserInformation] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = props;


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
    <div className="profile-box">
        <Card className="profile">
      <CardActionArea>
        { userInformation.img && userInformation.img!==""
          ? <CardMedia
          component="img"
          height="250"
          image={userInformation.img}
          alt="green iguana"
        />
        :<CardMedia
        component="img"
        height="250"
        image="https://www.pngkey.com/png/detail/282-2820067_taste-testing-at-baskin-robbins-empty-profile-picture.png"
        alt="green iguana"
      /> 
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userInformation.name} | {userInformation.email}
          </Typography>
          {userInformation.bio && userInformation.bio!==""
          ?<Typography variant="body2" color="text.secondary">
          {userInformation.bio}
        </Typography>
        :<Typography variant="body2" color="text.secondary">
        Edit you profile to write something about yourself
      </Typography>}
         
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" onClick={editAccount}>Edit</Button>
      </CardActions>
      <CardActions>
      <Button variant="outlined" onClick={logOut}>Log out</Button>
      </CardActions>
    </Card>
    </div>
    </div>
  );
}

export default Account;
