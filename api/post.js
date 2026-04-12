const express = require("express");
const router = express.Router();
// Delete a post by ID
router.delete('/:id', (req, res) => {
  const postId = req.params.id;
  Post.findByIdAndDelete(postId)
    .then(() => {
      res.status(200).json({ status: 'Success', message: 'Post deleted' });
    })
    .catch(err => {
      res.status(500).json({ status: 'Failed', message: 'Error deleting post' });
    });
});

const Post = require("./../models/post");
const user= require("./../models/User");


router.post("/", (req, res)=>{
    let { body, img, tags, time, deviceTime} = req.body;
    const userId=req.session.userId

    body=body.replace(/\n/g, "<br/>");;

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

        const newPost = new Post({
          userId,
            body,
            img,
            tags,
            time,
            deviceTime,
          });

          newPost.save().then((result) => {
            res.status(201).send()
            }).catch(err=>{
                res.json({
                    status: "Failed",
                    message: "Issue occured when post was created",
                  });
            })

    }

})


router.get("/", (req, res)=>{
 Post.find().sort({time: -1}).populate({path:'userId', select:['name', 'img']}).then((result) => {
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
  const word = req.params.word;
  const searchRegex = new RegExp(word, 'i');
  Post.find({
    $or: [
      { tags: new RegExp(`#${word}`, 'i') },
      { body: searchRegex }
    ]
  }).populate({ path: 'userId', select: ['name', 'img'] }).then((result) => {
    res.json({ result });
  }).catch(() => {
    res.json({ status: "Failed", message: "Issue occurred when searching posts" });
  });
})


// Get all posts by a specific user
router.get('/user/:id', (req, res) => {
  Post.find({ userId: req.params.id })
    .sort({ time: -1 })
    .populate({ path: 'userId', select: ['name', 'img'] })
    .then((result) => res.json({ result }))
    .catch(() => res.status(500).json({ status: 'Failed' }));
});

module.exports = router;