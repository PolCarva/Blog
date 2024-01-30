import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../../../services/index/postCategories";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Categories = () => {
  const [categoryTitle, setCategoryTitle] = useState("");

  const { mutate: mutateCreateCategory, isLoading: isLoadingCreateCategory } =
    useMutation({
      mutationFn: ({ token, title }) => {
        return createCategory({
          token,
          title,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories"]);
        toast.success("Category created!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const {
    userState,
    currentPage,
    setCurrentPage,
    searchKeyword,
    data: categoriesData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
  } = useDataTable({
    dataQueryFn: () => getAllCategories(searchKeyword, currentPage),
    dataQueryKey: "categories",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteCategory({ slug, token });
    },
    deleteDataMessage: "Category deleted successfully",
  });

  const handleUpdateCategory = () => {
    mutateCreateCategory({
      token: userState.userInfo.token,
      title: categoryTitle,
    });
  };

  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-4 py-8">
        <h4 className="text-2xl leading-tight">Add New Category</h4>
        <input
          onChange={(e) => {
            setCategoryTitle(e.target.value);
          }}
          type="text"
          value={categoryTitle}
          placeholder="Category title"
          maxLength={50}
          className="d-input mt-6 d-input-bordered bg-white border-slate-300 !outline-slate-300 text-xl w-full font-medium font-roboto text-dark-hard"
        />
        <button
          disabled={isLoadingCreateCategory}
          type="button"
          onClick={handleUpdateCategory}
          className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Add Category
        </button>
      </div>
      <div className="col-span-8">
        <DataTable
          pageTitle={""}
          dataListName={"Categories"}
          searchInputPlaceHolder={"Category title..."}
          searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
          searchKeywordOnChangeHandler={searchKeywordHandler}
          searchKeyword={searchKeyword}
          tableHeaderTitleList={["Title", "Created At", ""]}
          isLoading={isLoading}
          isFetching={isFetching}
          data={categoriesData}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          headers={categoriesData?.headers}
          userState={userState}
        >
          {categoriesData?.data.map((category, index) => (
            <tr key={index} className={category.isNew && "opacity-60"}>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {category?.title}
                  </p>
                </div>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-no-wrap">
                  {new Date(category?.createdAt).toLocaleDateString()}
                </p>
              </td>

              <td className="space-x-5 px-5 py-5 text-sm bg-white border-b border-gray-200">
                <button
                  disabled={isLoadingDeleteData}
                  type="button"
                  className="text-red-600 hover:text-red-900 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() =>
                    deleteDataHandler({
                      token: userState.userInfo.token,
                      slug: category._id,
                    })
                  }
                >
                  Delete
                </button>
                <Link
                  to={`/admin/categories/manage/edit/${category?._id}`}
                  className="text-green-success hover:text-green-dark"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default Categories;
