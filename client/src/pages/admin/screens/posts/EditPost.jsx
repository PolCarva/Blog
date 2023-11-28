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
import { getAllCategories } from "../../../../services/postCategories";
import {
  categoryToOption,
  filterCategories,
} from "../../../../utils/multiSelectTagUtils";
import { useEffect } from "react";
import { useRef } from "react";

const promiseOptions = async (inputValue) => {
  const categoriesData = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
  const isMounted = useRef(true);
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
  const [postSlug, setPostSlug] = useState(slug);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      if (isMounted.current) {
        setInitialPhoto(data?.photo);
        setTitle(data?.title);
        setCaption(data?.caption);
        setCategories(data?.categories.map((category) => category._id));
        setIsNewPost(data?.isNew);
        setTags(data?.tags);
      }
    },
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

    updatedData.append(
      "document",
      JSON.stringify({ body, title, caption, categories, tags, slug: postSlug })
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

  useEffect(() => {
    const handleWindowBlur = () => {
      console.log("Ventana fuera de foco");
    };

    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  let isPostDataLoaded = !isLoading && !isError;
  return (
    <div className="h-full">
      {isLoading ? (
        <ArticleDetailSkeleton isManage />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <div className="d-form-control w-full">
              <label htmlFor="title" className="d-label">
                <span className="d-label-text text-lg">Slug:</span>
              </label>
              <input
                id="slug"
                onChange={(e) =>
                  /* replace áéíóú */
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
                placeholder="Post Slug"
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
              Delete Image
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
                <span className="d-label-text text-lg">Title:</span>
              </label>
              <input
                id="title"
                onChange={(e) => {
                  console.log("Title changed:", e.target.value);
                  setTitle(e.target.value);
                }}
                type="text"
                value={title}
                placeholder="Title"
                maxLength={50}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl w-full font-medium font-roboto mb-4 text-dark-hard"
              />
            </div>

            <div className="d-form-control w-full">
              <label htmlFor="caption" className="d-label">
                <span className="d-label-text text-lg">Caption:</span>
              </label>
              <textarea
                id="caption"
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                maxLength={120}
                placeholder="Caption"
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 resize-none mb-2 bg-transparent p-1 h-10 w-full border rounded-md outline-none"
              />
            </div>
            <div className="mt-2">
              <label className="d-label">
                <span className="d-label-text text-lg">Categories:</span>
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
                <span className="d-label-text text-lg">Tags:</span>
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
                {isNewPost ? "Delete" : "Cancel"}
              </button>
              <button
                disabled={isLoadingUpdatePostDetail}
                type="button"
                onClick={handleUpdatePost}
                className="flex-1 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 mt-5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isNewPost ? "Publish" : "Update"}
              </button>
            </div>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditPost;
