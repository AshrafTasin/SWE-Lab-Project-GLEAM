import DiscussionProto from '../models/discussionProto.js';
import path from 'path';
import fs from 'fs';


export const getDisc = async (req,res)=> {
   try{
    const Discussion = await DiscussionProto.find();
    
    res.status(200).json(Discussion);

   }catch (error) {
    
    res.status(404).json({ message : error.message });

   }
};
 
export const createDiscs = async (req,res) => {

    const disc = req.body;       
    console.log(disc);

    try { 
      
       const newDisc = new DiscussionProto(disc);
        await newDisc.save();
        res.status(201).json(newDisc);
    } catch (error) {
        
        res.status(409).json({message : error.message});
    }
};

export const getSingleDisc = async(req,res) => {
    try {
      const disc = await DiscussionProto.findById(req.params.id);
      res.status(200).json(disc);
    } catch (err) {
      res.status(500).json(err);
    }
};



export const discImage = (req,res) => {
    let tempFile = req.files.upload;
    let tempPathFile = tempFile.path;
    const __dirname = path.resolve();
    
    const targetPathUrl = path.join(__dirname,"./images/"+tempFile.name);

    if(path.extname(tempFile.originalFilename).toLowerCase() === ".png" || ".jpg"){
      fs.rename(tempPathFile,targetPathUrl,err =>{
        res.status(200).json({
          uploaded : true,
          url : `http://localhost:5000/discussion/images/${tempFile.originalFilename}`
        })
        if(err){
          return console.log(err);
        }
      })
    }
}

export const getDiscImage = (req,res) => {
  res.download('./images/'+req.params.id);
}

export const deleteDisc = async (req, res) => {
  console.log(req.body);
try {
  const disc = await DiscussionProto.findById(req.params.id);
    try {
      await disc.delete();
      res.status(200).json("Disc dlt...");
    } catch (err) {
      res.status(500).json(err);
    }
  
} catch (err) {
  res.status(500).json(err);
}
}

export const updateDisc = async (req,res) => {
  const id  = req.params.id;
  console.log(id);
  console.log(req.body);
  const { createdAt,tags,upvote,author, title, body, _id,_v } = req.body;
 
  const updatedDisc = { createdAt,tags,upvote,author, title, body, _id: id,_v };

  try {
        await DiscussionProto.findByIdAndUpdate(id, updatedDisc, { new: true });
      
      } catch (error) {
      
      res.status(409).json({message : error.message});
  }

  console.log(updatedDisc);
  res.json(updatedDisc);
}

export const updateUpVoteDisc = async (req,res) => {
  const id  = req.params.id;
  if( req.body.upvote==undefined) {
      console.log("upvote pay nai");
       return;
  }
  const { upvote, _id } = req.body;
  const updatedDisc = { upvote,_id: id};
 
  try {
        await DiscussionProto.findByIdAndUpdate(id, updatedDisc, { new: true });
  } catch (error) {
      
      res.status(409).json({message : error.message});
  }

  console.log(updatedDisc);
}