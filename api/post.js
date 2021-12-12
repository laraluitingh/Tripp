const express = require("express");
const router = express.Router();

const Post = require("./../models/Post");


router.post("/", (req, res)=>{
    let { body, image, tags } = req.body;
    const sessionId=req.session.userId

    if( body.length>1000){
        res.json({
            status: "Failed",
            message: "You have exceeded the character Limit",
          })
        
    }else if(body,length===0){
        res.json({
            status: "Failed",
            message: "Please write your post",
          })

    }else{

        const Post = new Post({
            sessionId,
            body,
            image,
            tags,
          });

          newPost
            .save()
            .then((result) => {
              res.json({
                status: "Success",
                message: "Post created",
              });
            }).catch(err=>{
                res.json({
                    status: "Failed",
                    message: "Issue occured when post was created",
                  });
            })

    }

})



module.exports = router;