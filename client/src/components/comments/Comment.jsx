import React from "react";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";

import CommentForm from "./CommentForm";
import { images, stable } from "../../constants";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Comment = ({
  comment,
  loggedInUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const { t } = useTranslation();
  const isUserLoggined = loggedInUserId;
  const commentBelongsToUser = loggedInUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div
      className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg"
      id={`comment-${comment?._id}`}
    >
      <Link to={`/profile/${comment.user._id}`}>
        <img
          src={
            comment?.user?.avatar
              ? stable.UPLOAD_FOLDER_BASE_URL + comment.user.avatar
              : images.defaultProfile
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = images.defaultProfile;
          }
          }
          alt="user profile"
          className="w-9 h-9 object-cover rounded-full"
        />
      </Link>
      <div className="flex-1 flex flex-col gap-1">
        <Link to={`/profile/${comment.user._id}`} className="font-bold flex gap-2 items-center text-dark-hard text-xs lg:text-sm">
          {comment.user.name} {<div className="flex items-center gap-x-2">
            <span
              className={`${comment.user.verified ? "bg-green-success" : "bg-gray-detail"
                } w-fit bg-opacity-20 p-0.5 rounded-full`}
            >
              {comment.user.verified ? (
                <BsCheckLg className="w-3 h-3 text-green-success bold" />
              ) : (
                <AiOutlineClose className="w-3 h-3 text-gray-placeholder" />
              )}
            </span>
          </div>}
        </Link>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }) +
            ", " +
            new Date(comment.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light">
            {comment.desc}
          </p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel={t("article.comments.update")}
            formSubmitHanlder={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {isUserLoggined && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>{t("article.comments.reply")}</span>
            </button>
          )}
          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>{t("article.comments.edit")}</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment._id)}
              >
                <FiTrash className="w-4 h-auto" />
                <span>{t("article.comments.delete")}</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel={t("article.comments.reply")}
            formSubmitHanlder={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies?.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                deleteComment={deleteComment}
                loggedInUserId={loggedInUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
