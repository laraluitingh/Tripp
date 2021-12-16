import React from "react";
import "../css/popup.css";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";

const Popup = (props) => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const { allPost, setallPost } = props;

  function findHashtags(searchText) {
    var regexp = /(\s|^)\#\w\w+\b/gm;
    let result = searchText.match(regexp);
    if (result) {
      result = result.map(function (s) {
        return s.trim();
      });
      console.log(result);
      return result;
    } else {
      return [];
    }
  }



  // useEffect(() => {
  //   const tags = findHashtags(body);
  //   const time = new Date().toISOString();


  //   const postForm = {
  //     body: body,
  //     img: url,
  //     tags: tags,
  //     time: time
  //   };

  //   axios
  //     .post("/post", postForm)
  //     .then(() => {
  //       console.log("success");
  //       return axios.get(`/post`);
  //     })
  //     .then((res) => {
  //       setallPost(res.data.result);
  //       props.handleClose()
  
  //     });
  // }, [url]);






  const postDetails = () => {

    if (image === "NoImg" || image === "") {

      const tags = findHashtags(body);
      const time = new Date().toISOString();
  
  
      const postForm = {
        body: body,
        img: "",
        tags: tags,
        time: time
      };
  
      axios
        .post("/post", postForm)
        .then(() => {
          console.log("success");
          return axios.get(`/post`);
        })
        .then((res) => {
          setallPost(res.data.result);
          props.handleClose()
    
        }).catch((err) => {
      console.log(err);
    });
      
      
      
    } else {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Trippo");
      data.append("cloud_name", "dbfuan4g6");
      fetch("https://api.cloudinary.com/v1_1/dbfuan4g6/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("got here")

          const tags = findHashtags(body);
          const time = new Date().toISOString();
      
      
          const postForm = {
            body: body,
            img: data.url,
            tags: tags,
            time: time
          };
      
          axios
            .post("/post", postForm)
            .then(() => {
              console.log("success");
              return axios.get(`/post`);
            })
            .then((res) => {
              setallPost(res.data.result);
              props.handleClose()
        
            });

        })
        .catch((err) => {
          console.log(err);
        });
    }
  };





  function deleteImage() {
    document.getElementById("myInputFileID").value = null;
    setImage("NoImg");
    console.log(image);
  }





  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <FormControl style={{ width: "100%" }}>
          <TextField
            className="textfield-pop-up"
            id="standard-multiline-static"
            label="What's on your mind?"
            multiline
            rows={4}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            value={body}
            variant="standard"
          />
        </FormControl>
        <Box>
          <input
            type="file"
            id="myInputFileID"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <a
            onClick={() => {
              deleteImage();
            }}
          >
            Delete
          </a>
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
