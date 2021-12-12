const mongoose =require('mongoose');
const Schema = mongoose.Schema

const TagSchema = new Schema(
    {
        postId:{
            type:String,
            required: true
        },

        tag:{
            type: String,


        },

    

    },

   
)

const Comment = mongoose.model('Comment', TagSchema)

module.exports = Comment;