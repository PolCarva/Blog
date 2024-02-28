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
import { useTranslation } from "react-i18next";

const footerContent = {
  product: {
    title: "footer.product.title",
    links: [
      { label: "landingPage", text: "footer.product.landingPage", url:"/"},
      { label: "features", text: "footer.product.features", url:"/"},
      { label: "documentation", text: "footer.product.documentation", url:"/"},
      { label: "referalProgram", text: "footer.product.referalProgram", url:"/" },
      { label: "pricing", text: "footer.product.pricing", url:"/" }
    ]
  },
  services: {
    title: "footer.services.title",
    links: [
      { label: "documentation", text: "footer.services.documentation", url:"/" },
      { label: "design", text: "footer.services.design", url:"/" },
      { label: "themes", text: "footer.services.themes", url:"/" },
      { label: "illustrations", text: "footer.services.illustrations", url:"/" },
      { label: "uiKit", text: "footer.services.uiKit", url:"/" }
    ]
  },
  company: {
    title: "footer.company.title",
    links: [
      { label: "about", text: "footer.company.about", url:"/" },
      { label: "terms", text: "footer.company.terms", url:"/"},
      { label: "privacyPolicy", text: "footer.company.privacyPolicy", url:"/"},
      { label: "careers", text: "footer.company.careers", url:"/" }
    ]
  },
  more: {
    title: "footer.more.title",
    links: [
      { label: "documentation", text: "footer.more.documentation", url:"/"},
      { label: "license", text: "footer.more.license", url:"/"},
      { label: "changelog", text: "footer.more.changelog", url:"/" }
    ]
  }
};


const Footer = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-dark-hard">
      <footer className="container px-5 md:px-12 mx-auto grid grid-cols-10 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        {Object.keys(footerContent).map((section, index) => (
          <div key={index} className="col-span-5 md:col-span-4 lg:col-span-2">
            <h3 className="text-dark-light font-bold md:text-lg">{t(footerContent[section].title)}</h3>
            <ul className="text-gray-placeholder text-sm mt-5 space-y-4 md:text-sm">
              {footerContent[section].links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.url}>{t(`footer.${section}.${link.label}`)}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          <img
            src={images.Logo}
            alt="Logo"
            className="brightness-0 invert mx-auto md:mx-0 h-16 lg:h-20"
          />
          <p className="text-sm text-dark-light text-center mt-4 md:text-left md:text-base lg:text-sm">
            {t('footer.shortDescription')}
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
