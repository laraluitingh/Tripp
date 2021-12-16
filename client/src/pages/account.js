import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "../css/Account.css";

function Account() {
  const [userInformation, setUserInformation] = useState("");

  useEffect(() => {
    axios.get(`/user/information`).then((res) => {
      console.log(res.data)
      setUserInformation(res.data.information[0])
    });
  }, []);

  return (
    <div className="backgound-account">
    <div className="profile-box">
        <Card className="profile">
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image="https://www.pngkey.com/png/detail/282-2820067_taste-testing-at-baskin-robbins-empty-profile-picture.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userInformation.name} | {userInformation.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Edit you profile to write something about yourself
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary">Edit</Button>
      </CardActions>
      <CardActions>
      <Button variant="outlined">Log out</Button>
      </CardActions>
    </Card>
    </div>
    </div>
  );
}

export default Account;
