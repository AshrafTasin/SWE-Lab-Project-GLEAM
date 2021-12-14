import React, {useState,useRef,useEffect} from 'react';
import { Paper,Grid,TextField,InputAdornment,Button } from '@material-ui/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import PublishIcon from '@material-ui/icons/Publish';
import {useDispatch} from 'react-redux';
import {createDisc}  from '../../actions/discussionList';
import Box from '@mui/material/Box';
import   './CreateDiscussion.css';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const CreateDiscussion = () => {

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

    const parent_margin_top='5vh';

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const fileInputRef = useRef(HTMLInputElement);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    useEffect(() => {
      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          console.log(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
      }
    }, [image]);

    const [DiscData,setDiscData] = useState({
        title:'',tags:'',body:'1' 
    });


   const dispatch = useDispatch();

    const handleTags = (event,value) => {
      let json=JSON.stringify(value);
      let result=[];
      
      if(json.search("BlockChain")!=-1){
          result.push("Blockchain");
      }
      if(json.search("BitCoin")!=-1){
        result.push("BitCoin");
    }
       setDiscData({...DiscData,tags:result});
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(JSON.stringify(DiscData));

        
      //setDiscData({...DiscData, author:(user?.result.firstName+user?.result.lastName)});
      // console.log(DiscData.author);
      dispatch(createDisc(DiscData));
        window.location.replace('/discussion');
    }

    const handleCkeditor = (event,editor) => {
        const data = editor.getData();
        setDiscData({
          ...DiscData, body: data,author:`${user.result.firstName} ${user.result.lastName}`
        })
    }

    return (

        <Paper>
          <form autoComplete='off' noValidate onSubmit={handleSubmit}>
          

        {/* <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
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
        </Box> */}
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
        message="Image Uploaded ! Click Again to Remove it"
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
                       value={DiscData.title}
                       onChange={(e) => setDiscData({...DiscData,title:e.target.value})}
                  
              />
              <br/>
              <TextField 
                  variant="standard"  
                  defaultValue="Write your Discussion"
                  InputLabelProps={{style: {fontSize: 25}}} 
                  style={{ marginTop:-2.5,width:'98%',fontSize:'25px',height:'80px',marginBottom:-48, opacity:100  }}
                  
              />
              <br/>
              <div className="EditorClass" >
              {
                user?(
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
                        uploadUrl: '/discussion/upload'
                        
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

export default CreateDiscussion;







/////////////////////////////////





