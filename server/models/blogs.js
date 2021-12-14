import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title : String,
    body : String,
    authorName : String,
    authorID : String,
    authorAbout : String,
    authorImage : String,
    tags : [String],
    summary: String,
    coverPhoto : String,
    likeCount :{
        type : Number,
        default: 0
    },
    createdAt :{ 
        type : Date,
        default : new Date()
    },
})

const Blogs = mongoose.model('Blogs',blogSchema);

export default Blogs;