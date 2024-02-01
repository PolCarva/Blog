import React from "react";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
  AiFillFacebook,
  AiFillHeart,
} from "react-icons/ai";
import { BiLogoTelegram } from "react-icons/bi";

import images from "../constants/images";

const Footer = () => {
  return (
    <section className="bg-dark-hard">
      <footer className="container px-5 md:px-12 mx-auto grid grid-cols-10 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg">Product</h3>
          <ul className="text-gray-placeholder text-sm mt-5 space-y-4 md:text-sm">
            <li>
              <a href="/">Landingpage</a>
            </li>
            <li>
              <a href="/">Features</a>
            </li>
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Referal Program</a>
            </li>
            <li>
              <a href="/">Pricing</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg">Services</h3>
          <ul className="text-gray-placeholder text-sm mt-5 space-y-4 md:text-sm">
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Design</a>
            </li>
            <li>
              <a href="/">Themes</a>
            </li>
            <li>
              <a href="/">Illustrations</a>
            </li>
            <li>
              <a href="/">UI Kit</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2 md:col-start-5 lg:col-start-auto">
          <h3 className="text-dark-light font-bold md:text-lg">Company</h3>
          <ul className="text-gray-placeholder text-sm mt-5 space-y-4 md:text-sm">
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Terms</a>
            </li>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg">More</h3>
          <ul className="text-gray-placeholder text-sm mt-5 space-y-4 md:text-sm">
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">License</a>
            </li>
            <li>
              <a href="/">Changelog</a>
            </li>
          </ul>
        </div>
        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          <img
            src={images.Logo}
            alt="Logo"
            className="brightness-0 invert mx-auto md:mx-0 h-16 lg:h-20"
          />
          <p className="text-sm text-dark-light text-center mt-4 md:text-left md:text-base lg:text-sm">
            Build a modern and creative website with crealand
          </p>
          <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-detail md:justify-start">
            <li>
              <a href="/">
                <AiOutlineTwitter className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillFacebook className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillYoutube className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillInstagram className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <BiLogoTelegram className="w-6 h-auto" />
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10">
          <div className="bg-primary text-white p-3 rounded-full">
            <AiFillHeart className="w-7 h-auto" />
          </div>
            <p className="font-bold italic text-dark-light">Copyright © 2024. Multimedia Social Media</p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
