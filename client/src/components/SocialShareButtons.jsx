import React from "react";
import { FaFacebookSquare, FaTwitterSquare, FaRedditSquare, FaWhatsappSquare } from "react-icons/fa";

const SocialShareButtons = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between">
      <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/dialog/share?app_id=153089371143195&display=popup&href=${url}`}>
        <FaFacebookSquare className="text-[#3B5998] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href="/">
        <FaTwitterSquare className="text-[#00ACEE] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href="/">
        <FaRedditSquare className="text-[#FF4500] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href="/">
        <FaWhatsappSquare className="text-[#25D366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareButtons;
