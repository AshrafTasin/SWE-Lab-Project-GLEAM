import {Grid,Button,Typography} from "@material-ui/core";
import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUserBlogs,getBlogs} from '../../actions/blogs';
import Blog from '../Blogs/Blog/Blog.js';
import axios from "axios";
import { useSelector } from 'react-redux';

import './profile.css';

const Profile = ()=> {
    
    const location = useLocation();
    const {blog} = location.state;
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getBlogs());
    }, [location]);

    const blogs= useSelector((state) => state.blogReducers);

    return (
        <Grid container direction="row">
          <Grid item xs={12} sm={12} md={4} lg={3} > 
            <div style={{marginTop:"200px",marginLeft:"20px"}}>
              <figure>
                <img className='authorimage' src={blog.authorImage}/>
              </figure>
              <Typography> {blog.authorName} </Typography>
              <Typography> {blog.authorAbout} </Typography>
            </div>
          </Grid>

            <Grid item lg={9}>
            {blogs.map((b)=>(
              (b.authorID===blog.authorID) ? (
                <Grid key={b._id} item lg={9}>
                  <Blog blog={b}/>  
                </Grid>
              ):(
                <></>
              )

                ))}
            </Grid>

        </Grid>
    )
}

export default Profile
