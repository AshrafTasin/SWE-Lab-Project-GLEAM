import React,{ useEffect, useState } from "react";
import SingleComment from './SingleComment';

import './ReplyComment.css'
//////CHECK COMMENT.iSREPLY 4:06 video ""
/*comment.isReply &&*/ 

function ReplyComment (props)
// const ReplyComment = (props) =>
   {
    
    const [OpenReplyComment,setOpenReplyComment]=useState(false)
    const [OpenText,setOpenText]=useState(true)

    let CommentNumber =0;
    const onSubmit= (e)=>{

         props.CommentLists.map((comment)=>{
          if(comment.responseTo == props.rootCommentId  ){ CommentNumber++; }
         })
     }
     onSubmit();
   
    const handleChange= () =>{
           setOpenReplyComment(!OpenReplyComment)
           setOpenText(!OpenText)
    }
    
  return (
    <div>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');
        </style> 
      {(CommentNumber > 0) &&  OpenText &&
        <p style={{ fontSize: "15px",   marginLeft: "20px" }} 
        onClick={handleChange}  id="ViewMore"
        >View {CommentNumber} More Reply 

    
        </p>

       }
       {
          !OpenText && 
           <p style={{ fontSize: "14px",  color: " #34495e ", marginLeft: "20px" }} 
          onClick={handleChange}   id="ViewMore"
          ><b> Close  Replies  </b>
          </p>

       }

       {
        OpenReplyComment &&
        props.CommentLists.map( (comment, index) =>(
          
               <React.Fragment>

                {(comment.responseTo == props.rootCommentId) && 
                   <div style ={{ marginLeft:"45px", width: '80%'}}> 
                   <SingleComment comment={comment}  refreshFunction={props.refreshFunction}  />
                   <ReplyComment CommentLists={props.CommentLists} rootCommentId= {comment._id} 
                     refreshFunction={props.refreshFunction}/> 

                 </div>
                }

               </React.Fragment>
       )
      
      )
      }
    </div>
  );
};

export default ReplyComment;