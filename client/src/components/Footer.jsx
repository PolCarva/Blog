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

const Footer = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-dark-hard">
      <footer className="container px-5 md:px-12 mx-auto grid grid-cols-10 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg">{t("footer.product.title")}</h3>
          <ul className="text-gray-placeholder text-sm mt-5 space-y-4 md:text-sm">
            <li>
              <a href="/">{t("footer.product.landingPage")}</a>
            </li>
            <li>
              <a href="/">{t("footer.product.features")}</a>
            </li>
            <li>
              <a href="/">{t("footer.product.documentation")}</a>
            </li>
            <li>
              <a href="/">{t("footer.product.referalProgram")}</a>
            </li>
            <li>
              <a href="/">{t("footer.product.pricing")}</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg">{t('footer.services.title')}</h3>
          <ul className="text-gray-placeholder text-sm mt-5 space-y-4 md:text-sm">
            <li>
              <a href="/">{t('footer.services.documentation')}</a>
            </li>
            <li>
              <a href="/">{t('footer.services.design')}</a>
            </li>
            <li>
              <a href="/">{t('footer.services.themes')}</a>
            </li>
            <li>
              <a href="/">{t('footer.services.illustrations')}</a>
            </li>
            <li>
              <a href="/">{t('footer.services.uiKit')}</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2 md:col-start-5 lg:col-start-auto">
          <h3 className="text-dark-light font-bold md:text-lg">{t('footer.company.title')}</h3>
          <ul className="text-gray-placeholder text-sm mt-5 space-y-4 md:text-sm">
            <li>
              <a href="/">{t('footer.company.about')}</a>
            </li>
            <li>
              <a href="/">{t('footer.company.terms')}</a>
            </li>
            <li>
              <a href="/">{t('footer.company.privacyPolicy')}</a>
            </li>
            <li>
              <a href="/">{t('footer.company.careers')}</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-dark-light font-bold md:text-lg">{t('footer.more.title')}</h3>
          <ul className="text-gray-placeholder text-sm mt-5 space-y-4 md:text-sm">
            <li>
              <a href="/">{t('footer.more.documentation')}</a>
            </li>
            <li>
              <a href="/">{t('footer.more.license')}</a>
            </li>
            <li>
              <a href="/">{t('footer.more.changelog')}</a>
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
