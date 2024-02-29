import { useDataTable } from "../../../../hooks/useDataTable";
import DataTable from "../../../admin/components/DataTable";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../../../services/index/comments";
import { Link } from "react-router-dom";
import stables from "../../../../constants/stables";
import { images } from "../../../../constants";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Comments = () => {
  const { t } = useTranslation();
  const {
    userState,
    currentPage,
    setCurrentPage,
    searchKeyword,
    data: commentsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
  } = useDataTable({
    dataQueryFn: () =>
      getAllComments(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "comments",
    mutateDeleteFn: ({ token, slug }) => {
      return deleteComment({ token, commentId: slug });
    },
    deleteDataMessage: "Comment deleted successfully",
  });

  const {
    mutate: mutateUpdateCommentCheck,
    isLoading: isLoadingUpdateCommentCheck,
  } = useMutation({
    mutationFn: ({ token, check, commentId }) => {
      return updateComment({ token, check, commentId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
      toast.success(
        data?.check
          ? "Comment approved successfully"
          : "Comment unapproved successfully"
      );
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <DataTable
      pageTitle={t('admin.comments.manage')}
      dataListName={t('admin.comments.title')}
      searchInputPlaceHolder={t('admin.comments.filterPlaceholder')}
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        t('admin.common.table.author'),
        t('admin.common.table.comment'),
        t('admin.common.table.inResponseTo'),
        t('admin.common.table.createdAt'),
        t('admin.common.table.actions.title'),
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={commentsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={commentsData?.headers}
    >
      {commentsData?.data?.map((comment, index) => (
        <tr key={index}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to={`/`} className="relative block">
                  <img
                    alt={comment?.user?.name}
                    src={
                      comment?.user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + comment?.user?.avatar
                        : images.defaultProfile
                    }
                    className="mx-auto object-cover rounded-lg aspect-square w-10 "
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = images.defaultProfile;
                    }}
                  />
                </Link>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment?.user?.name}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            {comment?.replyOnUser !== null && (
              <p className="text-gray-900 whitespace-no-wrap text-xs italic bold">
                {t('admin.common.table.replyOn')} {" "}
                <Link
                  to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {comment?.replyOnUser?.name}
                </Link>
              </p>
            )}
            <p className="text-gray-900 whitespace-no-wrap">{comment?.desc}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              <Link
                to={`/blog/${comment?.post?.slug}/`}
                className="text-blue-500 hover:text-blue-700"
              >
                {comment?.post?.title}
              </Link>
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(comment?.createdAt).toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </td>
          <td className="space-x-5 px-5 py-5 text-sm bg-white border-b border-gray-200">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className={`${
                comment?.check
                  ? "text-yellow-600 hover:text-yellow-900"
                  : "text-green-600 hover:text-green-900"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
              onClick={() =>
                mutateUpdateCommentCheck({
                  token: userState.userInfo.token,
                  commentId: comment?._id,
                  check: comment?.check ? false : true,
                })
              }
            >
              {comment?.check ? t('admin.common.table.actions.unapprove') : t('admin.common.table.actions.approve')}
            </button>
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() =>
                deleteDataHandler({
                  token: userState.userInfo.token,
                  slug: comment?._id,
                })
              }
            >
              {t('admin.common.table.actions.delete')}
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Comments;
