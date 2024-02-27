import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

import { images } from "../../../constants";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createPost } from "../../../services/index/posts";
import { useTranslation } from "react-i18next";

const HeaderAdmin = () => {
  let { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState(pathname.split("/")[2] || "dashboard");
  const windowSize = useWindowSize();

  const userState = useSelector((state) => state.user);

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ token }) => {
        return createPost({
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("posts");
        navigate(`/admin/posts/manage/edit/${data.slug}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  useEffect(() => {
    setActiveNavName(pathname.split("/")[2] || "dashboard");
  }, [pathname]);

  const handleCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };
  

  return (
    <header className="flex z-[1000] h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      {/* Logo */}
      <Link to={"/"}>
        <img src={images.Logo} alt="Logo" className="w-24 lg:hidden" />
      </Link>
      {/* Menu */}
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {/* Sidebar container */}
      <div className={`${isMenuActive ? "fixed" : "hidden" } inset-0 lg:static lg:h-full lg:w-full`}>
        {/* Underlay */}
        <div
          className={`${isMenuActive ? "opacity-50 translate-x-0" : "opacity-0 translate-x-full"
            } fixed inset-0 bg-black lg:hidden`}
          onClick={toggleMenuHandler}
        />
        {/* Sidebar */}
        <div
          className={`${isMenuActive ? "translate-x-0" : "-translate-x-full"
            } transition-transform ease-in-out duration-300  fixed top-0 left-0 bottom-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-fill lg:w-full lg:p-6`}
        >
          <Link to="/">
            <img src={images.Logo} alt="Logo" className="w-24" />
          </Link>
          <h4 className="mt-10 font-bold uppercase text-gray-detail">{t('admin.mainMenu.title')}</h4>
          {/* Menu Items */}
          <div className="mt-6 flex flex-col gap-y-[0.563rem]">
            <NavItem
              title={t('admin.dashboard.title')}
              link="/admin"
              icon={<AiFillDashboard className="text-xl" />}
              name="dashboard"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            />

            <NavItem
              title={t('admin.comments.title')}
              link="/admin/comments"
              icon={<FaComments className="text-xl" />}
              name="comments"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            />
            <NavItemCollapse
              title={t('admin.posts.title')}
              icon={<MdDashboard className="text-xl" />}
              name="posts"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            >
              <Link to="/admin/posts/manage">{t('admin.posts.manage.title')}</Link>
              <button
                className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isLoadingCreatePost}
                onClick={() =>
                  handleCreateNewPost({ token: userState.userInfo.token })
                }
              >
                {t('admin.posts.new.create')}
              </button>
              <Link to="/admin/categories/manage">{t('admin.posts.categories.title')}</Link>

            </NavItemCollapse>
            <NavItem
              title={t('admin.users.title')}
              link="/admin/users/manage"
              icon={<FaUser className="text-xl" />}
              name="users"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
