import React from "react";
import images from "../../../constants/images";
import { useTranslation } from "react-i18next";

const CTA = () => {
  const { t } = useTranslation();
  return (
    <>
      <svg
        className="w-full h-auto max-h-40 translate-y-[1px]"
        preserveAspectRatio="none"
        viewBox="0 0 2160 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Wave"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
          fill="#0D2436"
        />
      </svg>
      <section className="relative bg-dark-hard">
        <div className="container px-5 md:px-12 grid grid-cols-12 mx-auto py-10 md:pb-20 lg:place-items-center">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-2xl font-bold text-white md:text-4xl md:text-center md:leading-normal lg:text-left">
              {t("cta.title")}
            </h2>
            <div className="w-full max-w[494px] mt-12 space-y-3 mx-auto md:space-y-0 md:flex md:items-center md:space-x-2 lg:mx-0">
              <input
                type="text"
                placeholder={t("cta.inputPlaceholder")}
                className="px-4 py-3 rounded-lg w-full placeholder:text-dark-light"
              />
              <button className="px-4 py-3 rounded-lg w-full bg-primary text-white font-bold md:w-fit md:whitespace-nowrap">
                {t("cta.button")}
              </button>
            </div>
            <p className="text-dark-light text-sm leading-7 mt-6 md:text-center md:text-base lg:text-left">
              <span className="font-bold italic text-gray-detail md:font-normal md:not-italic md:text-dark-light">
                {t('cta.response')}</span>
            </p>
          </div>
          <div className="col-span-12 hidden mb-[70px] md:block md:order-first lg:order-last lg:col-span-6">
            <div className="w-3/4 mx-auto relative">
              <div className="w-1/2 h-1/2 bg-[#FC5A5A] rounded-lg absolute top-[10%] -right-[8%]" />
              <div className="w-1/2 h-1/2 bg-white opacity-[.06] rounded-lg absolute -bottom-[10%] -left-[8%]" />
              <div className="rounded-xl w-full bg-white p-3 z-[1] relative">
                <img
                  src={images.CTAImg}
                  alt="Facebook and messanger logo"
                  className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
                />
                <div className="p-5">
                  <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
                    {t("cta.future")}
                  </h2>
                  <p className="text-dark-light mt-3 text-sm md:text-lg">
                    {t("cta.futureDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
