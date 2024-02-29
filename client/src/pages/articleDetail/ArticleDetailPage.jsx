import React, { useEffect, useState } from "react";

import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Link, useParams } from "react-router-dom";
import { images, stable } from "../../constants";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getSinglePost } from "../../services/index/posts";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector } from "react-redux";
import parseJsonToHtml from "../../utils/parseJsonToHtml";
import Editor from "../../components/editor/Editor";
import { useTranslation } from "react-i18next";

const ArticleDetailPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const [breadCrumbsData, setBreadCrumbsData] = useState([]);

  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getSinglePost({ slug }),
    onSuccess: (data) => {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: `${data.title}`, link: `/blog/${data.slug}` },
      ]);
      setBody(parseJsonToHtml(data?.body));
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message={t('alerts.somethingWentWrong')} />
      ) : (
        <section className="container px-5 md:px-12 mx-auto max-w-5xl flex flex-col py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <img
              className="rounded-xl w-full aspect-video object-cover object-center"
              src={
                data?.photo
                  ? stable.UPLOAD_FOLDER_BASE_URL + data.photo
                  : images.samplePostImage
              }
              alt={data?.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = images.samplePostImage;
              }}
            />
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.title}`}
                  className="text-primary text-sm font-roboto inline-block uppercase md:text-base"
                >
                  {category.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mt-4">
              <h1 className="text-3xl order-2 md:order-1 font-medium font-roboto mt-4 text-dark-hard">
                {data?.title} {data?.title} {data?.title} {data?.title} {data?.title}
              </h1>
              {data?.url && (
                <a
                  href={data?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="order-1 md:order-2 w-full md:w-auto text-white min-w-fit bg-primary hover:bg-primary-hover transition-colors ease-in-out h-12 px-6 text-center rounded-full py-3 font-roboto block"
                >
                  {t("articles.projectLink")}
                </a>
              )}
            </div>

            <div className="w-full">
              {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
              )}
            </div>

            <CommentsContainer
              className="mt-10"
              loggedInUserId={userState?.userInfo?._id}
              comments={data?.comments}
              postSlug={slug}
            />
          </article>
          <div>
            <SuggestedPosts
              header={t("article.suggestedPosts")}
              posts={postsData?.data.slice(0, 3)}
              tags={data?.tags}
              className="mt-8 lg:mt-0 lg:max-w-xs"
            />
            <div className="mt-7">
              <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                {t("article.share")}
              </h2>
              <SocialShareButtons
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(data?.title)}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetailPage;
