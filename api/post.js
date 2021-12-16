const express = require("express");
const router = express.Router();

const Post = require("./../models/Post");
const user= require("./../models/User");


router.post("/", (req, res)=>{
    console.log(`Here is the body ${req.body}`)
    let { body, img, tags, time } = req.body;
    const userId=req.session.userId

    if( body.length>1000){
        res.json({
            status: "Failed",
            message: "You have exceeded the character Limit",
          })
        
    }else if(body.length===0){
        res.json({
            status: "Failed",
            message: "Please write your post",
          })

    }else{
      console.log("got here")
      console.log(typeof sessionId)
      console.log(img)

        const newPost = new Post({
          userId,
            body,
            img,
            tags,
            time,
          });

          console.log(newPost)

          newPost.save().then((result) => {
           console.log("succes")
            }).catch(err=>{
                res.json({
                    status: "Failed",
                    message: "Issue occured when post was created",
                  });
            })

    }

})


router.get("/", (req, res)=>{
 Post.find().sort({time: -1}).populate({path:'userId', select:['name']}).then((result) => {
  res.json({
    result
  }) 
   }).catch(err=>{
       res.json({
           status: "Failed",
           message: "Issue occured when post was created",
         });
   })
})

router.get("/getHashes/:word" , (req, res)=>{
  const word=req.params.word
  var regexObj = new RegExp(" /.*" + word + ".*/"); 
  Post.find({ tags:  new RegExp(`#${word}`, 'i')} ).then((result) => {
   res.json({
     result
   }) 
    }).catch(err=>{
        res.json({
            status: "Failed",
            message: "Issue occured when post was created",
          });
    })
 })


module.exports = router;