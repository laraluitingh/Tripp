import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Button, CardActions } from "@mui/material";
import "../css/Account.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

function UpdateAccount() {
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [imageUpload, setImageUpload] = useState("No image, chosen yet");

  useEffect(() => {
    axios.get(`/user/information`).then((res) => {
      setName(res.data.information[0].name);
      setBio(res.data.information[0].bio);
    });
  }, []);

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    setImage(event.target.files[0]);
    setImageUpload(event.target.files[0].name);
  };

  function updateInfo() {
    if (image === "NoImg" || image === "") {
      const updateUserForm = {
        name: name,
        bio: bio,
        img: "",
      };

      axios.post("/user/update", updateUserForm).then(() => {
      }).then(()=>{
        navigate("/account")
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
          const time = new Date().toISOString();

          const updateUserForm = {
            name: name,
            bio: bio,
            img: data.url,
          };

          axios.post("/user/update", updateUserForm).then(() => {
          }).then(()=>{
            navigate("/account")
          });
        });
    }
  }

  function deleteImage() {
    document.getElementById("myInputFileID").value = null;
    setImage("NoImg");
    setImageUpload("No Image chosen yet");
  }

  return (
    <div className="backgound-account">
      <div className="profile-box">
        <Card className="update-profile">
          <p>Name</p>
          <TextField
            required
            fullWidth
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <p>Bio</p>

          <TextField
            className="bio-input"
            id="standard-multiline-flexible"
            multiline
            rows={13}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            value={bio}
          />

          <Box>
            <input
              type="file"
              id="myInputFileID"
              hidden="hidden"
              accept="image/png, image/gif, image/jpeg"
              ref={hiddenFileInput}
              onChange={handleChange}
            />
            <Button variant="text" id="custom-button" onClick={handleClick}>
              Choose an image
            </Button>{" "}
            <span id="custom-text">{imageUpload}</span>
            <a
              onClick={() => {
                deleteImage();
              }}
              className="delete-button"
            >
              Delete
            </a>
          </Box>

          <CardActions>
            <Button color="primary" variant="contained" onClick={updateInfo}>
              Update
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default UpdateAccount;
