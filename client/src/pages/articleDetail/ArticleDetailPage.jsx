import React from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Link } from "react-router-dom";
import { images } from "../../constants";
import SuggestedPosts from "./container/SuggestedPosts";

const breadCrumbsData = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Article title", link: "/blog/1" },
];

const postsData = [
  {
    _id: 1,
    img: images.Post1,
    title: "Help children get better education",
    createdAt: "2023-08-01T12:00:00.000Z",
  },
  {
    _id: 2,
    img: images.Post1,
    title: "Help children get better education",
    createdAt: "2023-08-01T12:00:00.000Z",
  },
  {
    _id: 3,
    img: images.Post1,
    title: "Help children get better education",
    createdAt: "2023-08-01T12:00:00.000Z",
  },
  {
    _id: 4,
    img: images.Post1,
    title: "Help children get better education",
    createdAt: "2023-08-01T12:00:00.000Z",
  },
];

const tagsData = [
  "Medical",
  "Education",
  "Food",
  "Lifestyle",
  "Healthy",
  "Diet",
  "Learning",
];

const ArticleDetailPage = () => {
  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img className="rounded-xl w-full" src={images.Post1} alt="Laptop" />
          <Link
            to="/blog?category=selectedCategory"
            className="text-primary text-sm font-roboto inline-block mt-4 uppercase md:text-base"
          >
            Education
          </Link>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            Help children get better education
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
              congue mauris rhoncus aenean vel elit scelerisque. In egestas erat
              imperdiet sed euismod nisi porta lorem mollis.
            </p>
          </div>
        </article>
        <SuggestedPosts
          header={"Latest Article"}
          posts={postsData}
          tags={tagsData}
          className="mt-8 lg:mt-0 lg:max-w-xs"
        />
      </section>
    </MainLayout>
  );
};

export default ArticleDetailPage;
