import React from "react";
import { images } from "../constants";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/actions/user";
import { Link, useNavigate } from "react-router-dom";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Articles", type: "link", href: "/articles" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/about" },
      { title: "Contact us", href: "/contact" },
    ],
  },
  { name: "Pricing", type: "link", href: "/pricing" },
  { name: "FAQ", type: "link", href: "/faq" },
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdownHandler = () => {
    setDropdown((curState) => !curState);
  };

  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <Link
            to={item.href}
            className="text-white lg:text-dark-hard px-4 transition-all duration-500"
          >
            {item.name}
          </Link>
          <span className="cursor-pointer text-primary absolute transition-all duration-500 font-bold right-0 top-0 opacity-0 group-hover:right-[90%] group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={toggleDropdownHandler}
            className="flex gap-x-1 items-center px-4 transition-all duration-500  group-hover:text-primary"
          >
            <span className="text-white lg:text-dark-hard">{item.name}</span>
            <MdKeyboardArrowDown className="text-white lg:text-dark-hard" />
          </button>
          <div
            className={` ${
              dropdown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
          >
            <ul className="bg-dark-soft lg:bg-white text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items.map((page, index) => (
                <Link
                  key={index}
                  to={page.href}
                  className="bg-dark-soft text-white hover:text-white hover:bg-dark-light px-4 py-2 lg:bg-white lg:text-dark-hard lg:hover:bg-dark-hard"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDropdown, setprofileDropdown] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => !curState);
  };

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white">
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <Link to={"/"}>
          <img src={images.Logo} alt="Logo HiTech" className="h-10 lg:h-16" />
        </Link>
        <div className="text-dark-hard z-50 visible lg:hidden">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          }  mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col lg:flex-row w-full lg:w-auto justify-center lg:justify-end  fixed top-0 bottom-0 lg:static gap-x-9 items-center transition-all duration-500`}
        >
          <ul className="items-center gap-y-5 flex flex-col lg:flex-row gap-x-2 font-semibold">
            {navItemsInfo.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </ul>
          {userState.userInfo ? (
            <div className="items-center gap-y-5 flex flex-col lg:flex-row gap-x-2 font-semibold">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      setprofileDropdown(!profileDropdown);
                    }}
                    className="flex gap-x-1 items-center px-4 transition-all duration-500  group-hover:text-primary"
                  >
                    <span className="text-white mt-4 lg:text-dark-hard lg:mt-0">
                      Account
                    </span>
                    <MdKeyboardArrowDown className="text-white lg:text-dark-hard" />
                  </button>
                  <div
                    className={` ${
                      profileDropdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                  >
                    <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                      {userState.userInfo?.admin && (
                        <button
                          onClick={() => {
                            navigate("/admin");
                          }}
                          type="button"
                          className="bg-dark-soft text-white border  hover:text-white hover:bg-dark-light lg:bg-white lg:text-dark-hard lg:hover:bg-dark-hard px-4 py-2"
                        >
                          Admin Dashboard
                        </button>
                      )}

                      <button
                        onClick={() => {
                          navigate("/profile");
                        }}
                        type="button"
                        className="bg-dark-soft text-white -translate-y-[1px] hover:text-white  hover:bg-dark-light lg:bg-white lg:text-dark-hard lg:hover:bg-dark-hard px-4 py-2"
                      >
                        Profile Page
                      </button>
                      <button
                        onClick={() => {
                          logOutHandler();
                        }}
                        type="button"
                        className="bg-dark-soft text-white -translate-y-[2px] hover:text-white hover:bg-dark-light lg:bg-white lg:text-dark-hard lg:hover:bg-dark-hard  px-4 py-2"
                      >
                        Log Out
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className=" transition-all duration-300 mt-5 lg:mt-0 border-2 border-primary px-6 py-2 rounded-full text-primary font-semibold hover:bg-primary hover:text-white"
            >
              Sign In
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
