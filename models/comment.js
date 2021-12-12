const mongoose =require('mongoose');
const Schema = mongoose.Schema

const CommentSchema = new Schema(
    {
        userEmail:{
            type:String,
            required: true
        },

        body:{
            type: String,
            max:500,
            required: true,

        },

        time:{
            type: Date,
        }

    },

   
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment;