import React from 'react'
import {Comment,Button,Input } from 'antd';
import  { useEffect, useState } from "react";
import moment from 'moment';
import datentime from '../Date&Time/datentime';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import axios from 'axios';

import {Avatar} from "@material-ui/core";

import './SingleComment.css'


const SingleComment = (props) => {


    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [CommentValue,setCommentValue]= useState("")
    const [OpenReply, setOpenReply] = useState(false)

    
    const openReply= ()=>{

        setOpenReply(!OpenReply)    
    }

    const handleChange = (e)=>{
           
        setCommentValue(e.target.value)
         
    }
    const RepackComment =(CommentValue)=>{

        const datenTimeString= datentime(new Date()).concat("..."+moment().format("Do MMM YY"))
        
        const packedComment ={
             content: CommentValue,
             writer:  user.result.firstName+" "+user.result.lastName,
             timexdate: datenTimeString,
             responseTo: props.comment._id,
        }
      
        return packedComment;
    }
    const onSubmit= (e)=>{

        e.preventDefault();
        const Comdata= RepackComment(CommentValue);
       
        axios.post('http://localhost:5000/comment/saveComment',Comdata)
        .then(res => {
            setCommentValue("")
            setOpenReply(!OpenReply)    
            props.refreshFunction(res.data);

        })
    }
    const action= [

        <span onClick={openReply}
        className="replytoclass"
        key="comment-basic-reply-to">Reply to 
       
        </span>
    ]
    return (
        <div>
            <style>@import url('https://fonts.googleapis.com/css2?family=Jura:wght@600&display=swap');</style> 
            <style>@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300&display=swap');</style>
            
             <div id="wrapper">
                 <div  id="CommentTemplate" > 
            
                 <Avatar id="contentOfSingleComment" style={{ height:"40px",width:"40px" , padding:"5px" ,marginRight:"5px" }} 
                   > {props.comment.writer.charAt(0)} </Avatar> 

                 <small id="writername"> { props.comment.writer }</small> <br/>

                 <Comment actions={action} id="contentOfSingleComment"
                  content={  <b>{props.comment.content}</b>  }>
                 </Comment>
                </div>
           </div>
           
           {OpenReply && 
            <form style = {{ display: 'flex' , marginTop: "9px", marginLeft:'15px'}}   >
                <Input
                    
                    
                    style={{ width: '100%', borderRadius: '5px'}}
                    onChange ={ handleChange}
                    value={CommentValue}
                    placeholder=" Write your Comment"
                    />
                 <br/>
                 <Button style={{width: '20%',height: '52px'}}  onClick={onSubmit}>Submit</Button>
                

           </form>
           }
           
        </div>
    )
}

export default SingleComment
