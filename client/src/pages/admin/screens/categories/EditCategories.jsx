import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  getSingleCategory,
  updateCategory,
} from "../../../../services/index/postCategories";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const EditCategories = () => {
  const { t } = useTranslation();
  const [categoryTitle, setCategoryTitle] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    onSuccess: (data) => {
      setCategoryTitle(data?.title);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: ({ title, slug, token }) => {
        return updateCategory({
          title,
          slug,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories", slug]);
        toast.success("Category updated");
        navigate(`/admin/categories/manage/edit/${data?._id}`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateCategory = () => {
    if (!categoryTitle) return;

    mutateUpdateCategory({
      title: categoryTitle,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <div className="col-span-4 py-8">
      <h4 className="text-2xl leading-tight">{t("admin.posts.categories.update")}</h4>
      <div className="d-form-control w-full">
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
          disabled={isLoadingUpdateCategory || isLoading || isError}
          type="button"
          onClick={handleUpdateCategory}
          className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {t("admin.posts.categories.update")}
        </button>
      </div>
    </div>
  );
};

export default EditCategories;
