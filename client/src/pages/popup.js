import React from "react";
import "../css/popup.css";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
 
const Popup = props => {
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <FormControl  style = {{width: '100%'}} >
        <TextField
          className="textfield-pop-up"
          id="standard-multiline-static"
          label="What's on your mind?"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="standard"
         
        />
        </FormControl>
        <Box>
        <Button variant="text">Add an image</Button>
        </Box>
        <Box>
        <Button variant="contained">POST</Button>
        </Box>
      </div>
    </div>
  );
};
 
export default Popup;