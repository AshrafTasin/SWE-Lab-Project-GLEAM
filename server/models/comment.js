import mongoose from 'mongoose';
const Schema = mongoose.Schema ;

const commentSchema= mongoose.Schema({
   
    writer: {   type: String,  },
    postId: {   type: String },
    responseTo: {   type: String },
    content: {   type: String , required:true },
    timexdate:    {   type: String }


});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;