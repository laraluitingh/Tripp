const mongoose =require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        body:{
            type: String,
            max:500,
            required: true,

        },

        img: {
            type: String,
            
        },

        tags:{
            type: Array,
            default:[],
        },

        time:{
            type:Date
        },

        deviceTime:{
            type: String
        },

    

    },

   
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post;