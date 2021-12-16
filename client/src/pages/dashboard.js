
import React from "react";
import Button from "@mui/material/Button";
import Popup from "./popup";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/card";
import { Box } from "@mui/system";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [allPost, setallPost]=useState([])
  const [searchValue, setSearchValue]=useState("")


  const togglePopup = () => {
    setIsOpen(!isOpen);
  }


  useEffect(() => {
    axios.get("/post").then((res)=>{
      setallPost(res.data.result)
  
    })

  
  }, []);

  function searchHashTag(e){
console.log(searchValue)
if(searchValue!==""){
  e.preventDefault()
  axios.get(`post/getHashes/${searchValue}`).then((res)=>{
    setallPost(res.data.result)

  })

}else{
  e.preventDefault()
  axios.get("/post").then((res)=>{
    setallPost(res.data.result)

  })

}

  }
  



  return (
   <>
   <Box>
   <Button variant="text" onClick={togglePopup}>Create a Post</Button>
   <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Hashtags"
        inputProps={{ 'aria-label': 'search for tags' }}
        value={searchValue}
        onChange={(e)=>{setSearchValue(e.target.value)}}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon onClick={(e)=>{searchHashTag(e)}}/>
      </IconButton>
    </Paper>
   </Box>
   {allPost.map(function(object, i){
     return <PostCard obj={object} key={i} />
        // return <PostCard  />;
    })}
  
     {isOpen && <Popup handleClose={togglePopup} allPost={allPost} setallPost={setallPost}/>}
  
   </>
  );
}

export default Dashboard;