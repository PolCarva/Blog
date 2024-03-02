import { deletePost, getAllPosts, updatePost } from "../../../../services/index/posts";
import { stable, images } from "../../../../constants";
import Pagination from "../../../../components/Pagination";
import { Link } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTable from "../../components/DataTable";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ManagePosts = () => {
  const { t } = useTranslation();
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
        100000,
        "",
        userState.userInfo && !userState.userInfo.op
          ? userState.userInfo._id
          : "",
      ),
    dataQueryKey: "posts",
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({ slug, token });
    },
    deleteDataMessage: "Post deleted successfully",
  });

  const { mutate: mutateUpdatePost, isLoading: isLoadingPost } =
    useMutation({
      mutationFn: ({ updatedData, slug }) => {
        console.log(updatedData, slug);
        return updatePost({
          updatedData,
          slug,
          token: userState.userInfo.token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post updated");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);

      },
    });


  const togglePostVisibility = async ({ status, slug }) => {
    let updatedData = new FormData();

    updatedData.append(
      "document",
      JSON.stringify({ isHidden: status })
    );
    mutateUpdatePost({
      updatedData,
      slug,
    });
  }

  return (
    <DataTable
      pageTitle={t('admin.posts.manage.title')}
      dataListName={t('admin.posts.title')}
      searchInputPlaceHolder={t('admin.posts.manage.filterPlaceholder')}
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        t('admin.common.table.title'),
        t('admin.common.table.category'),
        t('admin.common.table.createdAt'),
        t('admin.common.table.tags'),
        t('admin.common.table.actions.title'),
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
        <tr key={index} className={post.isHidden || post.isNewPost ? "opacity-60" : undefined}>
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
                <p className="text-gray-900">
                  {post?.title}
                </p>
              </div>
            </div>
          </td>
          <td className="overflow-x-auto px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 flex flex-wrap gap-1">
              {post.categories.length > 0
                ? post.categories.slice(0, 3).map((category, index) => (
                  <span key={index} className="bg-gray-200 p-1 rounded">
                    {category.title}
                  </span>
                ))
                : t('admin.posts.manage.uncategorized')}
            </p>
          </td>
          <td className="overflow-x-auto px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900">
              {new Date(post?.createdAt).toLocaleDateString()}
            </p>
          </td>
          <td className="overflow-x-auto px-5 py-5 text-sm max-w-sm bg-white border-b border-gray-200">
            <div className="flex gap-x-2">
              {post.tags.length > 0 ? (
                post.tags.map((tag, index) => (
                  <p key={index}>
                    {tag}
                    {post.tags.length - 1 !== index && ","}
                  </p>
                ))
              ) : (
                <p>{t('admin.posts.manage.noTags')}</p>
              )}
            </div>
          </td>
          <td className="overflow-x-auto relative space-x-5 px-5 py-5 text-sm bg-white border-b border-gray-200 items-center justify-stretch">
            <div className="flex w-full gap-4 h-full bg-white ">
              <button
                disabled={isLoadingDeleteData}
                type="button"
                className="text-red-600 hover:text-red-900 h-full disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() =>
                  deleteDataHandler({
                    token: userState.userInfo.token,
                    slug: post.slug,
                  })
                }
              >
                {t('admin.common.table.actions.delete')}
              </button>
              <Link
                to={`/admin/posts/manage/edit/${post.slug}`}
                className="text-green-success hover:text-green-dark h-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {t('admin.common.table.actions.edit')}
              </Link>
              <button
                disabled={isLoadingPost}
                type="button"
                className="text-yellow-600 hover:text-red-900 h-full disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() =>
                  togglePostVisibility({
                    status: !post.isHidden,
                    slug: post.slug,
                  })
                }
              >
                {post.isHidden ? t('admin.common.table.actions.show') : t('admin.common.table.actions.hide')}
              </button>
            </div>
            {post.isNewPost && (
              <span className="text-yellow-600 font-bold absolute top-1 right-2 group">
                <span className="relative cursor-help">
                  {t('admin.posts.new.isNewPost')}
                  <span className="transition-opacity rounded-md z-[1000] ease-in-out py-2 px-4 bg-yellow-200 bg-opacity-100 fixed opacity-0 top-2 left-1/2 -translate-x-1/2 group-hover:opacity-100 text-yellow-900 font-semibold">
                    {t('admin.posts.new.isNewPostTooltip')}
                  </span>
                </span>
              </span>

            )}
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default ManagePosts;
