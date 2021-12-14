import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { deleteDisc } from "../../../actions/discussionList";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./SingleDisc.css";
import { updateDisc } from "../../../api";
import Comment from "../../Comment/Comment";

import VoteButon from "./VoteButon";
import Solved from "./Solved";

const SingleDiscPage = () => {
  const parent_margin_top = "5vh";
  const [CommentLists, setCommentLists] = useState([]);
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  function getComments() {
    try {
      const response = axios
        .get("http://localhost:5000/comment/getComments")
        .then((e) => {
          if (CommentLists.length != e.data.length) {
            setCommentLists(e.data);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  const dispatch = useDispatch();
  const location = useLocation();

  const id = location.pathname.split("/")[2];
 
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [disc, setDisc] = useState({ disc: "" });
  const [updateMode, setUpdateMode] = useState(false);

  getComments();
  //console.log(" SIngle dis e asi "+user?.result.lastName);
  useEffect(() => {
    const getDisc = async () => {
      const res = await axios.get("http://localhost:5000/discussion/" + id);
      setDisc(res.data);
    };
    getDisc();
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [id]);

  const handleDelete = async () => {
    // dispatch(deleteDisc(id));
    // window.location.replace('/discussion');
    ////disc.upvote = disc.upvote + 1;
    updateDisc(disc);
  };

  const handleUpdate = async () => {
    dispatch(updateDisc(disc));
    window.location.replace(`/discussion/${id}`);
  };

  const handleCkeditor = (event, editor) => {
    const data = editor.getData();
    console.log(user.result);
    setDisc({
      ...disc,
      body: data,
      author: user.result.name,
    });
  };

  
  const voteOnClick = ( ()=>{
    
    console.log(" WOW 007x "+ disc.body)
    setDisc({
      ...disc,
      body: disc.body,
      author: user.result.name,
    });
    
  })
  return (
    <Grid container>
       <Grid item lg={12} >
       <div className="child1 child" style={{ marginTop: "160px" }}>
        <Solved id={id} auth={disc.author} />
      </div>

      <div className="singleDisc child2 child" style={{}}>
        <div className="singleDiscWrapper">
          <img
            className="singleDiscImg"
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          {updateMode ? (
            <input
              type="text"
              value={disc.title}
              className="singleDiscTitleInput"
              autoFocus
              onChange={(e) => setDisc({ ...disc, title: e.target.value })}
            />
          ) : (
            <h1 className="singleDiscTitle">
              <style>
              @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap');
            </style> 
              {disc.title}

            </h1>
          )}

          <div className="singleDiscInfo ">
            <span className="singleDiscAuthor">
              Author:
             
                <b> {disc.author}</b>
              
            </span>
            <span className="singleDiscDate">
              {new Date(disc.createdAt).toDateString()}
            </span>
          </div>

          <div class="float-parent-element">
            <div
              class="float-child-element2"
              style={{ marginTop: "100px" }}
            >
              <VoteButon id={id} value={disc.upvote}  auth={disc.author}/* onClick={voteOnClick}*//>
            </div>

            <div
              className="float-child-element"
              style={{ marginTop: "-100px" }}
            >
              {updateMode ? (
                <CKEditor
                  editor={ClassicEditor}
                  name="editor1"
                  style={{
                    marginTop: parent_margin_top,
                    height: "75vh",
                    width: 1280,
                  }}
                  onReady={(editor) => {
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "450px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                  }}
                  config={{
                    ckfinder: {
                      uploadUrl: "/discussion/upload",
                    },
                  }}
                  onChange={handleCkeditor}
                ></CKEditor>
              ) : (
                <p className="singleDiscDesc">{ReactHtmlParser(disc.body)}</p>
              )}
              {updateMode && (
                <button className="singleDiscButton" onClick={handleUpdate}>
                  Update
                </button>
              )}
            </div>
          </div>
        </div>

        <Comment
          CommentLists={CommentLists}
          postId={id}
          refreshFunction={updateComment}
        />
      </div>
       </Grid>
    </Grid>
  );
};
export default SingleDiscPage;
