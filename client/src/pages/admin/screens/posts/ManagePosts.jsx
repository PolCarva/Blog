import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { deletePost, getAllPosts } from "../../../../services/index/posts";
import { stable, images } from "../../../../constants";
import Pagination from "../../../../components/Pagination";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

let isFirstRun = true;

const ManagePosts = () => {
  const userState = useSelector((state) => state.user);

  const queryClient = useQueryClient();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  let userId = "";

  if (userState.userInfo && !userState.userInfo.op) {
    userId = userState.userInfo._id;
  }

  const {
    data: postsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage, userId),
    queryKey: ["posts"],
  });

  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      mutationFn: ({ slug, token }) => {
        return deletePost({
          slug,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("posts");
        toast.success("Post removed successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const deletePostHandler = ({ slug, token }) => {
    if (window.confirm("Are you sure you want to delete this post?"))
      mutateDeletePost({ slug, token });
  };


  return (
    <div className="h-full">
      <h1 className="text-2xl font-semibold">Manage Posts</h1>
      <div className="w-full px-4 mx-auto">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">Users</h2>
            <div className="text-end">
              <form
                onSubmit={submitSearchKeywordHandler}
                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
              >
                <div className=" relative ">
                  <input
                    type="text"
                    id="form-subscribe-Filter"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:blue-600 focus:border-transparent"
                    placeholder="Post title..."
                    onChange={searchKeywordHandler}
                    value={searchKeyword}
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:blue-500 focus:ring-offset-2 focus:blue-200"
                  type="submit"
                >
                  Filter
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Tags
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        Loading...
                      </td>
                    </tr>
                  ) : postsData?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        No posts found{" "}
                      </td>
                    </tr>
                  ) : (
                    postsData?.data.map((post, index) => (
                      <tr key={index} className={post.isNew && "opacity-60"}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <Link to={`/blog/${post?.slug}`} className="relative block">
                                <img
                                  alt={post?.title}
                                  src={
                                    post?.photo
                                      ? stable.UPLOAD_FOLDER_BASE_URL +
                                        post?.photo
                                      : images.samplePostImage
                                  }
                                  className="mx-auto object-cover rounded-lg aspect-square w-10 "
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = images.samplePostImage;
                                  }}
                                />
                              </Link>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {post?.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {post.categories.length > 0
                              ? post.categories[0]
                              : "Uncategorized"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {new Date(post?.createdAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex gap-x-2">
                            {post.tags.length > 0 ? (
                              post.tags.map((tag, index) => (
                                <p key={index}>
                                  {tag}
                                  {post.tags.length - 1 !== index && ","}
                                </p>
                              ))
                            ) : (
                              <p>No Tags</p>
                            )}
                          </div>
                        </td>
                        <td className="space-x-5 px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <button
                            disabled={isLoadingDeletePost}
                            type="button"
                            className="text-red-600 hover:text-red-900 disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={() =>
                              deletePostHandler({
                                token: userState.userInfo.token,
                                slug: post.slug,
                              })
                            }
                          >
                            Delete
                          </button>
                          <Link
                            to={`/admin/posts/manage/edit/${post.slug}`}
                            className="text-green-success hover:text-green-dark"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(
                    postsData?.headers?.["x-totalpagecount"]
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePosts;
