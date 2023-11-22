import React from "react";
import images from "../constants/images";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import stables from "../constants/stable";
import { Link } from "react-router-dom";
import { stable } from "../constants";

const ArticleCard = ({ post, className }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${className}`}
    >
      <Link to={`/blog/${post.slug}`}>
        <img
          src={
            post.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
              : images.samplePostImage
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = images.samplePostImage;
          }}
          alt={post.title}
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        />{" "}
      </Link>

      <div className="p-5">
        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
            {post.title}
          </h2>
          <p className="text-dark-light mt-3 text-sm md:text-lg">
            {post.caption}
          </p>
        </Link>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={
                post.user.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : images.defaultProfile
              }
              alt="Post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = images.defaultProfile;
              }}
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                {post.user.name}
              </h4>
              <div className="flex items-center gap-x-2">
                <span
                  className={`${
                    post.user.verified ? "bg-green-success" : "bg-gray-detail"
                  } w-fit bg-opacity-20 p-0.5 rounded-full`}
                >
                  {post.user.verified ? (
                    <BsCheckLg className="w-3 h-3 text-green-success bold" />
                  ) : (
                    <AiOutlineClose className="w-3 h-3 text-gray-placeholder" />
                  )}
                </span>
                <span className="italic text-dark-light md:text-sm">
                  {post.user.verified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm md:text-base">
            {new Date(post.createdAt).getDate() +
              " " +
              new Date(post.createdAt).toLocaleString("default", {
                month: "short",
              })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
