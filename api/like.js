const express = require("express");
const router = express.Router();

const Like = require("./../models/likes");



router.post("/:postId", (req, res)=>{
    const postId=req.params.postId
    const userId=req.session.userId


    const newLike = new Like({
        postId,
          userId,
          });

          newLike.save().then((result) => {
            }).catch(err=>{
                res.json({
                    status: "Failed",
                    message: "Issue occured when post was created",
                  });
            })

})

router.delete("/:postId", (req, res)=>{
    const postId=req.params.postId
    const userId=req.session.userId
    Like.remove({'userId': userId,'postId': postId}).then((result) => {
            }).catch(err=>{
                res.json({
                    status: "Failed",
                    message: "Issue occured when post was created",
                  });
            })

})

router.get("/userLikes/:postID", (req, res)=>{
    const postID=req.params.postID
    const userId=req.session.userId
    Like.find({"postId": postID, "userId": userId}).then((result) => {
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

   router.get("/postLikes/:postID", (req, res)=>{
    const postID=req.params.postID
    Like.find({"postId": postID}).then((result) => {
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