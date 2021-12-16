const mongoose =require('mongoose');
const Schema = mongoose.Schema

const LikesSchema = new Schema(
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
    

    },

   
)

const Likes = mongoose.model('Likes', LikesSchema)

module.exports = Likes;