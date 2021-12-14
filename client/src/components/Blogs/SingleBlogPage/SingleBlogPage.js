import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { deleteBlog,removeLike,likeBlog } from '../../../actions/blogs';
import axios from 'axios';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./singleBlogPage.css";
import { updateBlog } from '../../../api';
import { Paper,Grid,Typography,Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const SingleBlogPage = () => {
  const parent_margin_top='5vh';

  const dispatch = useDispatch();
  const location = useLocation();

  const id = location.pathname.split("/")[2];
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
  const [blog, setBlog] = useState({blog:''});
  const [updateMode, setUpdateMode] = useState(false);
  const [liked,setLiked] = useState(0);
  const [touch,setttouch] =useState(false);

  let clicked=false;
  
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/blogs/" + id);
      setBlog(res.data);
      setLiked(res.data.likeCount);
    };
    getPost();
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[id]);
  
  const handleDelete = async () => {
      dispatch(deleteBlog(id));
      window.location.replace('/');
  };

  const handleUpdate = async () => {
      dispatch(updateBlog(blog));
      window.location.replace(`/blogs/${id}`);
  };

  const handleLike = async () => {
    if(touch==false)setLiked(liked+1);
    if(touch==true)setLiked(liked-1);

    setttouch(!touch);
    if(!clicked){
      clicked=true;
      dispatch(likeBlog(blog._id));
    }else{
      clicked=false;
      dispatch(removeLike(blog._id));
    }
  };  

  const handleCkeditor = (event,editor) => {
    const data = editor.getData();
    console.log(user.result)
    setBlog({
      ...blog, body: data,authorID:user.result._id,authorName:`${user.result.firstName} ${user.result.lastName}`,
      authorAbout:user.result.about,authorImage:user.result.profilePicture
    })
  };

    return (
    <Grid container direction="row">
        <Grid item lg={12} >
          <img 
            className="singlePostImg"
            src={blog.coverPhoto}
            alt=""
          />
        </Grid>
        &nbsp;
        <Grid item xs={12} sm={12} md={4} lg={3} > 
          <Paper style={{marginTop:"50px",marginRight:"70px",padding:"10px"}}>
              <figure>
                  <img className="authorPhoto" src={blog.authorImage}/>
              </figure> 

              <Link
                to={{
                  pathname: `/profile/${blog.authorID}`,
                  state: { blog }
                }}
              >
                  <Typography> {blog.authorName} </Typography>
              </Link>
              
              <Typography> {blog.authorAbout} </Typography>


              {!touch && <Button size='small' color='primary' onClick={handleLike}>
                <FavoriteBorderIcon style={{ color: '#ff0000',marginRight:'5px',marginTop:'10px' }} />
              </Button>}

              {touch && <Button size='small' color='primary' onClick={handleLike}>
                <FavoriteIcon style={{ color: '#ff0000',marginRight:'5px',marginTop:'10px' }} />
              </Button>}
              
              {liked} 
          </Paper>
        </Grid>

        <Grid item lg={8} >
        
        <div className="singlePostInfo" style={{color:"#6f00ff",marginTop:"50px"}}>
            <span className="singlePostDate">
              {new Date(blog.createdAt).toDateString()}
            </span>
        </div>
        
        {updateMode ? (
          <input
            type="text"
            value={blog.title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setBlog({...blog,title:e.target.value})}
          />
        ) : (
          <h1 className="singlePostTitle" style={{marginTop:"10px",marginBottom:"30px"}}>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap');
            </style> 
            {blog.title}
            {blog.authorID === user?.result._id && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
          )}

        {updateMode ? (
          <CKEditor  
          editor={ClassicEditor}
          name="editor1"
          
          style={ {  marginTop:parent_margin_top,height:'75vh',width:1280}}
          onReady={editor=>{
            editor.editing.view.change((writer) => {
              writer.setStyle(
                  "height",
                  "450px",
                  editor.editing.view.document.getRoot());
              });
          }}
          
          config={
            {
              ckfinder:{
                uploadUrl: '/blogs/upload'
              },
            }
          }
          onChange={handleCkeditor}> 
      </CKEditor>
        ) : (
          <p className="singlePostDesc" >{ReactHtmlParser(blog.body)}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        </Grid>

    </Grid>
    );
}
export default SingleBlogPage;
