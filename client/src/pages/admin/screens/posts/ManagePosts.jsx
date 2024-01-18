import { deletePost, getAllPosts } from "../../../../services/index/posts";
import { stable, images } from "../../../../constants";
import Pagination from "../../../../components/Pagination";
import { Link } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTable from "../../components/DataTable";

const ManagePosts = () => {
  const {
    userState,
    currentPage,
    setCurrentPage,
    searchKeyword,
    data: postsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
  } = useDataTable({
    dataQueryFn: () =>
      getAllPosts(
        searchKeyword,
        currentPage,
        userState.userInfo && !userState.userInfo.op
          ? userState.userInfo._id
          : ""
      ),
    dataQueryKey: "posts",
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({ slug, token });
    },
    deleteDataMessage: "Post deleted successfully",
  });

  return (
    <DataTable
      pageTitle={"Manage Posts"}
      dataListName={"Posts"}
      searchInputPlaceHolder={"Post title..."}
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Title",
        "Category",
        "Created At",
        "Tags",
        "",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={postsData}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={postsData?.headers}
      userState={userState}
    >
      {postsData?.data.map((post, index) => (
        <tr key={index} className={post.isNew && "opacity-60"}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to={`/blog/${post?.slug}`} className="relative block">
                  <img
                    alt={post?.title}
                    src={
                      post?.photo
                        ? stable.UPLOAD_FOLDER_BASE_URL + post?.photo
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
            <p className="text-gray-900 whitespace-no-wrap flex flex-wrap gap-1">
              {post.categories.length > 0
                ? post.categories.slice(0, 3).map((category, index) => (
                    <span key={index} className="bg-gray-200 p-1 rounded">
                      {category.title}
                    </span>
                  ))
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
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() =>
                deleteDataHandler({
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
      ))}
    </DataTable>
  );
};

export default ManagePosts;
