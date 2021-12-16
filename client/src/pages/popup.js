import React from "react";
import "../css/popup.css";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

const Popup = (props) => {
  const [body, setBody] = useState("")
  const [image,setImage] = useState("")
  const [url, setUrl]= useState(null)

  function findHashtags(searchText) {
    var regexp = /(\s|^)\#\w\w+\b/gm
    let result = searchText.match(regexp);
    if (result) {
        result = result.map(function(s){ return s.trim();});
        console.log(result);
        return result;
    } else {
        return [];
    }
}
 
  useEffect(()=>{
    
      const tags=findHashtags(body)
      const time = new Date().toISOString();
  
     fetch("/post",{
         method:"post",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             body,
             img:url,
             tags,
             time
         })
     }).then(res=>res.json())
     .then(data=>{
 
        if(data.error){
           console.log("error")
        }else{
          console.log("succes")
        }
     }).catch(err=>{
         console.log(err)
     })
 },[url])


const postDetails = ()=>{

  if(image==="NoImg" || image===""){
    setUrl("")
  }else{

    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","Trippo")
    data.append("cloud_name","dbfuan4g6")
    fetch("https://api.cloudinary.com/v1_1/dbfuan4g6/image/upload",{
        method:"post",
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
       setUrl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })
  }


 
}




function deleteImage(){
  document.getElementById("myInputFileID").value=null; 
  setImage("NoImg")
  console.log(image)

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
            onChange={(e)=>{setBody(e.target.value)}}
            value={body}
            variant="standard"
          />
        </FormControl>
        <Box>
        
            <input type="file" id="myInputFileID" onChange={(e)=>setImage(e.target.files[0])}/>
            <a onClick={()=>{deleteImage()}}>Delete</a>
    
        </Box>
        <Box>
          <Button variant="contained" onClick={()=>postDetails()}>POST</Button>
        </Box>
      </div>
    </div>
  );
};

export default Popup;
