import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

import { images } from "../../../constants";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createPost } from "../../../services/index/posts";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
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

  const handleCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      {/* Logo */}
      <Link to={"/"}>
        <img src={images.Logo} alt="Logo" className="w-16 lg:hidden" />
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
      <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
        {/* Underlay */}
        <div
          className={`${
            isMenuActive ? "opacity-50" : "opacity-0"
          } transition-opacity ease-in-out duration-300 fixed inset-0 bg-black lg:hidden`}
          onClick={toggleMenuHandler}
        />
        {/* Sidebar */}
        <div
          className={`${
            isMenuActive ? "translate-x-0" : "-translate-x-full"
          } transition-transform ease-in-out duration-300  fixed top-0 left-0 bottom-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-fill lg:w-full lg:p-6`}
        >
          <Link to="/">
            <img src={images.Logo} alt="Logo" className="w-16" />
          </Link>
          <h4 className="mt-10 font-bold text-gray-detail">MAIN MENU</h4>
          {/* Menu Items */}
          <div className="mt-6 flex flex-col gap-y-[0.563rem]">
            <NavItem
              title="Dashboard"
              link="/admin"
              icon={<AiFillDashboard className="text-xl" />}
              name="dashboard"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            />
            <NavItem
              title="Comments"
              link="/admin/comments"
              icon={<FaComments className="text-xl" />}
              name="comments"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            />
            <NavItemCollapse
              title="Posts"
              icon={<MdDashboard className="text-xl" />}
              name="posts"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            >
              <Link to="/admin/posts/manage">Manage all posts</Link>
              <button
                className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isLoadingCreatePost}
                onClick={() =>
                  handleCreateNewPost({ token: userState.userInfo.token })
                }
              >
                New post
              </button>
              <Link to="/admin/categories/manage">Categories</Link>

            </NavItemCollapse>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
