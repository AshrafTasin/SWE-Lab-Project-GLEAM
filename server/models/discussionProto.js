import mongoose from 'mongoose';

const DiscSchema = mongoose.Schema({
    title : String,body : String,
    author : String,
    body :String,
    tags : [String],
    Desc :{type: String },
    Solved:{type: Boolean,default: false},
    Comments:{ type : Array,"default" : [] },
    upvote :{type : Number, default: 0},
    downvote:{type: Number, default: 0},
    createdAt :{ 
        type : Date,
        default : new Date()
    },
})

const DiscussionProto = mongoose.model('DiscussionPrototype',DiscSchema);

export default DiscussionProto;