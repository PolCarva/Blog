import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { getCommentsData } from "../../data/comments";

const CommentsContainer = ({ className, loggedInUserId }) => {
  const [comment, setcomment] = useState([]);
  const mainComments = comment.filter((c) => c.parent === null);
  const [affectedComment, setAffectedComment] = useState(null);
  console.log(comment);
  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setcomment(commentData);
      console.log(comment);
    })();
  }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: Math.random().toString(),
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString(),
    };

    setcomment((curState) => {
      return [newComment, ...curState];
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    const updatedComments = comment.map((c) => {
      if (c._id === commentId) {
        return {
          ...c,
          desc: value,
        };
      }
      return c;
    });
    setcomment(updatedComments);
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    const updatedComments = comment.filter((c) => c._id !== commentId);
    setcomment(updatedComments);
  };

  const getRepliesHandler = (commentId) => {
    return comment
      .filter((c) => c.parent === commentId)
      .sort((a, b) => {
        return new Date(a.createdAt).getTime - new Date(b.createdAt).getTime;
      });
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {mainComments.map((c, index) => {
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
              replies={getRepliesHandler(c._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentsContainer;
