import { FiSearch } from "react-icons/fi";
import { useTranslation } from 'react-i18next';


import { images } from "../../../constants";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPopularTags } from "../../../services/index/postTags";

const Hero = () => {
  const [popularTags, setPopularTags] = useState([])
  const [query, setQuery] = useState("")
  const navigate = useNavigate();
  const { t } = useTranslation();

  /* Get popular categories */
  useEffect(() => {
    getPopularTags().then((data) => {
      setPopularTags(data);
    }).catch((error) => {
      console.log(error);

    });
  }, [])



  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/blog?page=1&search=${query}`);
  };

  return (
    <section className="container px-5 md:px-12 mx-auto flex flex-col py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w[540px]">
          Multimedia Social Media
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          {t('hero.welcomeMessage')}
        </p>
        <form onSubmit={handleSearch}>
          <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-placeholder" />
              <input
                type="text"
                className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-gray-placeholder rounded-lg pl-12 pr-13 w-full py-3 focus:outline-none shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] md:py-4"
                placeholder={t('hero.searchPlaceholder')}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <button onClick={handleSearch} className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">
              {t('hero.searchBtn')}
            </button>
          </div>
        </form>
        <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="text-dark-light font-semibold w-full max-w-fit italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            {t('hero.searchSuggestions')}
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 w-full lg:text-sm xl:text-base">
            {popularTags
              .sort((a, b) => b.count - a.count)
              .map(tag => (
                <li key={tag._id}>
                  <Link to={`/blog/?page=1&search=${tag._id}`} className="rounded-lg text-primary bg-primary bg-opacity-10 hover:bg-opacity-20 transition-all ease-in-out px-3 py-1.5 font-semibold">
                    {tag._id}
                  </Link>
                </li>))
            }
          </ul>
        </div>
      </div>
      <div className="hidden lg:block mx-auto max-w-xl">
        <img src={images.HeroImg} alt={t('hero.altHeroImg')} />
      </div>
    </section>
  );
};

export default Hero;
