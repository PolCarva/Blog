import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { getCommentsData } from "../../data/comments";

const CommentsContainer = ({ className, loggedInUserId, comments }) => {
  const [affectedComment, setAffectedComment] = useState(null);
  {console.log(loggedInUserId);}

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {};


  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {comments.map((c, index) => {
          return (
            <Comment
              key={index}
              comment={c}
              loggedInUserId={loggedInUserId}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addComment={addCommentHandler}
              updateComment={updateCommentHandler}
              deleteComment={deleteCommentHandler}
              replies={c.replies}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentsContainer;
