const app = require('express')();
const port = process.env.PORT || 3000;
const bodyParser=require('express').json
const express = require('express');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config()
const mongoose = require ('mongoose')
const cors = require('cors');
const path = require("path");



app.use(express.static("./client/build"));

app.use(express.json())

const UserRouter = require('./api/user')
const PostRouter= require('./api/post')
const CommentRouter= require('./api/comment')
const LikeRouter= require('./api/like')

mongoose.connect( process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})

const store= new MongoDBStore({
  uri : process.env.MONGODB_URI, 
  collection: 'Mysessions'
  
})

app.use(session({
  secret: "key that will sign cookie",
  resave: false,
  httpOnly: false,
  saveUninitialized: false,
  store: store
}))

app.use(bodyParser())

app.use('/user', UserRouter)
app.use('/post', PostRouter)
app.use('/comment', CommentRouter)
app.use('/like', LikeRouter)

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});



app.use(cors());


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });