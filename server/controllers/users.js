import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {generateToken,mailSender} from '../utils/mail.js';
import User from '../models/user.js';
import VerificationToken from '../models/verificationToken.js';

export const signIn = async (req,res) => {

    const {email,password} = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser){
            return res.status(404).json({message: "User Doesn't Exist!"});
        }

        const passwordMatch = await bcrypt.compare(password,existingUser.password);
        
        if(!passwordMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }
       
        const token = jwt.sign({
            email : existingUser.email,
            id: existingUser._id },
            'secretString',{
                expiresIn : "1h"
            }
        );

        res.status(200).json({ result: existingUser,token});

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong!" });
    }
};

export const signUp = async (req,res) => {
    
    const {email,password,confirmPassword,firstName,lastName} = req.body;

    try {
        
        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({message: "User Already Exists!"});
        }
        
        if(password !== confirmPassword ) {
            return res.status(400).json({message: "Passwords don't match"});
        }   
        
        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        
        const otp = generateToken();
        
        const tokenResult = await VerificationToken.create({
            owner:result._id,
            token:otp
        }); 

        mailSender().sendMail({
            from:'d3v3lop3m3nt@gmail.com',
            to:result.email,
            subject:'Account Verification',
            html:`<h1>${otp}</h1>`
        })
 
        const jwtoken = jwt.sign({
            email : result.email,
            id: result._id },
            'secretString',{
                expiresIn : "1h"
            }
        );
        
        res.status(200).json({ result: result,jwtoken});

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong!" });
    }
};


export const verifyEmail =  async(req,res) => {
    const {userID,otp} = req.body;
    console.log(req.body);

    if(!userID || !otp.trim()) return res.send({message: "Missing Parameters"});

    try {
        const user = await User.findById(userID);
       
        if(!user) return res.status(404).json({message : "User Not Found"});

        if(user.isVerified) return res.send({message: "Account already verified"});

        const verifiedToken = await VerificationToken.findOne({owner:user._id});

        if(!verifiedToken) return res.status(404).json({message : "Token Not Fund"});

        if(otp===verifiedToken.token){
            await VerificationToken.findByIdAndDelete(verifiedToken._id);
    
            const result = await User.findByIdAndUpdate(userID,
                {
                    $set: {isVerified:true},
                },
                { new: true });
            
                return res.status(200).json({ result: result});
        }else{
            return res.send({message: "Invalid userID"});

        }
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong!" });
    }
};


export const passwordReset = async(req,res) => {
    console.log(req.body);
    const {email} = req.body;
    console.log(email);
    

    try {
        
        const existingUser = await User.findOne({email});
        const url= "http://localhost:3000/redirected"
        
        if(!existingUser){
            return res.status(400).json({success:false,message: "User Doesn't Exists!"});
        }

        mailSender().sendMail({
            from:'d3v3lop3m3nt@gmail.com',
            to:email,
            subject:'Account Verification',
            html:`<a href=${url} target="_blank">Click to Reset Password</a>`
           
        })

        res.status(200).json({ success:true,message:"Reset Link Sent"});

    } catch (error) {
        res.status(500).json({ success: false,message: "Something Went Wrong!" });
    }
}


export const updatedUser = async(req,res) => {
    const {id,firstName,lastName,email,password,about,image} = req.body;
    console.log(req.body);
    console.log("SERVER : "+ image);
    try {
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.findByIdAndUpdate(req.params.id,
            {
              $set: {_id:id,firstName:firstName,lastName:lastName,email:email,password:hashedPassword,about:about,profilePicture:image},
            },
            { new: true });

        const jwtoken = jwt.sign({
            email : result.email,
            id: result._id },
            'secretString',{
                expiresIn : "1h"
            }
        );
        
        res.status(200).json({ result: result,jwtoken});
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong!" });
    }
};

export const updatePassword = async(req,res) => {
    const {password} = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.findByIdAndUpdate(req.params.id,
            {
              $set: {password:hashedPassword},
            },
            { new: true });

        const jwtoken = jwt.sign({
            email : result.email,
            id: result._id },
            'secretString',{
                expiresIn : "1h"
            }
        );
        
        res.status(200).json({ result: result,jwtoken});
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong!" });
    }
};

