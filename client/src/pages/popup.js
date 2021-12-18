import React from "react";
import "../css/popup.css";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState} from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

const Popup = (props) => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const { allPost, setallPost } = props;
  const [imageUpload, setImageUpload]=useState("No image, chosen yet")

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

  const realFileBtn = document.getElementById("real-file");

const hiddenFileInput = React.useRef(null);

const handleClick = event => {
  hiddenFileInput.current.click();
};


const handleChange = event => {
  console.log(event.target.files[0])
  setImage(event.target.files[0])
  setImageUpload(event.target.files[0].name)
};

  const postDetails = () => {

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
  
  
      const postForm = {
        body: body,
        img: "",
        tags: tags,
        time: time,
        deviceTime: deviceTime,
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
            time: time, 
            deviceTime: deviceTime
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
            hidden="hidden"
            accept="image/png, image/gif, image/jpeg"
            ref={hiddenFileInput}
            onChange={handleChange}
          />
           <Button variant="text" id="custom-button" onClick={handleClick} >Choose an image</Button> <span id="custom-text">{imageUpload}</span>
          <a
            onClick={() => {
              deleteImage();
            }}
            className="delete-button"
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
