const app = require('express')();
const port=3000;
const bodyParser=require('express').json
const express = require('express');
require('./config/db')
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config()
const mongoose = require ('mongoose')
const cors = require('cors');


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


app.use(cors());


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });