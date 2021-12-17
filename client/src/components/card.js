import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getSelectUtilityClasses, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import Comment from "./comment";
import axios from "axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import "../css/Post.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard(props) {
  const [body, setBody] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const postObject = props.obj;
  const [comment, setComments] = useState([])
  const [userLikes, setUserLikes]= useState(false)
  const [postLikes, setPostLikes]=useState(0)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const postDetails = () => {
    const time = new Date().toISOString();
    const postId = postObject._id;


    const commentForm={
        postId: postId,
        body: body,
        time: time,
      };



      axios
  .post('/comment', commentForm )
  .then(() => {
    console.log("success")
    return axios.get(`/comment/${postObject._id}`);
  })
  .then(res => {
    setComments(res.data.result)
  })

  };

  useEffect(() => {
    axios.get(`/comment/${postObject._id}`).then( (res)=>{
      setComments(res.data.result)

    }
    ).catch((err)=>{
      console.log(err)

    })

    axios.get(`/like/userLikes/${postObject._id}`).then((res)=>{
        if(res.data.result.length!==0){
            setUserLikes(true)
        }
    })

    axios.get(`/like/postLikes/${postObject._id}`).then((res)=>{
        setPostLikes(res.data.result.length)
    })


  }, []);

  const LikePost=()=>{
    setUserLikes(true)
    setPostLikes(postLikes+1)

    axios.post(`/like/${postObject._id}`).then((res)=>{
       

    }).catch((err)=>{
        console.log(err)
    })

  }

  const unLikePost=()=>{
    setUserLikes(false)
    setPostLikes(postLikes-1)

    axios.delete(`/like/${postObject._id}`).then((res)=>{
        
    }).catch((err)=>{
        console.log(err)
    })

  }


  return (
    <div className="AllPosts">
      <Card sx={{ mb: 3 }} id="post">
        <CardHeader
          avatar={
            <Avatar alt={postObject.userId.name} src="/static/images/avatar/1.jpg" />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={postObject.userId.name}
          subheader={postObject.time}
        />

        {postObject.img !== "" && (
          <CardMedia
            className="image-post"
            component="img"
            height="194"
            image={postObject.img}
            alt="Paella dish"
          />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {postObject.body}
          </Typography>
        </CardContent>
       
            {userLikes
            ? <IconButton aria-label="add to favorites" onClick={()=>{unLikePost()}}>
                <FavoriteIcon/>
                </IconButton>
        :  <IconButton aria-label="add to favorites" onClick={()=>{LikePost()}}>
            <FavoriteBorderIcon />
            </IconButton>}<span>{postLikes} Likes</span>
        <div id="comment">
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
            style={{ width: "80%" }}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            value={body}
          />{" "}
          <Button
            variant="outlined"
            sx={{ ml: 1 }}
            onClick={() => postDetails()}
            className="comment-button"
          >
            Comment
          </Button>
        </div>
        <div>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 350,
              }}
            >
            {comment.length!==0 
            ? comment.map(function(object, i){
                return <Comment obj={object} key={i}/>
               })
               :<p>No comments</p>}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
