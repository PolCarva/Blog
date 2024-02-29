import { useDataTable } from '../../../../hooks/useDataTable';
import { deleteUser, getAllUsers, updateProfile } from '../../../../services/index/users';
import DataTable from '../../components/DataTable';
import { Link } from 'react-router-dom';
import { images, stable } from '../../../../constants';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Users = () => {
  const { t } = useTranslation();
  const {
    userState,
    currentPage,
    setCurrentPage,
    searchKeyword,
    data: usersData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
  } = useDataTable({
    dataQueryFn: () =>
      getAllUsers(
        userState.userInfo.token,
        searchKeyword,
        currentPage
      ),
    dataQueryKey: "users",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteUser({ slug, token });
    },
    deleteDataMessage: "User deleted successfully",
  });

  const { mutate: mutateUpdateUser, isLoading: isLoadingUpdateUser } =
    useMutation({
      mutationFn: ({ userData, userId }) => {
        return updateProfile({
          token: userState.userInfo.token,
          userData: userData,
          userId,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["users"]);
        toast.success("User updated");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);

      },
    });

  const handleAdminCheck = (e, userId) => {
    const isAdmin = e.target.checked;
    mutateUpdateUser({
      userId,
      userData: { admin: isAdmin },
    });
  };

  const handleVerificationCheck = (e, userId) => {
    console.log(e.target.checked, userId);
    const isVerified = e.target.checked;
    mutateUpdateUser({
      userId,
      userData: { verified: isVerified },
    });
  };


  return (
    <DataTable
      pageTitle={t("admin.users.manage")}
      dataListName={t("admin.users.title")}
      searchInputPlaceHolder={t("admin.users.filterPlaceholder")}
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        t("admin.common.table.userName"),
        t("admin.common.table.mail"),
        t("admin.common.table.createdAt"),
        t("admin.common.table.verified"),
        t("admin.common.table.admin"),
        t("admin.common.table.actions.title"),
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={usersData}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={usersData?.headers}
      userState={userState}
    >
      {usersData?.data.map((user) => (
        <tr key={user._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to={`/`} className="relative block">
                  <img
                    alt={user?.name}
                    src={
                      user?.avatar
                        ? stable.UPLOAD_FOLDER_BASE_URL + user?.avatar
                        : images.defaultProfile
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
                  {user?.name}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap flex flex-wrap gap-1">
              {user?.email}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            {user.op || user.admin ? <span className='text-2xl'>✅</span> :
              <input
                defaultChecked={user.verified}
                type='checkbox'
                disabled={isLoadingUpdateUser}
                onChange={(e) => { handleVerificationCheck(e, user._id) }}
                className='checked:bg-[url("/img/check.png")] bg-cover checked:disabled:bg-none d-checkbox disabled:bg-orange-400 disabled:opacity-100' />
            }
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            {user?.op ? (
              <p className="text-gray-900 text-2xl whitespace-no-wrap">
                👑
              </p>
            ) : (
              userState.userInfo.op ? (
                <input
                  defaultChecked={user.admin}
                  type='checkbox'
                  disabled={isLoadingUpdateUser}
                  onChange={(e) => { handleAdminCheck(e, user._id) }}
                  className='checked:bg-[url("/img/check.png")] bg-cover checked:disabled:bg-none d-checkbox disabled:bg-orange-400 disabled:opacity-100' />
              ) : (
                user.admin ? <span className='text-2xl'>✅</span> : <span className='text-lg'>❌</span>
              )
            )}
          </td>
          <td className="space-x-5 px-5 py-5 text-sm bg-white border-b border-gray-200">
            <button
              type="button"
              disabled={
                isLoadingDeleteData ||
                user.op || // Si el usuario actual es OP, deshabilita el botón
                user._id === userState.userInfo._id || // Si el usuario actual es el mismo que el objetivo, deshabilita el botón
                (user.admin && !userState.userInfo.op) || // Si el usuario actual es admin y el usuario objetivo no es OP, deshabilita el botón
                (!userState.userInfo.op && !userState.userInfo.admin) // Si el usuario actual no es OP ni admin, deshabilita el botón
              } className="text-red-600 hover:text-red-900 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() =>
                deleteDataHandler({
                  token: userState.userInfo.token,
                  slug: user?._id,
                })
              }
            >
              {t("admin.common.table.actions.delete")}
            </button>

          </td>
        </tr>
      ))}
    </DataTable>
  );
}

export default Users