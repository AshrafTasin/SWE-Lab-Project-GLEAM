import React from "react";
import { useState, useEffect } from "react";

import { updateUpVoteDisc } from "../../../api";
import axios from "axios";
import { useDispatch } from "react-redux";

import "./VoteButton.css";

const VoteButon = (props) => {

  let maxVote = 1,minVote=-1;
  const [disc, setDisc] = useState({ disc:"" });

  const [UpVote, setUpVote] = useState(0);
  const [UpAble, setUpAble] = useState(true);
  const [DownAble, setDownAble] = useState(true);
  const [cnt, Setcnt] = useState(0);

    
  const submitVoteUp = () => {
    if (  UpVote!=maxVote ) {
      
      setUpVote(UpVote +1);
      
     console.log( "UPVOTE"+UpVote) ;

    }
  };
  const submitVoteDown = () => {
    if ( UpVote!=minVote  ) {
      setUpVote(UpVote - 1);
    }
  };
  
  maxVote=props.value+1;
  minVote=props.value-1;
 
  useEffect(() => {
  
  Setcnt(cnt+1);  
  setDisc({...disc,_id:props.id, upvote:UpVote});
  
  if(cnt<3  ){setUpVote(props.value) }
  updateUpVoteDisc(disc);
  
  }, [UpVote]);


  return (
    <div class="votContainer" style={{}}>
      <div class="upbutton" onClick={submitVoteUp}>
        <i class="fas fa-chevron-up"></i>
      </div>
      <div class="vot">
        <p> {UpVote}</p>
      </div>
      <div class="downbutton" onClick={submitVoteDown}>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
  );
};

export default VoteButon;
