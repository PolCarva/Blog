import React from "react";
import { FaArrowRight } from "react-icons/fa";

import ArticleCard from "../../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Articles = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts("", 1, 6),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <section className="flex flex-col container px-5 md:px-12 mx-auto py-10 w-full">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {isLoading ? (
          [...Array(3)].map((item, index) => {
            return (
              <ArticleCardSkeleton
                key={index}
                className={
                  "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                }
              />
            );
          })
        ) : isError ? (
          <ErrorMessage message={t('alerts.somethingWentWrong')} />
        ) : (
          data?.data.filter((post) => !post.isHidden || post.isNew).length > 0 ? (
            data?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .filter((post) => !post.isHidden || post.isNew)
              .map((post) => (
                <ArticleCard
                  key={post._id}
                  post={post}
                  className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                />
              ))
          ) : (
            <h1 className='font-bold text-center w-full text-2xl text-primary'>{t("alerts.nothingHere")}</h1>
          ))}
      </div>
      <Link to="/blog" className="mx-auto hover:bg-primary hover:text-white transition-colors ease-in-out duration-300 flex items-center gap-x-2 font-bold border-2 text-primary border-primary px-6 py-3 rounded-lg">
        <span>{t('articles.moreArticles')}</span>
        <FaArrowRight className="w-3 h-3" />
      </Link>
    </section>
  );
};

export default Articles;
