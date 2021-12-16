const mongoose =require('mongoose');
const Schema = mongoose.Schema

const CommentSchema = new Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        postId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },

        body:{
            type: String,
            max:500,
            required: true,

        },

        time:{
            type: Date,
        }, 

    },

   
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment;


