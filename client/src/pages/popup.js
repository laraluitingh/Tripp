import React from "react";
import "../css/popup.css";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import { useState} from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

const Popup = (props) => {
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [postError, setPostError] = useState("");
  const [image, setImage] = useState("");
  const { setallPost } = props;
  const [imageUpload, setImageUpload]=useState("No image, chosen yet")

  function findHashtags(searchText) {
    var regexp = /(\s|^)#\w\w+\b/gm;
    let result = searchText.match(regexp);
    if (result) {
      result = result.map(function (s) {
        return s.trim();
      });
      return result;
    } else {
      return [];
    }
  }

const hiddenFileInput = React.useRef(null);

const handleClick = event => {
  hiddenFileInput.current.click();
};


const handleChange = event => {
  setImage(event.target.files[0])
  setImageUpload(event.target.files[0].name)
};

  const postDetails = () => {
    if (!body || body.trim() === "") {
      setBodyError("Post cannot be empty.");
      return;
    }
    setBodyError("");
    setPostError("");

    const tags = findHashtags(body);
    const time = new Date().toISOString();
    var currentdate = new Date(); 
   var deviceTime = currentdate.getDate() + "-"
              + (currentdate.getMonth()+1)  + "-" 
              + currentdate.getFullYear() + " at "  
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes() + ":" 
              + currentdate.getSeconds();

    if (image === "NoImg" || image === "") {
      const postForm = { body, img: "", tags, time, deviceTime };
      axios.post("/post", postForm)
        .then((res) => {
          if (res.data?.status === "Failed") { setPostError(res.data.message); return; }
          return axios.get(`/post`);
        })
        .then((res) => { if (res) { setallPost(res.data.result); props.handleClose(); } })
        .catch(() => setPostError("Failed to create post. Please try again."));
    } else {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Trippo");
      data.append("cloud_name", "dbfuan4g6");
      fetch("https://api.cloudinary.com/v1_1/dbfuan4g6/image/upload", { method: "post", body: data })
        .then((res) => res.json())
        .then((data) => {
          if (!data.url) { setPostError("Image upload failed. Please try again."); return; }
          const postForm = { body, img: data.url, tags: findHashtags(body), time: new Date().toISOString(), deviceTime };
          axios.post("/post", postForm)
            .then((res) => {
              if (res.data?.status === "Failed") { setPostError(res.data.message); return; }
              return axios.get(`/post`);
            })
            .then((res) => { if (res) { setallPost(res.data.result); props.handleClose(); } })
            .catch(() => setPostError("Failed to create post. Please try again."));
        })
        .catch(() => setPostError("Image upload failed. Please try again."));
    }
  };





  function deleteImage() {
    document.getElementById("myInputFileID").value = null;
    setImage("NoImg");
    setImageUpload("No Image chosen yet")
  }





  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          <CloseIcon className="exit"/>
        </span>
        <FormControl style={{ width: "100%" }}>
          <TextField
            className="textfield-pop-up"
            id="standard-multiline-static"
            label="What's on your mind?"
            multiline
            rows={13}
            inputProps={{ maxLength: 950 }}
            onChange={(e) => { setBody(e.target.value); setBodyError(""); }}
            value={body}
            variant="standard"
            error={!!bodyError}
            helperText={bodyError || `${body.length}/950`}
          />
        </FormControl>
        {postError && <Alert severity="error" sx={{ mt: 1 }}>{postError}</Alert>}
        <Box>
          <input
            type="file"
            id="myInputFileID"
            hidden="hidden"
            accept="image/png, image/gif, image/jpeg"
            ref={hiddenFileInput}
            onChange={handleChange}
          />
          <Button variant="text" id="custom-button" onClick={handleClick}>Choose an image</Button> <span id="custom-text">{imageUpload}</span>
          <button
            type="button"
            onClick={() => {
              deleteImage();
            }}
            className="delete-button"
          >
            Delete
          </button>
        </Box>
        <Box>
          <Button variant="contained" onClick={() => postDetails()}>
            POST
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Popup;
