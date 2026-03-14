import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Button, CardActions, Divider, Typography } from "@mui/material";
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
  const [previewUrl, setPreviewUrl] = useState("");

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
    const file = event.target.files[0];
    setImage(file);
    setImageUpload(file ? file.name : "No image, chosen yet");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl("");
    }
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
          // Removed unused variable 'time'

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', pt: 10, px: 2 }}>
        <Card sx={{ width: '100%', maxWidth: 500, p: 4, borderRadius: 3, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
          <Typography variant="h5" fontWeight={700} mb={1}>Edit Profile</Typography>
          <Divider sx={{ mb: 3 }} />

          <Typography variant="subtitle2" color="text.secondary" mb={0.5}>Name</Typography>
          <TextField
            required
            fullWidth
            onChange={(e) => { setName(e.target.value); }}
            value={name || ""}
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle2" color="text.secondary" mb={0.5}>Bio</Typography>
          <TextField
            className="bio-input"
            id="standard-multiline-flexible"
            fullWidth
            multiline
            rows={5}
            onChange={(e) => { setBio(e.target.value); }}
            value={bio || ""}
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle2" color="text.secondary" mb={1}>Profile Picture</Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <input
              type="file"
              id="myInputFileID"
              hidden
              accept="image/png, image/gif, image/jpeg"
              ref={hiddenFileInput}
              onChange={handleChange}
            />
            <Button variant="outlined" color="primary" onClick={handleClick} sx={{ minWidth: 140 }}>
              Choose Image
            </Button>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ flex: 1 }}>
              {imageUpload}
            </Typography>
            <Button variant="outlined" color="error" onClick={deleteImage} sx={{ minWidth: 90 }}>
              Remove
            </Button>
          </Box>

          {previewUrl && (
            <Box mb={3} display="flex" justifyContent="center">
              <img
                src={previewUrl}
                alt="Preview"
                style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
              />
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />
          <CardActions sx={{ p: 0, gap: 2 }}>
            <Button color="inherit" variant="outlined" fullWidth onClick={() => navigate("/account")} sx={{ borderRadius: 2, py: 1.2 }}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" fullWidth onClick={updateInfo} sx={{ borderRadius: 2, py: 1.2 }}>
              Save Changes
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}

export default UpdateAccount;
