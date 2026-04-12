import * as React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import Comment from "./comment";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

import "../css/Post.css";

//template from https://mui.com
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
      const navigate = useNavigate();
      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);
      const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleMenuClose = () => {
        setAnchorEl(null);
      };
    const deletePost = () => {
      axios.delete(`/post/${postObject._id}`)
        .then(() => {
          // Optionally refresh posts or notify parent
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  const [body, setBody] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const postObject = props.obj;
  const [comment, setComments] = useState([]);
  const [userLikes, setUserLikes] = useState(false);
  const [postLikes, setPostLikes] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const postDetails = () => {
    const time = new Date().toISOString();
    const postId = postObject._id;

    const commentForm = {
      postId: postId,
      body: body,
      time: time,
    };

    axios
      .post("/comment", commentForm)
      .then(() => {
        return axios.get(`/comment/${postObject._id}`);
      })
      .then((res) => {
        setBody("");
        setComments(res.data.result);
      });
  };
 useEffect(()=>{
  axios.get(`/like/postLikes/${postObject._id}`).then((res) => {
     setPostLikes(res.data.result.length);
  });

  axios
    .get(`/comment/${postObject._id}`)
    .then((res) => {
       setComments(res.data.result);
    })
    .catch((err) => {
      console.log(err);
    });

  axios.get(`/like/userLikes/${postObject._id}`).then((res) => {
    if (res.data.result.length !== 0) {
      setUserLikes(true);
    }else{
      setUserLikes(false);

    }
  });


 }, [postObject]);
  

  const LikePost = () => {
    setUserLikes(true);
    setPostLikes(postLikes + 1);

    axios
      .post(`/like/${postObject._id}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const unLikePost = () => {
    setUserLikes(false);
    setPostLikes(postLikes - 1);

    axios
      .delete(`/like/${postObject._id}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="AllPosts">
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', width: '100%' }} id="post">
        <CardHeader
          avatar={
            <Avatar
              alt={postObject.userId.name}
              src={postObject.userId.img || "/static/images/avatar/1.jpg"}
              sx={{ width: 44, height: 44, fontWeight: 700, cursor: "pointer" }}
              onClick={() => navigate(`/profile/${postObject.userId._id}`)}
            />
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem
                  onClick={() => { deletePost(); handleMenuClose(); }}
                  sx={{ color: 'error.main' }}
                >
                  Delete Post
                </MenuItem>
              </Menu>
            </>
          }
          title={
            <Typography
              fontWeight={600}
              sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
              onClick={() => navigate(`/profile/${postObject.userId._id}`)}
            >
              {postObject.userId.name}
            </Typography>
          }
          subheader={<Typography variant="caption" color="text.secondary">{postObject.deviceTime}</Typography>}
        />

        {postObject.img !== "" && (
          <CardMedia
            className="image-post"
            component="img"
            image={postObject.img}
            alt="Post image"
            sx={{ maxHeight: 400, objectFit: 'cover' }}
          />
        )}

        <CardContent sx={{ pb: 1 }}>
          <Typography variant="body1" style={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>
            {postObject.body.split("<br/>").join("\n")}
          </Typography>
        </CardContent>

        {/* Like & comment bar */}
        <CardContent sx={{ pt: 0, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            aria-label="like"
            onClick={() => userLikes ? unLikePost() : LikePost()}
            sx={{ color: userLikes ? 'error.main' : 'text.secondary' }}
          >
            {userLikes ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>{postLikes} {postLikes === 1 ? 'Like' : 'Likes'}</Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show comments"
            sx={{ ml: 'auto' }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Typography variant="body2" color="text.secondary">{comment.length} {comment.length === 1 ? 'Comment' : 'Comments'}</Typography>
        </CardContent>

        {/* Comment input */}
        <CardContent sx={{ pt: 0, display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Write a comment..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
            sx={{ borderRadius: 2 }}
          />
          <Button
            variant="contained"
            disableElevation
            onClick={() => postDetails()}
            sx={{ borderRadius: 2, whiteSpace: 'nowrap' }}
          >
            Post
          </Button>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ pt: 0 }}>
            <List sx={{ width: '100%', overflow: 'auto', maxHeight: 300 }}>
              {comment.length !== 0 ? (
                comment.map(function (object, i) {
                  return <Comment obj={object} key={i} />;
                })
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>No comments yet</Typography>
              )}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
