import React from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";

import { createComment } from '../../actions/comment';
import {useDispatch} from 'react-redux';
import datentime from '../Date&Time/datentime';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import InputAdornment from '@mui/material/InputAdornment';

import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import './Comment.css'


const Comment = (props) => {

    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const [Comment,setComment] = useState("");
    
    const RepackComment =(Comment)=>{

        const datenTimeString= datentime(new Date()).concat("..."+moment().format("Do MMM YY"));
        
        
        const packedComment ={
             content: Comment,
             writer: user.result.firstName+" "+user.result.lastName,
             postId: props.postId,
             timexdate: datenTimeString,
        }
        return packedComment;
    }
    
    const onSubmit= (e)=>{
   
        e.preventDefault();
        props.refreshFunction(Comment);
        dispatch(createComment( RepackComment(Comment))); 
        setComment("")
    }

    return (
        <div>
           <br />
           <style>
             @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');
             <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"/> 
             <link href="https://fonts.googleapis.com/css2?family=Material+Icons"rel="stylesheet"/>
             <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined"rel="stylesheet"/>
             <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Round"rel="stylesheet"/>
             <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Sharp"rel="stylesheet"/>
             <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Two+Tone"rel="stylesheet"/>
            </style> 

           <TextField 
                  defaultValue="Discussion  Comments"
                  color="secondary"
                  style={{ marginTop:'60px',width:'100%',height:'50px',marginBottom:0, opacity:100  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SmsOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
            />
           <br/>
           
           {props.CommentLists && props.CommentLists.map((comment,index) =>(

                //if its a root cmnt
       
               (!comment.responseTo &&  comment.postId == props.postId && 
             
               <React.Fragment>
                     <SingleComment comment={comment}
                      refreshFunction={props.refreshFunction}
                     />  
                     <ReplyComment  /*style={{ marginLeft:"20px" }}*/ 
                     CommentLists={props.CommentLists} 
                     rootCommentId= {comment._id} refreshFunction={props.refreshFunction}/>

               </React.Fragment>
               )


           ))}

           <form style = {{ display: 'flex'}} /*onSubmit={onSubmit} */>
                <Input
                    style={{ width: '100%', borderRadius: '5px', marginLeft:'15px'}}
                    onChange={ (e)=>setComment(e.target.value)}
                    value={Comment}
                    placeholder=" Write your Comment"
                    />
                 <br/>
                 <Button style={{width: '20%',height: '52px'}} onClick={onSubmit} >Submit</Button>
                

           </form>

        </div>
    )
}

export default Comment
