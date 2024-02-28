import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  deletePost,
  getSinglePost,
  updatePost,
} from "../../../../services/index/posts";
import CreatableSelect from "react-select/creatable";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { images, stable } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Editor from "../../../../components/editor/Editor";
import MultiSelectTagDropdown from "../../../../components/select-dropdown/MultiSelectTagDropdown";
import { getAllCategories } from "../../../../services/index/postCategories";
import {
  categoryToOption,
  filterCategories,
} from "../../../../utils/multiSelectTagUtils";
import { useTranslation } from "react-i18next";

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [categories, setCategories] = useState(null);
  const [isNewPost, setIsNewPost] = useState(false);
  const [tags, setTags] = useState(null);
  const [url, setUrl] = useState("");
  const [postSlug, setPostSlug] = useState(slug);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setInitialPhoto(data?.photo);
      setTitle(data?.title);
      setCaption(data?.caption);
      setCategories(data?.categories.map((category) => category._id));
      setIsNewPost(data?.isNew);
      setTags(data?.tags);
      setUrl(data?.url);
    },
    refetchOnWindowFocus: false,
  });

  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({
        updatedData,
        slug,
        token,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success(isNewPost ? "Post created" : "Post updated");
      navigate(`/admin/posts/manage/edit/${data?.slug}`, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let reponse = await fetch(url);
        let blob = await reponse.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stable.UPLOAD_FOLDER_BASE_URL + data?.photo
      );

      updatedData.append("postPicture", picture);
    }

    // eslint-disable-next-line no-useless-escape
    const urlPattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    if (!urlPattern.test(url)) {
      toast.error(t("alerts.invalidUrl"));
      return;
    }

    updatedData.append(
      "document",
      JSON.stringify({ body, title, caption, categories, tags, slug: postSlug, url })
    );

    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your post?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  const handleCancelPost = async () => {
    if (data.isNew) {
      console.log("delete post");
      await deletePost({ slug, token: userState.userInfo.token }).then(() => {
        toast.success("Post is deleted");
        navigate("/admin/posts/manage");
      });
    } else {
      toast.success("Canceled editing post");
      navigate("/admin/posts/manage");
    }
  };

  let isPostDataLoaded = !isLoading && !isError;
  return (
    <div className="h-full">
      {isLoading ? (
        <ArticleDetailSkeleton isManage />
      ) : isError ? (
        <ErrorMessage message={t("aletrs.couldNotFetchPostDetails")} />
      ) : (
        <section className="container px-5 md:px-12 mx-auto max-w-5xl flex flex-col py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <div className="d-form-control w-full">
              <label htmlFor="title" className="d-label">
                <span className="d-label-text text-lg">{t('admin.posts.new.inputs.slug')}:</span>
              </label>
              <input
                id="slug"
                onChange={(e) =>
                  setPostSlug(
                    e.target.value
                      .normalize("NFD") // Normaliza los caracteres a su forma descompuesta
                      .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
                      .replace(/\s+/g, "-") // Reemplaza espacios con guiones
                      .replace(/[^\w-]/g, "") // Elimina caracteres especiales
                      .toLowerCase()
                  )
                }
                type="text"
                value={postSlug}
                placeholder={t('admin.posts.new.inputs.slug')}
                maxLength={50}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl w-full font-medium font-roboto mb-4 text-dark-hard"
              />
            </div>
            <div className="d-form-control w-full">
              <label htmlFor="url" className="d-label">
                <span className="d-label-text text-lg">{t('admin.posts.new.inputs.url') + " " + t("admin.common.optional")}:</span>
              </label>
              <input
                id="url"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                type="text"
                value={url}
                placeholder={t('admin.posts.new.placeholders.url')}
                maxLength={50}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl w-full font-medium font-roboto mb-4 text-dark-hard"
              />
            </div>
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="rounded-xl w-full aspect-video object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = images.samplePostImage;
                  }}
                />
              ) : initialPhoto ? (
                <img
                  src={stable.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className="rounded-xl w-full aspect-video object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = images.samplePostImage;
                  }}
                />
              ) : (
                <div className="w-full min-h-[200px] border-2 border-dashed rounded-lg border-gray-placeholder bg-blue-50/50 flex justify-center items-center">
                  <HiOutlineCamera className="w-7 h-auto text-primary" />
                </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5"
            >
              {t('admin.posts.new.inputs.deleteImage')}
            </button>
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="d-form-control w-full">
              <label htmlFor="title" className="d-label">
                <span className="d-label-text text-lg">{t('admin.posts.new.inputs.title')}:</span>
              </label>
              <input
                id="title"
                onChange={(e) => {
                  console.log("Title changed:", e.target.value);
                  setTitle(e.target.value);
                }}
                type="text"
                value={title}
                placeholder={t('admin.posts.new.inputs.title')}
                maxLength={50}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl w-full font-medium font-roboto mb-4 text-dark-hard"
              />
            </div>

            <div className="d-form-control w-full">
              <label htmlFor="caption" className="d-label">
                <span className="d-label-text text-lg">{t('admin.posts.new.inputs.caption')}</span>
              </label>
              <textarea
                id="caption"
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                maxLength={120}
                placeholder={t('admin.posts.new.inputs.caption')}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 resize-none mb-2 bg-transparent p-1 h-10 w-full border rounded-md outline-none"
              />
            </div>
            <div className="mt-2">
              <label className="d-label">
                <span className="d-label-text text-lg">{t('admin.posts.new.inputs.categories') + " " + t('admin.common.optional')}</span>
              </label>
              {isPostDataLoaded && (
                <MultiSelectTagDropdown
                  defaultValue={data?.categories.map(categoryToOption)}
                  loadOptions={promiseOptions}
                  onChange={(newValue) =>
                    setCategories(newValue.map((item) => item.value))
                  }
                />
              )}
            </div>

            <div className="mb-5 mt-2 z-10">
              <label className="d-label">
                <span className="d-label-text text-lg">{t('admin.posts.new.inputs.tags') + " " + t('admin.common.optional')}</span>
              </label>
              {isPostDataLoaded && (
                <CreatableSelect
                  defaultValue={data?.tags.map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                  isMulti
                  onChange={(newValue) =>
                    setTags(newValue.map((item) => item.value))
                  }
                  className="relative z-20"
                />
              )}
            </div>

            <div className="w-full">
              {isPostDataLoaded && (
                <Editor
                  content={data?.body}
                  editable={true}
                  onDataChange={(data) => {
                    setBody(data);
                  }}
                />
              )}
            </div>
            <div className="flex justify-between gap-5">
              <button
                disabled={isLoadingUpdatePostDetail}
                type="button"
                onClick={handleCancelPost}
                className="flex-1 bg-red-500 text-white font-semibold rounded-lg px-4 py-2 mt-5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isNewPost ? t("admin.common.actions.delete") : t("admin.common.actions.cancel")}
              </button>
              <button
                disabled={isLoadingUpdatePostDetail}
                type="button"
                onClick={handleUpdatePost}
                className="flex-1 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 mt-5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isNewPost ? t("admin.common.actions.publish") : t("admin.common.actions.update")}
              </button>
            </div>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditPost;
