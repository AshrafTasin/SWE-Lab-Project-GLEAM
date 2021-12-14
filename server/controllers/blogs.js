import Blogs from '../models/blogs.js';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';


export const getBlogs = async (req,res)=> {
   try{
    const blogs = await Blogs.find();
 
    res.status(200).json(blogs);

   }catch (error) {
    
    res.status(404).json({ message : error.message });

   }
};

export const getSingleBlog = async(req,res) => {
        try {
          const blog = await Blogs.findById(req.params.id);
          res.status(200).json(blog);
        } catch (err) {
          res.status(500).json(err);
        }
};


export const getUserBlog = async(req,res) => {
  try {
    const blogs = await Blogs.find({ authorID: req.params.id }).exec();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
};



export const createBlogs = async (req,res) => {
    const blog = req.body;
    console.log(blog);
    try {
        const newBlog = new Blogs(blog);  
        await newBlog.save();
        res.status(201).json(newBlog);

    } catch (error) {
        
        res.status(409).json({message : error.message});
    }
};

export const blogImage = (req,res) => {
      let tempFile = req.files.upload;
      let tempPathFile = tempFile.path;
      const __dirname = path.resolve();
      
      const targetPathUrl = path.join(__dirname,"./images/"+tempFile.name);

      if(path.extname(tempFile.originalFilename).toLowerCase() === ".png" || ".jpg"){
        fs.rename(tempPathFile,targetPathUrl,err =>{
          res.status(200).json({
            uploaded : true,
            url : `http://localhost:5000/blogs/images/${tempFile.originalFilename}`
          })
          if(err){
            return console.log(err);
          }
        })
      }
}

export const getBlogImage = (req,res) => {
    res.download('./images/'+req.params.id);
}

export const deleteBlog = async (req, res) => {
    console.log(req.body);
  try {
    const blog = await Blogs.findById(req.params.id);
      try {
        await blog.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
}

export const updateBlog = async (req,res) => {
    const id  = req.params.id;
    console.log(id);
    console.log(req.body);
    const { createdAt,tags,likeCount,author, title, body, _id,_v } = req.body;
    
    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedBlog = { createdAt,tags,likeCount,author, title, body, _id: id,_v };

    try {
          await Blogs.findByIdAndUpdate(id, updatedBlog, { new: true });
        } catch (error) {
        
        res.status(409).json({message : error.message});
    }

    console.log(updatedBlog);
    res.json(updatedBlog);
}

export const likeBlog = async (req,res) => {
  const id = req.params.id;
  console.log(id);
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
 
  try {
        
        const blog = await Blogs.findById(id);

        const updatedBlog = await Blogs.findByIdAndUpdate(id, {likeCount:blog.likeCount+1}, { new: true });
      
        res.json(updatedBlog);
  }catch (error){
      res.status(409).json({message : error.message});
  }
}

export const removeLike = async (req,res) => {
  const id = req.params.id;  
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);


  try {
        const blog = await Blogs.findById(id);
        
        const updatedBlog = await Blogs.findByIdAndUpdate(id, {likeCount:blog.likeCount-1}, { new: true });
        res.json(updatedBlog);
  }catch (error){
      res.status(409).json({message : error.message});
  }
}