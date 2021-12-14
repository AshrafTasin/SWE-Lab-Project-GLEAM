import React, { useState,useEffect,useRef} from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Paper,Grid,TextField,InputAdornment,Button } from '@material-ui/core';
import useStyles from './styles';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react';

import PublishIcon from '@material-ui/icons/Publish';

import {useDispatch} from 'react-redux';
import { createBlog } from '../../actions/blogs';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "./createBlog.css";


const CreateBlog = () => {
    const parent_margin_top='5vh';
  
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const fileInputRef = useRef(HTMLInputElement);

    const [open, setOpen] = useState(false);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

    useEffect(() => {
      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          setBlogData({
            ...blogData,coverPhoto:reader.result
          })
          console.log(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
      }
    }, [image]);

    const location = useLocation();

    const [blogData,setBlogData] = useState({
        title:'',tags:'',body:'1',authorID:'',authorName:'',authorAbout:'',authorImage:'',
        summary:'',coverPhoto:''
    });

    const dispatch = useDispatch();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
      const token = user?.token;
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const handleSubmit = (event) =>{
        event.preventDefault();
        
        setBlogData({
          ...blogData,authorImage:user.result.profilePicture
        });

        if(blogData.body==='1' || blogData.title==='' || blogData.summary==='' || blogData.coverPhoto===null){
            
          setOpen(true);
          window.location.replace('/new-blog');
          
        }else{  
          
            dispatch(createBlog(blogData));
            setTimeout(function(){ alert("Hello"); }, 3000);
            window.location.replace('/');
        }
        


    }

    const handleCkeditor = (event,editor) => {
        const data = editor.getData();
        console.log(user.result)
        setBlogData({
          ...blogData, body: data,authorID:user.result._id,authorName:`${user.result.firstName} ${user.result.lastName}`,
          authorAbout:user.result.about,authorImage:user.result.profilePicture
        })
    }


    return (

      <Paper>
        <form autoComplete='off' Validate onSubmit={handleSubmit}>
        <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
        {preview ? (

          <img id="coverpic"
            src={preview}
            className="imageArea"
            onClick={() => { 
              
              setImage(null); 
            
            }}
          />
          ) : (
          <button style={{ width:"97%",  marginBottom:'1vh' , marginTop:'3vh'  }}
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current.click();
              
            }}
          >Add Cover Pic
          </button>
           )}
        </Box>

        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
              setImage(file);
              console.log(fileInputRef);
              setOpen(true);
            } else {
              setImage(null);
            }
          }}
          
        />

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Write Something on Body"
        action={action}
       />
        
            <TextField name="dis_title" 
            id="outlined-basic" 
            label="Question/Discussion Title" 
            variant="outlined"  
            color="primary"
            required
            InputLabelProps={{style: {fontSize: 20}}} 
            style={{ marginTop:parent_margin_top,width:'100%',fontSize:'25px',
            height:'80px'  }}
            InputProps={{
              style: {fontSize: 20, fontFamily:"Ubuntu" },
              startAdornment: (
                <InputAdornment position="start">
                 
                </InputAdornment>
              ),
            }}
            label="Title" 
            onChange={(e) => setBlogData({...blogData,title:e.target.value})}
            required
        />

        <TextField name="dis_sum" 
                      id="outlined-basic" 
                      label="Short Summary" 
                      variant="outlined"  
                      color="primary"
                      InputLabelProps={{style: {fontSize: 20}}} 
                      style={{ marginTop:'2vh',width:'100%',fontSize:'25px',
                      height:'80px'  }}
                      InputProps={{
                        style: {fontSize: 20, fontFamily:"Ubuntu" },
                        startAdornment: (
                          <InputAdornment position="start">
                          </InputAdornment>
                        ),
                      }}
            label="Summary" 
            onChange={(e) => setBlogData({...blogData,summary:e.target.value})}
            required
        />

          <TextField 
                  variant="standard"  
                  defaultValue="Write your Discussion"
                  InputLabelProps={{style: {fontSize: 25}}} 
                  style={{ marginTop:-2.5,width:'98%',fontSize:'25px',height:'80px',marginBottom:-48, opacity:100  }}
                  required
             />

      <div className="EditorClass" >
        {
          user ?  (
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
          ) : <></>
        }
          </div>

          <Button 
                  size="large" id="submit_button" 
                  variant="outlined" color="primary"
                  style={{  backgroundColor: '#212121', color:'#fafafa', marginLeft:'500px' }}
                  startIcon={<PublishIcon />}
                  type='submit'
              > Post 
            </Button>

        </form>
        </Paper>

    )
};

export default CreateBlog;

