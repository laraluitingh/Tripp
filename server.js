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

app.set('trust proxy', 1);

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json())

const UserRouter = require('./api/user')
const PostRouter= require('./api/post')
const CommentRouter= require('./api/comment')
const LikeRouter= require('./api/like')
const FollowRouter = require('./api/follow')

mongoose.connect( process.env.MONGODB_URI).then(()=>{
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
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

app.use('/user', UserRouter)
app.use('/post', PostRouter)
app.use('/comment', CommentRouter)
app.use('/like', LikeRouter)
app.use('/follow', FollowRouter)

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("/*splat", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });