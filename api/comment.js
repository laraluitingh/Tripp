const express = require("express");
const router = express.Router();

const Comment = require("./../models/comment");
const user= require("./../models/User");


router.post("/", (req, res)=>{
    console.log(`Here is the body ${req.body}`)

    let { postId ,body, time } = req.body;
    const userId=req.session.userId

    if( body.length>500){
        res.json({
            status: "Failed",
            message: "You have exceeded the character Limit",
          })
        
    }else if(body.length===0){
        res.json({
            status: "Failed",
            message: "Please write your comment",
          })

    }else{

        const newComment = new Comment({
        postId,
          userId,
            body,
            time,
          });

          newComment.save().then((result) => {
            res.status(201).send()
            }).catch(err=>{
                res.json({
                    status: "Failed",
                    message: "Issue occured when post was created",
                  });
            })

    }

})


router.get("/:postID", (req, res)=>{
    const postID=req.params.postID
    Comment.find({"postId": postID}).populate({path:'userId', select:['name']}).then((result) => {
     res.json({
       result
     }) 
      }).catch(err=>{
          res.json({
              status: "Failed",
              message: "Issue occured when comment was created",
            });
      })
   })
   





module.exports = router;