import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const verificationTokenSchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        expires : 3600,
        default: Date.now()
    }

});

export default mongoose.model('VerificationToken',verificationTokenSchema);