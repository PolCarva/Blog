/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { images, stable } from "../../../constants";
import { useTranslation } from "react-i18next";

const SuggestedPosts = ({ className, header, posts = [], tags }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg p-4 ${className}`}
    >
      <h2 className="font-roboto font-medium text-dark-hard md:text-xl">
        {header}
      </h2>
      <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
        {posts.filter(post => !post.isHidden).map((post) => (
          <div
            key={post._id}
            className="flex space-x-3 flex-nowrap items-center"
          >
            <img
              src={
                post?.photo
                  ? stable.UPLOAD_FOLDER_BASE_URL + post.photo
                  : images.samplePostImage
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = images.samplePostImage;
              }}
              alt={post.title}
              className="aspect-square object-cover rounded-lg w-1/5"
            />
            <div className="text-sm font-roboto text-dark-hard font-medium">
              <h3 className="text-sm font-roboto text-dark-hard font-medium md:text-base lg:text-lg">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <span className="text-xs opacity-60">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="font-roboto font-medium text-dark-hard mt-8 md:text-xl">
        {t("article.tags")}	
      </h2>
      {tags.length === 0 ? (
        <p className="text-slate-500 text-xs mt-2">{t('article.noTags')}</p>
      ) : (
        <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
          {tags.map((tag, index) => (
            <Link
              key={index}
              to={`/blog?search=${tag}`}
              className="inline-block font-semibold rounded-md px-3 py-1.5 text-primary bg-primary bg-opacity-10 hover:bg-opacity-20 transition-all ease-in-out text-xs md:text-sm"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestedPosts;
