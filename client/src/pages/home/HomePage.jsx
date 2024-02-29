import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Articles from "./container/Articles";
import CTA from "./container/CTA";
import { useTranslation } from "react-i18next";
/* import { useEffect } from "react";
import toast from "react-hot-toast"; */

const HomePage = () => {
  const { t } = useTranslation();
  /* useEffect(() => {
    setTimeout(() => {
      toast(t('alerts.underConstruction'), {
        icon: "🚧",
        duration: 5000,
        style: {
          background: "#333",
          color: "#fff",
        },
      }, 1000);
    });
  }, [t]); */

  return (
    <MainLayout>
      <Hero />
      <Articles />
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
